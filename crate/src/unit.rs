use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::squad::SquadUnitShared;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;
const UNIT_MOVE_SPEED: f32 = 0.0; // 2.5;

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
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32) -> Unit {
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

  pub fn change_state_to_run(&mut self, squad_shared_info: &SquadUnitShared) {
  // pub fn change_state_to_run(&mut self, target_x: f32, target_y: f32) {
    // when this method will be called
    // 1. When unit need to run by path described in squad, from point to point (some index would be necessary, to keep current point)
    // 2. When units in squad are too far from each other, and need to be closer, in the center on the squad
    // 3. When unit by FLY state runs out of weapon range, and need to get closer, to use weapon again (not sure if then just 2. point is not enough)

    self.state = STATE_RUN;
    self.track_index = 0;
    // TODO: add that offset only in some cases
    self.set_next_target(squad_shared_info);
  }

  fn set_next_target(&mut self, squad_shared_info: &SquadUnitShared) {
    self.target_x = squad_shared_info.track[self.track_index].0 + self.position_offset_x;
    self.target_y = squad_shared_info.track[self.track_index].1 + self.position_offset_y;
    let angle = (self.target_x - self.x).atan2(self.y - self.target_y);
    self.mod_x = angle.sin() * UNIT_MOVE_SPEED;
    self.mod_y = -angle.cos() * UNIT_MOVE_SPEED;
    self.angle = angle;
  }

  fn update_run(&mut self, squad_shared_info: &SquadUnitShared) {
    self.x += self.mod_x;
    self.y += self.mod_y;

    if (self.x - self.target_x).hypot(self.y - self.target_y) < UNIT_MOVE_SPEED {
      if squad_shared_info.track.len() - 1 == self.track_index {
        self.change_state_to_idle();
      } else {
        self.track_index += 1;
        self.set_next_target(squad_shared_info);
      }
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

  pub fn update(&mut self, squad_shared_info: &SquadUnitShared) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(),
      STATE_RUN => self.update_run(squad_shared_info),
      STATE_IDLE => self.update_idle(),
      _ => {}
    }
  }

  pub fn get_representation(&self) -> [f32; REPRESENTATION_LENGTH] {
    let mut representation: [f32; REPRESENTATION_LENGTH] = [
      2.0,
      self.id,
      self.x,
      self.y,
      self.angle,
      self.state as f32,
      0.0,
    ];

    match self.state {
      STATE_FLY => representation[REPRESENTATION_LENGTH - 1] = self.mod_x.hypot(self.mod_y),
      STATE_GETUP => representation[REPRESENTATION_LENGTH - 1] = self.get_upping_progress,
      STATE_RUN => {}
      STATE_IDLE => {}
      _ => {}
    }
    representation
  }

  pub fn set_position_offset(&mut self, offset_x: f32, offset_y: f32) {
    self.position_offset_x = offset_x;
    self.position_offset_y = offset_y;
  }
}
