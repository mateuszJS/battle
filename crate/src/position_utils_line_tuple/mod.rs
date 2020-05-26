pub mod basic_utils;
pub mod calc_positions;
pub mod obstacles_lazy_statics;
mod track_utils;

use crate::constants::{MATH_PI, NORMAL_SQUAD_RADIUS};
use basic_utils::Point;
use calc_positions::CalcPositions;
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

      if last_visited_result_point_index == (results.len() as isize) - 1 {
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
      id: 0,
      x: source_x,
      y: source_y,
    };
    let end_point = Point {
      id: 1,
      x: destination_x,
      y: destination_y,
    };
    let result = TrackUtils::calculate_track(&start_point, &end_point);

    let last_index = result.len() - 1;
    result.iter().enumerate().map(|(index, point)| {
      if index == 0 || index == last_index {
        (point.x, point.y)
      } else {
        let previous_point = result[index - 1];
        let next_point = result[index + 1];

        let to_previous_point_angle = (point.x - previous_point.x).atan2(previous_point.y - point.y);
        let to_next_point_angle = (point.x - next_point.x).atan2(next_point.y - point.y);

        if (to_previous_point_angle - to_next_point_angle) % MATH_PI == 0.0 { // straight line
          // in this case it's impossible to figure out, on
          // which site are obstacles (if are even on one site)
          let angle = to_previous_point_angle + MATH_PI / 2.0;
          let maybe_correct_point = (
            (angle.sin() * NORMAL_SQUAD_RADIUS + point.x) as i16,
            (-angle.cos() * NORMAL_SQUAD_RADIUS + point.y) as i16,
          );

          if CalcPositions::get_is_point_inside_any_obstacle((maybe_correct_point.0 - 1, maybe_correct_point.1 - 1))
            || // -1 and +1 to handle case when it's rectangle, and maybe_correct_point is on the boundary/stroke
            CalcPositions::get_is_point_inside_any_obstacle((maybe_correct_point.0 + 1, maybe_correct_point.1 + 1))
          {
            let correct_angle = angle + MATH_PI;
            (
              correct_angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
              -correct_angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
            )
          } else {
            (
              angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
              -angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
            )
          }
        } else {
          // https://rosettacode.org/wiki/Averages/Mean_angle#Rust
          let sin_mean = (to_previous_point_angle.sin() + to_next_point_angle.sin()) / 2.0;
          let cos_mean = (to_previous_point_angle.cos() + to_next_point_angle.cos()) / 2.0;
          let mean_angle = sin_mean.atan2(cos_mean);

          (
            mean_angle.sin() * NORMAL_SQUAD_RADIUS + point.x,
            -mean_angle.cos() * NORMAL_SQUAD_RADIUS + point.y,
          )
        }
      }
    }).collect()
  }
}
