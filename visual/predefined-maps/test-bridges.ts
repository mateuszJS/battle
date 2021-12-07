import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

const nodes = [{ id: 0, x: 585.031101791922, y: 585.031101791922, visited: new Array(8).fill(false) },{ id: 1, x: 585.031101791922, y: 3914.9688982080784, visited: new Array(8).fill(false) },{ id: 2, x: 3414.968898208078, y: 585.031101791922, visited: new Array(8).fill(false) },{ id: 3, x: 3414.968898208078, y: 3911.100520437995, visited: new Array(8).fill(false) }]

export default {
  nodes,
  connections: [[
        { joinIndex: 3, node: nodes[3] },
        { joinIndex: 1, node: nodes[1] },
      ],[
        { joinIndex: 0, node: nodes[1] },
        { joinIndex: 2, node: nodes[0] },
      ],[
        { joinIndex: 1, node: nodes[0] },
        { joinIndex: 3, node: nodes[2] },
      ],[
        { joinIndex: 2, node: nodes[2] },
        { joinIndex: 0, node: nodes[3] },
      ]],
  portals: [],
} as SerializedMapInfo