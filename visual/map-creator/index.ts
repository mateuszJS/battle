// import initGame, { WasmModule } from '~/initGame'
// import { MAP_HEIGHT, MAP_WIDTH } from './constants'

// import getSerializedMapInfo from './get-serialized-map-info'
// import { createMenu, addNewFaction, FactionVisualDetails } from './menu'

import { WasmModule } from "initGame"
import { projection, projectionFlipY, translate } from "webgl/m3"
import FrameBuffer from "webgl/models/FrameBuffer"
import { drawPrimitivePickingProgram, drawPrimitiveProgram, drawSpritesProgram } from "webgl/programs"
import DrawPrimitiveProgram from "webgl/programs/DrawPrimitiveProgram"
import DrawPrimitivePickingProgram from "webgl/programs/DrawPrimitiveProgram/picking"
import { getIdFromLastRender, splitFloatIntoVec3 } from "webgl/programs/utils"
import renderPrimitive from "webgl/renders/renderPrimitive"
import renderSprite from "webgl/renders/renderSprite"
import setupRenderTarget from "webgl/renders/setupRenderTarget"
import { TEXTURES_CACHE } from "webgl/textures"
import { MAP_HEIGHT, MAP_SIZE, MAP_WIDTH, scaledBridgeWidth, scaledJoinerSize, scaledPlatformJoinersOffset } from './constants'
import drawInteractiveElements from "./drawInteractiveElements"


// let activeElement = null
// let isJoiner = false
// let isPortalArrow = false
// let offset = { x: 0, y: 0 }
// let connections: Array<[PIXI.Graphics, PIXI.Graphics]> = []
// const connectionsContainer = new PIXI.Graphics()
// const activeConnectionContainer = new PIXI.Graphics()
// const nodesWrapper = new PIXI.Container()
// const portalsWrapper = new PIXI.Container()
// const mapCreatorWrapper = new PIXI.Container()

// let nodes: PIXI.Container[] = []
// let portals: PIXI.Container[] = []

// const onDragStart = (event) => {
//   activeElement = event.currentTarget
//   offset.x = event.currentTarget.x - event.data.global.x
//   offset.y = event.currentTarget.y - event.data.global.y
//   event.stopPropagation()
// }

// const getSafePosition = (x: number, y: number, size: number) => [
//   Math.clamp(x + offset.x, mapDetails.x + size, mapDetails.x + mapDetails.width - size),
//   Math.clamp(y + offset.y, mapDetails.y + size, mapDetails.y + mapDetails.height - size),
// ]

// const drawConnections = () => {
//   connectionsContainer.clear()
  
//   connections.forEach(([node1, node2]) => {
//     connectionsContainer.lineStyle(bridgeWidth, 0x0000ff, 1);
//     const node1Width = node1.width
//     const node1Height = node1.height
//     const node2Width = node2.width
//     const node2Height = node2.height
//     connectionsContainer.moveTo(node1.x + node1.parent.x, node1.y + node1.parent.y);
//     connectionsContainer.lineTo(node2.x + node2.parent.x, node2.y + node2.parent.y);
//     connectionsContainer.lineStyle(3, 0x0000ff, 1);
//     drawJoiner(connectionsContainer, Math.round(node1.x) === 0, node1.x + node1.parent.x, node1.y + node1.parent.y)
//     drawJoiner(connectionsContainer, Math.round(node2.x) === 0, node2.x + node2.parent.x, node2.y + node2.parent.y)
//   })
// }

// const getHoveredJoiner = (x: number, y: number): PIXI.Graphics => {
//   let hoveredJoiner = null
//   nodes.forEach(node => {
//     node.children.forEach(joiner => {
//       const width = (joiner as PIXI.Graphics).width
//       const height = (joiner as PIXI.Graphics).height
//       const inRange = (
//         joiner.x + joiner.parent.x - width / 2 < x &&
//         joiner.x + joiner.parent.x + width / 2 > x &&
//         joiner.y + joiner.parent.y - height / 2 < y &&
//         joiner.y + joiner.parent.y + height / 2 > y
//       )
//       // const distance = Math.hypot(joiner.x + joiner.parent.x - x, joiner.y + joiner.parent.y - y)
//       if (inRange) {
//         hoveredJoiner = joiner
//       }
//     })
//   })
//   if (!hoveredJoiner) {
//     return null
//   }
//   if (hoveredJoiner === activeElement) {
//     return null
//   }
//   if (hoveredJoiner.parent === activeElement.parent) {
//     return null
//   }
//   const isJoinerConnected = !!connections.find(
//     ([node1, node2]) => node1 === hoveredJoiner || node2 === hoveredJoiner
//   )
//   if (isJoinerConnected) {
//     return null
//   }
//   return hoveredJoiner
// }

// const onDragEnd = (event) => {
//   if (isJoiner) {
//     activeConnectionContainer.clear();
//     const hoveredJoiner = getHoveredJoiner(event.data.global.x, event.data.global.y)

//     if (hoveredJoiner) {
//       connections.push([activeElement, hoveredJoiner])
//       drawConnections()
//     }
//   }

//   activeElement = null
//   isJoiner = false
//   isPortalArrow = false
//   event.stopPropagation()
// }

// const updateActiveConnection = (x: number, y: number) => {
//   activeConnectionContainer.clear()
//   activeConnectionContainer.lineStyle(bridgeWidth, 0x7700ff, 1)
//   activeConnectionContainer.moveTo(offset.x,offset.y)
//   activeConnectionContainer.lineTo(x, y)
//   activeConnectionContainer.lineStyle(5, 0x7700ff, 1)
//   const hoveredJoiner = getHoveredJoiner(x, y)
//   if (hoveredJoiner) {
//     drawJoiner(activeConnectionContainer, Math.round(hoveredJoiner.x) === 0, hoveredJoiner.x + hoveredJoiner.parent.x, hoveredJoiner.y + hoveredJoiner.parent.y)
//   }
//   if (isJoiner) { // TODO: this is always true!
//     drawJoiner(activeConnectionContainer, Math.round(activeElement.x) === 0, activeElement.x + activeElement.parent.x, activeElement.y + activeElement.parent.y)
//   }
// }

// const onDragMove = (event)  => {
//   if (activeElement) {
//     if (isPortalArrow) {
//       const angle = Math.atan2(
//         event.data.global.x - activeElement.parent.position.x,
//         activeElement.parent.position.y - event.data.global.y,
//       )
//       const factor = 20 / (2 * Math.PI);
//       (activeElement as PIXI.Graphics).parent.rotation = Math.round(angle * factor) / factor
//     } else if (isJoiner) {
//       updateActiveConnection(event.data.global.x, event.data.global.y)
//     } else {
//       activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, activeElement.width / 2))
//       drawConnections()
//     }
//   }
// }

// const onPointerDownPortalArrow = (event) => {
//   activeElement = event.currentTarget
//   isPortalArrow = true
//   event.stopPropagation()
// }

// const onPointerDownJoiner = (event) => {
//   activeElement = event.currentTarget
//   isJoiner = true

//   const connectionIndex = connections.findIndex(
//     ([node1, node2]) => node1 === activeElement || node2 === activeElement
//   )
//   if (connectionIndex !== -1) {
//     const removedConnection = connections.splice(connectionIndex, 1)[0]

//     if (removedConnection[0] === activeElement) {
//       activeElement = removedConnection[1]
//     } else {
//       activeElement = removedConnection[0]
//     }
//     offset.x = activeElement.x + activeElement.parent.x
//     offset.y = activeElement.y + activeElement.parent.y
//   } else {
//     offset.x = activeElement.x + activeElement.parent.x
//     offset.y = activeElement.y + activeElement.parent.y
//   }
//   drawConnections()
//   updateActiveConnection(event.data.global.x, event.data.global.y)
//   event.stopPropagation()
// }

// const drawJoiner = (graphics: PIXI.Graphics, isMiddleX: boolean, offsetX = 0, offsetY = 0) => {
//   const width = isMiddleX ? bridgeWidth : 10
//   const height = isMiddleX ? 10 : bridgeWidth
//   graphics.drawRect(-width/2 + offsetX, -height/2 + offsetY, width, height)
// }

const getNodeVisual = (disableJoinerEvent = false) => {
  // const newNode = new PIXI.Graphics()
  // newNode.beginFill(0xff0000)
  // platformCoords.forEach((coord, index) => {
  //   newNode[index === 0 ? 'moveTo' : 'lineTo'](coord.x * mapDetails.scale, coord.y * mapDetails.scale)
  // })
  // newNode.closePath()

  // for (let i = 0; i < 4; i++) {
  //   const joiner = new PIXI.Graphics()
  //   joiner.x = Math.sin(i / 4 * Math.PI * 2) * newNode.width / 2
  //   joiner.y = -Math.cos(i / 4 * Math.PI * 2) * newNode.height / 2
  //   joiner.beginFill(0x00ff00)
  //   drawJoiner(joiner, Math.round(joiner.x) === 0)
  //   joiner.endFill()


  //   if (!disableJoinerEvent) {
  //     joiner.interactive = true
  //     joiner.on('pointerdown', onPointerDownJoiner)
  //   }
  //   newNode.addChild(joiner)
  // }

  // return newNode
}

// const getPortalVisual = (disableArrowEvent = false) => {
//   const portalBase = new PIXI.Graphics()
//   portalBase.beginFill(0x9900ff)
//   portalBase.drawCircle(0, 0, 20)

//   const portalArrow = new PIXI.Graphics()
//   portalArrow.beginFill(0xffffff)
//   portalArrow.drawRect(-3, -30, 6, 30)
//   portalArrow.moveTo(0, -40)
//   portalArrow.lineTo(10, -30)
//   portalArrow.lineTo(-10, -30)
//   portalArrow.closePath()

//   if (!disableArrowEvent) {
//     portalArrow.interactive = true
//     portalArrow.on('pointerdown', onPointerDownPortalArrow)
//   }

//   const portal = new PIXI.Container()
//   portal.addChild(portalBase)
//   portal.addChild(portalArrow)
//   return portal
// }

// const createToolbar = () => {
//   /* ADD PLATFORM BUTTON */
//   const newNodeIcon = getNodeVisual(true)
//   nodesWrapper.addChild(newNodeIcon)
//   newNodeIcon.interactive = true
//   newNodeIcon.scale.set(mapDetails.x / newNodeIcon.width)
//   newNodeIcon.x = newNodeIcon.width / 2
//   newNodeIcon.y = mapDetails.y + newNodeIcon.width / 2
//   newNodeIcon
//     .on('pointerdown', (event) => {
//       const newNode = getNodeVisual()
//       newNode.interactive = true

//       newNode
//       .on('pointerdown', onDragStart)
//       .on('pointerup', onDragEnd)
//       .on('pointerupoutside', onDragEnd)

//       activeElement = newNode
//       offset.x = 0
//       offset.y = 0
//       activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, newNodeIcon.width / 2))

//       nodesWrapper.addChild(newNode)
//       nodes.push(newNode)
//     })

//   /* ADD PORTAL BUTTON */
//   const newPortalIcon = getPortalVisual(true)
//   nodesWrapper.addChild(newPortalIcon)
//   newPortalIcon.interactive = true
//   newPortalIcon.scale.set(mapDetails.x / newPortalIcon.width)
//   newPortalIcon.x = newPortalIcon.width / 2

//   newPortalIcon.y = mapDetails.y + newPortalIcon.width / 2 + newNodeIcon.height
//   newPortalIcon
//     .on('pointerdown', (event) => {
//       const newNode = getPortalVisual()
//       newNode.interactive = true

//       newNode
//       .on('pointerdown', onDragStart)
//       .on('pointerup', onDragEnd)
//       .on('pointerupoutside', onDragEnd)

//       isJoiner = false
//       activeElement = newNode
//       offset.x = 0
//       offset.y = 0
//       activeElement.position.set(...getSafePosition(event.data.global.x, event.data.global.y, newPortalIcon.width / 2))

//       portalsWrapper.addChild(newNode)
//       portals.push(newNode)

//       addNewFaction()
//     })
// }

export interface InteractiveElement {
  type: 'platform' | 'create-platform-btn' | 'platform-bridge-point'
  x: number
  y: number
  id: number
  vec3_id: [number, number, number]
  positionRelativeTo?: InteractiveElement
  horizontal?: boolean
}

interface Bridge {
  sourceJoint: InteractiveElement
  destinationJoint: InteractiveElement | null // it's null in case if bridge is during creation
  // so we should use mouse coords
}

let bridges: Bridge[] = []
// mutable to allow .filter() method

export default function mapCreator() {
  const gl = window.gl
  const canvas = gl.canvas as HTMLCanvasElement

  let hoveredElementId = 0

  let mouseX = -1
  let mouseY = -1

  const interactiveElements: InteractiveElement[] = [
    {
      type: 'create-platform-btn' as const,
      x: 50,
      y: 100,
    },
  ].map((elem, index) => ({
    ...elem,
    id: index + 1, // 0 is no selection
    vec3_id: splitFloatIntoVec3(index + 1)
  }))

  let selection: { offsetX: number, offsetY: number, element: InteractiveElement } | null = null

  canvas.addEventListener('mousemove', (e: MouseEventInit) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = (e.clientX as number) - rect.left;
    mouseY = (e.clientY as number) - rect.top;

    if (selection) {
      switch (selection.element.type) {
        case 'platform-bridge-point': {
          break;
        }
        case 'platform': {
          selection.element.x = mouseX - selection.offsetX
          selection.element.y = mouseY - selection.offsetY
          break
        }
      }
    }
  });

  canvas.addEventListener('mousedown', (e: MouseEventInit) => {
    if (hoveredElementId) {
      const hoveredElement = interactiveElements.find(obj => obj.id === hoveredElementId)

      if (!hoveredElement) return // it SHOULD NOT happen...

      switch (hoveredElement.type) {
        case 'platform': {
          selection = {
            offsetX: mouseX - hoveredElement.x,
            offsetY: mouseY - hoveredElement.y,
            element: hoveredElement
          }
          break
        }
        case 'platform-bridge-point': {
          const bridge = bridges.find(bridge => bridge.destinationJoint === hoveredElement || bridge.sourceJoint === hoveredElement)
          if (bridge) {
            if (!bridge.destinationJoint || !bridge.sourceJoint) return // it should never happen

            const newSrcJoint = bridge.sourceJoint === hoveredElement ? bridge.destinationJoint : bridge.sourceJoint
            bridge.sourceJoint = newSrcJoint
            bridge.destinationJoint = null
            selection = {
              offsetX: 0,
              offsetY: 0,
              element: bridge.sourceJoint
            }
          } else {
            selection = {
              offsetX: mouseX - hoveredElement.x,
              offsetY: mouseY - hoveredElement.y,
              element: hoveredElement
            }
            bridges.push({
              sourceJoint: hoveredElement,
              destinationJoint: null
            })
          }
          break
        }
      }

    }
  });

  canvas.addEventListener('mouseup', (e: MouseEventInit) => {
    if (selection?.element.type === 'platform-bridge-point') {
      if (hoveredElementId) {
        const hoveredElement = interactiveElements.find(obj => obj.id === hoveredElementId)

        if (!hoveredElement || hoveredElement.type !== 'platform-bridge-point') {
          bridges = bridges.filter(bridge => !!bridge.destinationJoint)
        } else {
          const bridgeDuringCreation = bridges.find(bridge => !bridge.destinationJoint)

          if (bridgeDuringCreation) {
            // if should be always true, if there is a selection of bridge point, then there should be also a bridge without the destination
            bridgeDuringCreation.destinationJoint = hoveredElement
          }
        }
      } else {
        bridges = bridges.filter(bridge => !!bridge.destinationJoint)
      }
    }

    selection = null
  });

  canvas.addEventListener('click', (e: MouseEventInit) => {
    if (hoveredElementId) {
      const selectedElement = interactiveElements.find(obj => obj.id === hoveredElementId)

      if (!selectedElement) return // it SHOULD NOT happen...

      switch (selectedElement.type) {
        case 'create-platform-btn': {
          const id = interactiveElements[interactiveElements.length - 1].id + 1
          const platformElement = {
            type: 'platform',
            x: MAP_SIZE.x + MAP_SIZE.width / 2,
            y: MAP_SIZE.y + MAP_SIZE.height / 2,
            id,
            vec3_id: splitFloatIntoVec3(id)
          } as const
          interactiveElements.push(platformElement)


          const joinersAngles = [0, Math.PI * .5, Math.PI, Math.PI * 1.5]

          joinersAngles.forEach(joinAngle => {
            const id = interactiveElements[interactiveElements.length - 1].id + 1

            interactiveElements.push({
              type: 'platform-bridge-point',
              x: Math.sin(joinAngle) * scaledPlatformJoinersOffset,
              y: -Math.cos(joinAngle) * scaledPlatformJoinersOffset,
              id,
              vec3_id: splitFloatIntoVec3(id),
              positionRelativeTo: platformElement,
              horizontal: Math.round(joinAngle % Math.PI) === 0
            })
  
          })
          break;
        }
      }
    }
  });

  function createBackground() {
    const pixelX = -mouseX * canvas.width / canvas.clientWidth;
    const pixelY = - mouseY * gl.canvas.height / canvas.clientHeight;
    drawPrimitivePickingProgram.updateMatrix(pixelX, pixelY)
    setupRenderTarget(drawPrimitivePickingProgram.frameBuffer, [0, 0, 0, 1])
    drawInteractiveElements(interactiveElements, hoveredElementId, drawPrimitivePickingProgram)
    hoveredElementId = getIdFromLastRender()

    // render map background
    setupRenderTarget(null, [0, 0, 0, 1])
    
    drawPrimitiveProgram.setup({ color: [0.2, 0.2, 0.2, 1] })
    renderPrimitive(drawPrimitiveProgram.setupRect(
      100,
      100,
      gl.drawingBufferWidth / 2 - 200,
      gl.drawingBufferHeight - 500),
    )

    drawInteractiveElements(interactiveElements, hoveredElementId, drawPrimitiveProgram)

    drawPrimitiveProgram.setup({ color: [1, 0.4, 0.2, 1] })
    bridges.forEach(({ sourceJoint, destinationJoint}) => {
      if (!sourceJoint.positionRelativeTo) return // it should never happen
      const [sourceJointOffsetX, sourceJointOffsetY] = sourceJoint.horizontal ? [scaledBridgeWidth * .5, 0] : [0, scaledBridgeWidth * .5]
      const sourcePoint = {
        x: sourceJoint.x + sourceJoint.positionRelativeTo.x,
        y: sourceJoint.y + sourceJoint.positionRelativeTo.y,
      }

      // we need to improve typing, separated type for bridge points
      const relative = destinationJoint?.positionRelativeTo || { x: 0, y: 0 }
      const destinationPoint = {
        x: destinationJoint ? destinationJoint.x + relative.x : mouseX,
        y: destinationJoint ? destinationJoint.y + relative.y : mouseY,
      }
      renderPrimitive(
        drawPrimitiveProgram.setup4CornerShape(
          sourcePoint.x + sourceJointOffsetX, sourcePoint.y + sourceJointOffsetY,
          sourcePoint.x - sourceJointOffsetX, sourcePoint.y - sourceJointOffsetY,
          destinationPoint.x + sourceJointOffsetX, destinationPoint.y + sourceJointOffsetY,
          destinationPoint.x - sourceJointOffsetX, destinationPoint.y - sourceJointOffsetY,
        )
      )
    })

    // drawPrimitiveProgram.setup({ color: [0.8, 0.4, 0.1, 1]})
    // renderPrimitive(
    //   null,
    //   drawPrimitiveProgram.setupOctagon(gl.drawingBufferWidth * 0.5, gl.drawingBufferHeight * 0.5, 300),
    //   // drawPrimitiveProgram.setupRect(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    //   // drawPrimitiveProgram.setupRect(100, 100, gl.drawingBufferWidth / 2 - 200, gl.drawingBufferHeight - 500)
    // )

    // drawSpritesProgram.setup({
    //   texUnitIndex: frameBuffer.attach(0),
    //   position: frameBuffer.getPositionCenter(1000, 1000, 100),
    // })
    // renderSprite(null)




    

    // drawSpritesProgram.setup({
    //   texUnitIndex: frameBuffer.attach(0),
    //   position: frameBuffer.getPositionCenter(1000, 1000, 100),
    // })
    // renderSprite(null)

    // drawPrimitivePickingProgram.setup({ id: splitFloatIntoVec3(97), x: 0, y: 0 })
    // super.setup(inputData, translate(this.matrix, inputData.x, inputData.y))
    // const matrix = translate(projectionFlipY(gl.drawingBufferWidth, gl.drawingBufferHeight), -mouseX / gl.drawingBufferWidth, -mouseY / gl.drawingBufferHeight)
    // drawPrimitiveProgram.setup({ color: [0, 0, 0, 1] }, matrix)


    // const projectionFunction = inputData.noFlipY ? projection : projectionFlipY
    // gl.uniformMatrix3fv(this.matrixUniform, false, matrix || projectionFunction(
    //   inputData.outputWidth || gl.drawingBufferWidth,
    //   inputData.outputHeight || gl.drawingBufferHeight
    // ));



    // drawPrimitivePickingProgram.setup({ id: splitFloatIntoVec3(97), x: mouseX, y: mouseY })
    // renderPrimitive(
    //   frameBuffer,
    //   drawPrimitiveProgram.setupRect(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    // )
    


    // drawSpritesProgram.setup({
    //   texUnitIndex: TEXTURES_CACHE.GUIdivider.bind(0),
    //   position: TEXTURES_CACHE.GUIdivider.getPositionCenter(
    //     window.gl.drawingBufferWidth * .5,
    //     window.gl.drawingBufferHeight * .5,
    //     window.gl.drawingBufferWidth * .025,
    //   ),
    // })
    // render(null)

    
    // getIdFromLastRender(mouseX, mouseY)

    // drawPrimitiveProgram.setup({ color: [0.2, 0.2, 0.2, 1]})
    // renderPrimitive(
    //   null,
    //   drawPrimitiveProgram.setupRect(100, 100, gl.drawingBufferWidth / 2 - 200, gl.drawingBufferHeight - 500)
    // )
    
    requestAnimationFrame(createBackground);

    // const background = new PIXI.Graphics()
    // background.beginFill(0x333333)
    // background.drawRect(mapDetails.x, mapDetails.y, mapDetails.width, mapDetails.height)
    // background.endFill()
    // mapCreatorWrapper.addChild(background)
    // mapCreatorWrapper.addChild(nodesWrapper)
    // mapCreatorWrapper.addChild(portalsWrapper)
    // mapCreatorWrapper.addChild(connectionsContainer)
    // mapCreatorWrapper.addChild(activeConnectionContainer)

    // background.interactive = true;
    // background.on('pointermove', onDragMove)
  }

  requestAnimationFrame(createBackground);

  // createToolbar()
  // const startGame = (factionVisualDetails: FactionVisualDetails[]) => {
  //   initGame({
  //     wasmModule,
  //     serializedMapInfo:  getSerializedMapInfo(nodes, connections, portals),
  //     mapWidth: MAP_WIDTH,
  //     mapHeight: MAP_HEIGHT,
  //     factionVisualDetails
  //   })
  // }
  // createMenu(startGame)
  // window.app.stage.addChild(mapCreatorWrapper)
}
