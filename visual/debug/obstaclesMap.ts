import { Universe } from '../../crate/pkg/index'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

const OBSTACLES_CELL_SIZE = 20.0 // remember to change also in debug/obstaclesMap.ts
const OBSTACLES_MAP_SCALE = 1.0 / OBSTACLES_CELL_SIZE
const OBSTACLES_MAP_WIDTH = Math.floor(MAP_WIDTH * OBSTACLES_MAP_SCALE + 1.0)
const OBSTACLES_MAP_HEIGHT = Math.floor(MAP_HEIGHT * OBSTACLES_MAP_SCALE + 1.0)
const OBSTACLES_MAP_SCALE_X = OBSTACLES_MAP_WIDTH / MAP_WIDTH
const OBSTACLES_MAP_SCALE_Y = OBSTACLES_MAP_HEIGHT / MAP_HEIGHT

let graph = null

export const startDebug = (universe: Universe) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)
    for (let i = 0; i < OBSTACLES_MAP_WIDTH; i++) {
      for (let j = 0; j < OBSTACLES_MAP_HEIGHT; j++) {
        const x = i * (1 / OBSTACLES_MAP_SCALE_X)
        const y = j * (1 / OBSTACLES_MAP_SCALE_Y)
        const value = universe.is_point_inside_obstacle(
          x + OBSTACLES_CELL_SIZE / 2,
          y + OBSTACLES_CELL_SIZE / 2,
        )

        if (value === 0) {
          graph.beginFill(0xff0000, 0.5)
        } else if (value == 1) {
          graph.beginFill(0x00ff00, 0.5)
        } else {
          graph.beginFill(0x0000ff, 0.5)
        }
        graph.drawRect(x, y, 1 / OBSTACLES_MAP_SCALE_X, 1 / OBSTACLES_MAP_SCALE_Y)
        graph.endFill()
      }
    }
  }
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  graph = null
}
