use crate::constants::{
  MANAGE_HUNTERS_PERIOD, MATH_PI, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, THRESHOLD_SQUAD_MOVED,
  WEAPON_RANGE,
};
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::position_utils::basic_utils::{BasicUtils, Line, Point};
use crate::position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use crate::squad::{Squad, SquadUnitSharedDataSet};
use crate::squad_types::SquadDetails;
use std::cell::RefCell;
use std::rc::Rc;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;

pub struct Unit {
  pub id: u32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  pub state: u8,
  pub get_upping_progress: f32, // <0, 1>, 0 -> start get up, 1 -> change state to IDLE
  mod_x: f32,
  mod_y: f32,
  target_x: f32,
  target_y: f32,
  position_offset_x: f32,
  position_offset_y: f32,
  track_index: usize,
  squad_details: &'static SquadDetails,
  time_to_next_shoot: u16,
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32, squad_details: &'static SquadDetails) -> Unit {
    let seed_throwing_strength = LookUpTable::get_random(); // TODO: move it to factory code, or faction
    let throwing_strength = 8.0 + seed_throwing_strength * 15.0;

    Unit {
      id: IdGenerator::generate_id(),
      x,
      y,
      angle: (angle + MATH_PI) % (MATH_PI * 2.0),
      state: STATE_FLY,
      get_upping_progress: 0.0,
      mod_x: angle.sin() * throwing_strength,
      mod_y: -angle.cos() * throwing_strength,
      target_x: 0.0,
      target_y: 0.0,
      position_offset_x: 0.0,
      position_offset_y: 0.0,
      track_index: 0,
      squad_details,
      time_to_next_shoot: 0,
    }
  }

  fn update_fly(&mut self) {
    self.x += self.mod_x;
    self.y += self.mod_y;

    self.mod_x *= 0.95;
    self.mod_y *= 0.95;

    if self.mod_x.hypot(self.mod_y) < 0.035 {
      self.change_state_to_getup();
    }
  }

  fn change_state_to_getup(&mut self) {
    self.state = STATE_GETUP;
    self.get_upping_progress = 0.0;
  }

  fn update_getup(&mut self) {
    self.get_upping_progress += 0.01;
    if self.get_upping_progress >= 1.0 {
      self.state = STATE_IDLE;
    }
  }

  pub fn change_state_to_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    // pub fn change_state_to_run(&mut self, target_x: f32, target_y: f32) {
    // when this method will be called
    // 1. When unit need to run by path described in squad, from point to point (some index would be necessary, to keep current point)
    // 2. When units in squad are too far from each other, and need to be closer, in the center on the squad
    // 3. When unit by FLY state runs out of weapon range, and need to get closer, to use weapon again (not sure if then just 2. point is not enough)

    self.state = STATE_RUN;

    let distance_from_squad_center =
      (squad_shared_info.center_point.0 - self.x).hypot(squad_shared_info.center_point.1 - self.y);
    self.track_index = if distance_from_squad_center > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS {
      let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
      // ------------START checking intersection-------------------
      let next_track_point = squad_shared_info.track[1];
      let start_point = Point {
        id: 0,
        x: self.x,
        y: self.y,
      };
      let end_point = Point {
        id: 0,
        x: next_track_point.0,
        y: next_track_point.1,
      };
      let line_to_next_track_point = Line {
        p1: &start_point,
        p2: &end_point,
      };
      let mut track_index = 1;
      obstacles_lines.iter().for_each(|obstacle_line| {
        if BasicUtils::check_intersection(&line_to_next_track_point, obstacle_line) {
          track_index = 0;
        };
      });
      track_index
    // ------------END checking intersection-------------------
    } else {
      1
    };

    self.go_to_current_point_on_track(squad_shared_info);
  }

  pub fn set_target(&mut self, x: f32, y: f32) {
    self.target_x = x;
    self.target_y = y;
    let angle = (x - self.x).atan2(self.y - y);
    self.mod_x = angle.sin() * self.squad_details.movement_speed;
    self.mod_y = -angle.cos() * self.squad_details.movement_speed;
    self.angle = angle;
  }

  fn go_to_current_point_on_track(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.set_target(
      squad_shared_info.track[self.track_index].0 + self.position_offset_x,
      squad_shared_info.track[self.track_index].1 + self.position_offset_y,
    );
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if (self.x - self.target_x).hypot(self.y - self.target_y) < self.squad_details.movement_speed {
      if squad_shared_info.track.len() - 1 == self.track_index {
        // --------------- handle hunting ----------------- START
        if let Some(ref_cell_aim) = squad_shared_info.aim.upgrade() {
          // or maybe to change_state_to_shoot we should pass aim (when is really exists)
          // and then just inside that function (or update function), check
          // if you are in range with aim, if no, go ahead, so there won't be effect like
          // stopping and running all the time
          let aim_pos = ref_cell_aim.borrow().shared.center_point;
          let dis_aim_curr_pos_and_last = (aim_pos.0 - squad_shared_info.last_aim_position.0)
            .hypot(aim_pos.1 - squad_shared_info.last_aim_position.1);

          if dis_aim_curr_pos_and_last > THRESHOLD_SQUAD_MOVED {
            // to avoid effect like RUN and IDLE all the time when hunting on enemy
            // self.target_x += self.mod_x * MANAGE_HUNTERS_PERIOD as f32; // add difference between last_aim_position and current position of aim
            // self.target_y += self.mod_y * MANAGE_HUNTERS_PERIOD as f32;
            // check when last_aim_position is updated!
            self.set_target(
              self.mod_x * MANAGE_HUNTERS_PERIOD as f32 + self.target_x,
              self.mod_y * MANAGE_HUNTERS_PERIOD as f32 + self.target_y,
            );
          } else {
            self.change_state_to_shoot(&ref_cell_aim);
          }
        // --------------- handle hunting ----------------- END
        } else {
          self.change_state_to_idle();
        }
      } else {
        self.track_index += 1;
        self.go_to_current_point_on_track(squad_shared_info);
      }
    } else {
      self.x += self.mod_x;
      self.y += self.mod_y;
    }
  }

  pub fn change_state_to_idle(&mut self) {
    self.mod_x = 0.0;
    self.mod_y = 0.0;
    self.state = STATE_IDLE;
  }

  fn update_idle(&mut self) {
    // searching for the enemies
    // check if not too far from squad center point
  }

  pub fn change_state_to_shoot(&mut self, aim: &Rc<RefCell<Squad>>) {
    let borrowed_members = &aim.borrow().members;
    let (unit_aim, distance) =
      borrowed_members
        .iter()
        .fold((&borrowed_members[0], std::f32::MAX), |acc, unit| {
          let dis = (self.x - unit.x).hypot(self.y - unit.y);
          if dis < acc.1 {
            (unit, dis)
          } else {
            acc
          }
        });

    let angle = (unit_aim.x - self.x).atan2(self.y - unit_aim.y);
    if distance <= WEAPON_RANGE {
      self.state = STATE_SHOOT;
      self.angle = angle;
    } else {
      self.set_target(
        (MATH_PI - angle).sin() * WEAPON_RANGE + unit_aim.x,
        -(MATH_PI - angle).cos() * WEAPON_RANGE + unit_aim.y,
      );
    };
  }

  fn is_aim_in_range(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {}

  fn update_shoot(&mut self) {
    // if Some(upgraded_aim) = self.aim.upgrade() { // check if chosen enemy still lives
    // let aim = upgraded_aim.borrow(); // check if state is moving and if it's still in range
    // self.angle = (aim.0)
    // } // if not live or out of range, then go to change_state_to_shoot to select a new one
    if self.time_to_next_shoot == 0 {
      // make shoot, create bullet, change state to let know for representation that shoot was created
      let random = LookUpTable::get_random() - 0.5;

      self.time_to_next_shoot = if random.abs() > 0.4 {
        // 25% chances to reload
        200
      } else {
        40
      };
    } else {
      self.time_to_next_shoot -= 1;
    }
  }

  pub fn update(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(),
      STATE_RUN => self.update_run(squad_shared_info),
      STATE_IDLE => self.update_idle(),
      STATE_SHOOT => self.update_shoot(),
      _ => {}
    }
  }

  pub fn get_representation(&self) -> [f32; REPRESENTATION_LENGTH] {
    [
      self.squad_details.representation_type,
      self.id as f32,
      self.x,
      self.y,
      self.angle,
      self.state as f32,
      match self.state {
        // additional parameter for state, used below
        STATE_FLY => self.mod_x.hypot(self.mod_y),
        STATE_GETUP => self.get_upping_progress,
        STATE_SHOOT => self.time_to_next_shoot as f32,
        _ => 0.0,
      },
    ]
  }

  pub fn set_position_offset(&mut self, offset_x: f32, offset_y: f32) {
    self.position_offset_x = offset_x;
    self.position_offset_y = offset_y;
  }
}
