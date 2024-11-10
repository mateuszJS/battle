import openMapCreator from './map-creator'
import { Universe } from 'Universe'
// import listOfAssets from './listOfAssets'

const startGame = () => {
  document.oncontextmenu = document.body.oncontextmenu = function() {
    return false
  }

  if (!Math.clamp) {
    Math.clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
  }

  // TODO: start downloading assets here

  /** handle UI */
  const goToMapCreatorBtn = document.createElement('button')
  goToMapCreatorBtn.textContent = 'GO TO MAP CREATOR'
  console.log('1 - create button')
  const goToMapCreatorPromise = new Promise<void>(resolve => {
    console.log('2 - attach event listener')
    goToMapCreatorBtn.addEventListener('click', () => {
      resolve()
    })
  })
  console.log('3 - append btn to body')
  document.body.appendChild(goToMapCreatorBtn)

  /** Handle wasm file loading */
  const wasmModulePromise = import("../crate/pkg/index.js").then(module => (
    module.Universe as unknown as Universe
  ))

  Promise.all([
    goToMapCreatorPromise,
    wasmModulePromise
  ]).then(([_, universe]) => {
    goToMapCreatorBtn.remove()
    openMapCreator(universe)
  })
}

startGame()
