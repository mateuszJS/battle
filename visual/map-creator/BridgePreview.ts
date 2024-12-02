import { applyTransform } from "./css-transform-matrix3d"
import getCoords from "./getCoords"

export default class BridgePreview {
  private html: HTMLElement

  constructor(private anchorPoints: HTMLElement[], parent: HTMLElement) {
    this.html = document.createElement('div')
    this.html.classList.add('bridge-preview')
    parent.appendChild(this.html)
  }

  set updateAnchorPoints(points: HTMLElement[]) {
    this.anchorPoints = points
  }

  render() {
    const points = this.anchorPoints.map<Point>(el => getCoords(el))
    const originalPos = [
      [0, 0],
      [0, 100],
      [100, 0],
      [100, 100],
    ]

    const center = points.reduce<Point>((acc, p) => ({
      x: p.x * 0.25,
      y: p.y * 0.25,
    }), { x: 0, y: 0 })
    
    const pointsWithAngles = points.map(p => {
      const cssY = p.y - center.y
      const cartesianY = -cssY
      const angle = Math.atan2(cartesianY, p.x - center.x)
      const oppositeAngle = angle + Math.PI
      const safeOppositeAngle = oppositeAngle % (Math.PI * 2)

      return {
        ...p,
        angle: safeOppositeAngle
      }
    })
    const sortedPoints = pointsWithAngles.sort((a, b) => a.angle - b.angle)

    const targetPos = sortedPoints.map(p => {
      console.log([p.x, p.y])
      return [p.x, p.y]
   })

    applyTransform(this.html, originalPos, targetPos)
  }
}