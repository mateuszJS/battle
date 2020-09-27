import * as PIXI from 'pixi.js'
import 'pixi-layers'
import 'pixi-projection'

import listOfAssets from './listOfAssets'
import setup from './setup'

const startGame = () => {
  document.oncontextmenu = document.body.oncontextmenu = function() {
    return false
  }

  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  document.body.appendChild(app.view)
  window.app = app

  const progressNode = document.querySelector('#dynamic-loader') as SVGPathElement
  const loader = app.loader.add(listOfAssets).load(setup)

  loader.onProgress.add((loader: PIXI.Loader) => {
    const width = 50 + Math.round(loader.progress * 7)
    progressNode.setAttribute('d', `M33 142h${width}v82h-${width}z`)
  })

  loader.onComplete.add(() => {
    document.body.removeChild(document.querySelector('svg'))
  })
}

startGame()
