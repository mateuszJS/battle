import AssetsDescriptor from "AssetsDescriptor"
import UnitRepresentation from "../UnitRepresentation/AnimatedSprite"

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
  const textureLayers: number[] = []
  const destinationRect: number[] = []
  const sourceRect: number[] = []
  let assetsNum = 0

  units.forEach(({ state, position, assets, frameIndex }) => {
    assets.forEach(assetId => {
      assetsNum++

      const { frames } = AssetsDescriptor[assetId][state]

      const frame = frames[frameIndex]
  
      const { width, height } = frame.destinationRect
      const x = position.x + frame.destinationRect.x
      const y = position.y + frame.destinationRect.y
  
      destinationRect.push(
        x,          y,
        x + width,  y,
        x + width,  y + height,
        x,          y + height
      )
  
      textureLayers.push(...Array.from({ length: 4 }, () => frame.textureIndex))

      sourceRect.push(...frame.sourceRect)
    })
  })

  const index = 
    Array.from({ length: assetsNum }, (_, instanceIndex) => [
      0, 1, 2,
      0, 2, 3
    ].map(i => instanceIndex * 4 + i)).flat()
  // console.log(index)
  return new VertexData({
    destinationRect,
    sourceRect,
    textureLayers,
    index
  }, assetsNum * 6)
}