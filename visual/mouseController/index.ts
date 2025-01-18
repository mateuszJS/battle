import { getCameraAngle, setAngle, setRadius, setTarget } from "worldMatrix"

const SCREEN_MOVE_THRESHOLD = 150
const CAMERA_MAX_SPEED = 20
const ANGLE_ROTATION_SPEED = 0.025

export const pointer = { x: 0, y: 0 }

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

  let isUpdatingAngle = false
  function updateAngle(e: MouseEvent) {
    setAngle(angle => angle + (pointer.x - e.clientX) * ANGLE_ROTATION_SPEED)
  }

  document.addEventListener('mousemove', e => {
    if (isUpdatingAngle) {
      updateAngle(e)
    }

    pointer.x = e.clientX
    pointer.y = e.clientY
  })

  document.addEventListener('mousedown', e => {
    if (e.button === 1) {
      pointer.x = e.clientX // is it needed??
      isUpdatingAngle = true
    }
  });

  document.addEventListener('mouseup', e => {
    isUpdatingAngle = false
  });

  document.addEventListener("wheel", (event) => {
    setRadius(radius => 
      Math.clamp(radius + event.deltaY, 400, 20000)
    )
  });

  return (dt: number) => {
    setTarget(currTarget => [
      Math.clamp(currTarget[0] + offset.x * dt, 0, mapWidth),
      0,
      Math.clamp(currTarget[2] + offset.y * dt, 0, mapHeight),
    ])
  }
}