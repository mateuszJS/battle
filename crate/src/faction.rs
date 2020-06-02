use crate::constants::MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;
use crate::position_utils::PositionUtils;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::Factory;
use std::collections::HashMap;

const TIME_BETWEEN_CREATION: u8 = 10;

pub struct Hunter<'a> {
  aim: &'a Squad,
  target_pos: (u32, u32),
}

pub struct SquadDuringCreation {
  pub time_to_create_another_unit: u8,
  pub squad: Squad,
}

pub struct Faction {
  pub id: f32,
  pub resources: u32,
  pub squads: Vec<Squad>,
  pub factory: Factory,
  pub squads_during_creation: Vec<SquadDuringCreation>,
  hunters: HashMap<u32, Hunter<'static>>,
}

impl Faction {
  pub fn new(
    id: f32,
    factory_x: f32,
    factory_y: f32,
    factory_angle: f32,
    is_user: bool,
  ) -> Faction {
    let factory = Factory::new(factory_x, factory_y, factory_angle, is_user);
    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      squads_during_creation: vec![],
      hunters: HashMap::new(),
    }
  }

  fn update_squads_during_creation(&mut self) {
    let factory = &mut self.factory;
    let mut squad_index: usize = MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;

    self
      .squads_during_creation
      .iter_mut()
      .enumerate()
      .for_each(|(index, creating_squad)| {
        creating_squad.time_to_create_another_unit += 1;

        if creating_squad.time_to_create_another_unit == TIME_BETWEEN_CREATION {
          creating_squad.time_to_create_another_unit = 0;

          let (position_x, position_y, factory_angle) = factory.get_creation_point();
          creating_squad
            .squad
            .add_member(position_x, position_y, factory_angle);

          if creating_squad.squad.members.len() == creating_squad.squad.squad_details.members_number
          {
            squad_index = index;
          } else {
            creating_squad.time_to_create_another_unit = 0;
          }
        }
      });

    if squad_index != MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE {
      let squad = self.squads_during_creation.remove(squad_index).squad;
      self.squads.push(squad);
    }
  }

  pub fn update(&mut self) {
    let result: Option<SquadType> = self.factory.update();

    match result {
      Some(squad_type) => {
        let new_squad = SquadDuringCreation {
          squad: Squad::new(squad_type),
          time_to_create_another_unit: 0,
        };
        self.squads_during_creation.push(new_squad);
      }
      None => {}
    }

    self.squads.iter_mut().for_each(|squad| squad.update());
    self
      .squads_during_creation
      .iter_mut()
      .for_each(|squad_during_creation| squad_during_creation.squad.update());

    self.update_squads_during_creation();
  }

  pub fn get_representation(&self) -> Vec<f32> {
    let start_representation = [&[0.0, self.id], &self.factory.get_representation()[..]].concat();

    let active_squads_representation: Vec<f32> = self
      .squads
      .iter()
      .flat_map(|squad| squad.get_representation())
      .collect();

    let squads_during_creation_representation: Vec<f32> = self
      .squads_during_creation
      .iter()
      .flat_map(|squad_during_creation| squad_during_creation.squad.get_representation())
      .collect();

    // everything I'm combining into vector, maybe it is possible just with slices?
    [
      &start_representation[..],
      &active_squads_representation[..],
      &squads_during_creation_representation[..],
    ]
    .concat()
  }

  pub fn move_squads(&mut self, squads_ids: Vec<u32>, target_x: f32, target_y: f32) {
    let position = PositionUtils::get_squads_positions(squads_ids.len(), target_x, target_y);
    let mut index = 0;
    self.squads.iter_mut().for_each(|squad| {
      if squads_ids.contains(&squad.id) {
        let squad_target = position[index];
        squad.add_target(squad_target.0, squad_target.1);
        index += 1;
      }
    });
  }

  pub fn attack_enemy(&mut self, squads_ids: Vec<u32>, enemy: &Squad) {}
}
