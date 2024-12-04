import getCoords from "map-creator/getCoords"
import Bridge from "./Bridge"

const bridges: Bridge[] = []

function getAnchorPointEls(bridgeEdgeA: HTMLElement, bridgeEdgeB?: HTMLElement): HTMLElement[] {
  return [
    ...bridgeEdgeA.querySelectorAll<HTMLElement>('.anchor-point'),
    ...(bridgeEdgeB?.querySelectorAll<HTMLElement>('.anchor-point') ?? []),
  ]
}

export function updateBridges() {
  bridges.forEach(bridge => bridge.render())
}

export function addNewBridge(bridgeEdgeA: HTMLElement, bridgeEdgeB: HTMLElement) {
  const mapElement = document.querySelector<HTMLElement>('main')! // jsut for testing
  const anchorPoints = getAnchorPointEls(bridgeEdgeA, bridgeEdgeB)
  const bridgePreview = new Bridge(anchorPoints, mapElement)
  bridges.push(bridgePreview)
}

/** We assume that latest bridge can be only in preview */
export function updateLastBridge(bridgeEdgeA: HTMLElement, bridgeEdgeB: HTMLElement) {
  // we need to determine which points belong to fake cursor bridge edge and which are connected to platforms
  const bridgePreview = bridges[bridges.length - 1]
  const anchorPoints = getAnchorPointEls(bridgeEdgeA, bridgeEdgeB)
  const allPoints = [...bridgePreview.anchorPoints, ...anchorPoints]
  const newPoints = [...allPoints].filter(point => (
    allPoints.filter(p => p === point).length === 1
    // if it appeard two times, it's because fake cursor bridge is used in both arrays
  ))

  bridges[bridges.length - 1].anchorPoints = newPoints
}

/** We assume that latest bridge can be only in preview */
export function removeBridgePreview() {
  bridges[bridges.length - 1].destory()
}

export function onPreviewSnap(el: HTMLElement, snapTo: HTMLElement) {
  el.style.rotate = getComputedStyle(snapTo).rotate
}

export function adjustBirdgeEdgePreview(el: HTMLElement) {
  const bridgePreview = bridges[bridges.length - 1]
  const fakeBridgeEdge = getAnchorPointEls(el)
  const elCoords = getCoords(el)
  
  const existingBridgeEdge = bridgePreview.anchorPoints.filter(p => !fakeBridgeEdge.includes(p))
  const anchorA = getCoords(existingBridgeEdge[0])
  const anchorB = getCoords(existingBridgeEdge[1])
  const center = {
    x: (anchorA.x + anchorB.x) / 2,
    y: (anchorA.y + anchorB.y) / 2,
  }
  const angle = Math.atan2(
    center.y - elCoords.y, // reversed because of CSS
    elCoords.x  - center.x
  ) * -1 * 180 / Math.PI // -1 because of CSS

  el.style.rotate = `${angle + 90}deg`
}