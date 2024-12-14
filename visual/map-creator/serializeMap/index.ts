import collectAllObstacles from "./collectAllObstacles";
import collectEnvVisuals, { EnvVisuals } from "./collectEnvVisuals";

export interface SerializedMap {
  width: number
  height: number
  obstacles: Array<Point | null>
  cameraTarget: Point
  envVisuals: EnvVisuals
}

export default function serializeMap(mapEl: HTMLElement): SerializedMap {
  const obstacles = collectAllObstacles(mapEl)
  const envVisuals = collectEnvVisuals(mapEl)
  const firstPoint = obstacles[1] as Point

  return {
    width: 1000,
    height: 1000,
    cameraTarget: firstPoint,
    obstacles,
    envVisuals,
  }
}