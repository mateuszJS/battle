import { MAP_VERTICAL_MOD } from "logic-contants";

const MATH_2_PI = Math.PI * 2

/*
To generate angles for blender
function generateAngles(num) {
  return Array.from({ length: num }, (_, i) => {
      const angle = (i / num) * 2 * Math.PI
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return Math.atan2(sin / 0.52, cos) * (180 / Math.PI)
  })
}
*/

export default function mapAngleToIndex(angle: number, numOfAngles: number): number {
  const angleSlice = (1 / numOfAngles) * MATH_2_PI

  const topViewAngle = Math.atan2(
    Math.sin(angle),
    Math.cos(angle) / MAP_VERTICAL_MOD
  )

  const shiftedByHalfSlice = topViewAngle - angleSlice / 2
  const positiveAngle = shiftedByHalfSlice + MATH_2_PI
  const angleSlizeIndex = Math.ceil(positiveAngle / angleSlice) % numOfAngles

  return angleSlizeIndex
}
