pub mod basic_utils;
pub mod calc_positions;
pub mod obstacles_lazy_statics;
mod track_utils;

use crate::constants::NORMAL_SQUAD_RADIUS;
use basic_utils::Point;
use calc_positions::CalcPositions;
use track_utils::TrackUtils;

const MAX_NUMBER_OF_UNITS_IN_SQUAD: usize = 7;
const DISTANCE_BETWEEN_ATTACKERS: f32 = 2.0 * NORMAL_SQUAD_RADIUS;

type PositionPoint = (i16, i16);

pub struct PositionUtils {}

impl PositionUtils {
  pub fn get_squads_positions(number_of_needed_position: usize, x: f32, y: f32) -> Vec<(f32, f32)> {
    let results = CalcPositions::calc_squads_positions(number_of_needed_position, x, y);
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
    let track = TrackUtils::calculate_track(&start_point, &end_point);
    TrackUtils::shift_track_from_obstacles(track)
  }

  pub fn get_attackers_position(
    number_of_needed_positions: usize,
    squads_average_position: (f32, f32),
    range: f32,
    aim: (f32, f32),
  ) -> Vec<(f32, f32)> {
    let angle_from_aim = (squads_average_position.0 - aim.0).atan2(aim.1 - squads_average_position.1);
    let diff_angle = (1.0 - (DISTANCE_BETWEEN_ATTACKERS.powi(2) / (2.0 * range.powi(2)))).acos();
    let mut result = vec![];
    let mut multiple_by = 0.0;

    while result.len() < number_of_needed_positions {
      result.push((
        (angle_from_aim + multiple_by * diff_angle).sin() * range + aim.0,
        -(angle_from_aim + multiple_by * diff_angle).cos() * range + aim.1,
      ));

      if multiple_by > 0.0 {
        multiple_by = -multiple_by;
      } else {
        multiple_by = 1.0 - multiple_by;
      }
    }

    result
  }
}
