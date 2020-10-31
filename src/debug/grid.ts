import { Universe } from '../../crate/pkg/index'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

let graph = null
let timer = 0

const GRID_CELL_SIZE = 400.0
const GRID_MAP_SCALE = 1.0 / GRID_CELL_SIZE
const GRID_MAP_WIDTH = Math.floor(MAP_WIDTH * GRID_MAP_SCALE + 1.0)
const GRID_MAP_HEIGHT = Math.floor(MAP_HEIGHT * GRID_MAP_SCALE + 1.0)
const GRID_MAP_SCALE_X = GRID_MAP_WIDTH / MAP_WIDTH
const GRID_MAP_SCALE_Y = GRID_MAP_HEIGHT / MAP_HEIGHT

const drawRect = (x: number, y: number) => {
  graph.beginFill(0x000000, 0)
  graph.lineStyle(2, 0xffffff, 1)
  graph.drawRect(x, y, 1 / GRID_MAP_SCALE_X, 1 / GRID_MAP_SCALE_Y)
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
