#[macro_use]
extern crate wasm_bindgen;
extern crate js_sys;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  #[wasm_bindgen(js_namespace = console)]
  fn log(msg: &str);
}

macro_rules! log {
  ($($t:tt)*) => (log(&format!($($t)*)))
}
mod faction;
mod unit_types;
use faction::Faction;
mod squad;
use squad::Squad;
mod unit;
use unit::Unit;
mod factory;
use factory::Factory;

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
  factories: Vec<Factory>,
}

#[wasm_bindgen]
impl Universe {
  pub fn new() -> Universe {
    Universe {
      factions: vec![],
      factories: vec![],
    }
  }

  pub fn get_pointer(&self) -> js_sys::Array {
    // let units_representation = self
    //   .factions
    //   .iter()
    //   .flat_map(|faction| {
    //     faction.squads.iter().flat_map(|squad| {
    //       squad
    //         .members
    //         .iter()
    //         .flat_map(|unit| vec![unit.id, unit.x, unit.y, unit.angle])
    //     })
    //   })
    //   .collect();

    let factories_representation = self
      .factories
      .iter()
      .flat_map(|factory| vec![factory.id, factory.is_producing()])
      .collect();

    let all_item_representation: Vec<f32> = factories_representation;
    log!("all_item_representation: {:?}", all_item_representation);
    let outputMemLocalization = vec![
      all_item_representation.as_ptr() as usize as u32,
      all_item_representation.len() as u32,
    ];

    outputMemLocalization
      .into_iter()
      .map(JsValue::from)
      .collect()
  }
}
