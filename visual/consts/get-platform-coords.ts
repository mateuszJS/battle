// import { PLATFORM_RADIUS } from 'logic/constants.ts'
import { PLATFORM_RADIUS } from '../../logic/constants'

const BRIDGE_ANGLE = 53 * Math.PI / 180
const DIAGONALLY_ANGLE = 37 * Math.PI / 180
const INITIAL_ANGLE_OFFSET = 0.035 // why there is any offset?!

export default (offsetDistance: number = 0) => {
  const radius = PLATFORM_RADIUS - offsetDistance
  let tempAngle = INITIAL_ANGLE_OFFSET - BRIDGE_ANGLE / 2 - DIAGONALLY_ANGLE

  return Array.from({ length: 8 }, (_, index) => {
    tempAngle += index % 2 === 0 ? DIAGONALLY_ANGLE : BRIDGE_ANGLE
    return {
      x: Math.sin(tempAngle) * radius,
      y: -Math.cos(tempAngle) * radius,
    }
  })
}