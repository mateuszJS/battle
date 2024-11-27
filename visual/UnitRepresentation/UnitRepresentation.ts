import { UnitState } from "logic-contants"
import AssetsDescriptor from "AssetsDescriptor"
import mapAngleToIndex from "./mapAngleToIndex"
import AssetId from "AssetsDescriptor/AssetId"
import AnimatedSprite from "../WebGPU/AnimatedSprite/AnimatedSprite"

export default class UnitRepresentation {
  private aSprites: AnimatedSprite[];

  constructor(
    private state: UnitState,
    private angle: number,
    private position: Point,
    private assets: AssetId[],
    now: DOMHighResTimeStamp
  ) {
    this.aSprites = assets.map(() =>  new AnimatedSprite())
    this.updateSpritesConfig(now)
  }

  // <0, 2 * Math.PI> -> <0, angles>

  /*
  WebGPU needs to receive:
    - fraction color matrix
    - index of frames for head
    - index of frames for arms & weapon & backpack
    - index of frames for body
    - position for head, maybe rotation flag
    - position for body, maybe rotation flag
    - position for arms & weapon & backpack, maybe rotation flag
  */

  private updateSpritesConfig(now: DOMHighResTimeStamp) {
    this.aSprites.forEach((sprite, index) => {
      const asset = this.assets[index]
      const { timePerFrame, length, angles } = AssetsDescriptor[asset][this.state]
      const firstFrame = mapAngleToIndex(this.angle, angles) * length

      sprite.updateConfig(firstFrame, length, timePerFrame, now)
    })
  }

  public update(angle: number, state: UnitState, now: DOMHighResTimeStamp) {
    if (this.angle === angle && this.state === state) {
      this.aSprites.forEach(aSprite => aSprite.tick(now))
    } else {
      this.angle = angle
      this.state = state
      this.updateSpritesConfig(now)
    }
  }

  /**
   * @param textureLayers each asset adds it's own texture index
   * @param destinationRect each asset adds it's own position where should land on the durign render
   * @param sourcRect each asset adds it's source position from texture indicated by textureLayers
   */
  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    indiciesData: number[],
  ) {
    this.aSprites.forEach((aSprite, index) => {
      const lastUsedIndex = destinationData.length / 2
      // each point has x and y component so that's why divided by 2
      const nextIndicies = 
      [
        0, 1, 2,
        0, 2, 3
      ].map(i => lastUsedIndex + i)
      indiciesData.push(...nextIndicies)



      const assetId = this.assets[index]
      const { frames } = AssetsDescriptor[assetId][this.state] // what if state is different for each asset??
      const frame = frames[aSprite.frameIndex]

      textureLayersData.push(...Array(4).fill(frame.textureIndex))

      sourceData.push(...frame.sourceRect)

  
      const { width, height } = frame.destinationRect
      const x = this.position.x + frame.destinationRect.x
      const y = this.position.y + frame.destinationRect.y
  
      destinationData.push(
        x,          y,
        x + width,  y,
        x + width,  y + height,
        x,          y + height
      )
    })
  }
}

