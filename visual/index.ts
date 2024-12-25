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

  const goToMapCreatorPromise = new Promise<void>(resolve => {

    goToMapCreatorBtn.addEventListener('click', () => {
      resolve()
    })
  })
  document.body.appendChild(goToMapCreatorBtn)

  /** Handle wasm file loading */
  const wasmModulePromise = import("../crate/pkg/index.js").then(module => (
    module.Universe as unknown as Universe
  ))

  Promise.all([
    goToMapCreatorPromise,
    wasmModulePromise
  ]).then(([_, Universe]) => {
    goToMapCreatorBtn.remove()
    openMapCreator(Universe)
  })
}

startGame()
