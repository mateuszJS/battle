use crate::id_generator::IdGenerator;

pub struct Unit {
  pub id: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  pub state: f32,
  pub get_upping_progress: f32, // <0, 1>, 0 -> start get up, 1 -> change state to IDLE
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32) -> Unit {
    Unit {
      id: IdGenerator::generate_id(),
      x,
      y,
      angle,
      state: 4.0,
      get_upping_progress: 0.0,
    }
  }
}
