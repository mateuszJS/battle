import { MAP_HEIGHT, MAP_WIDTH } from '../../logic/constants'
import { WasmModule } from '~/initGame'

let graph = null

export const startDebug = (wasmModule: WasmModule) => {
  if (graph) return
  // const pointer = wasmModule.debugObstacles()

  // window.useFloat32ArrayData(pointer, result => {
  //   graph = new PIXI.Graphics()
  //   window.world.addChild(graph)
  
  //   let i = 2
  
  //   graph.clear()
  //   graph.beginFill(0x000000, 0)
  //   graph.lineStyle(3, 0xffffff, 0.3)
  //   graph.moveTo(...window.convertLogicCoordToVisual(result[0], result[1]))
  
  //   while (i < result.length) {
  //     if (result[i] === -1) {
  //       graph.closePath()
  
  //       graph.beginFill(0x000000, 0)
  //       graph.lineStyle(3, 0xffffff, 0.3)
  //       graph.moveTo(...window.convertLogicCoordToVisual(result[i + 1], result[i + 2]))
  //       i += 3
  //     } else {
  //       graph.lineTo(...window.convertLogicCoordToVisual(result[i], result[i + 1]))
  //       i += 2
  //     }
  //   }
  //   graph.lineStyle(3, 0xff0000, 0.5)
  //   graph.moveTo(...window.convertLogicCoordToVisual(0, 0))
  //   graph.lineTo(...window.convertLogicCoordToVisual(MAP_WIDTH, 0))
  //   graph.lineTo(...window.convertLogicCoordToVisual(MAP_WIDTH, MAP_HEIGHT))
  //   graph.lineTo(...window.convertLogicCoordToVisual(0, MAP_HEIGHT))
  //   graph.closePath()
  // })
}

export const stopDebug = () => {
  window.world.removeChild(graph)
  graph = null
}
