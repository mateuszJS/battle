import loadTextures from 'webgl/textures'
import { compilePrograms } from 'webgl/programs'
import setupGUI from 'GUI'

// this code has to be imported dynamically
// so window.gl is already defined
export default function lazyInit() {
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
}