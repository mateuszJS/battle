import collectAllObstacles from "./collectAllObstacles";
import collectEnvVisuals, { EnvVisuals } from "./collectEnvVisuals";

export interface SerializedMap {
  width: number
  height: number
  obstacles: number[]
  cameraTarget: Point
  envVisuals: EnvVisuals
}

export default function serializeMap(mapEl: HTMLElement, scale: number): SerializedMap {
  const obstacles = collectAllObstacles(mapEl, scale)
  const envVisuals = collectEnvVisuals(mapEl, scale)
  const firstPoint = {
    x: obstacles[1],
    y: obstacles[2],
  }

  return {
    width: 1000,
    height: 1000,
    cameraTarget: firstPoint,
    obstacles,
    envVisuals,
  }
}