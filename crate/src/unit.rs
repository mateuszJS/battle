use crate::log;

use crate::id_generator::IdGenerator;

const STATE_ABILITY: u8 = 8;
const STATE_FLY: u8 = 7;
const STATE_RUN: u8 = 6;
const STATE_SHOOT: u8 = 5;
const STATE_IDLE: u8 = 4;
const STATE_GETUP: u8 = 3;
const STATE_DIE: u8 = 0;

const PORTAL_PRODUCTION_STRENGTH: f32 = 9.0;

pub struct Unit {
  pub id: f32,
  pub x: f32,
  pub y: f32,
  pub z: f32,
  pub angle: f32,
  pub state: u8,
  pub get_upping_progress: f32, // <0, 1>, 0 -> start get up, 1 -> change state to IDLE
  mod_x: f32,
  mod_y: f32,
  mod_z: f32,
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32) -> Unit {
    Unit {
      id: IdGenerator::generate_id(),
      x,
      y,
      z: 0.0,
      angle,
      state: STATE_FLY,
      get_upping_progress: 0.0,
      mod_x: angle.sin() * PORTAL_PRODUCTION_STRENGTH,
      mod_y: -angle.cos() * PORTAL_PRODUCTION_STRENGTH,
      mod_z: PORTAL_PRODUCTION_STRENGTH * 0.5,
    }
  }

  fn update_fly(&mut self) {
    self.x += self.mod_x;
    self.y += self.mod_y;
    self.z += self.mod_z;

    self.mod_x *= 0.95;
    self.mod_y *= 0.95;
    self.mod_z *= 0.95;

    if self.mod_x.abs() < 0.1 {
      self.mod_x = 0.0;
    }
    if self.mod_y.abs() < 0.1 {
      self.mod_y = 0.0;
    }
    if self.mod_z.abs() < 0.1 {
      self.mod_z = 0.0;
    }

    if self.mod_x == self.mod_y && self.mod_y == self.mod_z && self.mod_z == 0.0 {
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

  fn update_idle(&mut self) {
    // searching for the enemies
    // check if not too far from squad center point
  }

  pub fn update(&mut self) {
    match self.state {
      STATE_FLY => self.update_fly(),
      STATE_GETUP => self.update_getup(),
      STATE_IDLE => self.update_idle(),
      _ => {}
    }
  }
}
