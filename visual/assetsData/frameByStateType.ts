import { UnitState } from "logic-contants"
import { FrameDetails } from "WebGPU/getSpriteSheetTexture"

export type FrameByState = Record<UnitState, {
  prefix: string
  length: number
  angles: number
  timePerFrame: number
  frames: FrameDetails[]
  /* also matrix for position, cropping */
}>