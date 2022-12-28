// import { WasmModule } from '~/initGame'

// let graph = null
// let timer = 0

// export const startDebug = (wasmModule: WasmModule) => {
//   if (++timer > 200) {
//     timer = 0
//   } else {
//     return
//   }
//   if (!graph) {
//     graph = new PIXI.Graphics()
//     window.world.addChild(graph)
//   }
//   graph.clear()
//   while(graph.children[0]) { 
//     graph.removeChild(graph.children[0])
//   }
//   window.useFloat32ArrayData(wasmModule.debugGrid(), (gridData) => {
//     const indexOfDivider = gridData.indexOf(-1)

//     const lines = gridData.slice(0, indexOfDivider)
    
//     graph.lineStyle(1, 0xffffff, 0.3)
//     for (let i = 0; i < lines.length; i += 4) {
//       graph.moveTo(...window.convertLogicCoordToVisual(lines[i + 0], lines[i + 1]))
//       graph.lineTo(...window.convertLogicCoordToVisual(lines[i + 2], lines[i + 3]))
//     }

//     const numbers = gridData.slice(indexOfDivider + 1)
//     for (let i = 0; i < numbers.length; i += 3) {
//       const basicText = new PIXI.Text(numbers[i + 0].toString(), { fill: ['#ffffff'], });
//       const [x, y] = window.convertLogicCoordToVisual(numbers[i + 1], numbers[i + 2])
//       basicText.anchor.set(0.5)
//       basicText.x = x;
//       basicText.y = y;
//       graph.addChild(basicText)
//     }
//   })
// }

// export const stopDebug = () => {
//   window.world.removeChild(graph)
//   timer = 0
//   graph = null
// }
