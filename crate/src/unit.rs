use crate::bullets_manager::BulletsManager;
use crate::constants::{
  MANAGE_HUNTERS_PERIOD, MATH_PI, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, NORMAL_SQUAD_RADIUS,
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
use std::rc::Weak;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
pub const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
pub const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;
const MAX_WEAPON_DEVIATION_TO_HIT: f32 = 0.25;

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
  track_index: i8,
  squad_details: &'static SquadDetails,
  time_to_next_shoot: u16,
  aim: Weak<RefCell<Unit>>,
  hp: u16,
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
      track_index: -1, // -1 means, there is no needed to go though track
      squad_details,
      time_to_next_shoot: 0,
      aim: Weak::new(),
      hp: squad_details.hp,
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

  fn update_getup(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.get_upping_progress += 0.01;
    if self.get_upping_progress >= 1.0 {
      self.change_state_to_idle(squad_shared_info);
    }
  }

  pub fn check_if_too_far_from_squad_center(
    &self,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) -> bool {
    (squad_shared_info.center_point.0 - self.x).hypot(squad_shared_info.center_point.1 - self.y)
      > MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS
  }

  fn check_if_close_to_squad_center(&self, squad_shared_info: &SquadUnitSharedDataSet) -> bool {
    (squad_shared_info.center_point.0 - self.x).hypot(squad_shared_info.center_point.1 - self.y)
      <= NORMAL_SQUAD_RADIUS + 20.0
  }

  fn can_change_state(&mut self) -> bool {
    self.state != STATE_DIE && self.state != STATE_FLY && self.state != STATE_GETUP
  }

  fn check_if_can_go_to_next_point_on_track(
    &self,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) -> bool {
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
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

    !obstacles_lines
      .iter()
      .any(|obstacle_line| BasicUtils::check_intersection(&line_to_next_track_point, obstacle_line))
  }

  pub fn change_state_to_run_though_track(
    &mut self,
    squad_shared_info: &SquadUnitSharedDataSet,
    from_start: bool, // after GETUP will be false, bc have to start with last point where was
  ) {
    if from_start {
      self.track_index = 0;
    }

    self.track_index += if self.check_if_close_to_squad_center(squad_shared_info) {
      1
    } else {
      if self.check_if_can_go_to_next_point_on_track(squad_shared_info) {
        1
      } else {
        0
      }
    };

    if self.can_change_state() {
      self.state = STATE_RUN;
      self.go_to_current_point_on_track(squad_shared_info);
    }
  }

  fn set_target(&mut self, x: f32, y: f32) {
    self.state = STATE_RUN;
    self.target_x = x;
    self.target_y = y;
    let angle = (x - self.x).atan2(self.y - y);
    self.mod_x = angle.sin() * self.squad_details.movement_speed;
    self.mod_y = -angle.cos() * self.squad_details.movement_speed;
    self.angle = angle;
  }

  fn go_to_current_point_on_track(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.set_target(
      squad_shared_info.track[self.track_index as usize].0 + self.position_offset_x,
      squad_shared_info.track[self.track_index as usize].1 + self.position_offset_y,
    );
  }

  fn is_target_achieved(&self) -> bool {
    (self.x - self.target_x).hypot(self.y - self.target_y) < self.squad_details.movement_speed
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if self.is_target_achieved() {
      if squad_shared_info.track.len() as i8 - 1 == self.track_index || self.track_index == -1 {
        self.track_index = -1;
        // --------------- handle hunting ----------------- START
        if squad_shared_info.stored_track_destination.is_some() {
          self.change_state_to_idle(squad_shared_info);
        } else if let Some(ref_cell_aim) = squad_shared_info.aim.upgrade() {
          // check if you are in range with aim, if no, go ahead, so there won't be effect like
          // to avoid effect like stopping and running all the time
          if ref_cell_aim.borrow().was_moved_in_previous_loop {
            // in this case it's current loop, because "update" goes after updating the "was_moved_in_previous_loop"
            self.set_target(
              self.mod_x * MANAGE_HUNTERS_PERIOD as f32 + self.target_x,
              self.mod_y * MANAGE_HUNTERS_PERIOD as f32 + self.target_y,
            );
          } else {
            self.change_state_to_shoot(ref_cell_aim, true);
          }
        // --------------- handle hunting ----------------- END
        } else {
          self.change_state_to_idle(squad_shared_info);
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

  pub fn change_state_to_idle(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.mod_x = 0.0;
    self.mod_y = 0.0;
    self.state = STATE_IDLE;
    if self.track_index != -1 {
      self.go_to_current_point_on_track(squad_shared_info);
    } else if let Some(aim) = squad_shared_info.aim.upgrade() {
      self.change_state_to_shoot(aim, true);
    } else if let Some(secondary_aim) = squad_shared_info.secondary_aim.upgrade() {
      self.change_state_to_shoot(secondary_aim, false);
    }
  }

  fn update_idle(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {}

  fn update_die(&mut self) {}

  pub fn check_state_correctness(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if self.state == STATE_IDLE {
      self.change_state_to_idle(squad_shared_info);
    } else if self.state == STATE_SHOOT {
      self.check_correction_of_shooting_state(squad_shared_info);
    }
  }

  fn check_correction_of_shooting_state(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if let Some(ref_cell_aim) = self.aim.upgrade() {
      let aim_pos = ref_cell_aim.borrow();
      let angle = (aim_pos.x - self.x).atan2(self.y - aim_pos.y);
      let distance = (aim_pos.x - self.x).hypot(aim_pos.y - self.y);
      self.angle = angle;

      if distance > WEAPON_RANGE {
        self.change_state_to_idle(squad_shared_info);
      }
    }
    // TODO: else with removing aim from squad?
  }

  fn change_state_to_shoot(&mut self, aim: Rc<RefCell<Squad>>, is_important_aim: bool) {
    let borrowed_members = &aim.borrow().members;
    let (weak_unit_aim, distance) =
      borrowed_members
        .iter()
        .fold((Weak::new(), std::f32::MAX), |acc, ref_cell_unit| {
          let unit = ref_cell_unit.borrow();
          let dis = (self.x - unit.x).hypot(self.y - unit.y);
          if dis < acc.1 {
            (Rc::downgrade(ref_cell_unit), dis)
          } else {
            acc
          }
        });
    if let Some(ref_cell_unit_aim) = weak_unit_aim.upgrade() {
      let unit_aim = ref_cell_unit_aim.borrow();
      let angle = (unit_aim.x - self.x).atan2(self.y - unit_aim.y);
      if distance <= WEAPON_RANGE {
        self.state = STATE_SHOOT;
        self.angle = angle;
        self.aim = weak_unit_aim;
      } else if is_important_aim {
        // TODO: not sure if shouldn't go to the correct position in the squad
        self.set_target(
          angle.sin() * WEAPON_RANGE + unit_aim.x,
          -angle.cos() * WEAPON_RANGE + unit_aim.y,
        );
      }
    }
  }

  fn update_shoot(
    &mut self,
    squad_shared_info: &SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    if self.time_to_next_shoot == 0 {
      let weapon = squad_shared_info.weapon;
      let random = LookUpTable::get_random() - 0.5;
      let random_abs = random.abs();
      let weapon_deviation = random * weapon.scatter;
      let distance_mod = 1.0
        + weapon_deviation
          * if (random_abs * 10.0) as u8 % 2 == 0 {
            -1.0
          } else {
            1.0
          };

      bullet_manager.add(
        self.id as f32,
        self.x,
        self.y,
        self.angle + weapon_deviation,
        &squad_shared_info.weapon.name,
        self.aim.clone(),
        distance_mod,
        weapon_deviation.abs() < MAX_WEAPON_DEVIATION_TO_HIT,
      );

      self.time_to_next_shoot = if random_abs > weapon.chances_to_reload {
        // 25% chances to reload
        weapon.reload_time
      } else {
        weapon.shoot_time
      };
    } else {
      self.time_to_next_shoot -= 1;
    }
  }

  pub fn update(
    &mut self,
    squad_shared_info: &SquadUnitSharedDataSet,
    bullet_manager: &mut BulletsManager,
  ) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(squad_shared_info),
      STATE_RUN => self.update_run(squad_shared_info),
      STATE_IDLE => self.update_idle(squad_shared_info),
      STATE_SHOOT => self.update_shoot(squad_shared_info, bullet_manager),
      STATE_DIE => self.update_die(),
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
        // additional parameter for state
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

  fn change_state_to_die(&mut self) {
    self.state = STATE_DIE;
    self.mod_x = 0.;
    self.mod_y = 0.;
  }

  pub fn take_damage(&mut self, damage: u16) {
    self.hp -= damage;
    log!("{}", self.hp);
    if self.hp <= 0 {
      self.change_state_to_die();
    }
  }
}
