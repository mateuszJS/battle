#[derive(Clone)]
pub struct Unit {
  pub id: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
}

impl Unit {
  pub fn new(id: f32, x: f32, y: f32, angle: f32) -> Unit {
    Unit { id, x, y, angle }
  }
}
