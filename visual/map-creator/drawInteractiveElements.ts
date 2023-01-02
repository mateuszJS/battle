import { BridgePoint, InteractiveElement, Platform } from "map-creator"
import DrawPrimitiveProgram from "webgl/programs/DrawPrimitiveProgram"
import DrawPrimitivePickingProgram from "webgl/programs/DrawPrimitiveProgram/picking"
import renderPrimitive from "webgl/renders/renderPrimitive"
import {
  MAP_LEFT_MARGIN,
  MAP_TOP_MARGIN,
  scale,
  scaledBridgeWidth,
  scaledJoinerHoverOffset,
  scaledJoinerSize,
  scaledPlatformCoords,
  scaledPlatformCoordsHover,
  scaledPlatformCoordsToolbar,
  scaledPlatformCoordsToolbarHover
} from "./constants"

function drawPlatform(
  program: DrawPrimitiveProgram | DrawPrimitivePickingProgram,
  color: vec4,
  points: Point[],
  id: Platform['vec3_id'],
  x: number,
  y: number,
) {
  program.setup({ id, color })
  renderPrimitive(program.setupPolygonWithCenter(points, { x, y }))
}

function drawBridgePoint(
  program: DrawPrimitiveProgram | DrawPrimitivePickingProgram,
  bridgePoint: BridgePoint,
  color: vec4,
  offset: number,
  modX: number,
  modY: number,
) {
  const [width, height] = bridgePoint.horizontal ? [scaledBridgeWidth, scaledJoinerSize] : [scaledJoinerSize, scaledBridgeWidth]

  program.setup({ id: bridgePoint.vec3_id, color })
  renderPrimitive(program.setupRect(
    (bridgePoint.x + bridgePoint.positionRelativeTo.x) * scale - width / 2 - offset + modX,
    (bridgePoint.y + bridgePoint.positionRelativeTo.y) * scale - height / 2 - offset + modY,
    width + 2 * offset,
    height + 2 * offset,
  ))
}

export default function drawInteractiveElements(elements: InteractiveElement[], hoveredElementId: number, program: DrawPrimitiveProgram | DrawPrimitivePickingProgram) {
  elements.forEach(element => {
    switch (element.type) {
      case 'platform': {
        const displayX = element.x * scale + MAP_LEFT_MARGIN
        const displayY = element.y * scale + MAP_TOP_MARGIN
        if (element.id === hoveredElementId) {
          drawPlatform(program, [1, 1, 1, 1], scaledPlatformCoordsHover, element.vec3_id, displayX, displayY)
        }
        drawPlatform(program, [0.4, 0.1, 0.7, 1], scaledPlatformCoords, element.vec3_id, displayX, displayY)
        break;
      }
      case 'create-platform-btn': {
        if (element.id === hoveredElementId) {
          drawPlatform(program, [1, 1, 1, 1], scaledPlatformCoordsToolbarHover,  element.vec3_id, element.x, element.y)
        }
        drawPlatform(program, [0.4, 0.1, 0.7, 1], scaledPlatformCoordsToolbar,  element.vec3_id, element.x, element.y)
        break;
      }

      case 'bridge-point': {
        if (element.id === hoveredElementId) {
          drawBridgePoint(program, element, [1, 1, 1, 1], scaledJoinerHoverOffset, MAP_LEFT_MARGIN, MAP_TOP_MARGIN)
        }
        drawBridgePoint(program, element, [0, 1, 0, 1], 0, MAP_LEFT_MARGIN, MAP_TOP_MARGIN)
      }
    }
  })
}