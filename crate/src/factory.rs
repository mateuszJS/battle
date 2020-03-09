use crate::unit_types::UnitType;

struct ProducedSquad {
  unit_type: UnitType,
  current_time: u32,
}

pub struct Factory {
  pub id: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  production_line: Vec<ProducedSquad>,
}

impl Factory {
  pub fn new(id: f32, x: f32, y: f32, angle: f32) -> Factory {
    Factory {
      id,
      x,
      y,
      angle,
      production_line: vec![],
    }
  }

  pub fn work(&mut self, create_unit: &dyn Fn(&UnitType) -> ()) {
    for item in self.production_line.iter_mut() {
      item.current_time += 1;
      if (item.current_time == 0) {
        create_unit(&item.unit_type)
      }
    }
  }

  pub fn is_producing(&self) -> f32 {
    if self.production_line.len() > 0 {
      1.0
    } else {
      0.0
    }
  }
}
