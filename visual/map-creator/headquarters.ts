import { startDrag } from "map-creator"

export function createHQ(parent: HTMLElement): HTMLElement {
  const element = document.createElement('div')
  element.classList.add('headquarter')
  parent.appendChild(element)

  return element
}


/**
 * 
 * @param parent element where new platform should be appended to
 * @returns two elements, first is root of platform, second is the element which should trigger drag on click
 */
export function createInteractiveHQElem(
  parent: HTMLElement,
): HTMLElement {
  const el = createHQ(parent)
  el.classList.add('dragable')
  el.style.width = '100px'
  el.style.height = '100px'

  el.addEventListener('mousedown', e => {
    startDrag(el, e)
  })

  return el
}
