import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info"

const nodes = [
  {
    id: 0,
    visited: new Array(8).fill(false),
    x: 1011.1885387811633,
    y: 789.7983033240996,
  },
  {
    id: 1,
    visited: new Array(8).fill(false),
    x: 1000.9900882963987,
    y: 2218.6634349030464,
  },
  {
    id: 2,
    visited: new Array(8).fill(false),
    x: 977.2387898199444,
    y: 3739.3687240304703,
  }
]

export default {
  connections: [
    [
      {
        joinIndex: 0,
        node: nodes[2],
      },
      {
        joinIndex: 2,
        node: nodes[1]
      }
    ],
    [
      {
        joinIndex: 2,
        node: nodes[0],
      },
      {
        joinIndex: 0,
        node: nodes[1]
      }
    ]
  ],
  nodes,
  portals: [
    {
      angle: 0,
      x: 981.0801159972298,
      y: 3838.2152441135727,
    },
    {
      angle: 3.141592653589793,
      x: 1022.2796918282546,
      y: 687.1916118421051,
    },
  ]
} as SerializedMapInfo