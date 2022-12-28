// import getPlatformCoords from '~/consts/get-platform-coords'
// import { ConnectionNode } from '~/map-creator/get-serialized-map-info'
// import getBridgeOffset from "~/consts/get-bridge-offset"

// const getBridgesInnerTrack = (
//   connections: [ConnectionNode, ConnectionNode][],
//   distanceOffset: number,
// ): Point[] => {
//   const coords = getPlatformCoords(distanceOffset)

//   return connections.map(([nodeA, nodeB]) => {
//     const input = [
//       { cornerIndex: nodeA.joinIndex * 2, node: nodeA },
//       { cornerIndex: nodeA.joinIndex * 2 + 1, node: nodeA },
//       { cornerIndex: nodeB.joinIndex * 2, node: nodeB },
//       { cornerIndex: nodeB.joinIndex * 2 + 1, node: nodeB },
//     ]

//     return input.map(({ cornerIndex, node }) => {
//       const offset = getBridgeOffset(cornerIndex, distanceOffset)
//       return {
//         x: coords[cornerIndex].x + node.node.x + offset.x,
//         y: coords[cornerIndex].y + node.node.y + offset.y,
//       }
//     })
//   }).flat()
// }

// export default getBridgesInnerTrack