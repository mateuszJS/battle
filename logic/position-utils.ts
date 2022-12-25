import { Point } from "./geom-types"

export const UNITS_OFFSET: StaticArray<StaticArray<Point>> = [
  [{x: 0, y: 0}],[{x: -28, y: -27},{x: 29, y: 28}],[{x: -38, y: -37},{x: 52, y: -14},{x: -13, y: 52}],[{x: -43, y: -41},{x: 42, y: -43},{x: 44, y: 42},{x: -41, y: 44}],[{x: -45, y: -44},{x: 29, y: -57},{x: 64, y: 10},{x: 11, y: 64},{x: -56, y: 30}],[{x: -47, y: -46},{x: 17, y: -64},{x: 65, y: -18},{x: 48, y: 47},{x: -16, y: 65},{x: -64, y: 19}],[{x:0, y:0},{x: -49, y: -47},{x: 17, y: -66},{x: 66, y: -18},{x: 50, y: 48},{x: -16, y: 67},{x: -65, y: 19}]
]

/*
new Array(7).fill(false).map((_, index) => {
  const spread = (index  / (index + 1)) * 80
  const angleDiff = (Math.PI * 2) / (Math.min(index, 5) + 1)
  let points = index === 6 ? ['{x:0, y:0}'] : []
  for (let i = 0; i <= Math.min(index, 5); i++) {
    points.push(`{x: ${Math.ceil(Math.sin(-0.8 + i * angleDiff) * spread)}, y: ${Math.ceil(-Math.cos(-0.8 + i * angleDiff) * spread)}}`)
  }
  return `[${points.join()}]`
}).join()
*/