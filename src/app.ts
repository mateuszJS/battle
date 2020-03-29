import * as PIXI from 'pixi.js'
window.PIXI = PIXI
import 'pixi-layers'

import listOfAssets from './listOfAssets'
import setup from './setup'

window.startGame = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
  })
  document.body.appendChild(app.view)
  window.app = app

  app.loader.add(listOfAssets).load(setup)
}
