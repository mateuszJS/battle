import { MAP_HEIGHT, MAP_WIDTH } from './constants'

const scaleX = (window.innerWidth * 0.7) / MAP_WIDTH
const scaleY = (window.innerHeight * 0.9) / MAP_HEIGHT
const scale = Math.min(scaleX, scaleY)
const mapDetails = {
  x: 100,
  y: 50,
  width: MAP_WIDTH * scale,
  height: MAP_HEIGHT * scale,
  scale,
} as const

export default mapDetails
