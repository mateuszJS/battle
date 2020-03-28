use crate::constants::MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;
use crate::id_generator::IdGenerator;
use crate::look_up_table::LookUpTable;
use crate::squad::Squad;
use crate::squad_types::{get_squad_details, SquadType};
use crate::unit::Unit;
use crate::Factory;

const TIME_BETWEEN_CREATION: u8 = 10;

// FYI:
// This is struct which contains squad during process creation (when squad is really created, but units are throwing from factory)
pub struct SquadDuringCreation {
  pub time_to_create_another_unit: u8, // when create & throw & add another unit to the squad
  pub squad: Squad,
}

pub struct Faction {
  pub id: f32,
  pub resources: u32,     // not used right now
  pub squads: Vec<Squad>, // when all units fro squad are crated,
  // then struct SquadDuringCreation is removed, and squad is pushed into this vector
  pub factory: Factory,
  pub squads_during_creation: Vec<SquadDuringCreation>, // list of squads in the production line
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
    }
  }

  fn update_squads_during_creation(&mut self) {
    // FYI:
    // was fighting really long with implementation of that method, but without success :(
    // in this method all I need to do is
    // 1. loop over self.squads_during_creation
    // 2. increment time_to_create_another_unit + 1
    // 3. if increment time_to_create_another_unit == TIME_BETWEEN_CREATION then {
    //   3.1. set time_to_create_another_unit = 0
    //   3.2. add new unit to squad
    //   3.3. compare number of units in squad with squad limit, if is equal then {
    //      3.3.1. remove currently evaluated item from self.squads_during_creation and push value from field "squad" to self.squads vector

    // This method seems to be pretty complicated, but have no idea how to improve that

    let factory = &mut self.factory;
    let mut squad_index: usize = MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE;
    // this value is impossible to reach ^ in for_each below

    self
      .squads_during_creation
      .iter_mut()
      .enumerate()
      .for_each(|(index, creating_squad)| {
        creating_squad.time_to_create_another_unit += 1;

        if creating_squad.time_to_create_another_unit == TIME_BETWEEN_CREATION {
          creating_squad.time_to_create_another_unit = 0;

          let (position_x, position_y, unit_angle) = factory.get_creation_point();
          let unit = Unit::new(position_x, position_y, unit_angle);
          creating_squad.squad.members.push(unit);

          let squad_details = get_squad_details(&creating_squad.squad.squad_type);
          if creating_squad.squad.members.len() == squad_details.members_number {
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
    // FYI:
    // this method propagate update on factory, squads

    // FYI:
    // sometimes as the result of factory update is returned enum SquadType
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
  // types of units, factory etc. can be minus, e.g. factory -> -1, soldiers -> -2
  // id is just from 1
  // each array of representation units begin with unit types (length: 1),
  // then all units, and again faction id OR unit type
  pub fn get_representation(&self) -> Vec<f32> {
    let faction_data = vec![0.0, self.id];
    let start_representation = [&faction_data[..], &self.factory.get_representation()[..]].concat();

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
}
