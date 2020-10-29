use crate::constants::NORMAL_SQUAD_RADIUS;
use crate::position_utils::basic_utils::{BasicUtils, Line, Point};
use crate::position_utils::calc_positions::CalcPositions;
use crate::position_utils::obstacles_lazy_statics::ObstaclesLazyStatics;
use crate::squad::SquadUnitSharedDataSet;
pub const FLY_DECELERATION: f32 = 0.95;
pub const FLY_MIN_SPEED: f32 = 0.035;
const FLY_DISTANCE_PRECISION: f32 = 3.0;

pub struct Utils {}

impl Utils {
  pub fn get_fly_mods(angle: f32, x: f32, y: f32, strength: f32) -> (f32, f32) {
    // https://socratic.org/questions/what-is-the-formula-for-time-from-a-changing-velocity#MathJax-Element-8-Frame

    // time = strength * 0.95.powi(x) < 0.035
    let time = (FLY_MIN_SPEED / strength).log(FLY_DECELERATION).ceil();

    // to calculate all_speeds_sum we are using geometric sequence
    // all_speeds_sum = strength * (1 - 0.95.powi(time)) / (1 - 0.95)
    let all_speeds_sum = strength * (1.0 - FLY_DECELERATION.powf(time)) / (1.0 - FLY_DECELERATION);

    // average_speed = all_speeds_sum / time
    // distance = average_speed * time
    // BUT 🥁🥁🥁
    // all_speeds_sum at the same time is the distance!
    let mut distance = all_speeds_sum;

    // in case if distance have to be shorted bc of the obstacles
    let distance_portion = all_speeds_sum / FLY_DISTANCE_PRECISION;

    while distance > 0.0 {
      let x = (angle.sin() * distance + x) as i16;
      let y = (-angle.cos() * distance + y) as i16;
      if CalcPositions::get_is_point_inside_any_obstacle((x, y), false) {
        distance -= distance_portion;
      } else {
        break;
      }
    }

    let factor = distance / all_speeds_sum;
    // used just strength * factor for simplicity, but to be more precise
    // we should do reverse engineering up to the time calculation
    (
      angle.sin() * strength * factor,
      -angle.cos() * strength * factor,
    )
  }

  pub fn check_if_can_go_to_point(x: f32, y: f32, point: (f32, f32)) -> bool {
    // function used to check, if unit can run directly into next target
    // (not current one, bc in most cases it's current position of the squad)
    let obstacles_lines = ObstaclesLazyStatics::get_obstacles_lines();
    let start_point = Point { id: 0, x, y };
    let end_point = Point {
      id: 0,
      x: point.0,
      y: point.1,
    };
    let line_to_next_track_point = Line {
      p1: &start_point,
      p2: &end_point,
    };

    !obstacles_lines
      .iter()
      .any(|obstacle_line| BasicUtils::check_intersection(&line_to_next_track_point, obstacle_line))
  }

  pub fn get_initial_track_index(
    current_index: i8,
    x: f32,
    y: f32,
    squad_shared_info: &SquadUnitSharedDataSet,
  ) -> i8 {
    let is_unit_close_to_squad_center = (squad_shared_info.center_point.0 - x)
      .hypot(squad_shared_info.center_point.1 - y)
      <= NORMAL_SQUAD_RADIUS + 10.0; // 10, in case if unit is little bit farther
    if is_unit_close_to_squad_center && current_index == 0 {
      1
    } else {
      let is_next_point_exists = squad_shared_info.track.len() as i8 != current_index + 1;
      if is_next_point_exists
        && Utils::check_if_can_go_to_point(
          x,
          y,
          squad_shared_info.track[(current_index + 1) as usize],
        )
      {
        current_index + 1
      } else {
        current_index
      }
    }
  }
}
