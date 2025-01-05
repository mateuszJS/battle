import getShapes from "./getShapes";
import collectEnvVisuals, { EnvVisuals } from "./collectEnvVisuals";

export interface SerializedMap {
  width: number
  height: number
  shapes: [number, number][][]
  cameraTarget: Point
  envVisuals: EnvVisuals
}

export default function serializeMap(mapEl: HTMLElement, scale: number): SerializedMap {
  const shapes = getShapes(mapEl, scale)
  const envVisuals = collectEnvVisuals(mapEl, scale)
  const firstPoint = {
    x: 500,
    y: 500,
  }
  
  return {
    width: mapEl.clientWidth * scale,
    height: mapEl.clientHeight * scale,
    cameraTarget: firstPoint,
    shapes,
    envVisuals,
  }
}