// import mapDetails from './map-details'

// export interface AdvancePoint extends Point {
//   angle: number
// }

// export interface NodeDetails {
//   id: number
//   x: number
//   y: number
//   visited: boolean[]
// }

// export interface ConnectionNode {
//   node: NodeDetails
//   joinIndex: number
// }

// export interface SerializedMapInfo {
//   nodes: NodeDetails[]
//   connections: [ConnectionNode, ConnectionNode][]
//   portals: AdvancePoint[]
// }

// const getJoinIndex = (join: PIXI.Graphics) => {
//   if (join.y < -1) return 0
//   if (join.x > 1) return 1
//   if (join.y > 1) return 2

//   return 3
// }

// const getSerializedMapInfo = (
//   nodes: PIXI.Container[],
//   connections: Array<[PIXI.Graphics, PIXI.Graphics]>,
//   portals: PIXI.Container[],
//   ): SerializedMapInfo => {
//   let id = 0;
//   const serializedNodes: NodeDetails[] = nodes.map(node => ({
//     id: id++,
//     x: (node.x - mapDetails.x) / mapDetails.scale,
//     y: (node.y - mapDetails.y) / mapDetails.scale,
//     visited: new Array(8).fill(false),
//   }))

//   const serializedConnections: [ConnectionNode, ConnectionNode][] = connections.map(([join1, join2]) => {
//     const join1Node = nodes.indexOf(join1.parent)
//     const join2Node = nodes.indexOf(join2.parent)
//     return [
//       { node: serializedNodes[join1Node], joinIndex: getJoinIndex(join1) },
//       { node: serializedNodes[join2Node], joinIndex: getJoinIndex(join2) },
//     ]
//   })

//   const serializedPortal = portals.map(portal => ({
//     angle: portal.rotation,
//     x: (portal.x - mapDetails.x) / mapDetails.scale,
//     y: (portal.y - mapDetails.y) / mapDetails.scale,
//   }))

//   // console.log({
//   //   nodes: serializedNodes,
//   //   connections: serializedConnections,
//   //   portals: serializedPortal,
//   // })

//   return {
//     nodes: serializedNodes,
//     connections: serializedConnections,
//     portals: serializedPortal,
//   }
// }

// export default getSerializedMapInfo