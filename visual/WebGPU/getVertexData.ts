import UnitRepresentation from "UnitRepresentation/UnitRepresentation"

export class VertexData {
  private destinationRect: number[]
  private sourceRect: number[]
  private textureLayers: number[]
  private index: number[]
  private colorMatrixIdx: number[]

  constructor(
    {
      destinationRect,
      sourceRect,
      textureLayers,
      index,
      colorMatrixIdx,
    }: {
      destinationRect: number[]
      sourceRect: number[]
      textureLayers: number[]
      index: number[]
      colorMatrixIdx: number[]
    },
    public instancesNum: number
  ) {
    this.destinationRect = destinationRect
    this.sourceRect = sourceRect
    this.textureLayers = textureLayers
    this.index = index
    this.colorMatrixIdx = colorMatrixIdx
  }
  getBakedData() {

    return {
      destinationRect: new Float32Array(this.destinationRect),
      sourceRect: new Float32Array(this.sourceRect),
      layer: new Uint32Array(this.textureLayers),
      index: new Uint32Array(this.index),
      colorMatrixIdx: new Uint32Array(this.colorMatrixIdx),
    }
  }
}

export function getVertexData(units: UnitRepresentation[]): VertexData {
  const textureLayersData: number[] = []
  const destinationData: number[] = []
  const sourceData: number[] = []
  const indiciesData: number[] = []
  const colorMatrixIdxData: number[] = []

  units.forEach((unit) => {
    unit.addBufferData(textureLayersData, destinationData, sourceData, indiciesData, colorMatrixIdxData)
  })

  return new VertexData({
    destinationRect: destinationData,
    sourceRect: sourceData,
    textureLayers: textureLayersData,
    index: indiciesData,
    colorMatrixIdx: colorMatrixIdxData,
  }, indiciesData.length)
}