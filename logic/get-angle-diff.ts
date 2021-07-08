export function getAngleDiff(alpha: f32, beta: f32): f32 {
  let phi = Math.abs(beta - alpha) % (2.0 * Math.PI) // This is either the distance or 2*Math.PI - distance
  if (phi > Math.PI) {
    return (2.0 * Math.PI) - phi
  }
  return phi
}