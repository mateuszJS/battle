use crate::constants::{MATH_PI, MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE};
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::representations_ids::{ENEMY_FACTORY_REPRESENTATION_ID, USER_FACTORY_REPRESENTATION_ID};
use crate::representations_ids::{RAPTOR_REPRESENTATION_ID, SOLIDER_REPRESENTATION_ID};
use crate::squad_types::{get_squad_details, SquadType};

const SOLIDER_REPRESENTATION_ID_U8: u8 = SOLIDER_REPRESENTATION_ID as u8;
const RAPTOR_REPRESENTATION_ID_U8: u8 = RAPTOR_REPRESENTATION_ID as u8;

const PORTAL_WIDTH: f32 = 400.0;

struct ProducedSquad {
  squad_type_representation: u8,
  squad_type: SquadType,
  current_time: u16,
  total_time: u16,
}

pub struct Factory {
  pub id: u32,
  pub hp: f32,
  pub x: f32,
  pub y: f32,
  pub angle: f32,
  production_line: Vec<ProducedSquad>,
  owner_user: bool,
}
// FYI: the main think that factory does is create unit, this is how it looks like
// 1.
impl Factory {
  pub fn new(x: f32, y: f32, angle: f32, owner_user: bool) -> Factory {
    Factory {
      id: IdGenerator::generate_id(),
      hp: 100.0,
      x,
      y,
      angle,
      production_line: vec![],
      owner_user,
    }
  }
  pub fn update(&mut self) -> Option<SquadType> {
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

  pub fn get_representation(&self) -> Vec<f32> {
    let factory_type = if self.owner_user {
      USER_FACTORY_REPRESENTATION_ID
    } else {
      ENEMY_FACTORY_REPRESENTATION_ID
    };
    let progress = if self.owner_user && self.production_line.len() > 0 {
      self.production_line[0].current_time as f32 / self.production_line[0].total_time as f32
    } else {
      0.0
    };
    let factory_representation = [factory_type, self.id as f32, progress];

    if self.owner_user {
      let production_line_representation: Vec<f32> = self
        .production_line
        .iter()
        .map(|produced_item| produced_item.squad_type_representation as f32)
        .collect();
      [
        &factory_representation[..],
        &production_line_representation,
        &vec![0.0; MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE - production_line_representation.len()],
      ]
      .concat()
    } else {
      let items_list = vec![self.production_line.len() as f32];
      [&factory_representation[..], &items_list].concat()
    }
  }

  pub fn add_squad_to_production_line(&mut self, squad_type_representation: u8) -> bool {
    if self.production_line.len() < MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE {
      let squad_type = match squad_type_representation {
        SOLIDER_REPRESENTATION_ID_U8 => SquadType::Solider,
        RAPTOR_REPRESENTATION_ID_U8 => SquadType::Raptor,
        _ => SquadType::Solider,
      };
      let squad_details = get_squad_details(&squad_type);

      self.production_line.push(ProducedSquad {
        squad_type_representation,
        squad_type,
        current_time: squad_details.production_time,
        total_time: squad_details.production_time,
      });
      true
    } else {
      false
    }
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
