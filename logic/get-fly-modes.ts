import { Point } from "./geom-types";
import { getIsPointAvailable } from "./obstacles-manager";

export const FLY_MIN_SPEED: f32 = 0.035;
export const FLY_DECELERATION: f32 = 0.97;
const FLY_DISTANCE_PRECISION: f32 = 5.0;

export function getFlyModes(angle: f32, startX: f32, startY: f32, strength: f32): Point {
  let time = Mathf.ceil(
    Mathf.log(FLY_MIN_SPEED / strength) / Mathf.log(FLY_DECELERATION)
  )

  if (time <= f32.EPSILON) { // should be EPSILON instead of 0.01
    return { x: 0.0, y: 0.0 } // to avoid dividing by zero let factor = distance / all_speeds_sum;
  }

  // to calculate all_speeds_sum we are using geometric sequence
  // all_speeds_sum = strength * (1 - 0.95.powi(time)) / (1 - 0.95)


  let poweredFlyDeceleration = FLY_DECELERATION
  time--
  while (time > 0) {
    poweredFlyDeceleration *= FLY_DECELERATION
    time--
  }
  const allSpeedsSum = strength * (1.0 - poweredFlyDeceleration) / (1.0 - FLY_DECELERATION)
  // below is the original line, but Math.pow is causing an issue
  // Math.pow in -O3 add lookup table in static segment.
  // This means heap base offset will change.
  // If you works with raw memory I highly recommend use __heap_base builtin constant as starting point
  // But it shouldn't be our case, we are not reading/writing into raw memory.
  // let allSpeedsSum = strength * (1.0 - Math.pow(FLY_DECELERATION, time)) / (1.0 - FLY_DECELERATION)

  // average_speed = all_speeds_sum / time
  // distance = average_speed * time
  // BUT 🥁🥁🥁
  // all_speeds_sum at the same time is the distance!
  let distance = allSpeedsSum

  // in case if distance have to be shorted bc of the obstacles
  const distancePortion = allSpeedsSum / FLY_DISTANCE_PRECISION

  while (distance > 0.01) {
    const x = (Mathf.sin(angle) * distance + startX)
    const y = (-Mathf.cos(angle) * distance + startY)
    if (getIsPointAvailable(x, y, false)) {
      break
    } else {
      distance -= distancePortion;
    }
  }

  const factor = distance / allSpeedsSum;
  return {
    x: Mathf.sin(angle) * strength * factor,
    y: -Mathf.cos(angle) * strength * factor,
  }
}