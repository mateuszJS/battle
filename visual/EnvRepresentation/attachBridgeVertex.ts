
const BRIDGE_INDICIES = [
  0, 1, 2,
  0, 2, 3
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

  textureLayersData.push(...Array(points.length).fill(1))

  sourceData.push(
    ...points.flatMap(p => [p.x, p.y])
  )

  destinationData.push(
    ...points.flatMap(p => [p.x, 0, p.y, 1])
  )
}