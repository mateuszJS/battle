use crate::id_generator::IdGenerator;
use crate::squad_types::{get_squad_details, SquadType};
use crate::unit::Unit;
use crate::utils::Utils;

pub struct Squad {
  pub id: f32,
  pub squad_type: SquadType,
  pub members: Vec<Unit>,
  pub representation_type: f32,
  pub center_point: (f32, f32),
}

impl Squad {
  pub fn new(squad_type: SquadType) -> Squad {
    let details = get_squad_details(&squad_type);

    Squad {
      representation_type: details.representation_type,
      id: IdGenerator::generate_id(), // not sure if needed
      squad_type: squad_type,
      members: vec![],
      center_point: (0.0, 0.0),
    }
  }

  pub fn update(&mut self) {
    let mut sum_x: f32 = 0.0;
    let mut sum_y: f32 = 0.0;
    self.members.iter_mut().for_each(|unit| {
      unit.update();
      sum_x += unit.x;
      sum_y += unit.y;
    });
    self.center_point.0 = sum_x / self.members.len() as f32;
    self.center_point.1 = sum_y / self.members.len() as f32;
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

  pub fn add_target(&mut self, target_x: f32, target_y: f32) {
    let position = Utils::get_circular_position(self.members.len(), target_x, target_y, 50.0);
    let mut index = 0;
    self.members.iter_mut().for_each(|unit| {
      let unit_target = position[index];
      unit.change_state_to_run(unit_target.0, unit_target.1);
      index += 1;
    })
  }
}
