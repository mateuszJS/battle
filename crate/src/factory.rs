use crate::log;
use crate::squad_types::SquadType;

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

  pub fn is_producing(&self) -> f32 {
    if self.production_line.len() > 0 {
      1.0
    } else {
      0.0
    }
  }

  pub fn add_squad_to_production_line(&mut self, squad_type: SquadType) {
    self.production_line.push(ProducedSquad {
      squad_type,
      current_time: 200,
    });
  }
}
