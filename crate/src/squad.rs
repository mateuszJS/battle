use crate::id_generator::IdGenerator;
use crate::position_utils::PositionUtils;
use crate::squad_types::{get_squad_details, SquadDetails, SquadType};
use crate::unit::Unit;

pub struct SquadUnitSharedDataSet {
  pub center_point: (f32, f32),
  pub track: Vec<(f32, f32)>,
}

pub struct Squad {
  pub id: u32,
  pub members: Vec<Unit>,
  pub shared: SquadUnitSharedDataSet,
  pub squad_details: &'static SquadDetails,
}

impl Squad {
  pub fn new(squad_type: SquadType) -> Squad {
    Squad {
      id: IdGenerator::generate_id(),
      members: vec![],
      squad_details: get_squad_details(&squad_type),
      shared: SquadUnitSharedDataSet {
        center_point: (0.0, 0.0),
        track: vec![],
      },
    }
  }

  pub fn update(&mut self) {
    let shared = &self.shared;
    let (sum_x, sum_y) = self
      .members
      .iter_mut()
      .fold((0.0, 0.0), |(sum_x, sum_y), unit| {
        // TODO: should be done once per couple of seconds
        unit.update(shared);
        (sum_x + unit.x, sum_y + unit.y)
      });
    self.shared.center_point.0 = sum_x / self.members.len() as f32;
    self.shared.center_point.1 = sum_y / self.members.len() as f32;
  }

  pub fn get_representation(&self) -> Vec<f32> {
    self
      .members
      .iter()
      .flat_map(|unit| unit.get_representation().to_vec())
      .collect()
  }

  pub fn add_member(&mut self, position_x: f32, position_y: f32, unit_angle: f32) {
    self.members.push(Unit::new(
      position_x,
      position_y,
      unit_angle,
      self.squad_details,
    ));

    if self.members.len() == self.squad_details.members_number {
      self.recalculate_members_positions();
    }
  }

  fn recalculate_members_positions(&mut self) {
    let positions_list = PositionUtils::get_units_in_squad_position(self.members.len());

    positions_list
      .into_iter()
      .enumerate()
      .for_each(|(index, position)| {
        let unit = &mut self.members[index];
        unit.set_position_offset(position.0, position.1);
      })
  }

  pub fn add_target(&mut self, destination_x: f32, destination_y: f32) {
    // let is_center_inside_obstacle =
    //   CalcPositions::get_is_point_inside_any_obstacle((destination_x as i16, destination_y as i16));
    // if is_center_inside_obstacle {
    //   // have to avoid squad center in a obstacle or in the boundaries of obstacle
    //   let (distance, closest_point) =
    //     CalcPositions::get_nearest_line((destination_x, destination_y));
    //   // TODO: calc segment, from squad_center thought closest_point to outsite (like plus 5?)
    //   // also handle case when distance is 0, then add 5, check if it's okay, if not, minsu 5, and this is have to be okay
    // }
    self.shared.track = PositionUtils::get_track(
      self.shared.center_point.0,
      self.shared.center_point.1,
      destination_x,
      destination_y,
    );
    let shared = &self.shared;
    self
      .members
      .iter_mut()
      .for_each(|unit| unit.change_state_to_run(shared));
  }

  pub fn remove_member(&mut self) {
    // TODO: self.members.remove
    self.recalculate_members_positions();
  }
}
