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

const MAP_POINT_INDEX_TO_OPPOSITE_INDEX = [
  3,
  2,
  1,
  0
]

function getDestinationPoints(p: Point, index: number, points: Point[], offset: Point) {
  const siblingPoint = points[MAP_POINT_INDEX_TO_SIBLING_INDEX[index]]
  const siblingAngle = Math.atan2(p.y - siblingPoint.y, siblingPoint.x - p.x)

  const correctionOffset = { x: 0, y: 0 }
  // for second and third point we need to move it a bit closer to the center of avoid bridge_offsets.png
  if (offset.x === 0) {
    const oppositePoint = points[MAP_POINT_INDEX_TO_OPPOSITE_INDEX[index]]
    const oppositeAngle = Math.atan2(p.y - oppositePoint.y, oppositePoint.x - p.x)

    correctionOffset.x =  -Math.cos(oppositeAngle) * 10 // 10 is purely by visual testing
    correctionOffset.y =  Math.sin(oppositeAngle) * 10
  }

  return [
    p.x - Math.cos(siblingAngle) * offset.x + correctionOffset.x,
    offset.y,
    p.y + Math.sin(siblingAngle) * offset.x + correctionOffset.y,
    1
  ]
}

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
    RAILING_POINT_OFFSETS.forEach((offset, offsetIndex) => {
      destinationData.push(
        ...getDestinationPoints(p, index, points, offset)
      )
      textureLayersData.push(10)
      sourceData.push(...texturePoints[offsetIndex])
      colorMatrixIdx.push(0)
    })
  })

}

export function getBridgePoint(point: Point, bridges: Point[][], railingPointOffset: Point): number[] | null {
  let destinationPoint: number[] | null = null

  bridges.some(bridgePoints => {
    return bridgePoints.some((bp, index) => {
      if (Math.hypot(bp.x - point.x, bp.y - point.y) < 1) {
        destinationPoint = getDestinationPoints(bp, index, bridgePoints, railingPointOffset)
        return true
      }
    })
  })

  return destinationPoint
}