// import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
// import drawNode from "./draw-node";
// import getNodePlatformCoords from '~/consts/get-platform-coords'
// import drawBridge from "./draw-bridge";

// const platformCoords = getNodePlatformCoords()

// export interface DrawEnvResult {
//   background: PIXI.Container | PIXI.Sprite
//   sortableItems: Array<PIXI.Container | PIXI.Sprite>
// }

// const drawEnvironment = (serializedMapInfo: SerializedMapInfo): DrawEnvResult => {
//   const envSortableItems: DrawEnvResult['sortableItems'] = []
//   const flattenConnections = serializedMapInfo.connections.flat()
  
//   const envItems = serializedMapInfo.nodes.map(node => {
//     const relatedConnections = flattenConnections
//       .filter(connectionNode => connectionNode.node.id === node.id)
//       .map(connection => connection.joinIndex)

//     const isBridgeList = Array.from(
//       { length: 4 },
//       (_, index) => relatedConnections.includes(index),
//     )

//     const { background, sortableItems } = drawNode(node.x, node.y, isBridgeList)

//     envSortableItems.push(...sortableItems)

//     const graphics = new PIXI.Graphics()
//     graphics.beginFill(0x00ffff)
//     background.addChild(graphics)
//     graphics.drawRect(-10, -10, 20, 20)

//     return background
//   })
//   const container = new PIXI.Container

//   serializedMapInfo.connections.map(connection => {
//     const points: Point[] = []

//     platformCoords.forEach((point, index) => {
//       const side = connection.find(side => Math.floor(index / 2) === side.joinIndex)
//       if (!side) return
      
//       points.push({
//         x: point.x + side.node.x,
//         y: point.y + side.node.y,
//       })
//     })
//     points.push(points.splice(0, 1)[0]) // change the order of points
//     const { background, sortableItems } = drawBridge(points)

//     envSortableItems.push(...sortableItems)

//     const graphics = new PIXI.Graphics()
//     graphics.beginFill(0xff00ff)
//     graphics.drawRect(-10, -10, 20, 20)
//     background.addChild(graphics)

//     envItems.push(background)
//   })

//   envItems.sort((itemA, itemB) => itemA.y - itemB.y)

//   container.addChild(...envItems)

//   return {
//     background: container,
//     sortableItems: envSortableItems
//   }
// }

// export default drawEnvironment