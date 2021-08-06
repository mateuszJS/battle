import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from './constants'
import { mapHeightGlob } from '.'
import { Point } from './point'

function convertLogicCoordsToVisual(x: number, y: number): Point {
  const angle = Math.atan2(x, mapHeightGlob - y) + MAP_SKEW_ANGLE
  const distance = Math.hypot(x, mapHeightGlob - y)
  return {
    x: Math.sin(angle) * distance as f32,
    y: (-Math.cos(angle) * distance + mapHeightGlob) * MAP_VERTICAL_MOD as f32,
  }
}

export default convertLogicCoordsToVisual