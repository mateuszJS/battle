import { getBridge } from "map-creator/bridge"
import getCoords from "map-creator/getCoords";

export interface SerializedMap {
  width: number
  height: number
  obstacles: Array<Point | null>
}

function getChildElementIndex(el: HTMLElement) {
  return Array.prototype.indexOf.call(el.parentElement!.children, el);
}

function visitPlatform(
  platformEl: HTMLElement,
  startIndex: number,
  visited: Array<HTMLElement | null>
) {
  const anchorPoints = platformEl.querySelectorAll<HTMLElement>('.anchor-point')

  for (let i = 0; i < anchorPoints.length; i ++) {
    const index = (startIndex + i) % anchorPoints.length // move though all points, regarding of start point
    // just make sure full circle is completed

    const anchorPoint = anchorPoints[index]

    if (visited.includes(anchorPoint)) {
      if (visited[visited.length - 1] !== null) {
        // if we havne't put sentinel(null) value that divides shapes, please put
        visited.push(null)
      }
      continue
    }
    visited.push(anchorPoint)

    if (index % 2 === 0) { // we analyze bridge only for edge first points(platform even points)
      const bridge = getBridge(anchorPoint)

      if (bridge) {
        const nextBridgePoint = bridge.anchorPoints.find(p => {
          // it seems to be very fragile to any changes of html in platform(add anothe layer of wrapper)
          return p.parentElement!.parentElement! !== platformEl && getChildElementIndex(p) % 2 === 0 // because there is an event catcher first....
        })

        if (!nextBridgePoint) throw Error('There is no odd indexed point of the other side of the bridge')

        const nextBridgePointIndex = getChildElementIndex(nextBridgePoint.parentElement!) - 1 // because there is a visual octagon before
        
        visitPlatform(
          nextBridgePoint.parentElement!.parentElement!, // UGLY AND FRAGILE
          nextBridgePointIndex * 2 + 1,
          visited
        )
        
        // go to the netx platform
      }
    }
  }
}


export default function serializeMap(mapNode: HTMLElement): SerializedMap {
  const platformEls = Array.from(mapNode.querySelectorAll<HTMLElement>('[kind="platform"]'))
  const visited: Array<HTMLElement | null> = [null] // null is a sentinel value which indicates new shape

  platformEls.forEach(el => {
    visitPlatform(el, 0, visited)
  })

  const points = visited.map(p => p === null
    ? null
    : getCoords(p)
  )

  return {
    width: 1000,
    height: 1000,
    obstacles: points
  }
}