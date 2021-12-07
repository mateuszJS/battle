import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
import drawNode from "./draw-node";
import getNodePlatformCoords from '~/consts/get-platform-coords'
import drawBridge from "./draw-bridge";

const platformCoords = getNodePlatformCoords()

const drawEnvironment = (serializedMapInfo: SerializedMapInfo): PIXI.Container => {
  const flattenConnections = serializedMapInfo.connections.flat()
  
  const envItems = serializedMapInfo.nodes.map(node => {
    const relatedConnections = flattenConnections
      .filter(connectionNode => connectionNode.node.id === node.id)
      .map(connection => connection.joinIndex)

    const isBridgeList = Array.from(
      { length: 4 },
      (_, index) => relatedConnections.includes(index),
    )

    const sprite = drawNode(node.x, node.y, isBridgeList).graphic
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0x00ffff)
    sprite.addChild(graphics)
    graphics.drawRect(-10, -10, 20, 20)

    return sprite
  })
  const container = new PIXI.Container

  serializedMapInfo.connections.map(connection => {
    const points: Point[] = []

    platformCoords.forEach((point, index) => {
      const side = connection.find(side => Math.floor(index / 2) === side.joinIndex)
      if (!side) return
      const [x, y] = window.convertLogicCoordToVisual(point.x + side.node.x, point.y + side.node.y)
      points.push({ x, y })
    })
    points.push(points.splice(0, 1)[0]) // change the order of points
    const sprite = drawBridge(points)
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff00ff)
    graphics.drawRect(-10, -10, 20, 20)
    sprite.addChild(graphics)

    envItems.push(sprite)
  })

  envItems.sort((itemA, itemB) => itemA.y - itemB.y)

  container.addChild(...envItems)

  return container
}

export default drawEnvironment