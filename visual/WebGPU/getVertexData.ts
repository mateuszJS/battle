import UnitRepresentation from "UnitRepresentation/UnitRepresentation"

export class VertexData {
  private destinationRect: number[]
  private sourceRect: number[]
  private textureLayers: number[]
  private index: number[]

  constructor(
    {
      destinationRect,
      sourceRect,
      textureLayers,
      index,
    }: {
      destinationRect: number[]
      sourceRect: number[]
      textureLayers: number[]
      index: number[]
    },
    public instancesNum: number
  ) {
    this.destinationRect = destinationRect
    this.sourceRect = sourceRect
    this.textureLayers = textureLayers
    this.index = index
  }

  getBakedData() {
    return {
      destinationRect: new Float32Array(this.destinationRect),
      sourceRect: new Float32Array(this.sourceRect),
      layer: new Uint32Array(this.textureLayers),
      index: new Uint32Array(this.index),
    }
  }
}

export function getVertexData(units: UnitRepresentation[]): VertexData {
  const textureLayersData: number[] = []
  const destinationData: number[] = []
  const sourceData: number[] = []
  const indiciesData: number[] = []

  units.forEach((unit) => {
    unit.addBufferData(textureLayersData, destinationData, sourceData, indiciesData)
  })

  // console.log(index)
  return new VertexData({
    destinationRect: destinationData,
    sourceRect: sourceData,
    textureLayers: textureLayersData,
    index: indiciesData
  }, indiciesData.length)
}