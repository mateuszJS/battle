import mat4 from "utils/mat4"
import { getCameraAngle } from "worldMatrix"

const testCameraEndAngle = [(Math.PI / 180) * -27, (Math.PI / 180) * -11, 0]

export default function getPlaneMatrix() {
  const [cameraAngleX, cameraAngleY] = getCameraAngle()

  const matrix = [
    mat4.rotationX(Math.PI / 2 + cameraAngleX),
    mat4.rotationY(cameraAngleY),
  ].reverse().reduce(
    (acc, modMatrix) => mat4.multiply(acc, modMatrix),
    mat4.identity()
  )

  return matrix
}