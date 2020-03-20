use crate::id_generator::IdGenerator;
use crate::log;
use crate::look_up_table::LookUpTable;
use crate::squad::Squad;
use crate::squad_types::{get_squad_details, SquadType};
use crate::unit::Unit;
use crate::Factory;

static TIME_BETWEEN_CREATION: u8 = 240;

pub struct SquadDuringCreation {
  pub next_unit_in_secs: u8,
  pub squad: Squad,
}

pub struct Faction {
  pub id: f32,
  pub resources: u32,
  pub squads: Vec<Squad>,
  pub factory: Factory,
  pub squads_during_creation: Vec<SquadDuringCreation>,
}

impl Faction {
  pub fn new(id: f32, factory_x: f32, factory_y: f32, factory_angle: f32) -> Faction {
    let factory_id = IdGenerator::generate_id();
    let factory = Factory::new(factory_id, factory_x, factory_y, factory_angle);
    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      squads_during_creation: vec![],
    }
  }

  fn update_squads_in_creation(&mut self) {
    let mut squad_index: i8 = -1;

    for (index, creating_squad) in self.squads_during_creation.iter_mut().enumerate() {
      creating_squad.next_unit_in_secs += 1;

      if creating_squad.next_unit_in_secs >= TIME_BETWEEN_CREATION {
        let rnd = LookUpTable::generate_id();
        let unit = Unit::new(200.0 + rnd * 50.0, 200.0 + rnd * 50.0, rnd);
        creating_squad.squad.members.push(unit);

        let squad_details = get_squad_details(&creating_squad.squad.squad_type);
        creating_squad.next_unit_in_secs = 0;

        if creating_squad.squad.members.len() == squad_details.members_number {
          squad_index = index as i8;
        } else {
          creating_squad.next_unit_in_secs = 0;
        }
      }
    }
    if squad_index > -1 {
      self.squads.push(
        self
          .squads_during_creation
          .remove(squad_index as usize)
          .squad,
      );
    }
  }

  pub fn update(&mut self) {
    for squad in self.squads.iter_mut() {
      squad.update();
    }

    for squad_during_creation in self.squads_during_creation.iter_mut() {
      squad_during_creation.squad.update();
    }

    let result: Option<SquadType> = self.factory.work();

    match result {
      Some(squad_type) => {
        let new_squad = Squad::new(squad_type);
        self.squads_during_creation.push(SquadDuringCreation {
          squad: new_squad,
          next_unit_in_secs: 0,
        });
      }
      None => {}
    }

    self.update_squads_in_creation();
  }
  // types of units, factory etc. can be minus, e.g. factory -> -1, soldiers -> -2
  // id is just from 1
  // each array of representation units begin with unit types (length: 1),
  // then all units, and again faction id OR unit type
  pub fn get_representation(&self) -> Vec<f32> {
    let start_representation = vec![
      0.0, // type -> faction
      self.id,
      1.0, // type -> factory
      self.factory.id,
      self.factory.is_producing(),
    ];

    let active_squads_representation: Vec<f32> = self
      .squads
      .iter()
      .flat_map(|squad| {
        let units_list: Vec<f32> = squad
          .members
          .iter()
          .flat_map(|unit| vec![2.0, unit.id, unit.state as f32, unit.x, unit.y, unit.angle])
          .collect();

        // units_list.insert(0, squad.representation_type);
        units_list
      })
      .collect();

    let squads_during_creation_representation: Vec<f32> = self
      .squads_during_creation
      .iter()
      .flat_map(|squad_during_creation| {
        let units_list: Vec<f32> = squad_during_creation
          .squad
          .members
          .iter()
          .flat_map(|unit| vec![2.0, unit.id, unit.state as f32, unit.x, unit.y, unit.angle])
          .collect();

        // units_list.insert(0, squad.representation_type);
        units_list
      })
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
