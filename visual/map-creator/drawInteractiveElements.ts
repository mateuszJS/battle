import { InteractiveElement } from "map-creator"
import DrawPrimitiveProgram from "webgl/programs/DrawPrimitiveProgram"
import DrawPrimitivePickingProgram from "webgl/programs/DrawPrimitiveProgram/picking"
import renderPrimitive from "webgl/renders/renderPrimitive"
import {
  scaledBridgeWidth,
  scaledJoinerHoverOffset,
  scaledJoinerSize,
  scaledPlatformCoords,
  scaledPlatformCoordsHover,
  scaledPlatformCoordsToolbar,
  scaledPlatformCoordsToolbarHover
} from "./constants"

export default function drawInteractiveElements(elements: InteractiveElement[], hoveredElementId: number, program: DrawPrimitiveProgram | DrawPrimitivePickingProgram) {
  elements.forEach(element => {
    switch (element.type) {
      case 'platform': {
        if (element.id === hoveredElementId) {
          program.setup({ id: element.vec3_id, color: [1, 1, 1, 1] })
          renderPrimitive(program.setupPolygonWithCenter(scaledPlatformCoordsHover, { x: element.x, y: element.y }))
        }

        program.setup({ id: element.vec3_id, color: [0.4, 0.1, 0.7, 1] })
        renderPrimitive(program.setupPolygonWithCenter(scaledPlatformCoords, { x: element.x, y: element.y }))
        break;
      }
      case 'create-platform-btn': {
        if (element.id === hoveredElementId) {
          program.setup({ id: element.vec3_id, color: [1, 1, 1, 1] })
          renderPrimitive(program.setupPolygonWithCenter(scaledPlatformCoordsToolbarHover, { x: element.x, y: element.y }))
        }

        program.setup({ id: element.vec3_id, color: [0.4, 0.1, 0.7, 1] })
        renderPrimitive(program.setupPolygonWithCenter(scaledPlatformCoordsToolbar, { x: element.x, y: element.y }))
        break;
      }

      case 'platform-bridge-point': {
        const positionRelativeTo = element.positionRelativeTo
        if (!positionRelativeTo) return
        const [width, height] = element.horizontal ? [scaledBridgeWidth, scaledJoinerSize] : [scaledJoinerSize, scaledBridgeWidth]

        if (element.id === hoveredElementId) {
          program.setup({ id: element.vec3_id, color: [1, 1, 1, 1] })
          renderPrimitive(program.setupRect(
            element.x + positionRelativeTo.x - width / 2 - scaledJoinerHoverOffset,
            element.y + positionRelativeTo.y - height / 2 - scaledJoinerHoverOffset,
            width + 2 * scaledJoinerHoverOffset,
            height + 2 * scaledJoinerHoverOffset,
          ))
        }


        program.setup({ id: element.vec3_id, color: [0, 1, 0, 1] })
        renderPrimitive(program.setupRect(
          element.x + positionRelativeTo.x - width / 2,
          element.y + positionRelativeTo.y - height / 2,
          width,
          height,
        ))
      }
    }
  })
}