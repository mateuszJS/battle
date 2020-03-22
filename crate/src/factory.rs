use crate::log;
use crate::squad_types::SquadType;
use crate::look_up_table::LookUpTable;
use crate::constants::MATH_PI;

const PORTAL_WIDTH: f32 = 400.0;

struct ProducedSquad {
  squad_type: SquadType,
  current_time: i32,
}

pub struct Factory {
  pub id: f32,
  pub hp: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  production_line: Vec<ProducedSquad>,
}

impl Factory {
  pub fn new(id: f32, x: f32, y: f32, angle: f32) -> Factory {
    Factory {
      id,
      hp: 100.0,
      x,
      y,
      angle,
      production_line: vec![],
    }
  }
  pub fn work(&mut self) -> Option<SquadType> {
    if self.production_line.len() > 0 {
      let production_item = &mut self.production_line[0];
      production_item.current_time -= 1;
      if production_item.current_time == 0 {
        let squad_type = self.production_line.remove(0).squad_type;
        Some(squad_type)
      } else {
        None
      }
    } else {
      None
    }
  }

  pub fn get_representation(&self, itemsDuringCreation: usize) -> Vec<f32> {
    vec![
      1.0, // type -> factory
      self.id,
      if itemsDuringCreation > 0 || self.production_line.len() > 0 { 1.0 } else { 0.0 },
    ]
  }

  pub fn add_squad_to_production_line(&mut self, squad_type: SquadType) {
    self.production_line.push(ProducedSquad {
      squad_type,
      current_time: 200,
    });
  }

  pub fn get_creation_point(&self) -> (f32, f32, f32) {
    let seed_distance = LookUpTable::get_random() - 0.5;
    let distance = seed_distance * PORTAL_WIDTH;
    let perpendicular_angle = self.angle + MATH_PI / 2.0;
    let position_x = self.x + perpendicular_angle.sin() * distance;
    let position_y = self.y - perpendicular_angle.cos() * distance;
    let unit_angle = self.angle + seed_distance / 2.0;
    (position_x, position_y, unit_angle)
  }
}
