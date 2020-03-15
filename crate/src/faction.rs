#[macro_use]
use crate::log;
use crate::id_generator::IdGenerator;
use crate::squad::Squad;
use crate::squad_types::SquadType;
use crate::Factory;

pub struct Faction {
  pub id: f32,
  pub resources: u32,
  pub squads: Vec<Squad>,
  pub factory: Factory,
}

impl Faction {
  pub fn new(id: f32, factory_x: f32, factory_y: f32, factory_angle: f32) -> Faction {
    let factory_id = IdGenerator::generate_id();
    let factory = Factory::new(factory_id, factory_x, factory_y, factory_angle);
    Faction {
      id,
      factory,
      squads: vec![],
      resources: 0,
    }
  }

  pub fn update(&mut self) {
    let x = self.factory.x;
    let y = self.factory.y;
    let result: Option<SquadType> = self.factory.work();

    match result {
      Some(squad_type) => {
        let new_squad = Squad::new(&squad_type, x, y);
        log!("new squad id: {}", new_squad.id);
        self.squads.push(new_squad);
      }
      None => {}
    }
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

    let units_representation: Vec<f32> = self
      .squads
      .iter()
      .flat_map(|squad| {
        let mut units_list: Vec<f32> = squad
          .members
          .iter()
          .flat_map(|unit| vec![unit.id, unit.x, unit.y, unit.angle])
          .collect();

        units_list.insert(0, squad.representation_type);
        units_list
      }).collect();

    // everything I'm combining into vector, maybe it is possible just with slices?
    [&start_representation[..], &units_representation[..]].concat()
  }
}
