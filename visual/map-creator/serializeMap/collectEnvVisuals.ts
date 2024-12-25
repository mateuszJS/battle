import getCoords from "map-creator/getCoords"
import { getAllBridges } from "map-creator/bridge"

export interface EnvVisuals {
  platforms: number[]
  bridges: number[]
}

export default function collectEnvVisuals(mapEl: HTMLElement, scale: number): EnvVisuals {
  const platformEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="platform"]'))

  const platforms = platformEls.flatMap(el => {
    const pointEls = Array.from(el.querySelectorAll<HTMLElement>('.anchor-point'))

    const floats = pointEls.flatMap(pointEl => {
      const coords = getCoords(pointEl)
      return [coords.x * scale, coords.y * scale]
    })
    return [-1, ...floats]
  })

  const rawBridges = getAllBridges()
  const bridges = rawBridges.flatMap(rawBridge => {
    const floats = rawBridge.anchorPoints.flatMap(el => {
      const coords = getCoords(el)
      return [coords.x * scale, coords.y * scale]
    })
    return [-1, ...floats]
  })

  return {
    platforms,
    bridges,
  }
}