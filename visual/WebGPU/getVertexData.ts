import UnitRepresentation from "./AnimatedSprite"
import AssetsDescriptor, { AssetId } from "assetsData"

export class VertexData {
  private destinationRect: number[]
  private sourceRect: number[]
  private layer: number[]
  private index: number[]

  constructor(
    {
      destinationRect,
      sourceRect,
      layer,
      index,
    }: {
      destinationRect: number[]
      sourceRect: number[]
      layer: number[]
      index: number[]
    },
    public instancesNum: number
  ) {
    this.destinationRect = destinationRect
    this.sourceRect = sourceRect
    this.layer = layer
    this.index = index
  }

  getBakedData() {
    return {
      destinationRect: new Float32Array(this.destinationRect),
      sourceRect: new Float32Array(this.sourceRect),
      layer: new Uint32Array(this.layer),
      index: new Uint32Array(this.index),
    }
  }
}

export function getVertexData(units: UnitRepresentation[]): VertexData {
  const layer: number[] = []
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
  
      layer.push(...Array.from({ length: 4 }, () => frame.textureIndex))

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
    layer,
    index
  }, assetsNum * 6)
}