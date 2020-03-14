use crate::id_generator::IdGenerator;
use crate::squad_types::{get_unit_details, SquadType};
use crate::unit::Unit;

pub struct Squad {
  pub id: f32,
  pub members: Vec<Unit>,
}

impl Squad {
  pub fn new(squad_type: &SquadType, x: f32, y: f32) -> Squad {
    let details = get_unit_details(&squad_type);
    let members = [0..details.members_number]
      .iter()
      .map(|index| Unit::new(x, y, 0.0))
      .collect();
    Squad {
      id: IdGenerator::generate_squad_id(),
      members,
    }
  }
}
