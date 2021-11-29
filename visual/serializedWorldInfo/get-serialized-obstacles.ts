import { AdvancePoint, ConnectionNode, NodeDetails } from "~/map-creator/get-serialized-map-info"
import getPortalCoords from '~/consts/get-portal-coords'
import getPlatformCoords from '~/consts/get-platform-coords'
import getBridgeOffset from "~/consts/get-bridge-offset"


const collectNextPoints = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  lastVisitedPoint: ConnectionNode,
  platformCoords: Point[],
  distanceOffset: number,
): Point[] => {
  const allNodeConnections = connections
    .filter(connection => (
      [connection[0].node, connection[1].node].includes(lastVisitedPoint.node)
    ))

  const collectedPoints: Point[] = []
  let startJoinIndex = lastVisitedPoint.joinIndex // (lastVisitedPoint.joinIndex + 1) % 4

  for (let i = 0; i < 4; i++) {

    let connection: ConnectionNode | null = null
    for (let j = 0; j < allNodeConnections.length; j++) {
      const conn = allNodeConnections[j]
      const isFirstNode = lastVisitedPoint.node === conn[0].node && startJoinIndex === conn[0].joinIndex
      const isSecondNode = lastVisitedPoint.node === conn[1].node && startJoinIndex === conn[1].joinIndex
      if (isFirstNode) { connection = conn[1] }
      if (isSecondNode) { connection = conn[0] }
      if (connection) { break }
    }

    const firstOffset = getBridgeOffset(startJoinIndex * 2, connection ? distanceOffset : 0)
    collectedPoints.push({
      x: lastVisitedPoint.node.x + platformCoords[startJoinIndex * 2].x + firstOffset.x,
      y: lastVisitedPoint.node.y + platformCoords[startJoinIndex * 2].y + firstOffset.y,
    })
    lastVisitedPoint.node.visited[startJoinIndex * 2] = true


    if (connection) {
      const offset = getBridgeOffset(connection.joinIndex * 2 + 1, distanceOffset)
      collectedPoints.push({
        x: connection.node.x + platformCoords[connection.joinIndex * 2 + 1].x + offset.x,
        y: connection.node.y + platformCoords[connection.joinIndex * 2 + 1].y + offset.y,
      })
      connection.node.visited[connection.joinIndex * 2 + 1] = true

      const nextJoinIndex = (connection.joinIndex + 1) % 4
      if (connection.node.visited[nextJoinIndex * 2]) {
        return collectedPoints
      }

      return [
        ...collectedPoints,
        ...collectNextPoints(
          nodes,
          connections,
          // startingPoint,
          {
            node: connection.node,
            joinIndex: nextJoinIndex,
          },
          platformCoords,
          distanceOffset,
        ),
      ]
    }
    const secondOffset = getBridgeOffset(startJoinIndex * 2 + 1, connection ? distanceOffset : 0)
    collectedPoints.push({
      x: lastVisitedPoint.node.x + platformCoords[startJoinIndex * 2 + 1].x + secondOffset.x,
      y: lastVisitedPoint.node.y + platformCoords[startJoinIndex * 2 + 1].y + secondOffset.y,
    })
    lastVisitedPoint.node.visited[startJoinIndex * 2 + 1] = true
    startJoinIndex = (startJoinIndex + 1) % 4

    if (lastVisitedPoint.node.visited[startJoinIndex * 2]) {
      return collectedPoints
    }
  }

  return collectedPoints
}

const getMapBoundaries = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  distanceOffset: number,
): Point[] => {
  const platformCoords = getPlatformCoords(distanceOffset)
  const safeCopyOfVisitedArrays = nodes.map(node => [...node.visited])

  let nodeWithMinY = nodes[0]
  nodes.forEach(node => {
    if (node.y < nodeWithMinY.y) {
      nodeWithMinY = node
    }
  })

  let startingNode: ConnectionNode = { node: nodeWithMinY, joinIndex: 0 }
  let results: Array<Point | null> = []

  do {
    results = [
      ...results,
      ...collectNextPoints(nodes, connections, startingNode, platformCoords, distanceOffset),
      null,
    ]
    startingNode = null
    for (let j = 0; j < nodes.length; j++) {
      const node = nodes[j]
      for (let i = 0; i < node.visited.length; i+= 2) {
        if (!node.visited[i]) {
          startingNode = { node, joinIndex: i / 2 }
          break;
        }
      }
    }
  } while(!!startingNode)

  nodes.forEach((node, index) => {
    node.visited = safeCopyOfVisitedArrays[index]
  })

  return results.slice(0, -1)
}

const getSerializedObstacles = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  portals: AdvancePoint[],
  distanceOffset: number,
) => {
  const mapBoundaries = getMapBoundaries(
    nodes,
    connections,
    distanceOffset,
  )

  const portalsPoints = portals.map(portal => [
    null,
    ...getPortalCoords(portal.x, portal.y, portal.angle, distanceOffset),
  ]).flat()

  return new Float32Array(
    [...mapBoundaries, ...portalsPoints]
    .map(point => {
      if (point === null) {
        return [-1]
      }
      return [point.x, point.y]
    }).flat()
  )
}

export default getSerializedObstacles
