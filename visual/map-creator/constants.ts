import getPlatformCoords from 'consts/get-platform-coords'

export const MAP_WIDTH = 2000 * 2
export const MAP_HEIGHT = 4500// * 2

const scaleX = (window.innerWidth * 0.7) / MAP_WIDTH
const scaleY = (window.innerHeight * 0.9) / MAP_HEIGHT
export const scale = Math.min(scaleX, scaleY)
export const MAP_SIZE = {
  x: 100,
  y: 50,
  width: MAP_WIDTH * scale,
  height: MAP_HEIGHT * scale,
} as const


export const platformCoords = getPlatformCoords()
export const scaledPlatformCoords = platformCoords.map(({ x, y }) => ({
  x: x * scale,
  y: y * scale,
}))
export const scaledPlatformCoordsHover = platformCoords.map(({ x, y }) => ({
  x: x * scale * 1.1,
  y: y * scale * 1.1,
}))
export const scaledPlatformCoordsToolbar = platformCoords.map(({ x, y }) => ({
  x: x * scale * 0.3,
  y: y * scale * 0.3,
}))
export const scaledPlatformCoordsToolbarHover = platformCoords.map(({ x, y }) => ({
  x: x * scale * 0.35,
  y: y * scale * 0.35,
}))
export const scaledBridgeWidth = scaledPlatformCoords[3].y - scaledPlatformCoords[2].y
export const scaledJoinerSize = 30
export const scaledJoinerHoverOffset = 7
export const scaledPlatformJoinersOffset = scaledPlatformCoords[0].y