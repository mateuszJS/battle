import { Point } from "./geom-types"

const getMeanAngle = (angles: f32[]): f32 => {
  const sumSinCos = angles.reduce((acc, angle) => {
    return {
      x: acc.x + Mathf.sin(angle),
      y: acc.y + Mathf.cos(angle),
    }
  }, { x: 0, y: 0 } as Point)

  const length = angles.length as f32
  const meanAngle = Mathf.atan2(
    sumSinCos.x / length,
    sumSinCos.y / length,
  )

  return meanAngle
}

export default getMeanAngle
