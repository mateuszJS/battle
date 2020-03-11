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
mod id_generator;
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
}

#[wasm_bindgen]
impl Universe {
  pub fn new(faction_ids: Vec<f32>) -> Universe {
    let angleDiff: f32 = std::f64::consts::PI as f32 / faction_ids.len() as f32;
    let factions = faction_ids
      .iter()
      .enumerate()
      .map(|(index, &faction_id)| {
        Faction::new(
          faction_id,
          (index as f32) * 100.0 + 200.0,
          (index as f32) * 100.0 + 200.0,
          (index as f32) * angleDiff,
        )
      })
      .collect();
    Universe { factions }
  }

  pub fn get_factories_init_data(&self) -> js_sys::Array {
    self
      .factions
      .iter()
      .flat_map(|faction| {
        let factory = &faction.factory;
        vec![faction.id, factory.id, factory.x, factory.y, factory.angle]
      })
      .into_iter()
      .map(JsValue::from)
      .collect()
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
      .factions
      .iter()
      .flat_map(|faction| {
        let factory = &faction.factory;
        vec![
          factory.id,
          factory.x,
          factory.y,
          factory.angle,
          factory.is_producing(),
        ]
      })
      .collect();

    let all_item_representation: Vec<f32> = factories_representation;
    let output_mem_localization = vec![
      all_item_representation.as_ptr() as usize as u32,
      all_item_representation.len() as u32,
    ];

    output_mem_localization
      .into_iter()
      .map(JsValue::from)
      .collect()
  }
}
