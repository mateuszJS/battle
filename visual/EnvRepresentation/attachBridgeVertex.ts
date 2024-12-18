import AssetsDescriptor from "AssetsDescriptor"
import mat4 from "utils/mat4"

const BRIDGE_INDICIES = [
  0, 1, 13,
  0, 13, 12,

  1, 2, 14,
  1, 14, 13,

  // 2, 3, 15,
  // 15, 14, 2,

  // 3, 7, 10,
  // 10, 15, 3,

  // 7, 6, 10,
  // 10, 11, 7,

  // 9, 10, 6,
  // 6, 5, 9,

  // 4, 5, 9,
  // 9, 8, 4
]

const RAILING_WIDTH = 20
const RAILING_HEIGHT = 30

const BRIDGE_POINT_OFFSETS = [
  { x: RAILING_WIDTH, y: 0 },
  { x: RAILING_WIDTH, y: RAILING_HEIGHT },
  { x: 0, y: RAILING_HEIGHT },
  { x: 0, y: 0 },
]

const texturePoints = [
  [.0, .0],
  [.1, .0],
  [.1, .1],
  [.0, .1],
]

export default function attachBridgeVertex(
  textureLayersData: number[],
  destinationData: number[],
  sourceData: number[],
  indiciesData: number[],
  points: Point[],
) {
  const nextIndicies = BRIDGE_INDICIES.map(i => (destinationData.length / 4) + i)
  indiciesData.push(...nextIndicies)

  const angle = Math.atan2(points[3].y - points[0].y, points[0].x - points[3].x)

  points.forEach((p, index) => {
    BRIDGE_POINT_OFFSETS.forEach((offset, offsetIndex) => {
      const matrix = mat4.translation([p.x, p.y, 0])

      const angleOffset = index % 3 === 0
        ? +Math.PI / 2
        : -Math.PI / 2

      // mat4.rotateY(matrix, angle + angleOffset, matrix)
      const [x, y, z, w] = mat4.vectorTimesMatrix([offset.x, offset.y, 0, 1], matrix)
      destinationData.push(x, z, y, w)
      textureLayersData.push(1)
      sourceData.push(...texturePoints[offsetIndex])
      // mat4.translate(matrix, [offset.x, offset.y, 0], matrix)
    })
  })




}