use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const REPRESENTATION_LENGTH: usize = 7;
const UNIT_MOVE_SPEED: f32 = 2.0;

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

  pub fn change_state_to_run(&mut self, target_x: f32, target_y: f32) {
    self.state = STATE_RUN;
    self.target_x = target_x;
    self.target_y = target_y;
    let angle = (target_x - self.x).atan2(self.y - target_y);
    self.mod_x = angle.sin() * UNIT_MOVE_SPEED;
    self.mod_y = -angle.cos() * UNIT_MOVE_SPEED;
    self.angle = angle;
  }

  fn update_run(&mut self) {
    self.x += self.mod_x;
    self.y += self.mod_y;
  }

  fn update_idle(&mut self) {
    // searching for the enemies
    // check if not too far from squad center point
  }

  pub fn update(&mut self) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(),
      STATE_RUN => self.update_run(),
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
}
