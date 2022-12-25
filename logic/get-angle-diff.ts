import { MATH_PI_2 } from "./constants"

export function getAngleDiff(alpha: f32, beta: f32): f32 {
  const phi = Mathf.abs(beta - alpha) % MATH_PI_2 // This is either the distance or 2*Math.PI - distance
  if (phi > Mathf.PI) {
    return MATH_PI_2 - phi
  }
  return phi
}