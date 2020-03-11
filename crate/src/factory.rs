use crate::squad_types::SquadType;

struct ProducedSquad {
  squad_type: SquadType,
  current_time: u32,
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

  pub fn work(&mut self, create_squad: &dyn Fn(&SquadType) -> ()) {
    for item in self.production_line.iter_mut() {
      item.current_time += 1;
      if (item.current_time == 0) {
        create_squad(&item.squad_type)
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

  pub fn add_squad_to_production_line(&mut self, squad_type: SquadType) {
    self.production_line.push(ProducedSquad {
      squad_type,
      current_time: 0,
    });
  }
}
