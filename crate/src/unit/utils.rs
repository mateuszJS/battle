use crate::position_utils::calc_positions::CalcPositions;

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
      if CalcPositions::get_is_point_inside_any_obstacle((x, y)) {
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
}
