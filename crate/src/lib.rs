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
mod strategic_point;
mod unit;
mod weapon_types;

use id_generator::IdGenerator;
use std::collections::HashMap;
use wasm_bindgen::prelude::*;

use bullets_manager::BulletsManager;
use constants::{
  AI_CALCULATION_PERIOD, CHECK_SQUADS_CORRECTNESS_PERIOD, MANAGE_HUNTERS_PERIOD,
  THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER, UPDATE_SQUAD_CENTER_PERIOD,
};
use faction::{ArtificialIntelligence, Faction, FactionInfo, Place, PlaceType, PurposeType};
use factory::Factory;
use position_utils::calc_positions::CalcPositions;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use representations_ids::BULLETS_REPRESENTATION_ID;
use squad::Squad;
use squad_types::SquadType;
use squads_grid_manager::{SquadsGrid, SquadsGridManager};
use strategic_point::{StrategicPoint, POINT_RADIUS, STRATEGIC_POINT_EMPTY_OWNER};

const INDEX_OF_USER_FACTION: usize = 0;

const THRESHOLD_ARE_TWO_SQUADS_NEIGHBORS: f32 = 1.5 * THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER;

pub struct World {
  bullets_manager: BulletsManager,
  squads_on_grid: SquadsGrid,
  strategic_points: Vec<StrategicPoint>,
}

#[wasm_bindgen]
pub struct Universe {
  factions: Vec<Faction>,
  world: World,
  time: u32,
  test_ai: ArtificialIntelligence,
}

#[wasm_bindgen]
impl Universe {
  pub fn new(
    factions_data: Vec<f32>,
    obstacles_data: Vec<f32>,
    strategic_points_raw: Vec<f32>,
  ) -> Universe {
    let mut factions: Vec<Faction> = vec![];

    let mut strategic_points = vec![];
    let mut i = 0;
    while i < strategic_points_raw.len() {
      strategic_points.push(StrategicPoint::new(
        strategic_points_raw[i],
        strategic_points_raw[i + 1],
      ));
      i += 2;
    }

    let world = World {
      squads_on_grid: HashMap::new(),
      bullets_manager: BulletsManager::new(),
      strategic_points,
    };

    let mut i = 0;
    while i < factions_data.len() {
      factions.push(Faction::new(
        factions_data[i] as u32,
        IdGenerator::generate_id(),
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
      test_ai: ArtificialIntelligence::new(0),
    }
  }

  pub fn get_strategic_points_init_data(&self) -> js_sys::Float32Array {
    let result = self
      .world
      .strategic_points
      .iter()
      .flat_map(|strategic_point| {
        let (x, y) = strategic_point.squad.borrow().shared.center_point;
        vec![strategic_point.id as f32, x, y]
      })
      .collect::<Vec<f32>>();

    js_sys::Float32Array::from(&result[..])
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

  pub fn update(&mut self) {
    let Universe {
      ref mut factions,
      ref mut world,
      ref mut time,
      ..
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

      let World {
        ref squads_on_grid, ..
      } = world;

      world
        .strategic_points
        .iter_mut()
        .for_each(|strategic_point: &mut StrategicPoint| {
          strategic_point.update(squads_on_grid);
        })
    }

    if *time % AI_CALCULATION_PERIOD == 0 {
      let ai_input = Universe::calculate_ai_input(&factions, &world.strategic_points);
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

    world.bullets_manager.update(&world.squads_on_grid);
  }

  pub fn get_universe_data(&mut self) -> js_sys::Float32Array {
    let universe_representation: Vec<f32> = self
      .factions
      .iter()
      .flat_map(|faction| faction.get_representation())
      .collect();

    let strategic_points_representation = self
      .world
      .strategic_points
      .iter()
      .flat_map(|strategic_point| strategic_point.get_representation())
      .collect::<Vec<f32>>();

    let result = [
      &universe_representation[..],
      &strategic_points_representation[..],
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
  ) -> js_sys::Uint32Array {
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
              .map(|unit| unit.borrow().id)
              .collect()
          } else {
            vec![]
          }
        }
        None => {
          user_faction.task_add_target(&squads_ids, target_x, target_y);

          let option_strategic_point = world.strategic_points.iter().find(|strategic_point| {
            let (x, y) = strategic_point.squad.borrow().shared.center_point;
            (target_x - x).hypot(target_y - y) < POINT_RADIUS
          });

          if let Some(strategic_point) = option_strategic_point {
            vec![strategic_point.id]
          } else {
            vec![]
          }
        }
      };

    js_sys::Uint32Array::from(&selected_enemy_units[..])
  }

  pub fn use_ability(
    &mut self,
    selected_squad_ids: Vec<u32>,
    ability_type: f32,
    target_x: f32,
    target_y: f32,
  ) {
    let user_faction = &mut self.factions[INDEX_OF_USER_FACTION];
    let squads_ids = user_faction
      .squads
      .iter()
      .filter_map(|ref_cell_squad| {
        let mut squad = ref_cell_squad.borrow();
        if selected_squad_ids.contains(&squad.id)
          && (squad.squad_details.representation_type - ability_type).abs() < std::f32::EPSILON
          && squad.ability_cool_down == 0
        {
          Some(squad.id)
        } else {
          None
        }
      })
      .collect::<Vec<u32>>();

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
        < THRESHOLD_ARE_TWO_SQUADS_NEIGHBORS
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

  fn calculate_ai_input(
    factions: &Vec<Faction>,
    strategic_points: &Vec<StrategicPoint>,
  ) -> Vec<FactionInfo> {
    let mut place_id = 0;

    let mut ai_input = factions
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

          place_id += 1;
          places.push(Place {
            id: place_id,
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

        place_id += 1;
        places.push(Place {
          id: place_id,
          place_type: PlaceType::Portal,
          squads: vec![faction.portal_squad.clone()],
          influence: portal_influence,
          x: portal.shared.center_point.0,
          y: portal.shared.center_point.1,
        });

        strategic_points.iter().for_each(|strategic_point| {
          if strategic_point.squad.borrow().id == faction.id {
            let strategic_point_squad = strategic_point.squad.borrow();
            let (x, y) = strategic_point_squad.shared.center_point;
            place_id += 1;
            places.push(Place {
              id: place_id,
              place_type: PlaceType::StrategicPoint,
              squads: vec![strategic_point.get_squad_copy()],
              influence: std::f32::EPSILON,
              x,
              y,
            });
          }
        });

        FactionInfo {
          id: faction.id,
          places,
          influence_total,
        }
      })
      .collect::<Vec<FactionInfo>>();

    let non_captured_points = strategic_points
      .iter()
      .filter_map(|strategic_point| {
        if strategic_point.squad.borrow().id == STRATEGIC_POINT_EMPTY_OWNER {
          let strategic_point_squad = strategic_point.squad.borrow();
          let (x, y) = strategic_point_squad.shared.center_point;
          place_id += 1;
          Some(Place {
            id: place_id,
            place_type: PlaceType::StrategicPoint,
            squads: vec![strategic_point.get_squad_copy()],
            influence: std::f32::EPSILON,
            x,
            y,
          })
        } else {
          None
        }
      })
      .collect::<Vec<Place>>();

    ai_input.push(FactionInfo {
      id: STRATEGIC_POINT_EMPTY_OWNER,
      places: non_captured_points,
      influence_total: 0.0,
    });

    ai_input
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

  pub fn get_grid_line(&self) -> js_sys::Float32Array {
    if self.factions[0].squads.len() == 0 {
      return js_sys::Float32Array::from(&vec![][..]);
    }

    let (x, y) = self.factions[0].squads[0].borrow().shared.center_point;
    let all_squares = SquadsGridManager::get_indexes_in_line_debug(x, y, 1000.0, 1000.0);

    // let squads = SquadsGridManager::get_squads_in_line(
    //   &self.world.squads_on_grid,
    //   x,
    //   y,
    //   1000.0,
    //   1000.0,
    //   500.0,
    // );

    // let serialized_squads_data = squads
    //   .iter()
    //   .flat_map(|squad| {
    //     let (squad_x, squad_y) = squad.upgrade().unwrap().borrow().shared.center_point;
    //     vec![squad_x, squad_y]
    //   })
    //   .collect::<Vec<f32>>();
    let result = [
      //   &all_squares[..],
      &vec![-1.0][..],
      &all_squares[..],
    ]
    .concat();

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
      .flat_map(|weak_squad| {
        if let Some(ref_cell_squad) = weak_squad.upgrade() {
          let (squad_x, squad_y) = ref_cell_squad.borrow().shared.center_point;
          vec![squad_x, squad_y]
        } else {
          vec![]
        }
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
  /*
    -1,
    portal id, portal x, portal y,
    squad id, squad x, squad y,
    squad id, squad x, squad y,
    squad id, squad x, squad y
  */

  pub fn get_abilities_cool_downs(
    &mut self,
    selected_squad_ids: Vec<u32>,
    selected_ability: f32,
  ) -> js_sys::Float32Array {
    let user_faction = &self.factions[INDEX_OF_USER_FACTION];

    let result = user_faction
      .squads
      .iter()
      .flat_map(|ref_cell_squad| {
        let mut squad = ref_cell_squad.borrow_mut();
        if selected_squad_ids.contains(&squad.id)
          && (
            selected_ability < std::f32::EPSILON // there is no selected ability
            || (squad.squad_details.representation_type - selected_ability).abs() < std::f32::EPSILON
            // it's just comparing floats which hold representation id
          )
        {
          squad.update_center();
          let (x, y) = squad.shared.center_point;
          vec![
            squad.squad_details.representation_type,
            if squad.ability_cool_down == 0 {
              1.0
            } else {
              0.0
            },
            squad.ability_cool_down as f32 / squad.squad_details.ability.reload_time as f32,
            x,
            y,
          ]
        } else {
          vec![]
        }
      })
      .collect::<Vec<f32>>();

    js_sys::Float32Array::from(&result[..])
  }

  pub fn test_ai(&mut self, input: Vec<f32>) -> js_sys::Float32Array {
    let mut factions = vec![];
    let mut index = 0;
    let mut faction_id: i32 = -1;

    while index < input.len() {
      let value = input[index];

      if (value + 1.0).abs() < std::f32::EPSILON {
        // if it's equal -1
        faction_id += 1;
        let faction = Faction::new(
          faction_id as u32,
          input[index + 1].round() as u32,
          input[index + 2], // x
          input[index + 3], // y
          0.0,
          false,
        );
        factions.push(faction);
        index += 4;
      } else {
        let mut squad = Squad::new(faction_id as u32, value.round() as u32, SquadType::Solider);

        for i in 0..7 {
          squad.add_member(
            input[index + 1], // x
            input[index + 2], // y
          );
        }

        factions[faction_id as usize]
          .squads
          .push(Rc::new(RefCell::new(squad)));
        index += 3;
      }
    }

    factions.iter_mut().for_each(|faction| {
      faction.update_squads_centers();
    });

    let squads_on_grid = SquadsGridManager::create(&factions);

    factions.iter_mut().for_each(|faction| {
      faction.check_squads_correctness();
    });

    let all_factions_info = Universe::calculate_ai_input(&factions, &vec![]);

    let squads = &factions[0].squads;

    let plans = self
      .test_ai
      .work(squads, &all_factions_info, &squads_on_grid);

    let serialized_output = plans
      .iter()
      .flat_map(|plan| {
        [
          &vec![
            -2.0,
            if plan.purpose_type == PurposeType::Attack {
              1.0
            } else {
              -1.0
            },
            plan.x,
            plan.y,
          ][..],
          &plan
            .squads_ids
            .iter()
            .map(|value| *value as f32)
            .collect::<Vec<f32>>()[..],
          &vec![-3.0][..],
          &plan
            .enemy_squads
            .iter()
            .map(|enemy| enemy.upgrade().unwrap().borrow().id as f32)
            .collect::<Vec<f32>>()[..],
        ]
        .concat()
      })
      .collect::<Vec<f32>>();

    js_sys::Float32Array::from(&serialized_output[..])
  }
}
