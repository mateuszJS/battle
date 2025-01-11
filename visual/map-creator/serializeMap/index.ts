import getShapes from "./getShapes"
import collectEnvVisuals, { EnvVisuals } from "./collectEnvVisuals";
import getFactories from "./getFactories";

export interface SerializedMap {
  width: number
  height: number
  shapes: [number, number][][]
  cameraTarget: Point
  envVisuals: EnvVisuals
  factories: [number, number, number][]
}

export default function serializeMap(mapEl: HTMLElement, scale: number): SerializedMap {
  const shapes = getShapes(mapEl, scale)
  const envVisuals = collectEnvVisuals(mapEl, scale)
  const factories = getFactories(mapEl, scale)

  const firstPoint = {
    x: factories[0][0],
    y: factories[0][1],
  }
  
  return {
    width: mapEl.clientWidth * scale,
    height: mapEl.clientHeight * scale,
    cameraTarget: firstPoint,
    shapes,
    envVisuals,
    factories,
  }
}