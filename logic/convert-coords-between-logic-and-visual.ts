import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from './constants'
import { mapHeightGlob } from '.'
import { Point } from './geom-types'

export function convertLogicCoordsToVisual(x: f32, y: f32): Point {
  const angle = Mathf.atan2(x, mapHeightGlob - y) + MAP_SKEW_ANGLE
  const distance = Mathf.hypot(x, mapHeightGlob - y)
  return {
    x: Mathf.sin(angle) * distance,
    y: (-Mathf.cos(angle) * distance + mapHeightGlob) * MAP_VERTICAL_MOD,
  }
}

export function convertVisualCoordsToLogic(x: f32, y: f32): Point {
  const correctY = y / MAP_VERTICAL_MOD
  const angle = Mathf.atan2(x, mapHeightGlob - correctY) - MAP_SKEW_ANGLE
  const distance = Mathf.hypot(x, mapHeightGlob - correctY)

  return {
    x: Mathf.sin(angle) * distance,
    y: -Mathf.cos(angle) * distance + mapHeightGlob,
  }
}

export function convertVisualOffsetToLogic(x: f32, y: f32): Point {
  const angle = Mathf.atan2(x, y) - MAP_SKEW_ANGLE
  const distance = Mathf.hypot(x, y)

  return {
    x: Mathf.sin(angle) * distance,
    y: -Mathf.cos(angle) * distance,
  }
}

export function convertLogicAngleToVisual(angle: f32): f32 {
  const skewedAngle = angle + MAP_SKEW_ANGLE
  return Mathf.atan2(Mathf.sin(skewedAngle), Mathf.cos(skewedAngle) * MAP_VERTICAL_MOD)
}
