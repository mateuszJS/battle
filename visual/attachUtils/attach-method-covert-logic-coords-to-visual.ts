import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from "~/logic-contants"

const attachMethodToConvertLogicCoordsToVisual = (mapHeight) => {
  window.convertLogicCoordToVisual = (x: number, y: number): [number, number] => {
    const angle = Math.atan2(x, mapHeight - y) + MAP_SKEW_ANGLE
    const distance = Math.hypot(x, mapHeight - y)
    return [
      Math.sin(angle) * distance,
      (-Math.cos(angle) * distance + mapHeight) * MAP_VERTICAL_MOD,
    ]
  }

  window.convertLogicAngleToVisual = (sourceAngle: number): number => {
    const angle = sourceAngle + MAP_SKEW_ANGLE
    return Math.atan2(Math.sin(angle), Math.cos(angle))
    // return Math.atan2(Math.sin(angle), Math.cos(angle) * MAP_VERTICAL_MOD)
  }
}

export default attachMethodToConvertLogicCoordsToVisual