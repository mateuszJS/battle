import collectAllObstacles from "./collectAllObstacles";
import collectEnvVisuals, { EnvVisuals } from "./collectEnvVisuals";

export interface SerializedMap {
  width: number
  height: number
  obstacles: Array<Point | null>
  cameraTarget: Point
  envVisuals: EnvVisuals
}

export default function serializeMap(mapEl: HTMLElement, scale: number): SerializedMap {
  const obstacles = collectAllObstacles(mapEl, scale)
  const envVisuals = collectEnvVisuals(mapEl, scale)
  const firstPoint = obstacles[1] as Point

  return {
    width: 1000,
    height: 1000,
    cameraTarget: firstPoint,
    obstacles,
    envVisuals,
  }
}