import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

const nodes = [{ id: 0, x: 1094.6708281637718, y: 1248.0129497518612, visited: new Array(8).fill(false) },{ id: 1, x: 1037.9187344913153, y: 2984.864492866005, visited: new Array(8).fill(false) }]

export default {
  nodes,
  connections: [[
        { joinIndex: 2, node: nodes[0] },
        { joinIndex: 0, node: nodes[1] },
      ]],
  portals: [{ angle: 0, x: 1077.0781637717123, y: 3001.342470533499 },{ angle: -3.141592653589793, x: 1063.2899736352358, y: 1082.3123449131515 }],
} as SerializedMapInfo
