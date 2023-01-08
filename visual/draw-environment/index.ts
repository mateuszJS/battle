// import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
// import drawNode from "./draw-node";
// import getNodePlatformCoords from '~/consts/get-platform-coords'
// import drawBridge from "./draw-bridge";
import { PLATFORM_RADIUS } from "consts/get-platform-coords";
import { CreatedMapDetails } from "map-creator";
import { platformCoords } from 'map-creator/constants'
import { convertLogicToVisual } from "utils";
import { drawPrimitiveProgram, drawSpritesProgram } from "webgl/programs";
import renderPrimitive from "webgl/renders/renderPrimitive";
import renderSprite from "webgl/renders/renderSprite";
import setupRenderTarget from "webgl/renders/setupRenderTarget";
import { TEXTURES_CACHE } from "webgl/textures";


// export interface DrawEnvResult {
//   background: PIXI.Container | PIXI.Sprite
//   sortableItems: Array<PIXI.Container | PIXI.Sprite>
// }

// export interface SerializedMapInfo {
//   nodes: NodeDetails[]
//   connections: [ConnectionNode, ConnectionNode][]
//   // portals: AdvancePoint[]
// }

// export interface NodeDetails {
//   id: number
//   x: number
//   y: number
//   // visited: boolean[]
// }

// export interface ConnectionNode {
//   node: NodeDetails
//   joinIndex: number
// }

export default function drawEnvironment(
  { platforms }: CreatedMapDetails,
  mapWidth: number,
  mapHeight: number,
) {
  // const envSortableItems: DrawEnvResult['sortableItems'] = []
  // const flattenConnections = serializedMapInfo.connections.flat()
  setupRenderTarget(null, [0, 0, 0, 1])

  drawPrimitiveProgram.setup({ color: [0.2, 0, 0, 1] })
  const [x1, y1] = convertLogicToVisual(0, 0)
  const [x2, y2] = convertLogicToVisual(mapWidth, 0)
  const [x3, y3] = convertLogicToVisual(mapWidth, mapHeight)
  const [x4, y4] = convertLogicToVisual(0, mapHeight)

  renderPrimitive(
    drawPrimitiveProgram.setup4CornerShape(
      x1, y1,
      x2, y2,
      x3, y3,
      x4, y4,
    )
  )

  platforms.forEach(platform => {
    const [x, y] = convertLogicToVisual(platform.x, platform.y)

    drawSpritesProgram.setup({
      texUnitIndex: TEXTURES_CACHE.platform.bind(0),
      position: TEXTURES_CACHE.platform.getPosition(
        x,
        y,
        PLATFORM_RADIUS * 2.1,
        0.5,
        0.2,
      ),
    })
    renderSprite()
  })


  // const envItems = serializedMapInfo.nodes.map(node => {
    // const relatedConnections = flattenConnections
    //   .filter(connectionNode => connectionNode.node.id === node.id)
    //   .map(connection => connection.joinIndex)

    // const isBridgeList = Array.from(
    //   { length: 4 },
    //   (_, index) => relatedConnections.includes(index),
    // )

    // const { background, sortableItems } = drawNode(node.x, node.y, isBridgeList)

    // envSortableItems.push(...sortableItems)

    // const graphics = new PIXI.Graphics()
    // graphics.beginFill(0x00ffff)
    // background.addChild(graphics)
    // graphics.drawRect(-10, -10, 20, 20)

    // return background
  // })
  // const container = new PIXI.Container

  // serializedMapInfo.connections.map(connection => {
  //   const points: Point[] = []

  //   platformCoords.forEach((point, index) => {
  //     const side = connection.find(side => Math.floor(index / 2) === side.joinIndex)
  //     if (!side) return
      
  //     points.push({
  //       x: point.x + side.node.x,
  //       y: point.y + side.node.y,
  //     })
  //   })
  //   points.push(points.splice(0, 1)[0]) // change the order of points
  //   const { background, sortableItems } = drawBridge(points)

  //   envSortableItems.push(...sortableItems)

  //   const graphics = new PIXI.Graphics()
  //   graphics.beginFill(0xff00ff)
  //   graphics.drawRect(-10, -10, 20, 20)
  //   background.addChild(graphics)

  //   envItems.push(background)
  // })

  // envItems.sort((itemA, itemB) => itemA.y - itemB.y)

  // container.addChild(...envItems)

  // return {
  //   background: container,
  //   sortableItems: envSortableItems
  // }
}
