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

use constants::THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;
use faction::Faction;
use factory::Factory;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use squad::Squad;

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
      vec![
        faction.id,
        factory.id as f32,
        factory.x,
        factory.y,
        factory.angle,
      ]
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
                selected_units_ids.push(squad.members.iter().map(|unit| unit.id as f32).collect());
                selected_squads_ids.push(squad.id as f32);
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

  fn is_it_attack<'a>(&'a self, target_x: f32, target_y: f32) -> Option<&'a Squad> {
    let mut selected_enemy_squad = None;
    let mut i = 1;

    while i < self.factions.len() {
      for squad in self.factions[i].squads.iter() {
        if (squad.shared.center_point.0 - target_x).hypot(squad.shared.center_point.1 - target_y)
          < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
        {
          let corrected_target_y = target_y + squad.squad_details.unit_model_offset_y;
          for unit in squad.members.iter() {
            if (unit.x - target_x).hypot(unit.y - corrected_target_y)
              < squad.squad_details.selection_threshold
            {
              selected_enemy_squad = Some(squad);
              break;
            };
          }
        };
      }
      i += 1;
    }
    selected_enemy_squad
  }

  pub fn move_units(
    &mut self,
    raw_squads_ids: Vec<f32>,
    target_x: f32,
    target_y: f32,
  ) -> js_sys::Float32Array {
    let selected_enemy_squad = { self.is_it_attack(target_x, target_y) };
    // let squads_ids = raw_squads_ids.into_iter().map(|id| id as u32).collect();

    // let user_faction = &mut self.factions[INDEX_OF_USER_FACTION];
    let selected_enemy_units = match selected_enemy_squad {
      Some(squad) => {
        // user_faction.attack_enemy(squads_ids, squad);
        squad.members.iter().map(|unit| unit.id as f32).collect()
      }
      None => {
        // user_faction.move_squads(squads_ids, target_x, target_y);
        vec![]
      }
    };
    js_sys::Float32Array::from(&selected_enemy_units[..])
  }
}
