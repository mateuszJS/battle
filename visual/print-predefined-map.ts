import { SerializedMapInfo } from "./map-creator/get-serialized-map-info";


export default (serializedMapInfo: SerializedMapInfo) => (
  `
  import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

  const nodes = [${
    serializedMapInfo.nodes.map(node => (
      `{ id: ${node.id}, x: ${node.x}, y: ${node.y}, visited: new Array(8).fill(false) }`
    )).join()
  }]

  export default {
    nodes,
    connections: [${
      serializedMapInfo.connections.map(([nodeA, nodeB]) => (
        `[
          { joinIndex: ${nodeA.joinIndex}, node: nodes[${nodeA.node.id}] },
          { joinIndex: ${nodeB.joinIndex}, node: nodes[${nodeB.node.id}] },
        ]`        
      )).join()
    }],
    portals: [${
      serializedMapInfo.portals.map(portal => (
        `{ angle: ${portal.angle}, x: ${portal.x}, y: ${portal.y} }`
      )).join()
    }],
  } as SerializedMapInfo`
)
