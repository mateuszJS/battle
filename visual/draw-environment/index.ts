import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
import drawNode from "./draw-node";
import getNodePlatformCoords from '~/consts/get-platform-coords'
import drawBridge from "./draw-bridge";

const platformCoords = getNodePlatformCoords()

const drawEnvironment = (serializedMapInfo: SerializedMapInfo): PIXI.Container => {
  const flattenConnections = serializedMapInfo.connections.flat()
  
  const nodeContainers = serializedMapInfo.nodes.map(node => {
    const relatedConnections = flattenConnections
      .filter(connectionNode => connectionNode.node.id === node.id)
      .map(connection => connection.joinIndex)

    const isBridgeList = Array.from(
      { length: 4 },
      (_, index) => relatedConnections.includes(index),
    )

    return drawNode(node.x, node.y, isBridgeList).graphic
  })
  const container = new PIXI.Container
  container.addChild(...nodeContainers)

  serializedMapInfo.connections.map(connection => {

    const points: Point[] = []
    platformCoords.forEach((point, index) => {
      const side = connection.find(side => Math.floor(index / 2) === side.joinIndex)
      if (!side) return
      const [x, y] = window.convertLogicCoordToVisual(point.x + side.node.x, point.y + side.node.y)
      points.push({ x, y })
    })
    points.push(points.splice(0, 1)[0]) // change the order of points
    container.addChild(drawBridge(points))
      // pixels.beginFill(index === 0 ? 0x00ff00 : 0xff0000)
      // // const pointX = point.x * radius + x
      // // const pointY = point.y * 0.52 * radius + y - yOffset
      // const [pointX, pointY] = window.convertLogicCoordToVisual(point.x + logicX, point.y + logicY)


    // firstSide.
  })

  return container
}

export default drawEnvironment