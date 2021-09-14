import { AdvancePoint, ConnectionNode, NodeDetails } from "~/map-creator"
import getPortalCoords from '~/consts/get-portal-coords'
import getPlatformCoords from '~/consts/get-platform-coords'

const collectNextPoints = (
  nodes: NodeDetails[],
  connections: [ConnectionNode, ConnectionNode][],
  lastVisitedPoint: ConnectionNode,
  platformCoords: Point[]
): Point[] => {
  const allNodeConnections = connections
    .filter(connection => (
      [connection[0].node, connection[1].node].includes(lastVisitedPoint.node)
    ))

  const collectedPoints: Point[] = []
  let startJoinIndex = lastVisitedPoint.joinIndex // (lastVisitedPoint.joinIndex + 1) % 4

  for (let i = 0; i < 4; i++) {

    collectedPoints.push({
      x: lastVisitedPoint.node.x + platformCoords[startJoinIndex * 2].x,
      y: lastVisitedPoint.node.y + platformCoords[startJoinIndex * 2].y,
    })
    lastVisitedPoint.node.visited[startJoinIndex * 2] = true

    let connection: ConnectionNode | null = null
    for (let j = 0; j < allNodeConnections.length; j++) {
      const conn = allNodeConnections[j]
      const isFirstNode = lastVisitedPoint.node === conn[0].node && startJoinIndex === conn[0].joinIndex
      const isSecondNode = lastVisitedPoint.node === conn[1].node && startJoinIndex === conn[1].joinIndex
      if (isFirstNode) { connection = conn[1] }
      if (isSecondNode) { connection = conn[0] }
      if (connection) { break }
    }

    if (connection) {
      collectedPoints.push({
        x: connection.node.x + platformCoords[connection.joinIndex * 2 + 1].x,
        y: connection.node.y + platformCoords[connection.joinIndex * 2 + 1].y,
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
        ),
      ]
    }
    collectedPoints.push({
      x: lastVisitedPoint.node.x + platformCoords[startJoinIndex * 2 + 1].x,
      y: lastVisitedPoint.node.y + platformCoords[startJoinIndex * 2 + 1].y,
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
  platformCoords: Point[],
): Point[] => {
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
      ...collectNextPoints(nodes, connections, startingNode, platformCoords),
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
    getPlatformCoords(distanceOffset),
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
