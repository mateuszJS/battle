import { addResizeListener } from "webgl/resize";
import m3 from 'webgl/m3'

export let canvasMatrix: Matrix3
let translateX = 0
let translateY = 0

function calcMatrix() {
  canvasMatrix = m3.translate(
    m3.projectionFlipY(window.gl.drawingBufferWidth, window.gl.drawingBufferHeight),
    translateX,
    translateY
  )
}

calcMatrix()
addResizeListener(calcMatrix) // we don't care about removing listener for now

export function translateWorldView(x: number, y: number) {
  translateX = x
  translateY = y
  calcMatrix()
}