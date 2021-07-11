import { Point } from "./point";

export const FLY_MIN_SPEED: f32 = 0.035;
export const FLY_DECELERATION: f32 = 0.95;
const FLY_DISTANCE_PRECISION: f32 = 3.0;

export function getFlyModes(angle: f32, startX: f32, startY: f32, strength: f32): Point {
  let time = Math.ceil(
    Math.log(FLY_MIN_SPEED / strength) / Math.log(FLY_DECELERATION)
  )

  if (time <= 0.01) { // should be EPSILON instead of 0.01
    return { x: 0.0, y: 0.0 } // to avoid dividing by zero let factor = distance / all_speeds_sum;
  }

  // to calculate all_speeds_sum we are using geometric sequence
  // all_speeds_sum = strength * (1 - 0.95.powi(time)) / (1 - 0.95)
  let allSpeedsSum = strength * (1.0 - Math.pow(FLY_DECELERATION, time)) / (1.0 - FLY_DECELERATION)

  // average_speed = all_speeds_sum / time
  // distance = average_speed * time
  // BUT 🥁🥁🥁
  // all_speeds_sum at the same time is the distance!
  let distance = allSpeedsSum

  // in case if distance have to be shorted bc of the obstacles
  let distance_portion = allSpeedsSum / FLY_DISTANCE_PRECISION

  while (distance > 0.01) {
    let x = (Math.sin(angle) * distance + startX)
    let y = (-Math.cos(angle) * distance + startY)
    // if CalcPositions::get_is_point_inside_any_obstacle((x, y), false) {
    //   distance -= distance_portion;
    // } else {
      break;
    // }
  }

  let factor = distance / allSpeedsSum;
  return {
    x: Math.sin(angle) * strength * factor as f32,
    y: -Math.cos(angle) * strength * factor as f32,
  }
}