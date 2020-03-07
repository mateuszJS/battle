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
use faction::Faction;
mod squad;
use squad::Squad;
mod unit;
use unit::Unit;

// mod unit_types;
// use unit_types::UnitType;

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
  // length: u64,
}

#[wasm_bindgen]
impl Universe {
  pub fn new() -> Universe {
    let unit = Unit { hp: 3 };
    let squad = Squad {
      members: vec![unit],
    };
    let faction = Faction {
      squads: vec![squad],
      resources: 1,
    };
    Universe {
      factions: vec![faction],
    }
  }

  pub fn get_pointer(&self) -> js_sys::Array {
    let mut output: Vec<f32> = vec![];
    for faction in self.factions.iter() {
      for squad in faction.squads.iter() {
        for unit in squad.members.iter() {
          output.push(f32::from(unit.hp))
        }
      }
    }
    let x = vec![output.as_ptr() as usize as u32, output.len() as u32];
    x.into_iter().map(JsValue::from).collect()
  }
}
