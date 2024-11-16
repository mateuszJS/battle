import { UnitState } from "logic-contants"
import frameByState, { Asset } from "./framesByState"
import { drawTexture } from "./programs/initPrograms"

export default class AnimatedSprite {
  private currFrameOffset = 0
  private prevFootprint = 0
  private lastChangeTime = 0 // last registered time when frame was updated

  constructor() {}

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
    const footprint = getFootprint(state, angle)
    if (footprint === this.prevFootprint) {

      if (time - this.lastChangeTime > frameByState[state].timePerFrame) {
        this.currFrameOffset = (this.currFrameOffset + 1) % frameByState[state].length
        this.lastChangeTime = time
      }

      return frameByState[state].first +
        getAngleOffsetInFrames(angle, frameByState[state].angles) * frameByState[state].length +
        this.currFrameOffset;
    } else {

      this.prevFootprint = footprint
      this.lastChangeTime = time

      return frameByState[state].first +
        getAngleOffsetInFrames(angle, frameByState[state].angles) * frameByState[state].length
    }
  }

  // write unit tests for it!
  public update(pass: GPURenderPassEncoder, assets: Asset[], matrix: Float32Array, state: UnitState, angle: number, time: number) {
    const newFrame = this.getNewFrame(state, angle, time)
    const {
      texture,
      json,
      texUVs,
      texOffsets,
    } = assets[frameByState[state].textureIndex]

    // const integer = Math.floor(time * 0.001) % texCoords.length
    const integer = newFrame

    drawTexture(pass, texture, matrix, texUVs[integer], texOffsets[integer])
  }
}

function getFootprint(state: UnitState, angle: number): number {
  return state * 1000 + getAngleOffsetInFrames(angle, frameByState[state].angles) * frameByState[state].length
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