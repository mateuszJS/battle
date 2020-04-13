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
  pub path_to_destination: Vec<(f32, f32)>,
}

impl Squad {
  pub fn new(squad_type: SquadType) -> Squad {
    let squad_details = get_squad_details(&squad_type);

    Squad {
      representation_type: squad_details.representation_type,
      id: IdGenerator::generate_id(), // not sure if needed
      squad_type: squad_type,
      members: vec![],
      center_point: (0.0, 0.0),
      path_to_destination: vec![],
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

  pub fn add_member(&mut self, position_x: f32, position_y: f32, unit_angle: f32) {
    let unit = Unit::new(position_x, position_y, unit_angle, &self);
    self.members.push(unit);

    let squad_details = get_squad_details(&self.squad_type);
    if self.members.len() == squad_details.members_number {
      self.recalculate_members_positions();
    }
  }

  fn recalculate_members_positions(&mut self) {
    let positions_list = Utils::get_circular_position(self.members.len(), 0.0, 0.0, 50.0);

    positions_list
      .into_iter()
      .enumerate()
      .for_each(|(index, position)| {
        let unit = &mut self.members[index];
        unit.set_position_offset(position.0, position.1);
      })
  }

  pub fn add_target(&mut self, destination_x: f32, destination_y: f32) {
    // let position = Utils::get_circular_position(self.members.len(), target_x, target_y, 50.0);
    // Utils::get_graph(source_x, source_y, destination_x, destination_y);

    self.path_to_destination = Utils::get_graph(
      self.center_point.0,
      self.center_point.1,
      destination_x,
      destination_y,
    );
    // let mut index = 0;
    // self.members.iter_mut().for_each(|unit| {
    //   let unit_target = position[index];
    //   unit.change_state_to_run(unit_target.0, unit_target.1);
    //   index += 1;
    // })
  }

  pub fn remove_member(&mut self) {
    // TODO: self.members.remove
    self.recalculate_members_positions();
  }
}
