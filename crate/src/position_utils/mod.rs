pub mod basic_utils;
pub mod calc_positions;
pub mod obstacles_lazy_statics;
mod track_utils;

use crate::constants::MATH_PI;
use crate::id_generator::IdGenerator;
use basic_utils::{BasicUtils, Line, Point};
use calc_positions::CalcPositions;
use obstacles_lazy_statics::ObstaclesLazyStatics;
use track_utils::TrackUtils;

const MAX_NUMBER_OF_UNITS_IN_SQUAD: usize = 7;

type PositionPoint = (i16, i16);

pub struct PositionUtils {}

impl PositionUtils {
  pub fn get_squads_positions(number_of_needed_position: usize, x: f32, y: f32) -> Vec<(f32, f32)> {
    let mut multiple_radius: i16 = 1;
    let mut last_visited_result_point_index: isize = -1;
    let mut results: Vec<PositionPoint> = vec![];

    let initial_point = (x as i16, y as i16);
    if !CalcPositions::get_is_point_inside_any_obstacle(initial_point) {
      results.push(initial_point);
      last_visited_result_point_index += 1;
    }

    while results.len() < number_of_needed_position {
      let (center_x, center_y) = if results.len() == 0 {
        initial_point
      } else {
        results[last_visited_result_point_index as usize]
      };

      let positions: Vec<PositionPoint> = CalcPositions::get_hex_circle_position(
        number_of_needed_position - results.len(),
        center_x,
        center_y,
        multiple_radius,
        &results,
      );
      results = [results, positions].concat();

      if last_visited_result_point_index == results.len() as isize - 1 {
        if last_visited_result_point_index != -1 {
          last_visited_result_point_index = 0;
        }
        multiple_radius += 1;
      } else {
        last_visited_result_point_index += 1;
      }
    }

    results
      .into_iter()
      .map(|(x, y)| (x as f32, y as f32))
      .collect()
  }

  pub fn get_units_in_squad_position(number_of_needed_position: usize) -> &'static Vec<(f32, f32)> {
    lazy_static! {
      static ref PRECALCULATED_POSITIONS: [Vec<(f32, f32)>; MAX_NUMBER_OF_UNITS_IN_SQUAD] = [
        CalcPositions::calc_units_in_squad_position(1),
        CalcPositions::calc_units_in_squad_position(2),
        CalcPositions::calc_units_in_squad_position(3),
        CalcPositions::calc_units_in_squad_position(4),
        CalcPositions::calc_units_in_squad_position(5),
        CalcPositions::calc_units_in_squad_position(6),
        CalcPositions::calc_units_in_squad_position(7),
      ];
    };

    &PRECALCULATED_POSITIONS[number_of_needed_position - 1]
  }

  pub fn get_track(
    source_x: f32,
    source_y: f32,
    destination_x: f32,
    destination_y: f32,
  ) -> Vec<(f32, f32)> {
    let start_point = Point {
      id: IdGenerator::generate_id() as u32,
      x: source_x,
      y: source_y,
    };
    let end_point = Point {
      id: IdGenerator::generate_id() as u32,
      x: destination_x,
      y: destination_y,
    };
    let result = TrackUtils::calculate_track(&start_point, &end_point);
    result.iter().map(|point| (point.x, point.y)).collect()
  }
}
