import addDragableElement from "./addDragableElement"
import { applyTransform } from "./css-transform-matrix3d"

/**
 * 
 * @param parent element where new platform should be appended to
 * @returns two elements, first is root of platform, second is the element which should trigger drag on click
 */
export function createPlatformElem(parent: HTMLElement): [HTMLElement, HTMLElement] {
  const platformElem = addDragableElement(parent, 'platform', 100, 100)

  const octagonElem = document.createElement('div')
  octagonElem.classList.add('octagon')
  platformElem.appendChild(octagonElem)

  const bridgeAnchorsContainer = document.createElement('div')
  for(let i = 0; i < 4; i++) {
    const bridgeAnchorElem = document.createElement('div')
    bridgeAnchorElem.classList.add('bridge-anchor')
    bridgeAnchorsContainer.appendChild(bridgeAnchorElem)
  }

  platformElem.appendChild(bridgeAnchorsContainer)

  return [platformElem, octagonElem]
}

let bridgeSource: HTMLElement | null = null
let bridgePreviewEndSnap: HTMLElement | null = null
let bridgePreview: HTMLElement | null = null

export function updateBridgePreview(event: MouseEvent, mapAreaElem: HTMLElement) {
  if (bridgeSource && bridgePreview) { // actually one of those could be checked, but for TS safety...
    const { x: mapAreaX, y: mapAreaY } = mapAreaElem.getBoundingClientRect()
    const { x: sourceAbsoluteX, y: sourceAbsoluteY, width, height } = bridgeSource.getBoundingClientRect()
    const sourceX = sourceAbsoluteX - mapAreaX
    const sourceY = sourceAbsoluteY - mapAreaY

    const originalPos = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100]
    ]
    
    let destX = event.clientX - width / 2
    let destY = event.clientY - height / 2

    if (bridgePreviewEndSnap) {
      const { x, y } = bridgePreviewEndSnap.getBoundingClientRect()
      destX = x
      destY = y
    }

    destX -= mapAreaX
    destY -= mapAreaY
    // const [offsetX, offsetY] = width > height ? [width, 0] : [0, height]

    let targetPos;
    if (width > height) {
      targetPos = [
        [sourceX, sourceY],
        [sourceX + width, sourceY],
        [destX + width, destY],
        [destX, destY],
      ]
    } else {
      targetPos = [
        [sourceX, sourceY],
        [destX, destY],
        [destX, destY + height],
        [sourceX, sourceY + height],
      ]
    }

    // order of points in targetPos needs to be same as originalPos
    applyTransform(bridgePreview, originalPos, targetPos)
  }
}


export default function setupBridgeEnv(mapAreaElem: HTMLElement) {
  window.document.body.addEventListener('mouseup', () => {
    if (bridgeSource && bridgePreview) {
      bridgeSource = null
      bridgePreview.remove()
      bridgePreview = null
    }
  })
}

export function attachPlatformListeners(
  platform: HTMLElement,
  mapAreaElem: HTMLElement
) {
  const octagonElem = platform.querySelector<HTMLElement>('.octagon')
  if (!octagonElem) throw Error('Invalid platform html element. No .octagon has been found within the element.')

  const bridgeAnchors = Array.from<HTMLElement>(platform.querySelectorAll('.bridge-anchor'));
  if (bridgeAnchors.length !== 4) throw Error('Invalid platform html element. 4 elements of class bridhe-anchor should be present.')

  // attaching bridge events
  bridgeAnchors.forEach(node => {
    node.addEventListener('mousedown', e => {
      const { width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect()
      bridgeSource = node

      bridgePreview = document.createElement('div')
      bridgePreview.classList.add('bridge-preview')
      mapAreaElem.appendChild(bridgePreview)
    })

    node.addEventListener('mouseenter', (e) => {
      const element = e.currentTarget as HTMLElement
      if (!!bridgeSource) {
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