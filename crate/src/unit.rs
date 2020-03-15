use crate::id_generator::IdGenerator;

pub struct Unit {
  pub id: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
}

impl Unit {
  pub fn new(x: f32, y: f32, angle: f32) -> Unit {
    Unit {
      id: IdGenerator::generate_id(),
      x,
      y,
      angle,
    }
  }
}
