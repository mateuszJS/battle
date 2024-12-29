import { getCameraAngle, setTarget } from "worldMatrix"

const SCREEN_MOVE_THRESHOLD = 150
const CAMERA_MAX_SPEED = 100

export default function initMouseController(mapWidth: number, mapHeight: number) {
  const offset = { x: 0, y: 0 }

  document.addEventListener('mousemove', (e: MouseEvent) => {
    const thresholdX = SCREEN_MOVE_THRESHOLD / window.innerWidth
    const thresholdY = SCREEN_MOVE_THRESHOLD / window.innerHeight
    const relativeX = (e.clientX / window.innerWidth) * 2 - 1
    const relativeY = (e.clientY / window.innerHeight) * 2 - 1
    const x = Math.max(0, Math.abs(relativeX) - (1 - thresholdX)) * Math.sign(relativeX)
    const y = Math.max(0, Math.abs(relativeY) - (1 - thresholdY)) * Math.sign(relativeY)

    const angle = Math.atan2(-y, x) + getCameraAngle()[1]

    const distance = Math.hypot(x, y)
    const speed = distance * CAMERA_MAX_SPEED

    offset.x = Math.cos(angle) * speed
    offset.y = -Math.sin(angle) * speed
  })

  document.addEventListener('mouseleave', () => {
    offset.x = 0
    offset.y = 0
  })

  return () => {
    setTarget(currTarget => [
      Math.clamp(currTarget[0] + offset.x, 0, mapWidth),
      0,
      Math.clamp(currTarget[2] + offset.y, 0, mapHeight),
    ])
  }
}