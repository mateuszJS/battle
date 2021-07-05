import { instantiate } from "@assemblyscript/loader"
import type * as ExportedWasmModule from './logic'
import * as CONSTANTS from '../logic/constants'
console.log('CONSTANTS', CONSTANTS);
const setup = async () => {
  const myModule = await instantiate<typeof ExportedWasmModule>(fetch("/logic-build/index.wasm"));
  console.log(myModule.exports.add(1, 2));

  const { sum, Int32Array_ID } = myModule.exports
  const { __newArray } = myModule.exports

  function doSum(values) {
    const arrPtr = __newArray(Int32Array_ID, values)
    return sum(arrPtr)
  }

  console.log(doSum([1, 2, 30]))

  const { getRandomArray } = myModule.exports

  /* READ ARRAY VIA COPY */
  const { __getArray } = myModule.exports

  function doGetRandomArray(len) {
    const arrPtr = getRandomArray(len)
    const values = __getArray(arrPtr)
    return values
  }

  console.log(doGetRandomArray(10))


  /* READ ARRAY VIA VIEW */
  const { __getArrayView, __pin, __unpin } = myModule.exports

  function doGetRandomArrayView(len) {
    const arrPtr = __pin(getRandomArray(len)) // pin to avoid array being garbage collected
    const view = __getArrayView(arrPtr)
    return { ptr: arrPtr, view }
  }

  const randomArray = doGetRandomArrayView(10)
  console.log('xxx', randomArray.view)
  __unpin(randomArray.ptr) // unpin to allow for garbage collector to consume the array
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
