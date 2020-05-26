/*
to do bench you have to
1. remove cdylib from crate-type (Cargo.toml) and use rlib
2. install nightly to support test feature "rustup install nightly"
3. set nightly as default compiler "rustup default nightly", to revert it use "rustup default stable"
4. call "cargo bench"
*/

#![feature(test)]

extern crate rust_webpack_template;
extern crate test;

use test::Bencher;

#[bench]
fn bench_find_track_floats32(b: &mut Bencher) {
  rust_webpack_template::position_utils::obstacles_lazy_statics::ObstaclesLazyStatics::init_and_get_obstacles_handler(Some(vec![
    600.0, 100.0, 900.0, 100.0, 900.0, 300.0, 600.0, 300.0, // end here
    700.0, 400.0, 900.0, 400.0, 900.0, 600.0, 700.0, 600.0, 600.0, 500.0,
  ]));
  // let n = test::black_box(1000);
  rust_webpack_template::position_utils::PositionUtils::get_track(100.0, 100.0, 950.0, 450.0);
  b.iter(|| {
    rust_webpack_template::position_utils::PositionUtils::get_track(100.0, 100.0, 950.0, 450.0);
  });
}
