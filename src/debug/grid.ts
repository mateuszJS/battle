import { Universe } from '../../crate/pkg/index'

let graph = null
let timer = 0
const rectSize = 1 / 0.0025

const drawRect = (x: number, y: number) => {
  graph.beginFill(0x000000, 0)
  graph.lineStyle(2, 0xffffff, 1)
  graph.drawRect(x, y, rectSize, rectSize)
  graph.endFill()
}
const drawCircle = (x: number, y: number) => {
  graph.lineStyle(0, 0xffffff, 0)
  graph.beginFill(0xff0000, 0.4)
  graph.drawCircle(x, y, 35)
  graph.endFill()
}

export const startDebug = (universe: Universe) => {
  if (++timer > 30) {
    timer = 0
  } else {
    return
  }
  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)
  }
  graph.clear()
  const gridData = universe.get_grid_area()

  let startDrawingCircle = false
  for (let i = 0; i < gridData.length; i += 2) {
    if (gridData[i] < 0) {
      startDrawingCircle = true
      i -= 1
      continue
    }
    if (startDrawingCircle) {
      drawCircle(gridData[i], gridData[i + 1])
    } else {
      drawRect(gridData[i], gridData[i + 1])
    }
  }
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  timer = 0
  graph = null
}
