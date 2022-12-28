// import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

// const nodes = [{ id: 0, x: 589.2825517517862, y: 589.2825517517862, visited: new Array(8).fill(false) },{ id: 1, x: 589.2825517517862, y: 3910.717448248214, visited: new Array(8).fill(false) },{ id: 2, x: 3410.717448248214, y: 3910.717448248214, visited: new Array(8).fill(false) },{ id: 3, x: 3410.717448248214, y: 589.2825517517862, visited: new Array(8).fill(false) }]

// export default {
//   nodes,
//   connections: [[
//         { joinIndex: 1, node: nodes[0] },
//         { joinIndex: 3, node: nodes[3] },
//       ],[
//         { joinIndex: 2, node: nodes[3] },
//         { joinIndex: 0, node: nodes[2] },
//       ],[
//         { joinIndex: 3, node: nodes[2] },
//         { joinIndex: 1, node: nodes[1] },
//       ],[
//         { joinIndex: 0, node: nodes[1] },
//         { joinIndex: 2, node: nodes[0] },
//       ]],
//   portals: [{ angle: -3.141592653589793, x: 576.036617036011, y: 580.1484591412741 },{ angle: 0, x: 3419.9164646814397, y: 3906.7098770775615 }],
// } as SerializedMapInfo