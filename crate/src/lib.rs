extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

#[macro_use]
extern crate lazy_static;

macro_rules! log {
  ($( $t:tt )*) => (web_sys::console::log_1(&format!($($t)*).into()));
}
// https://rustwasm.github.io/book/game-of-life/debugging.html fix debugging

mod constants;
mod faction;
mod factory;
mod id_generator;
mod look_up_table;
// public just to import it in bench
pub mod position_utils;
mod squad;
mod squad_types;
mod unit;

use wasm_bindgen::prelude::*;

use faction::Faction;
use factory::Factory;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use position_utils::PositionUtils;

const INDEX_OF_USER_FACTION: usize = 0;

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
}

#[wasm_bindgen]
impl Universe {
  pub fn new(factions_data: Vec<f32>, obstacles_data: Vec<f32>) -> Universe {
    let mut factions: Vec<Faction> = vec![];

    let mut i = 0;
    while i < factions_data.len() {
      factions.push(Faction::new(
        factions_data[i],
        factions_data[i + 1],
        factions_data[i + 2],
        factions_data[i + 3],
        i == 0,
      ));
      i += 4;
    }

    ObstaclesLazyStatics::init_and_get_obstacles_handler(Some(obstacles_data));

    Universe { factions }
  }

  pub fn get_factories_init_data(&self) -> js_sys::Float32Array {
    // ifno about factories come from JS, but id comes from rust
    let get_initial_factories_representation = |faction: &Faction| {
      let factory = &faction.factory;
      vec![faction.id, factory.id, factory.x, factory.y, factory.angle]
    };

    let result: Vec<f32> = self
      .factions
      .iter()
      .flat_map(get_initial_factories_representation)
      .collect();

    unsafe { js_sys::Float32Array::view(&result[..]) }
  }

  pub fn update(&mut self) {
    self.factions.iter_mut().for_each(|faction| {
      faction.resources += 1;
      faction.update();
    })
  }

  pub fn get_universe_data(&self) -> js_sys::Float32Array {
    let universe_representation: Vec<f32> = self
      .factions
      .iter()
      .flat_map(|faction| faction.get_representation())
      .collect();
    unsafe {
      // it's unsafe bc doesn't make copy, read directly from memory
      // https://rustwasm.github.io/wasm-bindgen/api/js_sys/struct.Float32Array.html#method.view
      // to make copy, use "from" method
      js_sys::Float32Array::view(&universe_representation[..])
    }
  }

  pub fn create_squad(&mut self, squad_type_representation: u8) -> bool {
    self.factions[INDEX_OF_USER_FACTION]
      .factory
      .add_squad_to_production_line(squad_type_representation)
  }

  pub fn create_enemy_squad(&mut self, squad_type_representation: u8) -> bool {
    self.factions[1]
      .factory
      .add_squad_to_production_line(squad_type_representation)
  }

  pub fn get_selected_units_ids(
    &self,
    start_x: f32,
    end_x: f32,
    start_y: f32,
    end_y: f32,
    select_our: bool,
  ) -> js_sys::Float32Array {
    let mut selected_units_ids: Vec<Vec<f32>> = vec![];
    let mut selected_squads_ids: Vec<f32> = vec![0.0];
    self
      .factions
      .iter()
      .enumerate()
      .for_each(|(index, faction)| {
        if index == INDEX_OF_USER_FACTION {
          faction.squads.iter().for_each(|squad| {
            for unit in squad.members.iter() {
              if unit.x > start_x && unit.x < end_x && unit.y > start_y && unit.y < end_y {
                selected_units_ids.push(squad.members.iter().map(|unit| unit.id).collect());
                selected_squads_ids.push(squad.id);
                break;
              }
            }
          })
        }
      });

    let mut x: Vec<f32> = selected_units_ids
      .into_iter()
      .flat_map(|array| array.into_iter())
      .collect();
    let summary = [&x[..], &selected_squads_ids[..]].concat();

    unsafe {
      // read weird data on the beginning with "view", garbage collector?
      js_sys::Float32Array::from(&summary[..])
    }
  }

  pub fn move_units(
    &mut self,
    squads_ids: Vec<f32>,
    target_x: f32,
    target_y: f32,
  ) -> js_sys::Float32Array {
    self.factions[INDEX_OF_USER_FACTION].move_squads(squads_ids, target_x, target_y);
    let list_of_numbers: Vec<f32> = self.factions[INDEX_OF_USER_FACTION]
      .squads
      .iter()
      .flat_map(|squad| {
        let mut path_to_destination: Vec<f32> = squad
          .shared
          .track
          .iter()
          .flat_map(|point| vec![point.0, point.1])
          .collect();
        path_to_destination.push(-1.0);
        path_to_destination
      })
      .collect();

    js_sys::Float32Array::from(&list_of_numbers[..])
  }
}
