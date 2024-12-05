import { getMatrix3d } from "../css-transform-matrix3d"
import getCoords from "../getCoords"

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
    const originalPos = [
      [0, 0],
      [100, 0],
      [100, 100],
      [0, 100],
    ]
    const targetPos = this.anchorPoints
      .map<Point>(el => getCoords(el))
      .map(p => [p.x, p.y])


    this.html.style.transformOrigin = '0 0'
    this.html.style.transform = getMatrix3d(originalPos, targetPos)
  }

  destory() {
    this.html.remove()
  }
}