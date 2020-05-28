use crate::constants::{MATH_PI, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS};
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::position_utils::basic_utils::{BasicUtils, Line, Point};
use crate::position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use crate::squad::SquadUnitSharedDataSet;
use crate::squad_types::SquadDetails;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;

pub struct Unit {
  pub id: f32,
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
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32, squad_details: &'static SquadDetails) -> Unit {
    let seed_throwing_strength = LookUpTable::get_random();
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
    // TODO: add that offset only in some cases
    self.set_next_target(squad_shared_info);
  }

  fn set_next_target(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    self.target_x = squad_shared_info.track[self.track_index].0 + self.position_offset_x;
    self.target_y = squad_shared_info.track[self.track_index].1 + self.position_offset_y;
    let angle = (self.target_x - self.x).atan2(self.y - self.target_y);
    self.mod_x = angle.sin() * self.squad_details.movement_speed;
    self.mod_y = -angle.cos() * self.squad_details.movement_speed;
    self.angle = angle;
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    if (self.x - self.target_x).hypot(self.y - self.target_y) < self.squad_details.movement_speed {
      if squad_shared_info.track.len() - 1 == self.track_index {
        self.change_state_to_idle();
      } else {
        self.track_index += 1;
        self.set_next_target(squad_shared_info);
      }
    } else {
      self.x += self.mod_x;
      self.y += self.mod_y;
    }
  }

  fn change_state_to_idle(&mut self) {
    self.mod_x = 0.0;
    self.mod_y = 0.0;
    self.state = STATE_IDLE;
  }

  fn update_idle(&mut self) {
    // searching for the enemies
    // check if not too far from squad center point
  }

  pub fn update(&mut self, squad_shared_info: &SquadUnitSharedDataSet) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(),
      STATE_RUN => self.update_run(squad_shared_info),
      STATE_IDLE => self.update_idle(),
      _ => {}
    }
  }

  pub fn get_representation(&self) -> [f32; REPRESENTATION_LENGTH] {
    [
      self.squad_details.representation_type,
      self.id,
      self.x,
      self.y,
      self.angle,
      self.state as f32,
      match self.state { // additional parameter for state, used below
        STATE_FLY => self.mod_x.hypot(self.mod_y),
        STATE_GETUP => self.get_upping_progress,
        _ => 0.0
      },
    ]
  }

  pub fn set_position_offset(&mut self, offset_x: f32, offset_y: f32) {
    self.position_offset_x = offset_x;
    self.position_offset_y = offset_y;
  }
}
