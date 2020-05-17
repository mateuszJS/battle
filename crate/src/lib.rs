// #![feature(test)]


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
mod squad;
mod squad_types;
mod unit;
mod position_utils;

use crate::constants::MATH_PI;
use faction::Faction;
use factory::Factory;
use position_utils::obstacles_lazy_statics::{ObstaclesLazyStatics, OBSTACLES_LENGTH};
use position_utils::PositionUtils;

// use position_utils_tuple::obstacles_lazy_statics::ObstaclesLazyStaticsTuple;
// use position_utils_tuple::PositionUtilsTuple;
use wasm_bindgen::prelude::*;

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
      factions.push(
        Faction::new(
          factions_data[i],
          factions_data[i + 1],
          factions_data[i + 2],
          factions_data[i + 3],
          i == 0,
        )
      );
      i += 4;
    };

    let obstacles_input = vec![];
    i = 0;
    while i < obstacles_data.len() {
      let cell_data = obstacles_data[i];
      if cell_data != -1 {
        factions.push(
          Faction::new(
            factions_data[i],
            factions_data[i + 1],
            factions_data[i + 2],
            factions_data[i + 3],
            i == 0,
          )
        );
      } else {
        i += 1;
      }
    };

    ObstaclesLazyStatics::all_obstacles_points_handler(Some(
      vec![
        (600.0, 100.0),
        (900.0, 100.0),
        (900.0, 300.0),
        (600.0, 300.0),
        // end here
        (700.0, 400.0),
        (900.0, 400.0),
        (900.0, 600.0),
        (700.0, 600.0),
        (600.0, 500.0),
      ]
    ));

    Universe { factions }
  }

  pub fn get_factories_init_data(&self) -> js_sys::Float32Array {
    // FYI:
    // this function runs only once, just to let for JS know about factory details
    // I did it here, because don't want to sent this data each update & render (those data won't change)
    let get_initial_factories_representation = |faction: &Faction| {
      let factory = &faction.factory;
      vec![faction.id, factory.id, factory.x, factory.y, factory.angle]
    };

    let result: Vec<f32> = self
      .factions
      .iter()
      .flat_map(get_initial_factories_representation)
      .collect();
    
    unsafe {
      js_sys::Float32Array::view(&result[..])
    }
  }

  pub fn update(&mut self) {
    // FYI:
    // this method is called every render, just to trigger updates
    self.factions.iter_mut().for_each(|faction| {
      faction.resources += 1;

      // FYI:
      // there update of the rest items is propagated.
      // faction.update triggers -> squads.update triggers -> unit.update
      // and also faction.update triggers -> factory.update
      // Every struct that represent something "visual" has at least to methods
      // "update" and "get_representation"
      faction.update();
    })
  }

  pub fn get_universe_data(&self) -> js_sys::Float32Array {
    // FYI:
    // this method is called every render, to get fresh "Universe representation" in Vec<f32>
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

    // let output_mem_localization = vec![
    //   universe_representation.as_ptr() as usize as u32,
    //   universe_representation.len() as u32,
    // ];
    // 2.
    // QUESTION:
    // as you can see firstly I'm creating vector here output_mem_localization
    // can I omit it somehow? like with range I can do (0..5).map(JsValue::from).collect()
    // it that possible to create something similar here?

    // output_mem_localization
    //   .into_iter()
    //   .map(JsValue::from)
    //   .collect()
    // FYI:
    // for the first sight you can think that what I'm making is not right, I'm passing array
    // with pointer and length related to another array?! I could as well pass that array directly
    // I wanted to optimize as much as possible this process, so in JS I'm reading it directly from wasm memory
  }

  // QUESTION:
  // is there any way to specify exactly which value are allowed? AFAIK there is no
  // like in this case it rn could be squad_type_representation = 2 only (in the future will be more number allowed)
  pub fn create_squad(&mut self, squad_type_representation: u8) -> bool {
    // FYI:
    // rn this is the only one real interaction from JS into RUST
    // called when user click on button to create a unit
    self.factions[INDEX_OF_USER_FACTION]
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

    let mut obstacle_index = 0;
    let mut obstacle_start_point_index = 0;
    let obstacle = ObstaclesLazyStatics::unwrap_all_points()
      .iter()
      .enumerate()
      .flat_map(|(index, (x, y))| {
        if index == obstacle_start_point_index + OBSTACLES_LENGTH[obstacle_index] - 1 {
          obstacle_start_point_index += OBSTACLES_LENGTH[obstacle_index];
          obstacle_index += 1;
          vec![*x, *y, -2.0]
        } else {
          vec![*x, *y]
        }
      })
      .collect();

    let summary = [vec![-1.0], list_of_numbers, obstacle, vec![-2.0]].concat();
    unsafe {
      js_sys::Float32Array::view(&summary[..])
    }
    // summary.into_iter().map(JsValue::from).collect()
    // TODO: iterate over all squads, and return their path_to_destination
    // Universe::get_graph_preview(x, y, target_x, target_y)
  }

  // fn get_graph_preview(
  //   source_x: f32,
  //   source_y: f32,
  //   destination_x: f32,
  //   destination_y: f32,
  // ) -> js_sys::Array {
  //   Utils::get_graph(source_x, source_y, destination_x, destination_y)
  //     .into_iter()
  //     .map(JsValue::from)
  //     .collect()
  // }
}




// #[cfg(test)]
// mod tests {
//   use super::*;
//   use test::Bencher;

//   // #[test]
//   // fn it_works() {
//   //     assert_eq!(4, add_two(2));
//   // }

//   #[bench]
//   fn bench_find_track_floats32(b: &mut Bencher) {
//     ObstaclesLazyStatics::all_obstacles_points_handler(Some(
//       vec![
//         (600.0, 100.0),
//         (900.0, 100.0),
//         (900.0, 300.0),
//         (600.0, 300.0),
//         // end here
//         (700.0, 400.0),
//         (900.0, 400.0),
//         (900.0, 600.0),
//         (700.0, 600.0),
//         (600.0, 500.0),
//       ]
//     ));

//     PositionUtils::get_track(
//       100.0,
//       100.0,
//       950.0,
//       450.0,
//     );
    
//     b.iter(|| {
//       PositionUtils::get_track(
//         100.0,
//         100.0,
//         950.0,
//         450.0,
//       );
//     });
//   }


  // #[bench]
  // fn bench_find_track_i16(b: &mut Bencher) {
  //   ObstaclesLazyStaticsTuple::all_obstacles_points_handler(Some(
  //     vec![
  //       (600.0, 100.0),
  //       (900.0, 100.0),
  //       (900.0, 300.0),
  //       (600.0, 300.0),
  //       // end here
  //       (700.0, 400.0),
  //       (900.0, 400.0),
  //       (900.0, 600.0),
  //       (700.0, 600.0),
  //       (600.0, 500.0),
  //     ]
  //   ));
    
  //   b.iter(|| {
  //     PositionUtilsTuple::get_track(
  //       100.0,
  //       100.0,
  //       950.0,
  //       450.0,
  //     );
  //   });
  // }
// }