import { MATH_PI, MATH_PI_2 } from "./constants"

export function getAngleDiff(alpha: f32, beta: f32): f32 {
  let phi = (Math.abs(beta - alpha) as f32) % MATH_PI_2 // This is either the distance or 2*Math.PI - distance
  if (phi > MATH_PI) {
    return (2.0 * MATH_PI) - phi
  }
  return phi
}