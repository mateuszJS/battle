import { attachPlatformListeners, updateBriges } from "./setupBridgeEnv"


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

  // const bridgeAnchorsContainer = document.createElement('div')
  for(let i = 0; i < 4; i++) {
    const bridgeAnchorElem = document.createElement('span')
    bridgeAnchorElem.classList.add('bridge-anchor')
    platformElem.appendChild(bridgeAnchorElem)

    const anchorEdgeEl = document.createElement('div')
    anchorEdgeEl.classList.add('bridge-anchor-cursor-catcher')
    bridgeAnchorElem.appendChild(anchorEdgeEl)
    

    for (let j = 0; j < 2; j++) {
      const anchorEdgeEl = document.createElement('div')
      anchorEdgeEl.classList.add('bridge-anchor-point')
      bridgeAnchorElem.appendChild(anchorEdgeEl)
    }
  }

  // platformElem.appendChild(bridgeAnchorsContainer)

  return [platformElem, octagonElem]
}

/**
 * 
 * @param parent element where new platform should be appended to
 * @returns two elements, first is root of platform, second is the element which should trigger drag on click
 */
export function createInteractivePlatformElem(
  parent: HTMLElement,
  startDrag: (el: HTMLElement, e: MouseEvent) => void
): HTMLElement {
  const [platformElem, octagonElem] = createStaticPlatformElem(parent)
  platformElem.classList.add('dragable')
  platformElem.style.width = '100px'
  platformElem.style.height = '100px'

  attachPlatformListeners(platformElem)
  octagonElem.addEventListener('mousedown', e => {
    startDrag(platformElem, e)
    updateBriges(platformElem)
  })

  return platformElem
}
