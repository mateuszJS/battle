extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

#[macro_use]
extern crate lazy_static;

macro_rules! log {
  ($( $t:tt )*) => (web_sys::console::log_1(&format!($($t)*).into()));
}

// macro_rules! read_squad {
//   ( $( $x:expr ),* ) => {
//       {
//           let mut temp_vec = Vec::new();
//           $(
//               temp_vec.push($x);
//           )*
//           temp_vec
//       }
//   };
// }

// https://rustwasm.github.io/book/game-of-life/debugging.html fix debugging

use std::cell::RefCell;
use std::rc::Weak;

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

pub struct World {
  all_squads: Vec<Weak<RefCell<Squad>>>,
}

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
  world: World,
}

#[wasm_bindgen]
impl Universe {
  pub fn new(factions_data: Vec<f32>, obstacles_data: Vec<f32>) -> Universe {
    let mut factions: Vec<Faction> = vec![];

    let mut i = 0;
    while i < factions_data.len() {
      factions.push(Faction::new(
        factions_data[i] as u32,
        factions_data[i + 1],
        factions_data[i + 2],
        factions_data[i + 3],
        i == 0,
      ));
      i += 4;
    }

    ObstaclesLazyStatics::init_and_get_obstacles_handler(Some(obstacles_data));
    let world = World { all_squads: vec![] };

    Universe { factions, world }
  }

  pub fn get_factories_init_data(&self) -> js_sys::Float32Array {
    // ifno about factories come from JS, but id comes from rust
    let get_initial_factories_representation = |faction: &Faction| {
      let factory = &faction.factory;
      vec![
        faction.id as f32,
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
    let Universe {
      ref mut factions,
      ref mut world,
    } = self;
    factions.iter_mut().for_each(|faction| {
      faction.resources += 1;
      faction.update(world);
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
            let read_squad = squad.borrow();
            for unit in read_squad.members.iter() {
              if unit.x > start_x && unit.x < end_x && unit.y > start_y && unit.y < end_y {
                selected_units_ids.push(
                  read_squad
                    .members
                    .iter()
                    .map(|unit| unit.id as f32)
                    .collect(),
                );
                selected_squads_ids.push(read_squad.id as f32);
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

  fn is_it_attack(world: &World, target_x: f32, target_y: f32) -> Option<&Weak<RefCell<Squad>>> {
    let mut selected_enemy_squad = None;

    for weak_squad in world.all_squads.iter() {
      if let Some(unwrapper_squad) = weak_squad.upgrade() {
        let squad = unwrapper_squad.borrow();
        if (squad.shared.center_point.0 - target_x).hypot(squad.shared.center_point.1 - target_y)
          < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
        {
          let corrected_target_y = target_y + squad.squad_details.unit_model_offset_y;
          for unit in squad.members.iter() {
            if (unit.x - target_x).hypot(unit.y - corrected_target_y)
              < squad.squad_details.selection_threshold
            {
              selected_enemy_squad = Some(weak_squad);
              break;
            };
          }
        };
      };
    }
    selected_enemy_squad
  }

  pub fn move_units(
    &mut self,
    raw_squads_ids: Vec<f32>,
    target_x: f32,
    target_y: f32,
  ) -> js_sys::Float32Array {
    let Universe {
      ref mut factions,
      ref world,
    } = self;
    let squads_ids = raw_squads_ids.into_iter().map(|id| id as u32).collect();

    let user_faction = &mut factions[INDEX_OF_USER_FACTION];
    let selected_enemy_units = match Universe::is_it_attack(world, target_x, target_y) {
      Some(squad) => {
        user_faction.attack_enemy(squads_ids, &squad);
        let upgraded_squad = squad.upgrade();
        if upgraded_squad.is_some() {
          upgraded_squad
            .unwrap()
            .borrow()
            .members
            .iter()
            .map(|unit| unit.id as f32)
            .collect()
        } else {
          vec![]
        }
      }
      None => {
        user_faction.move_squads(squads_ids, target_x, target_y);
        vec![]
      }
    };
    js_sys::Float32Array::from(&selected_enemy_units[..])
  }
}
