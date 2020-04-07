// type Obstacle = Point & { radius: number }

// const coords = [
//   { x: 800, y: 200 },
//   { x: 1100, y: 200 },
//   { x: 1100, y: 400 },
//   { x: 800, y: 400 },
// ]

// // function polygon(src: Obstacle) {
// //   const res = []
// //   const n = 8 // Change me!
// //   const r = (src.radius + extraSpace) / Math.cos(Math.PI / n)
// //   for (let t = 0; t < n; t++) {
// //     res.push({
// //       x: src.x + Math.round((r + 0.5) * Math.cos((2 * Math.PI * t) / n)),
// //       y: src.y + Math.round((r + 0.5) * Math.sin((2 * Math.PI * t) / n)),
// //     })
// //   }
// //   return res
// // }

// export const drawPolygons = () => {
//   coords.forEach(c => {
//     const p = polygon(c)

//     const line = new PIXI.Graphics()
//     line.lineStyle(1, 0xffffff)
//     line.moveTo(p[0].x, p[0].y)
//     for (let i = 0; i < p.length; i++) {
//       const pt = p[(i + 1) % p.length]
//       line.lineTo(pt.x, pt.y)
//     }
//     window.app.stage.addChild(line)
//   })
// }

// function lineIntersects(p0: Point, p1: Point, p2: Point, p3: Point) {
//   const s1x = p1.x - p0.x
//   const s1y = p1.y - p0.y
//   const s2x = p3.x - p2.x
//   const s2y = p3.y - p2.y

//   const s =
//     (-s1y * (p0.x - p2.x) + s1x * (p0.y - p2.y)) / (-s2x * s1y + s1x * s2y)
//   const t =
//     (s2x * (p0.y - p2.y) - s2y * (p0.x - p2.x)) / (-s2x * s1y + s1x * s2y)

//   return s > 0 && s < 1 && t > 0 && t < 1
// }

// function linePolygonIntersection(src: Point, dst: Point, o: Obstacle) {
//   const c = polygon(o)
//   for (let k = 0; k < c.length; k++) {
//     if (lineIntersects(c[k], c[(k + 1) % c.length], src, dst)) {
//       return true
//     }
//   }
//   return false
// }

// function lineCircleIntersection(src: Point, dst: Point, o: Obstacle) {
//   const dx = dst.x - src.x
//   const dy = dst.y - src.y
//   const dr2 = dx * dx + dy * dy
//   const vect = (src.x - o.x) * (dst.y - o.y) - (dst.x - o.x) * (src.y - o.y)
//   const discr =
//     (o.radius + extraSpace) * (o.radius + extraSpace) * dr2 - vect * vect
//   if (discr > 0) {
//     const sy = dy > 0 ? 1 : -1
//     const sqrtDiscr = Math.sqrt(discr)

//     const collision1 = {
//       x: (vect * dy - sy * dx * sqrtDiscr) / dr2 + o.x,
//       y: (-vect * dx - Math.abs(dy) * sqrtDiscr) / dr2 + o.y,
//     }
//     const collision2 = {
//       x: (vect * dy + sy * dx * sqrtDiscr) / dr2 + o.x,
//       y: (-vect * dx + Math.abs(dy) * sqrtDiscr) / dr2 + o.y,
//     }

//     const mx = Math.min(src.x, dst.x)
//     const mmx = Math.max(src.x, dst.x)
//     const my = Math.min(src.y, dst.y)
//     const mmy = Math.max(src.y, dst.y)

//     if (
//       (mx <= collision1.x &&
//         collision1.x <= mmx &&
//         my <= collision1.y &&
//         collision1.y <= mmy) ||
//       (mx <= collision2.x &&
//         collision2.x <= mmx &&
//         my <= collision2.y &&
//         collision2.y <= mmy)
//     ) {
//       return true
//     }
//   }
//   return false
// }

// function directPath(src, dst) {
//   return coords
//     .filter(o => src !== o)
//     .every(
//       o =>
//         !lineCircleIntersection(src, dst, o) &&
//         !linePolygonIntersection(src, dst, o),
//     )
// }

// function buildGraph() {
//   // Add edge from each vertex to all visible vertex
//   const allVertices = coords
//     .map(dst => polygon(dst))
//     .reduce((a, b) => [...a, ...b]) // just list with all points

//   const graph = {}
//   coords.forEach(src => {
//     const srcPoly = polygon(src)

//     // Centers can also reach any visible vertices
//     srcPoly.push(src) // not needed for us, we cannot reahc the center

//     srcPoly.forEach(srcP => {
//       allVertices
//         .filter(c => c.x !== srcP.x || c.y !== srcP.y)
//         .forEach(c => {
//           if (directPath(srcP, c)) {
//             // push new point to graph object
//             const key = `${srcP.x} ${srcP.y}`
//             if (graph[key] == null) {
//               graph[key] = []
//             }
//             graph[key].push(c)
//           }
//         })
//     })
//   })
//   return graph
// }

// function drawPath(path: Point[]) {
//   const line = new PIXI.Graphics()
//   line.lineStyle(3, 0xffffff)
//   line.moveTo(path[0].x, path[0].y)
//   for (let k = 1; k < path.length; k++) {
//     line.lineTo(path[k].x, path[k].y)
//   }
//   window.app.stage.addChild(line)
// }

// function squareDistance(a, b) {
//   return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
// }
// function distance(a, b) {
//   return Math.sqrt(squareDistance(a, b))
// }

// /*
//   A*. For the sake of simplicity, I've used a sorted array instead of a priority queue, feel free to improve that part.
// */
// function shortestPath(graph, srcNode, dstNode) {
//   const q = [
//     {
//       x: srcNode.x,
//       y: srcNode.y,
//       path: [srcNode],
//       currentLength: 0,
//       heuristic: 0,
//     },
//   ]
//   const visited = {}

//   while (q.length > 0) {
//     q.sort((a, b) => a.heuristic - b.heuristic) // this should be a queue
//     const el = q.shift()

//     if (directPath(dstNode, el)) {
//       return [...el.path, dstNode]
//     }
//     visited[`${el.x} ${el.y}`] = true

//     const successors = graph[`${el.x} ${el.y}`]
//     if (!successors) {
//       continue
//     }
//     successors
//       .filter(succ => !visited[`${succ.x} ${succ.y}`])
//       .forEach(succ => {
//         const distToSucc = distance(succ, el)
//         const newPath = el.path.slice()
//         const currentLength = el.currentLength + distToSucc
//         const heuristic = currentLength + distance(succ, dstNode)
//         newPath.push({ x: succ.x, y: succ.y })
//         q.push({
//           x: succ.x,
//           y: succ.y,
//           path: newPath,
//           currentLength,
//           heuristic,
//         })
//       })
//   }
// }

// export const drawGraph = () => {
//   const graph = buildGraph()
//   {
//     [`${x} ${y}`]: [{ x, y }, { x, y }] // where has direct path
//   }
//   Object.entries(graph).forEach(([src, dst]: [string, Point[]]) => {
//     dst.forEach(d => {
//       const line = new PIXI.Graphics()
//       line.lineStyle(1, 0xffffff)
//       line.alpha = 0.1
//       const x = parseInt(src.split(' ')[0])
//       const y = parseInt(src.split(' ')[1])
//       line.moveTo(x, y)
//       line.lineTo(d.x, d.y)
//       window.app.stage.addChild(line)
//     })
//   })
//   // shortestPath(graph)
// }
