#![feature(test)]
extern crate js_sys;
extern crate test;
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
mod position_utils;
mod squad;
mod squad_types;
mod unit;

use wasm_bindgen::prelude::*;

use faction::Faction;
use factory::Factory;
use position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use position_utils::PositionUtils;

#[cfg(test)]
mod tests {
  use super::*;
  use test::Bencher;

  // #[test]
  // fn it_works() {
  //     assert_eq!(4, add_two(2));
  // }

  #[bench]
  fn bench_find_track_floats32(b: &mut Bencher) {
    ObstaclesLazyStatics::init_and_get_obstacles_handler(Some(vec![
      600.0, 100.0, 900.0, 100.0, 900.0, 300.0, 600.0, 300.0, // end here
      700.0, 400.0, 900.0, 400.0, 900.0, 600.0, 700.0, 600.0, 600.0, 500.0,
    ]));

    PositionUtils::get_track(100.0, 100.0, 950.0, 450.0);
    b.iter(|| {
      PositionUtils::get_track(100.0, 100.0, 950.0, 450.0);
    });
  }

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
}
