import AssetsDescriptor from "AssetsDescriptor"
import mat4 from "utils/mat4"
import { RAILING_POINT_OFFSETS } from "./consts"

const PLATFORM_INDICIES = [
  // top middle center
  7, 3, 11,
  15, 11, 19,
  23, 19, 27,
  31, 27, 3,
  11, 3, 19,
  27, 19, 3,


  // top of railings
  1, 2, 6,
  6, 5, 1,

  5, 6, 10,
  10, 9, 5,

  9, 10, 14,
  14, 13, 9,

  13, 14, 18,
  18, 17, 13,

  18, 22, 21,
  21, 17, 18,

  21, 22, 26,
  26, 25, 21,

  25, 26, 30,
  30, 29, 25,

  29, 30, 2,
  2, 1, 29,


  // outter side of railing
  1, 5, 4,
  4, 0, 1,

  5, 9, 8,
  8, 4, 5,

  9, 13, 12,
  12, 8, 9,

  12, 13, 17,
  17, 16, 12,

  16, 17, 21,
  21, 20, 16,

  20, 21, 25,
  25, 24, 20,

  24, 25, 29,
  29, 28, 24,

  28, 29, 1,
  1, 0, 28,

  // inner side of rialing

  7, 6, 2,
  2, 3, 7,

  11, 10, 6,
  6, 7, 11,

  15, 14, 10,
  10, 11, 15,

  19, 18, 14,
  14, 15, 19,

  23, 22, 18,
  18, 19, 23,

  27, 26, 22,
  22, 23, 27,

  31, 30, 26,
  26, 27, 31,

  3, 2, 30,
  30, 31, 3,
]



const PLATFORM_NORMALS = [
  // top middle center
  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,


  // top of railings
  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,

  0, 1, 0,
  0, 1, 0,


  // outter side of railing
  0, 0, -1,
  0, 0, -1,

  Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),
  Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),

  1, 0, 0,
  1, 0, 0,

  Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
  Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),

  0, 0, 1,
  0, 0, 1,

  Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),
  Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),

  -1, 0, 0,
  -1, 0, 0,

  Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),
  Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),

  // inner side of rialing

  0, 0, 1,
  0, 0, 1,

  Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),
  Math.cos(Math.PI * -.75), 0, -Math.sin(Math.PI * -.75),

  -1, 0, 0,
  -1, 0, 0,

  Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),
  Math.cos(Math.PI * .75), 0, -Math.sin(Math.PI * .75),

  0, 0, -1,
  0, 0, -1,

  Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),
  Math.cos(Math.PI * .25), 0, -Math.sin(Math.PI * .25),

  1, 0, 0,
  1, 0, 0,

  Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
  Math.cos(Math.PI * -.25), 0, -Math.sin(Math.PI * -.25),
]



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
) {
  const nextIndicies = PLATFORM_INDICIES.map(i => (destinationData.length / 4) + i)
  indiciesData.push(...nextIndicies)

  normalsData.push(...PLATFORM_NORMALS)


  const center = points.reduce((acc, p) => ({
    x: acc.x + p.x / points.length,
    y: acc.y + p.y / points.length,
  }), { x: 0, y: 0 })

  points.forEach(p => {
    const angle = Math.atan2(p.y - center.y, center.x - p.x)

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