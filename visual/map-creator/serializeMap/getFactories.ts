import getCoords from "map-creator/getCoords";

export default function getFactories(mapEl: HTMLElement, scale: number): [number, number, number][] {
  const factoryArrowEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="factory-arrow"]'))

  return factoryArrowEls.map(el => {
    const coords = getCoords(el)
    return [
      coords.x * scale,
      coords.y * scale,
      Number.parseInt(el.style.rotate) * Math.PI / 180 * -1
    ]
  })
}