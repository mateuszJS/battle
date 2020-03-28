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
    self.members.iter_mut().for_each(|unit| unit.update());
  }

  pub fn get_representation(&self) -> Vec<f32> {
    // QUESTION:
    // am I able to return array without known the size during code compilation?
    // in this case I can return array from "unit.get_representation" because length of the array is known
    // but number of units can change, so in this method, I don't know how the size of array
    self
      .members
      .iter()
      .flat_map(|unit| unit.get_representation().to_vec())
      .collect()
  }
}
