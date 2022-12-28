// import { Universe } from '../../crate/pkg/index'

// let graph = null

// const BLOCK_SIZE = 50

// const drawCircle = (x: number, y: number, color = 0xff00ff) => {
//   graph.lineStyle(0, 0xffffff, 0)
//   graph.beginFill(color, 0.4)
//   graph.drawCircle(x, y, 10)
//   graph.endFill()
// }

// const drawRect = (x: number, y: number) => {
//   graph.drawRect(x, y, BLOCK_SIZE, BLOCK_SIZE)
//   graph.endFill()
// }

// const rawLine = [
//   // { x: 3 * BLOCK_SIZE, y: 6 * BLOCK_SIZE },
//   // { x: 12 * BLOCK_SIZE, y: 6 * BLOCK_SIZE },
//   // { x: 11 * BLOCK_SIZE, y: 3 * BLOCK_SIZE },
//   // { x: 11 * BLOCK_SIZE, y: 9 * BLOCK_SIZE },
//   // { x: 3 * BLOCK_SIZE, y: 5 * BLOCK_SIZE },
//   // { x: 12 * BLOCK_SIZE, y: 9 * BLOCK_SIZE },
//   { x: 12 * BLOCK_SIZE, y: 2 * BLOCK_SIZE },
//   { x: 3 * BLOCK_SIZE, y: 9 * BLOCK_SIZE },
// ]
// const line = [
//   { x: rawLine[0].x / BLOCK_SIZE, y: rawLine[0].y / BLOCK_SIZE },
//   { x: rawLine[1].x / BLOCK_SIZE, y: rawLine[1].y / BLOCK_SIZE },
// ]
// const diffX = line[1].x - line[0].x
// const diffY = line[0].y - line[1].y
// const threshold = 1
// // if (Math.abs(diffX) < Number.EPSILON || Math.abs(diffY) < Number.EPSILON) {

// // }
// const lineDirectionFromStart = Math.atan2(diffX, diffY)
// const angle45 = Math.PI / 4
// const distance = Math.hypot(threshold, threshold)
// const area: Point[] = [
//   {
//     x: line[0].x + Math.sin(lineDirectionFromStart + Math.PI + angle45) * distance,
//     y: line[0].y - Math.cos(lineDirectionFromStart + Math.PI + angle45) * distance,
//   },
//   {
//     x: line[0].x + Math.sin(lineDirectionFromStart + Math.PI - angle45) * distance,
//     y: line[0].y - Math.cos(lineDirectionFromStart + Math.PI - angle45) * distance,
//   },
//   {
//     x: line[1].x + Math.sin(lineDirectionFromStart + angle45) * distance,
//     y: line[1].y - Math.cos(lineDirectionFromStart + angle45) * distance,
//   },
//   {
//     x: line[1].x + Math.sin(lineDirectionFromStart - angle45) * distance,
//     y: line[1].y - Math.cos(lineDirectionFromStart - angle45) * distance,
//   },
// ]
// const highestPointIndex = area.reduce(
//   (acc, point, index) => {
//     if (point.y < acc.y) {
//       return {
//         index,
//         y: point.y,
//       }
//     }
//     return acc
//   },
//   { y: Number.MAX_SAFE_INTEGER, index: -1 },
// ).index

// type Point = {
//   x: number
//   y: number
// }

// // const getLinearFunctionToCalcY = (p1: Point, p2: Point) => {
// //   const a = p2.y - p1.y
// //   const b = p1.x - p2.x
// //   const c = a * p1.x + b * p1.y
// //   return (x: number) => (c - a * x) / b
// // }

// // https://www.geeksforgeeks.org/program-find-line-passing-2-points/
// const getLinearFunctionToCalcX = (p1: Point, p2: Point) => {
//   const a = p2.y - p1.y
//   const b = p1.x - p2.x
//   const c = a * p1.x + b * p1.y

//   return (y: number) => {
//     console.log(y, a, b, c, (c - y * b) / a)
//     if (a === 0) {
//       // vertical line
//       return p1.x
//     }
//     return (c - y * b) / a
//   }
// }

// const getNewItems = (startPoint: Point, nextPoint: Point) => {
//   const f = getLinearFunctionToCalcX(startPoint, nextPoint)
//   const startY = Math.ceil(startPoint.y)

//   let y = startY
//   const pointsInsideCollection = []
//   let i = 0
//   while (y <= nextPoint.y && i++ < 100) {
//     pointsInsideCollection.push({ x: Math.ceil(f(y)), y })
//     y += 1
//   }

//   return pointsInsideCollection
// }

// export const startDebug = (universe: Universe) => {
//   if (graph) return
//   graph = new PIXI.Graphics()

//   graph.beginFill(0x000000, 1)
//   graph.drawRect(0, 0, 1000, 1000)
//   graph.endFill()

//   graph.beginFill(0xff3300, 0)
//   graph.lineStyle(2, 0xff0000, 1)
//   graph.moveTo(line[0].x * BLOCK_SIZE, line[0].y * BLOCK_SIZE)
//   graph.lineTo(line[1].x * BLOCK_SIZE, line[1].y * BLOCK_SIZE)
//   graph.closePath()

//   graph.lineStyle(2, 0x00ff00, 1)
//   area.forEach(({ x, y }, index) => {
//     const methodName = index === 0 ? 'moveTo' : 'lineTo'
//     graph[methodName](x * BLOCK_SIZE, y * BLOCK_SIZE)
//   })
//   graph.closePath()

//   graph.lineStyle(1, 0xffffff, 1)
//   graph.beginFill(0xffffff, 0.1)
//   for (let y = 0; y <= 10; y++) {
//     for (let x = 0; x <= 15; x++) {
//       drawRect(x * BLOCK_SIZE, y * BLOCK_SIZE)
//     }
//   }

//   const point1 = area[highestPointIndex]
//   const point2 = area[(highestPointIndex + 1) % 4]
//   const point3 = area[(highestPointIndex + 2) % 4]
//   const point4 = area[(highestPointIndex + 3) % 4]

//   let pointsInsideEdge = getNewItems(point1, point2)
//   if (pointsInsideEdge[pointsInsideEdge.length - 1].x === point2.x) {
//     // to avoid double row when line is horizontal
//     pointsInsideEdge = pointsInsideEdge
//   } else if (pointsInsideEdge[pointsInsideEdge.length - 1].y === point2.y) {
//     pointsInsideEdge = getNewItems(point2, point3)
//   } else {
//     pointsInsideEdge = [...pointsInsideEdge, ...getNewItems(point2, point3)]
//   }

//   console.log(pointsInsideEdge)
//   const f3to4 = getLinearFunctionToCalcX(point3, point4)
//   const f4to1 = getLinearFunctionToCalcX(point4, area[highestPointIndex])

//   const pointsInside = pointsInsideEdge.flatMap(point => {
//     const f = point.y > point4.y ? f3to4 : f4to1
//     const maxX = Math.floor(f(point.y))
//     const modX = Math.sign(maxX - point.x)
//     console.log(point.y, 1 + Math.abs(maxX - point.x))
//     return Array.from({ length: 1 + Math.abs(maxX - point.x) }).map((_, index) => ({
//       y: point.y,
//       x: point.x + index * modX,
//     }))
//   })

//   pointsInside.forEach(({ x, y }) => {
//     drawCircle(x * BLOCK_SIZE, y * BLOCK_SIZE, 0xff0000)
//   })

//   graph.y = 200
//   window.world.addChild(graph)
// }

// export const stopDebug = () => {
//   window.world.removeChild(graph)
//   graph = null
// }
