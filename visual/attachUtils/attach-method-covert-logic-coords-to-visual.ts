import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from "../../logic/constants"

const attachMethodToConvertLogicCoordsToVisual = (mapHeight: number) => {
  window.convertLogicCoordToVisual = (x: number, y: number): [number, number] => {
    const angle = Math.atan2(x, mapHeight - y) + MAP_SKEW_ANGLE
    const distance = Math.hypot(x, mapHeight - y)
    return [
      Math.sin(angle) * distance,
      (-Math.cos(angle) * distance + mapHeight) * MAP_VERTICAL_MOD,
    ]
  }
}

export default attachMethodToConvertLogicCoordsToVisual