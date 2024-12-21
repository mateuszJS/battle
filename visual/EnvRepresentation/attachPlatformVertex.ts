import { RAILING_POINT_OFFSETS } from "./consts"
import { getBridgePoint } from "./attachBridgeVertex"

/** top, right, bottom, left booleans indicates which one
 * should remain closed(connect with next platform vertex)
 */
function getIndicies(top: boolean, right: boolean, bottom: boolean, left: boolean) {
  return [
    // top middle center
    7, 3, 11,
    15, 11, 19,
    23, 19, 27,
    31, 27, 3,
    11, 3, 19,
    27, 19, 3,


    // top of railings
    ...(top
    ? [
      1, 2, 6,
      6, 5, 1,
    ] : []),

    5, 6, 10,
    10, 9, 5,

    ...(right
    ? [
      9, 10, 14,
      14, 13, 9,
    ] : []),

    13, 14, 18,
    18, 17, 13,

    ...(bottom
    ? [
      18, 22, 21,
      21, 17, 18,
    ] : []),

    21, 22, 26,
    26, 25, 21,

    ...(left
    ? [
      25, 26, 30,
      30, 29, 25,
    ] : []),

    29, 30, 2,
    2, 1, 29,


    // outter side of railing
    ...(top ? [
      1, 5, 4,
      4, 0, 1,
    ] : []),

    5, 9, 8,
    8, 4, 5,

    ...(right ? [
      9, 13, 12,
      12, 8, 9,
    ] : []),

    12, 13, 17,
    17, 16, 12,

    ...(bottom ? [
      16, 17, 21,
      21, 20, 16,
    ] : []),

    20, 21, 25,
    25, 24, 20,

    ...(left ? [
      24, 25, 29,
      29, 28, 24,
    ] : []),

    28, 29, 1,
    1, 0, 28,

    // inner side of rialing
    ...(top ? [
      7, 6, 2,
      2, 3, 7,
    ] : []),

    11, 10, 6,
    6, 7, 11,

    ...(right ? [
      15, 14, 10,
      10, 11, 15,
    ] : []),

    19, 18, 14,
    14, 15, 19,

    ...(bottom ? [
      23, 22, 18,
      18, 19, 23,
    ] : []),

    27, 26, 22,
    22, 23, 27,

    ...(left ? [
      31, 30, 26,
      26, 27, 31,
    ] : []),

    3, 2, 30,
    30, 31, 3,
  ]
}


function getNormals(top: boolean, right: boolean, bottom: boolean, left: boolean) {
  return [
    // top middle center
    0, 1, 0,
    0, 1, 0,

    0, 1, 0,
    0, 1, 0,

    0, 1, 0,
    0, 1, 0,


    // top of railings
    ...(top ? [
      0, 1, 0,
      0, 1, 0,
    ] : []),

    0, 1, 0,
    0, 1, 0,

    ...(right ? [
      0, 1, 0,
      0, 1, 0,
    ] : []),

    0, 1, 0,
    0, 1, 0,

    ...(bottom ? [
      0, 1, 0,
      0, 1, 0,
    ] : []),

    0, 1, 0,
    0, 1, 0,

    ...(left ? [
      0, 1, 0,
      0, 1, 0,
    ] : []),

    0, 1, 0,
    0, 1, 0,


    // outter side of railing
    ...(top ? [
      0, 0, -1,
      0, 0, -1,
    ] : []),

    Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),
    Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),

    ...(right ? [
      1, 0, 0,
      1, 0, 0,
    ] : []),

    Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
    Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),

    ...(bottom ? [
      0, 0, 1,
      0, 0, 1,
    ] : []),

    Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),
    Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),

    ...(left ? [
      -1, 0, 0,
      -1, 0, 0,
    ] : []),

    Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),
    Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),

    // inner side of rialing
    ...(top ? [
      0, 0, 1,
      0, 0, 1,
    ] : []),

    Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),
    Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),
  
    ...(right ? [
      -1, 0, 0,
      -1, 0, 0,
    ] : []),

    Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),
    Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),

    ...(bottom ? [
      0, 0, -1,
      0, 0, -1,
    ] : []),

    Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),
    Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),

    ...(left ? [
      1, 0, 0,
      1, 0, 0,
    ] : []),

    Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
    Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
  ]
}

const texturePoints = [
  [0, 0],
  [.5, 0],
  [.5, 1],
  [0, 1],
]

export default function attachPlatformVertex(
  textureLayersData: number[],
  destinationData: number[],
  sourceData: number[],
  colorMatrixIdx: number[],
  normalsData: number[],
  indiciesData: number[],
  points: Point[],
  bridges: Point[][],
) {
  const closedGates = [
    !getBridgePoint(points[0], bridges, {x:0,y:0}),
    !getBridgePoint(points[2], bridges, {x:0,y:0}),
    !getBridgePoint(points[4], bridges, {x:0,y:0}),
    !getBridgePoint(points[6], bridges, {x:0,y:0}),
  ] as const
  const nextIndicies = getIndicies(...closedGates).map(i => (destinationData.length / 4) + i)
  indiciesData.push(...nextIndicies)

  normalsData.push(...getNormals(...closedGates))


  const center = points.reduce((acc, p) => ({
    x: acc.x + p.x / points.length,
    y: acc.y + p.y / points.length,
  }), { x: 0, y: 0 })

  points.forEach(p => {
    const angle = Math.atan2(p.y - center.y, center.x - p.x)

    RAILING_POINT_OFFSETS.forEach((offset, offsetIndex) => {
      const bridgeDestinationPoint = getBridgePoint(p, bridges, offset)
      if (bridgeDestinationPoint) {
         destinationData.push(...bridgeDestinationPoint)
      } else {
        destinationData.push(
          p.x - Math.cos(angle) * offset.x,
          offset.y,
          p.y + Math.sin(angle) * offset.x,
          1
        )
      }
      textureLayersData.push(10)
      sourceData.push(...texturePoints[offsetIndex])
      colorMatrixIdx.push(0)
    })
  })
}