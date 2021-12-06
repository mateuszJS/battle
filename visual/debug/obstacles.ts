import { OBSTACLES_CELL_SIZE } from '../../logic/constants'
import { MAP_WIDTH } from '../map-creator/constants'
import { WasmModule } from '~/initGame'

let graph = null

export const startDebug = (wasmModule: WasmModule) => {
  if (graph) return
  const pointer = wasmModule.debugObstacles()

  window.useFloat32ArrayData(pointer, result => {
    graph = new PIXI.Graphics()
    window.world.addChild(graph)

    let i = 0
    let cellIndex = 0

    while (i < result.length) {
      if ([-2, -3].includes(result[i])) {
        const x = (cellIndex % Math.ceil(MAP_WIDTH / OBSTACLES_CELL_SIZE)) * OBSTACLES_CELL_SIZE
        const y = Math.floor(cellIndex / Math.ceil(MAP_WIDTH / OBSTACLES_CELL_SIZE)) * OBSTACLES_CELL_SIZE
        graph.lineStyle(3, 0x00ff00, 0)
        graph.beginFill(result[i] === -2 ? 0xff0000 : 0x0000ff, 0.3)
        graph.moveTo(...window.convertLogicCoordToVisual(x, y))
        graph.lineTo(...window.convertLogicCoordToVisual(x + OBSTACLES_CELL_SIZE, y))
        graph.lineTo(...window.convertLogicCoordToVisual(x + OBSTACLES_CELL_SIZE, y + OBSTACLES_CELL_SIZE))
        graph.lineTo(...window.convertLogicCoordToVisual(x, y + OBSTACLES_CELL_SIZE))
        graph.closePath()
      } else {
        while (result[i] !== -1 && i < result.length) {
          graph.lineStyle(3, 0x00ff00, 0.1)
          graph.moveTo(...window.convertLogicCoordToVisual(result[i], result[i + 1]))
          graph.lineTo(...window.convertLogicCoordToVisual(result[i + 2], result[i + 3]))
          graph.closePath()
          i += 4
        }
      }
      i ++
      cellIndex ++
    }
  })
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  graph = null
}
