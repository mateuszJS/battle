import getCoords from "map-creator/getCoords"
import { getAllBridges } from "map-creator/bridge"

export interface EnvVisuals {
  platforms: [number, number][][]
  bridges: [number, number][][]
}

export default function collectEnvVisuals(mapEl: HTMLElement, scale: number): EnvVisuals {
  const platformEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="platform"]'))

  const platforms = platformEls.map(el => {
    const pointEls = Array.from(el.querySelectorAll<HTMLElement>('.anchor-point'))

    return pointEls.map<[number, number]>(pointEl => {
      const coords = getCoords(pointEl)
      return [coords.x * scale, coords.y * scale]
    })
  })

  const rawBridges = getAllBridges()
  const bridges = rawBridges.map(rawBridge => {
    return rawBridge.anchorPoints.map<[number, number]>(el => {
      const coords = getCoords(el)
      return [coords.x * scale, coords.y * scale]
    })
  })

  return {
    platforms,
    bridges,
  }
}