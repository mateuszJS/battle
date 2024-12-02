import { attachPlatformListeners, updateBriges } from "./setupBridgeEnv"

export function createBridgeEdge(angleVar: string) {
  const bridgeAnchorElem = document.createElement('span')
  bridgeAnchorElem.classList.add('bridge-anchor')

  const anchorEdgeEl = document.createElement('div')
  anchorEdgeEl.classList.add('bridge-anchor-event-catcher')
  bridgeAnchorElem.appendChild(anchorEdgeEl)
  

  for (let j = 0; j < 2; j++) {
    const anchorEdgeEl = document.createElement('div')
    anchorEdgeEl.classList.add('anchor-point')
    bridgeAnchorElem.appendChild(anchorEdgeEl)
  }

  bridgeAnchorElem.style.setProperty('--angle', angleVar);

  return bridgeAnchorElem
}

export function createStaticPlatformElem(parent: HTMLElement): [HTMLElement, HTMLElement] {
  const platformElem = document.createElement('div')
  platformElem.classList.add('platform')

  parent.appendChild(platformElem)

  const octagonElem = document.createElement('div')
  octagonElem.classList.add('octagon')
  platformElem.appendChild(octagonElem)

  const innerOctagonElem = document.createElement('div')
  innerOctagonElem.classList.add('octagon', 'octagon-inner')
  octagonElem.appendChild(innerOctagonElem)

  for(let i = 0; i < 4; i++) {
    platformElem.appendChild(createBridgeEdge(`${90 * i}deg`))
  }

  return [platformElem, octagonElem]
}

/**
 * 
 * @param parent element where new platform should be appended to
 * @returns two elements, first is root of platform, second is the element which should trigger drag on click
 */
export function createInteractivePlatformElem(
  parent: HTMLElement,
  startDrag: (el: HTMLElement, e: MouseEvent) => void,
  mapElement: HTMLElement
): HTMLElement {
  const [platformElem, octagonElem] = createStaticPlatformElem(parent)
  platformElem.classList.add('dragable')
  platformElem.style.width = '100px'
  platformElem.style.height = '100px'

  attachPlatformListeners(platformElem, startDrag, mapElement)
  octagonElem.addEventListener('mousedown', e => {
    startDrag(platformElem, e)
    updateBriges(platformElem)
  })

  return platformElem
}
