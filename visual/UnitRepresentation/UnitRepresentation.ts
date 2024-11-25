import { UnitState } from "logic-contants"
import AssetsDescriptor from "AssetsDescriptor"
import mapAngleToIndex from "./mapAngleToIndex"
import AssetId from "AssetsDescriptor/AssetId"
import AnimatedSprite from "./AnimatedSprite"

export default class UnitRepresentation {
  private aSprites: AnimatedSprite[];

  constructor(
    public state: UnitState,
    public angle: number,
    public position: Point,
    public assets: AssetId[],
    now: DOMHighResTimeStamp
  ) {
    this.aSprites = assets.map(asset => {
      const { timePerFrame, length, angles } = AssetsDescriptor[asset][this.state]
      const firstFrame = mapAngleToIndex(this.angle, angles) * length

      return new AnimatedSprite(firstFrame, length, timePerFrame, now)
    })
    // create AnimatedSprites
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

  public update(time: DOMHighResTimeStamp) {
    this.updateFrameIndex(time)
  }

  private updateFrameIndex(time: DOMHighResTimeStamp) {
    this.aSprites.forEach(aSprite => aSprite.update(time))
    // // TODO: i nthe future assets might have different animations, so frame per asset will be needed
    // const { timePerFrame, length, angles } = AssetsDescriptor[this.assets[0]][this.state]

    // const isStillSameAnimation = this.currAnimationFirstFrame === mapAngleToIndex(this.angle, angles) * length

    // if (isStillSameAnimation) {
    //   if (time - this.lastChangeTime > timePerFrame) {
    //     this.animationFrameIndex = (this.animationFrameIndex + 1) % length
    //     this.lastChangeTime = time
    //   }
    // } else {
    //   this.currAnimationFirstFrame = mapAngleToIndex(this.angle, angles) * length
    //   this.lastChangeTime = time
    //   this.animationFrameIndex = 0
    // }
  }
}

