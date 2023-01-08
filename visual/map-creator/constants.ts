import getPlatformCoords from 'consts/get-platform-coords'
import { addResizeListener } from 'webgl/resize'

export const MAP_WIDTH = 2000 * 2
export const MAP_HEIGHT = 4500// * 2
export const MAP_LEFT_MARGIN = 100
export const MAP_TOP_MARGIN = 50

let scaleX = 0
let scaleY = 0
export let scale = 0

/* THOSE ARE USED ALSO OUT OF MAP CREATOR */
export const platformCoords = getPlatformCoords()

/* FOLLOWING ARE USED ONLY IN MAP CREATOR */
export let scaledPlatformCoords: Point[] = []
export let scaledPlatformCoordsHover: Point[] = []
export let scaledPlatformCoordsToolbar: Point[] = []
export let scaledPlatformCoordsToolbarHover: Point[] = []
export let scaledBridgeWidth = 0
export let scaledJoinerSize = 0
export let scaledJoinerHoverOffset = 0
export let platformJoinersOffset = 0

function updateConstants() {
  scaleX = (window. gl.drawingBufferWidth * 0.7) / MAP_WIDTH
  scaleY = (window.gl.drawingBufferHeight * 0.9) / MAP_HEIGHT
  scale = Math.min(scaleX, scaleY)

  scaledPlatformCoords = platformCoords.map(({ x, y }) => ({
    x: x * scale,
    y: y * scale,
  }))
  scaledPlatformCoordsHover = platformCoords.map(({ x, y }) => ({
    x: x * scale * 1.1,
    y: y * scale * 1.1,
  }))
  scaledPlatformCoordsToolbar = platformCoords.map(({ x, y }) => ({
    x: x * scale * 0.3,
    y: y * scale * 0.3,
  }))
  scaledPlatformCoordsToolbarHover = platformCoords.map(({ x, y }) => ({
    x: x * scale * 0.35,
    y: y * scale * 0.35,
  }))

  scaledBridgeWidth = scaledPlatformCoords[3].y - scaledPlatformCoords[2].y
  scaledJoinerSize = 30
  scaledJoinerHoverOffset = 7
  platformJoinersOffset = platformCoords[0].y
}

export function updateConstsOnResize () {
  updateConstants()
  return addResizeListener(updateConstants)
}