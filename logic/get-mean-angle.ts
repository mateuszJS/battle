import { Point } from "./geom-types"
import { Unit } from "./unit"

const getMeanAngle = (units: Unit[]): f32 => {
  const sumSinCos = units.reduce((acc, unit) => {
    return {
      x: acc.x + Mathf.sin(unit.angle),
      y: acc.y + Mathf.cos(unit.angle),
    }
  }, { x: 0, y: 0 } as Point)

  const length = units.length as f32
  const meanAngle = Mathf.atan2(
    sumSinCos.x / length,
    sumSinCos.y / length,
  )

  return meanAngle
}

export default getMeanAngle
