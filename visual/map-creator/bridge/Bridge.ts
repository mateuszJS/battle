import { getMatrix3d } from "../css-transform-matrix3d"
import getCoords from "../getCoords"

function sortPoints(points: Point[]) {
  const center = points.reduce<Point>((acc, p) => ({
    x: acc.x + p.x * 0.25,
    y: acc.y + p.y * 0.25,
  }), { x: 0, y: 0 })

  const pointsWithAngle = points.map(p => {
    const angle = Math.atan2(p.y - center.y, p.x - center.x)
    return {
      ...p,
      angle: (angle + 2 * Math.PI) % 2 * Math.PI
    }
  })

  pointsWithAngle.sort((a, b) => a.angle - b.angle)

  return pointsWithAngle
}

export default class Bridge {
  private html: HTMLElement

  constructor(
    public anchorPoints: HTMLElement[],
    parent: HTMLElement
  ) {
    this.html = document.createElement('div')
    this.html.classList.add('bridge-preview')
    parent.appendChild(this.html)
  }


  render() {
    const points = this.anchorPoints.map<Point>(el => getCoords(el))
    const originalPos = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ]

    const targetPos = sortPoints(points).map(p => [p.x, p.y])

    this.html.style.transformOrigin = '0 0'

    // if matrix contains incorrect values (like NaN because it itposssible ot create a shape) then transform won't be applied
    this.html.style.transform = getMatrix3d(originalPos, targetPos)
  }

  destory() {
    this.html.remove()
  }
}