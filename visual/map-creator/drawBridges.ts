import { drawPrimitiveProgram } from "webgl/programs"
import { MAP_LEFT_MARGIN, MAP_TOP_MARGIN, scale, scaledBridgeWidth } from "./constants"
import { NonInteractiveBridge } from "map-creator"
import renderPrimitive from "webgl/renders/renderPrimitive"

export default function drawBridges(bridges: NonInteractiveBridge[], mouseX: number, mouseY: number) {
  drawPrimitiveProgram.setup({ color: [1, 0.4, 0.2, 1] })
  bridges.forEach(({ srcJoint, destJoint}) => {
    const [srcJointOffsetX, srcJointOffsetY] = srcJoint.horizontal ? [scaledBridgeWidth * .5, 0] : [0, scaledBridgeWidth * .5]
    const sourcePoint = {
      x: (srcJoint.x + srcJoint.positionRelativeTo.x) * scale + MAP_LEFT_MARGIN,
      y: (srcJoint.y + srcJoint.positionRelativeTo.y) * scale + MAP_TOP_MARGIN,
    }
    const destinationPoint = {
      x: destJoint ? (destJoint.x + destJoint.positionRelativeTo.x) * scale + MAP_LEFT_MARGIN : mouseX, // we don't scale this mouseX, it's just visual, nothing reads it
      y: destJoint ? (destJoint.y + destJoint.positionRelativeTo.y) * scale + MAP_TOP_MARGIN : mouseY,
    }
    renderPrimitive(
      drawPrimitiveProgram.setup4CornerShape(
        sourcePoint.x + srcJointOffsetX,       sourcePoint.y + srcJointOffsetY,
        sourcePoint.x - srcJointOffsetX,       sourcePoint.y - srcJointOffsetY,
        destinationPoint.x + srcJointOffsetX,  destinationPoint.y + srcJointOffsetY,
        destinationPoint.x - srcJointOffsetX,  destinationPoint.y - srcJointOffsetY,
      )
    )
  })
}