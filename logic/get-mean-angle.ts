import { Point } from "./geom-types"

const getMeanAngle = (angles: f32[]): f32 => {
  const sumSinCos = angles.reduce((acc, angle) => {
    return {
      x: acc.x + Math.sin(angle) as f32,
      y: acc.y + Math.cos(angle) as f32,
    }
  }, { x: 0, y: 0 } as Point)

  const length = angles.length as f32
  const meanAngle = Math.atan2(
    sumSinCos.x / length,
    sumSinCos.y / length,
  ) as f32

  return meanAngle
}

export default getMeanAngle
