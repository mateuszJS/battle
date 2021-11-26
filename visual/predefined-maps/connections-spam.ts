const nodes = [
  {id: 0, x: 304.94709972782516, y: 304.94709972782516, visited: new Array(8).fill(false)},
  {id: 1, x: 1041.3240131578946, y: 304.94709972782516, visited: new Array(8).fill(false)},
  {id: 2, x: 1695.0529002721748, y: 304.94709972782516, visited: new Array(8).fill(false)},
  {id: 3, x: 1023.4970135041549, y: 1019.0335006925205, visited: new Array(8).fill(false)},
  {id: 4, x: 1027.4465460526314, y: 1743.2857946675897, visited: new Array(8).fill(false)},
  {id: 5, x: 304.94709972782516, y: 1751.130756578947, visited: new Array(8).fill(false)},
  {id: 6, x: 304.94709972782516, y: 2499.3778133656506, visited: new Array(8).fill(false)},
  {id: 7, x: 1040.2148978531854, y: 2472.190962603878, visited: new Array(8).fill(false)},
  {id: 8, x: 304.94709972782516, y: 1008.5915858725759, visited: new Array(8).fill(false)},
  {id: 9, x: 1695.0529002721748, y: 1016.8693732686978, visited: new Array(8).fill(false)},
  {id: 10, x: 1695.0529002721748, y: 1761.518568213296, visited: new Array(8).fill(false)},
  {id: 11, x: 1695.0529002721748, y: 2470.513763850415, visited: new Array(8).fill(false)},
  {id: 12, x: 1032.505193905817, y: 3151.4835093490296, visited: new Array(8).fill(false)},
  {id: 13, x: 1021.7116083795012, y: 4195.052900272175, visited: new Array(8).fill(false)},
  {id: 14, x: 304.94709972782516, y: 4195.052900272175, visited: new Array(8).fill(false)},
  {id: 15, x: 1695.0529002721748, y: 4195.052900272175, visited: new Array(8).fill(false)},
  {id: 16, x: 304.94709972782516, y: 3160.248225415512, visited: new Array(8).fill(false)},
  {id: 17, x: 1695.0529002721748, y: 3155.216629155124, visited: new Array(8).fill(false)},
]

export default {
  connections: [
    [
      { joinIndex: 1, node: nodes[3] },
      { joinIndex: 3, node: nodes[9] },
    ],
    [
      { joinIndex: 3, node: nodes[3] },
      { joinIndex: 1, node: nodes[8] },
    ],
    [
      { joinIndex: 0, node: nodes[8] },
      { joinIndex: 2, node: nodes[0] },
    ],
    [
      { joinIndex: 1, node: nodes[0] },
      { joinIndex: 3, node: nodes[1] },
    ],
    [
      { joinIndex: 2, node: nodes[1] },
      { joinIndex: 0, node: nodes[3] },
    ],
    [
      { joinIndex: 1, node: nodes[1] },
      { joinIndex: 3, node: nodes[2] },
    ],
    [
      { joinIndex: 2, node: nodes[2] },
      { joinIndex: 0, node: nodes[9] },
    ],
    [
      { joinIndex: 2, node: nodes[9] },
      { joinIndex: 0, node: nodes[10] },
    ],
    [
      { joinIndex: 2, node: nodes[3] },
      { joinIndex: 0, node: nodes[4] },
    ],
    [
      { joinIndex: 2, node: nodes[8] },
      { joinIndex: 0, node: nodes[5] },
    ],
    [
      { joinIndex: 2, node: nodes[5] },
      { joinIndex: 0, node: nodes[6] },
    ],
    [
      { joinIndex: 2, node: nodes[6] },
      { joinIndex: 0, node: nodes[16] },
    ],
    [
      { joinIndex: 2, node: nodes[16] },
      { joinIndex: 0, node: nodes[14] },
    ],
    [
      { joinIndex: 1, node: nodes[14] },
      { joinIndex: 3, node: nodes[13] },
    ],
    [
      { joinIndex: 1, node: nodes[13] },
      { joinIndex: 3, node: nodes[15] },
    ],
    [
      { joinIndex: 0, node: nodes[15] },
      { joinIndex: 2, node: nodes[17] },
    ],
    [
      { joinIndex: 2, node: nodes[12] },
      { joinIndex: 0, node: nodes[13] },
    ],
    [
      { joinIndex: 1, node: nodes[16] },
      { joinIndex: 3, node: nodes[12] },
    ],
    [
      { joinIndex: 1, node: nodes[12] },
      { joinIndex: 3, node: nodes[17] },
    ],
    [
      { joinIndex: 2, node: nodes[11] },
      { joinIndex: 0, node: nodes[17] },
    ],
    [
      { joinIndex: 2, node: nodes[7] },
      { joinIndex: 0, node: nodes[12] },
    ],
    [
      { joinIndex: 1, node: nodes[6] },
      { joinIndex: 3, node: nodes[7] },
    ],
    [
      { joinIndex: 1, node: nodes[5] },
      { joinIndex: 3, node: nodes[4] },
    ],
    [
      { joinIndex: 2, node: nodes[4] },
      { joinIndex: 0, node: nodes[7] },
    ],
    [
      { joinIndex: 1, node: nodes[4] },
      { joinIndex: 3, node: nodes[10] },
    ],
    [
      { joinIndex: 1, node: nodes[7] },
      { joinIndex: 3, node: nodes[11] },
    ],
    [
      { joinIndex: 2, node: nodes[10] },
      { joinIndex: 0, node: nodes[11] },
    ],
  ],
  nodes,
  portals: [
    {
      angle: 0,
      x: 1021.3058344875344,
      y: 1045.9227839335178,
    },
    {
      angle: 0,
      x: 1039.9714335180054,
      y: 3174.206847299168,
    },
  ]
}