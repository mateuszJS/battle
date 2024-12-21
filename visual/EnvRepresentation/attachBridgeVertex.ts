import { RAILING_POINT_OFFSETS } from "./consts"

const BRIDGE_INDICIES = [
  // that expanded bridge upper
  1, 2, 14,
  14, 13, 1,

  6, 5, 9,
  9, 10, 6,

// top middle main part
  3, 7, 11,
  11, 15, 3,

  //inner side
  7, 6, 10,
  10, 11, 7,

  2, 3, 15,
  15, 14, 2,

  // outer side
  0, 1, 13,
  13, 12, 0,

  5, 4, 8,
  8, 9, 5,
]


const BRIDGE_NORMALS_TOP = [
  // that expanded bridge upper
  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

// top middle main part
  0, 1, 0,
  0, 1, 0,
]


const texturePoints = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
]

const MAP_POINT_INDEX_TO_SIBLING_INDEX = [
  1,
  0,
  3,
  2
]

export default function attachBridgeVertex(
  textureLayersData: number[],
  destinationData: number[],
  sourceData: number[],
  colorMatrixIdx: number[],
  normalsData: number[],
  indiciesData: number[],
  points: Point[],
) {
  const nextIndicies = BRIDGE_INDICIES.map(i => (destinationData.length / 4) + i)
  indiciesData.push(...nextIndicies)

  const bridgeDirection = Math.atan2(points[3].y - points[0].y, points[0].x - points[3].x)
  const perpendicular = bridgeDirection + Math.PI / 2

  normalsData.push(
    ...BRIDGE_NORMALS_TOP,

    // railing inner side
    -Math.cos(perpendicular), 0, Math.sin(perpendicular),
    -Math.cos(perpendicular), 0, Math.sin(perpendicular),

    -Math.cos(perpendicular + Math.PI), 0, Math.sin(perpendicular + Math.PI),
    -Math.cos(perpendicular + Math.PI), 0, Math.sin(perpendicular + Math.PI),

    // railing outer side
    -Math.cos(perpendicular), 0, Math.sin(perpendicular),
    -Math.cos(perpendicular), 0, Math.sin(perpendicular),

    -Math.cos(perpendicular + Math.PI), 0, Math.sin(perpendicular + Math.PI),
    -Math.cos(perpendicular + Math.PI), 0, Math.sin(perpendicular + Math.PI),
  )

  points.forEach((p, index) => {
    const siblingPoint = points[MAP_POINT_INDEX_TO_SIBLING_INDEX[index]]
    const angle = Math.atan2(p.y - siblingPoint.y, siblingPoint.x - p.x)



    RAILING_POINT_OFFSETS.forEach((offset, offsetIndex) => {
      destinationData.push(
        p.x - Math.cos(angle) * offset.x,
        offset.y,
        p.y + Math.sin(angle) * offset.x,
        1
      )
      textureLayersData.push(10)
      sourceData.push(...texturePoints[offsetIndex])
      colorMatrixIdx.push(0)
    })
  })

}