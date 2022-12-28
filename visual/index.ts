import setupGUI from 'GUI'
import initWebGL2 from 'webgl/init'
import loadTextures from 'webgl/textures'
import { compilePrograms } from 'webgl/programs'
import resizeCanvas from 'webgl/resizeCanvas'

function initWebGL() {
  const canvas = document.createElement<"canvas">("canvas")
  canvas.id = 'main-game-view'
  document.body.appendChild(canvas)

  resizeCanvas(canvas)
  initWebGL2(canvas)
  const gl = window.gl
}

document.oncontextmenu = document.body.oncontextmenu = function() {
  return false
}

if (!Math.clamp) {
  Math.clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
}

initWebGL()

const progressNode = document.querySelector('#dynamic-loader') as SVGPathElement

const onProgress = (progress: number, done: boolean) => {
  const width = 50 + Math.round(progress * 7)
  progressNode.setAttribute('d', `M33 142h${width}v82h-${width}z`)

  if (done) {
    const loaderNode = document.querySelector('#loader')
    loaderNode?.parentNode?.removeChild(loaderNode)
    setupGUI()
  }
}

loadTextures(onProgress)

compilePrograms()
