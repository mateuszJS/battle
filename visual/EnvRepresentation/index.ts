import { EnvVisuals } from "map-creator/serializeMap/collectEnvVisuals"
import attachBridgeVertex from "./attachBridgeVertex"
import attachPlatformVertex from "./attachPlatformVertex"

export default class EnvRepresentation {
  private textureLayersData: number[] = []
  private destinationData: number[] = []
  private sourceData: number[] = []
  private indiciesData: number[] = []
  private colorMatrixIdx: number[] = []
  private normalsData: number[] = []

  constructor(envVisuals: EnvVisuals){
    /* ============platforms============ */
    envVisuals.platforms.forEach((points => {
      attachPlatformVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.colorMatrixIdx,
        this.normalsData,
        this.indiciesData,
        points as unknown as Point[],
        envVisuals.bridges as unknown as Point[][],
      ) 
    }))

    /* ============birdges============ */
    envVisuals.bridges.forEach((points => {
      attachBridgeVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.colorMatrixIdx,
        this.normalsData,
        this.indiciesData,
        points as unknown as Point[],
      ) 
    }))
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