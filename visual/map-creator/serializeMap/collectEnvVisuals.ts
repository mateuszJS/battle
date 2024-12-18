import getCoords from "map-creator/getCoords"
import { getAllBridges } from "map-creator/bridge"

export interface EnvVisuals {
  platforms: Point[][]
  bridges: Point[][]
}

export default function collectEnvVisuals(mapEl: HTMLElement, scale: number): EnvVisuals {
  const platformEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="platform"]'))

  const platforms = platformEls.map(el => {
    const pointEls = Array.from(el.querySelectorAll<HTMLElement>('.anchor-point'))

    const points =  pointEls.map(pointEl => {
      const coords = getCoords(pointEl)
      return {
        x: coords.x * scale,
        y: coords.y * scale,
      }
    })

    const center = points.reduce((acc, p) => ({
      x: acc.x + p.x / points.length,
      y: acc.y + p.y / points.length,
    }), { x: 0, y: 0 })

    return [center, ...points]
  })

  const rawBridges = getAllBridges()
  const bridges = rawBridges.map(rawBridge => (
    rawBridge.anchorPoints.map(el => {
      const coords = getCoords(el)
      return {
        x: coords.x * scale,
        y: coords.y * scale,
      }
    })
  ))
  console.log(bridges)
  return {
    platforms,
    bridges,
  }
}