import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-projection'

import listOfAssets from './listOfAssets'
import setup from './setup'

window.startGame = () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  document.body.appendChild(app.view)
  window.app = app

  app.loader.add(listOfAssets).load(setup)
}
