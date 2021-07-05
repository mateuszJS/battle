import { instantiate } from "@assemblyscript/loader";

interface WasmModule {
  add(x: number, y: number): number
}

const setup = async () => {
  const instance = await instantiate(fetch("/logic/index.wasm"));
  console.log((instance.exports as unknown as WasmModule).add(1, 2));
}

setup();




// console.log((myModule as any).add(1, 2));

// const { sum, Int32Array_ID, __newArray } = LogicModule;

// function doSum(values) {
//   const arrPtr = __newArray(Int32Array_ID, values)
//   return sum(arrPtr)
// }

// console.log(doSum([1, 2, 3]))
// console.log(LogicModule.init_universe())
// import * as PIXI from 'pixi.js'
// import 'pixi-layers'
// import 'pixi-projection'

// import listOfAssets from './listOfAssets'
// import setup from './setup'

// const startGame = () => {
//   document.oncontextmenu = document.body.oncontextmenu = function() {
//     return false
//   }

//   if (!Math.clamp) {
//     Math.clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
//   }

//   const app = new PIXI.Application({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   })
//   document.body.appendChild(app.view)
//   window.app = app

//   const progressNode = document.querySelector('#dynamic-loader') as SVGPathElement
//   const loader = app.loader.add(listOfAssets).load(setup)

//   loader.onProgress.add((loader: PIXI.Loader) => {
//     const width = 50 + Math.round(loader.progress * 7)
//     progressNode.setAttribute('d', `M33 142h${width}v82h-${width}z`)
//   })

//   loader.onComplete.add(() => {
//     document.body.removeChild(document.querySelector('svg'))
//   })
// }

// startGame()
