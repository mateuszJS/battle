import { WasmModule } from "~/initGame"
import { MAP_HEIGHT, MAP_WIDTH, OBSTACLES_CELL_SIZE, SQUAD_INSIDE_OBSTACLE, UNIT_INSIDE_OBSTACLE } from "../../logic/constants"

let graph = null

const square = [
  { x: 0, y: 0 },
  { x: OBSTACLES_CELL_SIZE, y: 0 },
  { x: OBSTACLES_CELL_SIZE, y: OBSTACLES_CELL_SIZE },
  { x: 0, y: OBSTACLES_CELL_SIZE },
]

export const startDebug = (wasmModule: WasmModule) => {
  if (!graph) {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)


    // window.useUint32ArrayData(wasmModule.debugObstaclesMap(), (data) => {
    //   console.log(data)
    //   for (let x = 0; x < MAP_WIDTH / OBSTACLES_CELL_SIZE; x++) {
    //     for (let y = 0; y < MAP_HEIGHT / OBSTACLES_CELL_SIZE; y++) {
    //       const value = data[Math.floor(x + y * (MAP_WIDTH / OBSTACLES_CELL_SIZE))]
    //       if (value === UNIT_INSIDE_OBSTACLE) {
    //         graph.beginFill(0xff0000, 0)
    //       } else if (value == SQUAD_INSIDE_OBSTACLE) {
    //         graph.beginFill(0x00ff00, 0.5)
    //       } else {
    //         graph.beginFill(0x0000ff, 0.5)
    //       }
          

    //       square.forEach((point, index) => {
    //         const [_x, _y] = window.convertLogicCoordToVisual(
    //           x * OBSTACLES_CELL_SIZE + point.x,
    //           y * OBSTACLES_CELL_SIZE + point.y
    //         )
    //         graph[index === 0 ? 'moveTo' : 'lineTo'](_x, _y)
    //       })
    //       graph.endFill()
    //     }
    //   }
    // })
  }
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  graph = null
}
