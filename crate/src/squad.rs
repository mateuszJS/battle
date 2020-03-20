use crate::id_generator::IdGenerator;
use crate::squad_types::{get_squad_details, SquadType};
use crate::unit::Unit;

pub struct Squad {
  pub id: f32,
  pub squad_type: SquadType,
  pub members: Vec<Unit>,
  pub representation_type: f32,
}

impl Squad {
  pub fn new(squad_type: SquadType) -> Squad {
    let details = get_squad_details(&squad_type);

    Squad {
      representation_type: details.representation_type,
      id: IdGenerator::generate_id(), // not sure if needed
      squad_type: squad_type,
      members: vec![],
    }
  }

  pub fn update(&mut self) {
    for unit in self.members.iter_mut() {
      unit.update();
    }
  }
}
