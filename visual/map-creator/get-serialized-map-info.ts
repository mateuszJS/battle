// import { BridgePoint, Platform } from "map-creator"


// export interface AdvancePoint extends Point {
//   angle: number
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

// // export interface Platform {
// //   type: 'platform' | 'create-platform-btn'
// //   x: number
// //   y: number
// //   id: number
// //   vec3_id: [number, number, number]
// // }

// // export interface BridgePoint {

// export interface SerializedMapInfo {
//   nodes: NodeDetails[]
//   connections: [ConnectionNode, ConnectionNode][]
//   // portals: AdvancePoint[]
// }

// const getJoinIndex = (join: PIXI.Graphics) => {
//   if (join.y < -1) return 0
//   if (join.x > 1) return 1
//   if (join.y > 1) return 2

//   return 3
// }

// export default function getSerializedMapInfo (
//   nodes: Platform[],
//   connections: BridgePoint[],
//   // portals: PIXI.Container[],
//   ): SerializedMapInfo {
//   let id = 0;
//   const serializedNodes: NodeDetails[] = nodes.map(node => ({
//     id: id++,
//     x: node.x,
//     y: node.y,
//     // visited: new Array(8).fill(false),
//   }))

//   const serializedConnections: [ConnectionNode, ConnectionNode][] = connections.map(([join1, join2]) => {
//     const join1Node = nodes.indexOf(join1.parent)
//     const join2Node = nodes.indexOf(join2.parent)
//     return [
//       { node: serializedNodes[join1Node], joinIndex: getJoinIndex(join1) },
//       { node: serializedNodes[join2Node], joinIndex: getJoinIndex(join2) },
//     ]
//   })

//   // const serializedPortal = portals.map(portal => ({
//   //   angle: portal.rotation,
//   //   x: portal.x,
//   //   y: portal.y,
//   // }))

//   // console.log({
//   //   nodes: serializedNodes,
//   //   connections: serializedConnections,
//   //   portals: serializedPortal,
//   // })

//   return {
//     nodes: serializedNodes,
//     connections: serializedConnections,
//     portals: [],
//   }
// }