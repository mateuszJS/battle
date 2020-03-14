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
    let factory_id = IdGenerator::generate_factory_id();
    let factory = Factory::new(factory_id, factory_x, factory_y, factory_angle);
    Faction {
      id,
      factory,
      squads: vec![],
      resources: 0,
    }
  }

  pub fn update(&self) {
    let read_factory = self.factory;
    let result: Option<&SquadType> = {
      let factory = &mut read_factory;
      *factory.work()
    };
    // assign mutable factory  in closure, and the end of closue mut refrence should gone???
    match result {
      Some(squad_type) => {
        let new_squad = Squad::new(&squad_type, self.factory.x, self.factory.y);
        self.squads.push(new_squad);
      }
      None => {}
    }
  }
}
