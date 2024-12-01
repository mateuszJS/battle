const MATH_2_PI = Math.PI * 2

// const get

// const LUT = {

// }

function generateAngles(num: number) {
  return Array.from({ length: num }, (_, i) => {
      const angle = (i / num) * 2 * Math.PI; const cos = Math.cos(angle); const sin = Math.sin(angle)
      return Math.atan2(sin / 0.52, cos)
  })
}
generateAngles(0)
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
/*
  How should it work:
  handle different angles, so needs to receive quater of angles as a input
  [0, 30, 50, 90]
*/
export default function mapAngleToIndex(angle: number, angles: number): number {
  // console.log(angle, angles)
  const singleAngleSlice = MATH_2_PI / angles
  const safeAngle = (angle + MATH_2_PI + singleAngleSlice / 2) % MATH_2_PI

  return Math.floor(safeAngle / singleAngleSlice)
}
