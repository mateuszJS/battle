import { EnvVisuals } from "map-creator/serializeMap/collectEnvVisuals"
import attachBridgeVertex from "./attachBridgeVertex"
import attachPlatformVertex from "./attachPlatformVertex"


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
  private colorMatrixIdx: number[] = []
  private normalsData: number[] = []

  constructor(envVisuals: EnvVisuals){

    /* ============world origin arrow============ */
    const nextIndicies = [1, 0, 2].map(i => (this.destinationData.length / 4) + i)
    this.indiciesData.push(...nextIndicies)
    this.textureLayersData.push(...Array(3).fill(1))
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
    this.colorMatrixIdx.push(0, 0, 0)
    this.normalsData.push(0, 1, 0)



    /* ============platforms============ */
    envVisuals.platforms.forEach((points => {
      attachPlatformVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.colorMatrixIdx,
        this.normalsData,
        this.indiciesData,
        points,
      ) 
    }))

    // attachBridgeVertex(
    //   this.textureLayersData,
    //   this.destinationData,
    //   this.sourceData,
    //   this.colorMatrixIdx,
    //   this.indiciesData,
    //   envVisuals.bridges[2],
    // ) 

        /* ============birdges============ */
        envVisuals.bridges.forEach((points => {
          attachBridgeVertex(
            this.textureLayersData,
            this.destinationData,
            this.sourceData,
            this.colorMatrixIdx,
            this.normalsData,
            this.indiciesData,
            points,
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
    colorMatrixIdx: number[],
    normalsData: number[],
    indiciesData: number[],
  ) {
    textureLayersData.push(...this.textureLayersData)
    destinationData.push(...this.destinationData)
    sourceData.push(...this.sourceData)
    colorMatrixIdx.push(...this.colorMatrixIdx)
    normalsData.push(...this.normalsData)
    indiciesData.push(...this.indiciesData.map(i => i + indiciesData.length))
  }
}