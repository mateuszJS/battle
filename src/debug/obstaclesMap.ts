import { Universe } from '../../crate/pkg/index'

let graph = null
const rectSize = 20 // remember to change also in constants.rs
const OBSTACLES_MAP_WIDTH = 2700 / rectSize
const OBSTACLES_MAP_HEIGHT = 2100 / rectSize

export const startDebug = (universe: Universe) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)
    for (let i = 0; i < OBSTACLES_MAP_WIDTH; i++) {
      for (let j = 0; j < OBSTACLES_MAP_HEIGHT; j++) {
        const x = i * rectSize
        const y = j * rectSize
        const value = universe.is_point_inside_obstacle(x, y)

        if (value === 0) {
          graph.beginFill(0xff0000, 0.5)
        } else if (value == 1) {
          graph.beginFill(0x00ff00, 0.5)
        } else {
          graph.beginFill(0x0000ff, 0.5)
        }
        graph.drawRect(x, y, rectSize, rectSize)
        graph.endFill()
      }
    }
  }
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  graph = null
}
