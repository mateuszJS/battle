import { Universe } from '../../crate/pkg/index'

let graph = null
const rectSize = 1 / 0.0025

const drawRect = (x: number, y: number) => {
  graph.beginFill(0xff0000, 0)
  graph.lineStyle(2, 0xffffff, 1)
  graph.drawRect(x, y, rectSize, rectSize)
  graph.endFill()
}

const drawCircle = (x: number, y: number) => {
  graph.beginFill(0xff0000, 0.1)
  graph.lineStyle(2, 0xffffff, 1)
  graph.drawCircle(x - 5, y - 5, 10)
  graph.endFill()
}

// const debug = (universe: Universe) => {
//   if (!graph) {
//     graph = new PIXI.Graphics()
//     window.world.addChild(graph)
//   }
//   graph.clear()
//   const gridData = universe.get_grid()
//   for (let i = 0; i < gridData.length; i += 2) {
//     drawRect(gridData[i], gridData[i + 1])
//   }
// }

const debug = (universe: Universe) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)
  }
  graph.clear()
  const gridData = universe.get_grid_area()
  for (let i = 0; i < gridData.length; i += 2) {
    drawRect(gridData[i], gridData[i + 1])
  }
}

export default debug
