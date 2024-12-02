import { applyTransform } from "./css-transform-matrix3d"

let mapAreaElem: HTMLElement
let anchorSource: HTMLElement | null = null
let bridgePreviewEndSnap: HTMLElement | null = null
let bridgePreview: HTMLElement | null = null

interface BridgeAnchor {
  base: HTMLElement // platform // durign creation we can fake it
  anchor: HTMLElement // anchor
}
interface Bridge {
  elem: HTMLElement
  from: BridgeAnchor
  to: BridgeAnchor
}
const bridges: Bridge[] = []

export function updateBriges(updatedPlatform: HTMLElement) {
  bridges.forEach(bridge => {
    if (bridge.from.base === updatedPlatform || bridge.to.base === updatedPlatform) {
      updateBridge(bridge.elem, bridge.from.anchor, bridge.to.anchor)
    }
  })
}

function updateBridge(bridgeElem: HTMLElement, fromElem: HTMLElement, to: HTMLElement | Point) {
  const { x: mapAreaX, y: mapAreaY } = mapAreaElem.getBoundingClientRect()

  const {
    x: sourceAbsoluteX,
    y: sourceAbsoluteY,
    width: sourceWidth,
    height: sourceHeight,
  } = fromElem.getBoundingClientRect()

  const sourceX = sourceAbsoluteX - mapAreaX
  const sourceY = sourceAbsoluteY - mapAreaY

  const originalPos = [
    [0, 0],
    [100, 0],
    [100, 100],
    [0, 100]
  ]
  
  let destX; 
  let destY;

  if ('getBoundingClientRect' in to) {
    const { x, y } = to.getBoundingClientRect()
    destX = x
    destY = y
  } else {
    destX = to.x - sourceWidth / 2
    destY = to.y - sourceHeight / 2
  }

  destX -= mapAreaX
  destY -= mapAreaY

  // const [offsetX, offsetY] = width > height ? [width, 0] : [0, height]

  let targetPos;
  if (sourceWidth > sourceHeight) {
    targetPos = [
      [sourceX, sourceY],
      [sourceX + sourceWidth, sourceY],
      [destX + sourceWidth, destY],
      [destX, destY],
    ]
  } else {
    targetPos = [
      [sourceX, sourceY],
      [destX, destY],
      [destX, destY + sourceHeight],
      [sourceX, sourceY + sourceHeight],
    ]
  }
  // order of points in targetPos needs to be same as originalPos
  applyTransform(bridgeElem, originalPos, targetPos)
}

export function updateBridgePreview(event: MouseEvent) {
  if (anchorSource && bridgePreview) { // actually one of those could be checked, but for TS safety...
      const to: Point = {
        x: event.clientX,
        y: event.clientY,
      }
      updateBridge(bridgePreview, anchorSource, to)
  }
}

export default function setupBridgeEnv(mapAreaElement: HTMLElement) {
  mapAreaElem = mapAreaElement

  window.document.body.addEventListener('mouseup', () => {
    if (anchorSource && bridgePreview) {

      if (bridgePreviewEndSnap) {
        bridges.push({
          elem: bridgePreview,
          from: {
            base: anchorSource.parentElement!.parentElement!,
            anchor: anchorSource,
          },
          to: {
            base: bridgePreviewEndSnap.parentElement!.parentElement!,
            anchor: bridgePreviewEndSnap,
          }
        })
      } else {
        bridgePreview.remove()
      }

      anchorSource = null
      bridgePreview = null
      bridgePreviewEndSnap = null
    }
  })
}

export function attachPlatformListeners(
  platform: HTMLElement,
) {
  const octagonElem = platform.querySelector<HTMLElement>('.octagon')
  if (!octagonElem) throw Error('Invalid platform html element. No .octagon has been found within the element.')

  const bridgeAnchors = Array.from<HTMLElement>(platform.querySelectorAll('.bridge-anchor'));
  if (bridgeAnchors.length !== 4) throw Error('Invalid platform html element. 4 elements of class bridge-anchor should be present.')

  // attaching bridge events
  bridgeAnchors.forEach(node => {
    node.addEventListener('mousedown', e => {
      anchorSource = node

      bridgePreview = document.createElement('div')
      bridgePreview.classList.add('bridge-preview')
      updateBridgePreview(e)
      mapAreaElem.appendChild(bridgePreview)
    })

    node.addEventListener('mouseenter', (e) => {
      const element = e.currentTarget as HTMLElement
      if (anchorSource) {
        element.classList.add('accept')
        bridgePreviewEndSnap = element
      }
    })

    node.addEventListener('mouseleave', (e) => {
      const element = e.currentTarget as HTMLElement
      element.classList.remove('accept')
      bridgePreviewEndSnap = null
    })
  })
}

export function getBridges(): Bridge[] {
  return bridges
}