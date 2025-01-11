const origin: Point = {x: 0, y: 0}

export function setCoordsOrigin(mapElement: HTMLElement) {
  const { x, y } = mapElement.getBoundingClientRect()
  origin.x = x
  origin.y = y
}

export default function getCoords(el: HTMLElement): Point {
  const { x, y } = el.getBoundingClientRect()

  return {
    x: x - origin.x,
    y: y - origin.y,
  }
}

export function getMousePointer(e: MouseEvent): Point {
  return {
    x: e.clientX - origin.x,
    y: e.clientY - origin.y,
  }
}