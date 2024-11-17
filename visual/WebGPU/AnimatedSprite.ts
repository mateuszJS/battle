import { UnitState } from "logic-contants"
import AssetsDescriptor, { AssetId } from "assetsData"

export default class UnitRepresentation {
  public frameIndex = 0
  private prevFootprint = 0
  private lastChangeTime = 0 // last registered time when frame was updated

  constructor(
    public state: UnitState,
    public angle: number,
    public position: Point,
    public assets: AssetId[],
  ) {}

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
    // TODO: i nthe future assets might have different animations, so frame per asset will be needed
    const { timePerFrame, length, angles } = AssetsDescriptor[this.assets[0]][this.state]
    const first = 0

    const footprint = getFootprint(this.state, this.angle)
    if (footprint === this.prevFootprint) {

      if (time - this.lastChangeTime > timePerFrame) {
        this.frameIndex = (this.frameIndex + 1) % length
        this.lastChangeTime = time
      } else {
        this.frameIndex =
          first +
          getAngleOffsetInFrames(this.angle, angles) * length +
          this.frameIndex;
      }
    } else {

      this.prevFootprint = footprint
      this.lastChangeTime = time

      this.frameIndex =
        first +
        getAngleOffsetInFrames(this.angle, angles) * length
    }
  }


  // // write unit tests for it!
  // public update(pass: GPURenderPassEncoder, matrix: Float32Array, state: UnitState, angle: number, time: number) {
  //   const newFrame = this.getNewFrame(state, angle, time)
  //   const { frames } = AssetsDescriptor[AssetId.ElephantHead][state]
  //   const frame = frames[newFrame]

  //   drawTexture(pass, this.texture2dArray,  frame.textureIndex, matrix, frame.texSourcePoints, frame.destinationOffset)
  // }
}

function getFootprint(state: UnitState, angle: number): number {
  const { length, angles } = AssetsDescriptor[AssetId.ElephantHead][state]
  return state * 1000 + getAngleOffsetInFrames(angle, angles) * length
}

const MATH_2_PI = Math.PI * 2

// perform unit tests!
function getAngleOffsetInFrames(angle: number, angles: number): number {
  const singleAngleSlice = MATH_2_PI / angles
  const safeAngle = (angle + MATH_2_PI + singleAngleSlice / 2) % MATH_2_PI
  return Math.floor(safeAngle / singleAngleSlice)
}

/*
  each frame unit will check if their frame should change angle, state or just simply move to the next frame
*/