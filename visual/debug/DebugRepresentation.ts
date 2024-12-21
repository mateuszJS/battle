
export default class DebugRepresentation {
  constructor(){}

  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    colorMatrixIdx: number[],
    normalsData: number[],
    indiciesData: number[],
    fullLightAngle: number[]
  ) {
    /* ============world origin arrow============ */
    const nextIndicies = [1, 0, 2].map(i => (destinationData.length / 4) + i)
    indiciesData.push(...nextIndicies)
    textureLayersData.push(...Array(3).fill(1))
    sourceData.push(
      0, 0,
      0, 1,
      1, 1,
    )
    destinationData.push(
      0, 0, 0, 1,
      100, 0, 0, 1,
      0, 0, 100, 1,
    )
    colorMatrixIdx.push(0, 0, 0)
    normalsData.push(...fullLightAngle)
  }
}