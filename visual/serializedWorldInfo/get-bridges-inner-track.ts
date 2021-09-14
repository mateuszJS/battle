import { ConnectionNode } from "~/map-creator"

const getBridgesInnerTrack = (connections: [ConnectionNode, ConnectionNode][], coords: Point[]): Point[] => (
  connections.map(([nodeA, nodeB]) => [
    {
      x: coords[nodeA.joinIndex * 2].x + nodeA.node.x,
      y: coords[nodeA.joinIndex * 2].y + nodeA.node.y,
    },
    {
      x: coords[nodeA.joinIndex * 2 + 1].x + nodeA.node.x,
      y: coords[nodeA.joinIndex * 2 + 1].y + nodeA.node.y,
    },
    {
      x: coords[nodeB.joinIndex * 2].x + nodeB.node.x,
      y: coords[nodeB.joinIndex * 2].y + nodeB.node.y,
    },
    {
      x: coords[nodeB.joinIndex * 2 + 1].x + nodeB.node.x,
      y: coords[nodeB.joinIndex * 2 + 1].y + nodeB.node.y,
    },
  ]).flat()
)

export default getBridgesInnerTrack