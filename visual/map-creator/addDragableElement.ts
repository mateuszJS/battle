export default function addDragableElement(
  parent: HTMLElement,
  className: string,
  width: number,
  height: number
): HTMLDivElement {
  const element = document.createElement('div')
  element.classList.add(className, 'dragable')
  element.style.width = width + 'px'
  element.style.height = height + 'px'

  parent.appendChild(element)

  return element
}