import getCoords from "map-creator/getCoords"
import Bridge from "./Bridge"

export const bridges: Bridge[] = []

function getAnchorPointEls(bridgeEdgeA: HTMLElement, bridgeEdgeB?: HTMLElement): HTMLElement[] {
  return [
    ...bridgeEdgeA.querySelectorAll<HTMLElement>('.anchor-point'),
    ...(bridgeEdgeB?.querySelectorAll<HTMLElement>('.anchor-point') ?? []),
  ]
}

export function updateBridges() {
  bridges.forEach(bridge => bridge.render())
}

export function addNewBridge(copyBridgeEdge: HTMLElement, triggerBridgeEdge: HTMLElement) {
  const triggerAnchorPoint = getAnchorPointEls(triggerBridgeEdge)
  const bridgeIndex = bridges.findIndex(b => b.anchorPoints.includes(triggerAnchorPoint[0]))  // we jsut need to test one, both is rendudant

  if (bridgeIndex !== -1) {
    const bridge = bridges[bridgeIndex]
    bridge.anchorPoints = [
      ...bridge.anchorPoints.filter(p => !triggerAnchorPoint.includes(p)), // remove points from where is trigger node is and use fake one instead
      ...getAnchorPointEls(copyBridgeEdge)
    ]
    bridges.splice(bridgeIndex, 1) // most it to last position
    bridges.push(bridge) // only last bridge can be in "preview"
  } else {
    const mapElement = document.querySelector<HTMLElement>('main')! // just for testing
    const anchorPoints = getAnchorPointEls(copyBridgeEdge, triggerBridgeEdge)
    const bridgePreview = new Bridge(anchorPoints, mapElement)
    bridges.push(bridgePreview)
  }
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
  const bridgePreview = bridges.pop()
  bridgePreview?.destory()
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

export function getBridge(anchorPoint: HTMLElement): Bridge | undefined {
  return bridges.find(bridge => bridge.anchorPoints.includes(anchorPoint))
}

function getElByIndex(platformEl: HTMLElement, index: number) {
  return platformEl.querySelectorAll<HTMLElement>('[kind="bridge-edge"]')[index]
}

function getIndexByEl(el: HTMLElement, selector: string, searchInEL: HTMLElement) {
  return Array.prototype.indexOf.call(
    searchInEL.querySelectorAll(selector),
    el
  );
}

export function getStoreBridges(mapEl: HTMLElement) {


  return bridges.map(bridge => {
    const bridgeEdgeElPair = [...new Set(
      bridge.anchorPoints.map(p => p.parentElement!)
    )]

    return [
      {
        platformIndex: getIndexByEl(bridgeEdgeElPair[0].parentElement!, '[kind="platform"]', mapEl),
        bridgeEdgeIndex: getIndexByEl(bridgeEdgeElPair[0], '[kind="bridge-edge"]', bridgeEdgeElPair[0].parentElement!)
      },
      {
        platformIndex: getIndexByEl(bridgeEdgeElPair[1].parentElement!, '[kind="platform"]', mapEl),
        bridgeEdgeIndex: getIndexByEl(bridgeEdgeElPair[1], '[kind="bridge-edge"]', bridgeEdgeElPair[1].parentElement!)
      },
    ]
  })
}

export function restoreBridges(
  platforms: HTMLElement[],
  bridgesData: Array<Array<{ platformIndex: number, bridgeEdgeIndex: number }>>
) {
  bridgesData.forEach(([dataEdgeA, dataEdgeB]) => {
    addNewBridge(
      getElByIndex(platforms[dataEdgeA.platformIndex], dataEdgeA.bridgeEdgeIndex),
      getElByIndex(platforms[dataEdgeB.platformIndex], dataEdgeB.bridgeEdgeIndex),
    )
  })
  updateBridges()
}