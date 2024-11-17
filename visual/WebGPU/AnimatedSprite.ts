import { UnitState } from "logic-contants"
import AssetsDescriptor, { AssetId } from "assetsData"
import Rect from "Rect"

export class VertexData {
  private destinationRect: number[]
  private sourceRect: number[]
  private layer: number[]
  private index: number[]

  constructor({
    destinationRect,
    sourceRect,
    layer,
    index,
  }: {
    destinationRect: number[]
    sourceRect: number[]
    layer: number[]
    index: number[]
  }) {
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

export default class AnimatedSprite {
  private currFrameOffset = 0
  private prevFootprint = 0
  private lastChangeTime = 0 // last registered time when frame was updated

  constructor(private texture2dArray: GPUTexture) {}

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

  private getNewFrame(state: UnitState, angle: number, time: number) {
    const { timePerFrame, length, angles } = AssetsDescriptor[AssetId.ElephantHead][state]
    const first = 0

    const footprint = getFootprint(state, angle)
    if (footprint === this.prevFootprint) {

      if (time - this.lastChangeTime > timePerFrame) {
        this.currFrameOffset = (this.currFrameOffset + 1) % length
        this.lastChangeTime = time
      }

      return first +
        getAngleOffsetInFrames(angle, angles) * length +
        this.currFrameOffset;
    } else {

      this.prevFootprint = footprint
      this.lastChangeTime = time

      return first +
        getAngleOffsetInFrames(angle, angles) * length
    }
  }

  // write unit tests for it!
  public getVertexData(state: UnitState, angle: number, time: number, position: Rect): VertexData {
    const newFrame = this.getNewFrame(state, angle, time)
    const { frames } = AssetsDescriptor[AssetId.ElephantHead][state]
    const frame = frames[newFrame]

    const { width, height } = position
    const x = position.x + frame.destinationOffset.x * width
    const y = position.y + frame.destinationOffset.y * height

    const destinationRect = [
      x,          y,
      x + width,  y,
      x + width,  y + height,
      x,          y + height
    ]

    const layer = Array.from({ length: 4 }, () => frame.textureIndex)

    const index = 
      Array.from({ length: 4 }, () => [
        0, 1, 2,
        0, 2, 3
      ]).flat()
    

    return new VertexData({
      destinationRect,
      sourceRect: frame.sourceRect,
      layer,
      index
    })
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