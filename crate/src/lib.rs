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
use std::rc::{Rc, Weak};

mod constants;
mod faction;
mod factory;
mod id_generator;
mod look_up_table;
// public just to import it in bench
mod bullets_manager;
pub mod position_utils;
mod representations_ids;
mod squad;
mod squad_types;
mod unit;
mod weapon_types;

use wasm_bindgen::prelude::*;

use bullets_manager::BulletsManager;
use constants::{
  MANAGE_HUNTERS_PERIOD, SEARCH_FOR_ENEMIES_PERIOD, THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER,
  UPDATE_SQUAD_CENTER_PERIOD,
};
use faction::Faction;
use factory::Factory;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use representations_ids::BULLETS_REPRESENTATION_ID;
use squad::Squad;

const INDEX_OF_USER_FACTION: usize = 0;

pub struct World {
  all_squads: Vec<Weak<RefCell<Squad>>>,
  bullets_manager: BulletsManager,
}

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
  world: World,
  time: u32,
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
    let world = World {
      all_squads: vec![],
      bullets_manager: BulletsManager::new(),
    };

    Universe {
      factions,
      world,
      time: 0,
    }
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

    js_sys::Float32Array::from(&result[..])
  }

  fn run_squad_manager(factions: &mut Vec<Faction>, world: &mut World) {
    world
      .all_squads
      .retain(|weak_squad| weak_squad.upgrade().is_some());

    // collect squads which moved
    let all_moved_squads: Vec<Rc<RefCell<Squad>>> = world
      .all_squads
      .iter()
      .filter_map(|weak_squad| {
        if weak_squad
          .upgrade()
          .unwrap()
          .borrow()
          .was_center_point_changed()
        {
          Some(weak_squad.upgrade().unwrap())
        } else {
          None
        }
      })
      .collect();

    let all_squads: Vec<Rc<RefCell<Squad>>> = world
      .all_squads
      .iter()
      .map(|squad| squad.upgrade().unwrap())
      .collect();

    // search for enemy
    factions.iter_mut().for_each(|faction: &mut Faction| {
      faction.search_for_enemies(&all_moved_squads, &all_squads);
    });

    world.all_squads.iter().for_each(|squad| {
      squad.upgrade().unwrap().borrow_mut().update_moved_status();
    });
  }

  pub fn update(&mut self) {
    let Universe {
      ref mut factions,
      ref mut world,
      ref mut time,
    } = self;
    *time = (*time + 1) % 1000;

    if *time % UPDATE_SQUAD_CENTER_PERIOD == 0 {
      factions.iter_mut().for_each(|faction: &mut Faction| {
        faction.update_squads_centers();
      });
    }

    factions.iter_mut().for_each(|faction: &mut Faction| {
      if *time % MANAGE_HUNTERS_PERIOD == 0 {
        faction.manage_hunters();
      }

      if *time % 1000 == 0 && faction.id == 2 && faction.squads.len() > 0 {
        let squad_id = faction.squads[0].borrow().id;
        faction.move_squads(
          vec![squad_id],
          if faction.squads[0].borrow().shared.center_point.0 > 2000.0 {
            200.0
          } else {
            2200.0
          },
          1300.0,
        );
      }
      faction.resources += 1;
      faction.update(world);
    });

    if *time % SEARCH_FOR_ENEMIES_PERIOD == 0 {
      Universe::run_squad_manager(factions, world);
    }

    world.bullets_manager.update();
  }

  pub fn get_universe_data(&mut self) -> js_sys::Float32Array {
    let universe_representation: Vec<f32> = self
      .factions
      .iter()
      .flat_map(|faction| faction.get_representation())
      .collect();

    let result = [
      &universe_representation[..],
      &[BULLETS_REPRESENTATION_ID],
      &self.world.bullets_manager.get_representation(),
    ]
    .concat();

    js_sys::Float32Array::from(&result[..])
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
    let mut selected_squads_ids: Vec<f32> = vec![0.0]; // 0.0 is divider between squads and units ids
    self
      .factions
      .iter()
      .enumerate()
      .for_each(|(index, faction)| {
        if index == INDEX_OF_USER_FACTION {
          faction.squads.iter().for_each(|squad| {
            let read_squad = squad.borrow();
            for ref_cell_unit in read_squad.members.iter() {
              let unit = ref_cell_unit.borrow();
              if unit.x > start_x && unit.x < end_x && unit.y > start_y && unit.y < end_y {
                let mut members_ids: Vec<f32> = read_squad
                  .members
                  .iter()
                  .map(|squad_member| squad_member.borrow().id as f32)
                  .collect();
                members_ids.push(-1.0); // -1.0 is divider between each squad
                selected_units_ids.push(members_ids);
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

    // read weird data on the beginning with "view", garbage collector?
    js_sys::Float32Array::from(&summary[..])
  }

  fn is_it_attack(
    world: &World,
    target_x: f32,
    target_y: f32,
    user_faction_id: u32,
  ) -> Option<&Weak<RefCell<Squad>>> {
    let mut selected_enemy_squad = None;
    for weak_squad in world.all_squads.iter() {
      if let Some(unwrapper_squad) = weak_squad.upgrade() {
        let squad = unwrapper_squad.borrow();
        if squad.faction_id == user_faction_id {
          continue;
        }
        if squad.faction_id != INDEX_OF_USER_FACTION as u32
          && (squad.shared.center_point.0 - target_x).hypot(squad.shared.center_point.1 - target_y)
            < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
        {
          let corrected_target_y = target_y + squad.squad_details.unit_model_offset_y;
          for ref_cell_unit in squad.members.iter() {
            let unit = ref_cell_unit.borrow();
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
      ..
    } = self;
    let squads_ids = raw_squads_ids.into_iter().map(|id| id as u32).collect();

    let user_faction = &mut factions[INDEX_OF_USER_FACTION];
    let selected_enemy_units =
      match Universe::is_it_attack(world, target_x, target_y, user_faction.id) {
        Some(squad) => {
          user_faction.attack_enemy(squads_ids, squad);
          let upgraded_squad = squad.upgrade();
          if upgraded_squad.is_some() {
            upgraded_squad
              .unwrap()
              .borrow()
              .members
              .iter()
              .map(|unit| unit.borrow().id as f32)
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
