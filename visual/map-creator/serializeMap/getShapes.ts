import { getBridge } from "map-creator/bridge";
import getCoords from "map-creator/getCoords";

function getChildElementIndex(el: HTMLElement) {
  return Array.prototype.indexOf.call(el.parentElement!.children, el);
}

function getShape(
  platformEl: HTMLElement,
  startIndex: number,
  shapes: HTMLElement[][]
) {
  const anchorPoints = platformEl.querySelectorAll<HTMLElement>('.anchor-point')

  for (let i = 0; i < anchorPoints.length; i ++) {
    const index = (startIndex + i) % anchorPoints.length // move though all points, regarding of start point
    // just make sure full circle is completed

    const anchorPoint = anchorPoints[index]
    const lastShape = shapes[shapes.length - 1]
    if (anchorPoint.hasAttribute('used')) {
      if (lastShape.length > 0) {
        shapes.push([])
      }
      continue
    }
    lastShape.push(anchorPoint)
    anchorPoint.setAttribute('used', '');

    if (index % 2 === 0) { // we analyze bridge only for edge first points(platform even points)
      const bridge = getBridge(anchorPoint)

      if (bridge) {
        const nextBridgePoint = bridge.anchorPoints.find(p => {
          // it seems to be very fragile to any changes of html in platform(add anothe layer of wrapper)
          return p.parentElement!.parentElement! !== platformEl && getChildElementIndex(p) % 2 === 0 // because there is an event catcher first....
        })

        if (!nextBridgePoint) throw Error('There is no odd indexed point of the other side of the bridge')

        const nextBridgePointIndex = getChildElementIndex(nextBridgePoint.parentElement!) - 1 // because there is a visual octagon before
        
        getShape(
          nextBridgePoint.parentElement!.parentElement!, // UGLY AND FRAGILE
          nextBridgePointIndex * 2 + 1,
          shapes
        )
        
        // go to the netx platform
      }
    }
  }
}

export default function getShapes(mapEl: HTMLElement, scale: number): [number, number][][] {
  const shapes: HTMLElement[][] = [[]]
  const platformEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="platform"]'))

  platformEls.forEach(el => {
    getShape(el, 0, shapes)
  })

  return shapes.map(shape => (
    shape.map(el => {
      const coords = getCoords(el)
      return [
        coords.x * scale,
        coords.y * scale,
      ]
    })
  ))
}