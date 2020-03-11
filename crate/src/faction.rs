use crate::id_generator::IdGenerator;
use crate::squad::Squad;
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
}
