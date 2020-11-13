extern crate js_sys;
extern crate wasm_bindgen;
extern crate web_sys;

#[macro_use]
extern crate lazy_static;

macro_rules! log {
  ($( $t:tt )*) => (web_sys::console::log_1(&format!($($t)*).into()));
}

macro_rules! angle_diff {
  ($beta:expr, $alpha:expr) => {{
    let phi = ($beta - $alpha).abs() % (2.0 * MATH_PI); // This is either the distance or 2*Math.PI - distance
    if phi > MATH_PI {
      (2.0 * MATH_PI) - phi
    } else {
      phi
    }
  }}
}

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
mod squads_grid_manager;
mod unit;
mod weapon_types;

use std::collections::HashMap;
use wasm_bindgen::prelude::*;

use bullets_manager::BulletsManager;
use constants::{
  AI_CALCULATION_PERIOD, CHECK_SQUADS_CORRECTNESS_PERIOD, MANAGE_HUNTERS_PERIOD,
  THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER, UPDATE_SQUAD_CENTER_PERIOD,
};
use faction::{Faction, FactionInfo, Place, PlaceType};
use factory::Factory;
use position_utils::calc_positions::CalcPositions;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use representations_ids::BULLETS_REPRESENTATION_ID;
use squad::Squad;
use squads_grid_manager::SquadsGridManager;

const INDEX_OF_USER_FACTION: usize = 0;

pub struct World {
  bullets_manager: BulletsManager,
  squads_on_grid: HashMap<usize, Vec<Weak<RefCell<Squad>>>>,
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
    let world = World {
      squads_on_grid: HashMap::new(),
      bullets_manager: BulletsManager::new(),
    };

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
    CalcPositions::get_is_point_inside_any_obstacle((0, 0), false);

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
    // world
    //   .all_squads
    //   .retain(|weak_squad| weak_squad.upgrade().is_some());

    // collect squads which moved
    // let all_moved_squads: Vec<Rc<RefCell<Squad>>> = world
    //   .all_squads
    //   .iter()
    //   .filter_map(|weak_squad| {
    //     if weak_squad
    //       .upgrade()
    //       .unwrap()
    //       .borrow()
    //       .was_center_point_changed()
    //     {
    //       Some(weak_squad.upgrade().unwrap())
    //     } else {
    //       None
    //     }
    //   })
    //   .collect();

    // let all_squads: Vec<Rc<RefCell<Squad>>> = world
    //   .all_squads
    //   .iter()
    //   .map(|squad| squad.upgrade().unwrap())
    //   .collect();

    // search for enemy
    // factions.iter_mut().for_each(|faction: &mut Faction| {
    //   faction.search_for_enemies(&all_moved_squads, &all_squads);
    // });

    // world.all_squads.iter().for_each(|squad| {
    //   squad.upgrade().unwrap().borrow_mut().update_moved_status();
    // });
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

      world.squads_on_grid = SquadsGridManager::create(factions)
    }

    if *time % CHECK_SQUADS_CORRECTNESS_PERIOD == 0 {
      factions.iter_mut().for_each(|faction: &mut Faction| {
        faction.check_squads_correctness();
      });
    }

    if *time % AI_CALCULATION_PERIOD == 0 {
      let ai_input = Universe::calculate_ai_input(&factions);
      factions
        .iter_mut()
        .enumerate()
        .for_each(|(index, faction)| {
          if index != INDEX_OF_USER_FACTION {
            faction.do_ai(&ai_input, &world.squads_on_grid);
          }
        });
      // let all_squads = Universe::calculate_ai_input(&factions);
    }

    factions.iter_mut().for_each(|faction: &mut Faction| {
      if *time % MANAGE_HUNTERS_PERIOD == 0 {
        faction.manage_hunters(&world.squads_on_grid);
      }

      faction.resources += 1;
      faction.update(world);
    });

    // if *time % SEARCH_FOR_ENEMIES_PERIOD == 0 {
    //   Universe::run_squad_manager(factions, world);
    // }

    // world.bullets_manager.update(&world.all_squads);
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
  ) -> js_sys::Uint32Array {
    let mut selected_units_ids: Vec<u32> = vec![];
    let mut selected_squads_ids: Vec<u32> = vec![0]; // 0.0 is divider between squads and units ids
    self
      .factions
      .iter()
      .enumerate()
      .for_each(|(index, faction)| {
        if index == INDEX_OF_USER_FACTION {
          faction.squads.iter().for_each(|squad| {
            let read_squad = squad.borrow();
            let is_in_selection = read_squad.members.iter().any(|ref_cell_unit| {
              let unit = ref_cell_unit.borrow();
              unit.x > start_x && unit.x < end_x && unit.y > start_y && unit.y < end_y
            });
            if is_in_selection {
              read_squad
                .members
                .iter()
                .for_each(|squad_member| selected_units_ids.push(squad_member.borrow().id));
              selected_units_ids.push(1); // 1.0 is divider between each squad
              selected_squads_ids.push(read_squad.id);
            }
          })
        }
      });

    let summary = [&selected_units_ids[..], &selected_squads_ids[..]].concat();

    // read weird data on the beginning with "view", garbage collector?
    js_sys::Uint32Array::from(&summary[..])
  }

  fn is_it_attack(
    world: &World,
    target_x: f32,
    target_y: f32,
    user_faction_id: u32,
  ) -> Option<Weak<RefCell<Squad>>> {
    let squads_in_area =
      SquadsGridManager::get_squads_in_area(&world.squads_on_grid, target_x, target_y, 0.0);
    squads_in_area.into_iter().find(|weak_squad| {
      if let Some(unwrapper_squad) = weak_squad.upgrade() {
        let squad = unwrapper_squad.borrow();
        if squad.faction_id == user_faction_id {
          return false;
        }

        let corrected_target_y = target_y + squad.squad_details.unit_model_offset_y;
        squad.members.iter().any(|ref_cell_unit| {
          let unit = ref_cell_unit.borrow();
          (unit.x - target_x).hypot(unit.y - corrected_target_y)
            < squad.squad_details.selection_threshold
        })
      } else {
        false
      }
    })
  }

  pub fn debug_obstacles(&self) -> js_sys::Float32Array {
    let result = ObstaclesLazyStatics::get_obstacles()
      .iter()
      .flat_map(|obstacle_points_list| {
        let mut result = obstacle_points_list
          .iter()
          .flat_map(|point| vec![point.x, point.y])
          .collect::<Vec<f32>>();
        result.push(-1.0);
        result
      })
      .collect::<Vec<f32>>();
    js_sys::Float32Array::from(&result[..])
  }

  pub fn debug_track(&self) -> js_sys::Float32Array {
    let user_faction = &self.factions[INDEX_OF_USER_FACTION];
    let mut result = vec![];
    user_faction.squads.iter().for_each(|squad| {
      let track = squad
        .borrow()
        .shared
        .track
        .iter()
        .flat_map(|(a, b)| vec![*a, *b])
        .collect::<Vec<f32>>();
      result = [&result[..], &track[..], &[-1.0][..]].concat();
    });
    js_sys::Float32Array::from(&result[..])
  }

  pub fn move_units(
    &mut self,
    squads_ids: Vec<u32>,
    target_x: f32,
    target_y: f32,
  ) -> js_sys::Float32Array {
    let Universe {
      ref mut factions,
      ref world,
      ..
    } = self;
    let user_faction = &mut factions[INDEX_OF_USER_FACTION];
    let selected_enemy_units =
      match Universe::is_it_attack(world, target_x, target_y, user_faction.id) {
        Some(squad) => {
          user_faction.task_attack_enemy(&squads_ids, &squad);
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
          user_faction.task_add_target(&squads_ids, target_x, target_y);
          vec![]
        }
      };

    js_sys::Float32Array::from(&selected_enemy_units[..])
  }

  pub fn use_ability(&mut self, squads_ids: Vec<u32>, target_x: f32, target_y: f32) {
    let user_faction = &mut self.factions[INDEX_OF_USER_FACTION];
    user_faction.task_use_ability(&squads_ids, target_x, target_y);
  }

  fn get_all_neightbours(
    source_position: (f32, f32),
    not_checked_yet: &mut Vec<Rc<RefCell<Squad>>>,
  ) -> Vec<Rc<RefCell<Squad>>> {
    // item shouldn't be in not_checked_yet vector
    let mut neighbors = vec![];
    not_checked_yet.retain(|ref_cell_squad| {
      let position = ref_cell_squad.borrow().shared.center_point;
      if (source_position.0 - position.0).hypot(source_position.1 - position.1)
        < THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER
      {
        neighbors.push(ref_cell_squad.clone());
        false
      } else {
        true
      }
    });

    let mut neighbors_of_neighbors = neighbors
      .iter()
      .flat_map(|neighbor| {
        Universe::get_all_neightbours(neighbor.borrow().shared.center_point, not_checked_yet)
      })
      .collect::<Vec<Rc<RefCell<Squad>>>>();

    neighbors.append(&mut neighbors_of_neighbors);

    neighbors
  }

  fn calculate_ai_input(factions: &Vec<Faction>) -> Vec<FactionInfo> {
    factions
      .iter()
      .map(|faction| {
        let mut influence_total = 0.0;
        let mut places = vec![]; // here we should push all strategic points owned by us
        let mut squads_to_check = faction.squads.clone();

        while let Some(new_item) = squads_to_check.pop() {
          // let new_item = squads_to_check.pop().unwrap();
          let mut neighbours = Universe::get_all_neightbours(
            new_item.borrow().shared.center_point,
            &mut squads_to_check,
          );
          neighbours.push(new_item);

          let (sum_x, sum_y, sum_influence) =
            neighbours
              .iter()
              .fold((0.0, 0.0, 0.0), |acc, ref_cell_squad| {
                let squad = ref_cell_squad.borrow();
                let position = squad.shared.center_point;
                (
                  acc.0 + position.0,
                  acc.1 + position.1,
                  acc.2 + squad.get_influence(),
                )
              });
          let neighbours_len = neighbours.len() as f32;
          influence_total += sum_influence;
          places.push(Place {
            place_type: PlaceType::Squads,
            squads: neighbours,
            influence: sum_influence,
            x: sum_x / neighbours_len,
            y: sum_y / neighbours_len,
          });
        }

        let portal = faction.portal_squad.borrow();
        let portal_influence = portal.get_influence();
        influence_total += portal_influence;
        places.push(Place {
          place_type: PlaceType::Portal,
          squads: vec![faction.portal_squad.clone()],
          influence: portal_influence,
          x: portal.shared.center_point.0,
          y: portal.shared.center_point.1,
        });
        FactionInfo {
          id: faction.id,
          places,
          influence_total,
        }
      })
      .collect::<Vec<FactionInfo>>()
  }

  pub fn get_grid(&self) -> js_sys::Float32Array {
    let mut result = vec![];
    for (key, squads_list) in &self.world.squads_on_grid {
      let (x, y) = SquadsGridManager::get_real_position_from_index(*key);
      result.push(x);
      result.push(y);
    }
    js_sys::Float32Array::from(&result[..])
  }
  pub fn get_grid_area(&self) -> js_sys::Float32Array {
    if self.factions[0].squads.len() == 0 {
      return js_sys::Float32Array::from(&vec![][..]);
    }

    let (x, y) = self.factions[0].squads[0].borrow().shared.center_point;
    let all_squares = SquadsGridManager::get_squads_in_area_debug(
      &self.world.squads_on_grid,
      x,
      y,
      self.factions[0].squads[0].borrow().shared.weapon.range,
    );

    let squads = SquadsGridManager::get_squads_in_area(
      &self.world.squads_on_grid,
      x,
      y,
      self.factions[0].squads[0].borrow().shared.weapon.range,
    );

    let serialized_squads_data = squads
      .iter()
      .flat_map(|squad| {
        let (squad_x, squad_y) = squad.upgrade().unwrap().borrow().shared.center_point;
        vec![squad_x, squad_y]
      })
      .collect::<Vec<f32>>();
    let result = [
      &all_squares[..],
      &vec![-1.0][..],
      &serialized_squads_data[..],
    ]
    .concat();

    js_sys::Float32Array::from(&result[..])
  }

  pub fn is_point_inside_obstacle(&self, x: i16, y: i16) -> u8 {
    CalcPositions::test((x, y))
  }

  pub fn debug_enemy_secondary_aim(&self) -> js_sys::Float32Array {
    let result = if self.factions[1].squads.len() > 0
      && self.factions[1].squads[0]
        .borrow()
        .shared
        .secondary_aim
        .upgrade()
        .is_some()
    {
      self.factions[1].squads[0]
        .borrow()
        .shared
        .secondary_aim
        .upgrade()
        .unwrap()
        .borrow()
        .shared
        .center_point
    } else {
      (-1.0, -1.0)
    };
    js_sys::Float32Array::from(&vec![result.0, result.1][..])
  }
}
