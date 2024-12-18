import { EnvVisuals } from "map-creator/serializeMap/collectEnvVisuals"
import attachBridgeVertex from "./attachBridgeVertex"

const PLATFORM_INDICIES = [
  1, 0, 2,
  2, 0, 3,
  3, 0, 4,
  4, 0, 5,
  5, 0, 6,
  6, 0, 7,
  7, 0, 8,
  8, 0, 1,
]

const texturePoints = [
  [.0, .0],
  [.1, .0],
  [.1, .1],
  [.0, .1],
]

export default class EnvRepresentation {
  private textureLayersData: number[] = []
  private destinationData: number[] = []
  private sourceData: number[] = []
  private indiciesData: number[] = []

  constructor(envVisuals: EnvVisuals){
    const nextIndicies = [1, 0, 2].map(i => (this.destinationData.length / 4) + i)
    this.indiciesData.push(...nextIndicies)

    this.textureLayersData.push(...Array(3).fill(1))

    // this.sourceData.push(
    //   ...platformPoints.flatMap(p => [p.x, p.y])
    // )

    this.sourceData.push(
      0, 0,
      0, 1,
      1, 1,
    )

    this.destinationData.push(
      0, 0, 0, 1,
      100, 0, 0, 1,
      0, 0, 100, 1,
    )

    envVisuals.bridges.forEach((points => {
      attachBridgeVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.indiciesData,
        points,
      ) 
    }))

    envVisuals.platforms.forEach((platformPoints => {
      const nextIndicies = PLATFORM_INDICIES.map(i => (this.destinationData.length / 4) + i)
      this.indiciesData.push(...nextIndicies)

      this.textureLayersData.push(...Array(platformPoints.length).fill(1))

      // this.sourceData.push(
      //   ...platformPoints.flatMap(p => [p.x, p.y])
      // )

      this.sourceData.push(
        ...platformPoints.flatMap((p, i) => texturePoints[i % 4])
      )

      this.destinationData.push(
        ...platformPoints.flatMap(p => [p.x, 0, p.y, 1])
      )
    }))

    // console.log('this.indiciesData', [...this.indiciesData])
    // console.log('this.textureLayersData', [...this.textureLayersData])
    // console.log('this.sourceData', [...this.sourceData])
    // console.log('this.destinationData', [...this.destinationData])
  }

  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    indiciesData: number[],
  ) {
    textureLayersData.push(...this.textureLayersData)
    destinationData.push(...this.destinationData)
    sourceData.push(...this.sourceData)
    indiciesData.push(...this.indiciesData.map(i => i + indiciesData.length))
  }
}