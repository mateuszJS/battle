import Rect from 'Rect'
import elephantHead from './elephantHead'
import regularBody from  './regularBody'
import regularRifle from './regularAccesories'
import { UnitState } from 'logic-contants'
import AssetId from './AssetId'

export type FrameByState = Record<UnitState, {
  prefix: string
  length: number
  angles: number
  timePerFrame: number
  frames: FrameDetails[]
  /* also matrix for position, cropping */
}>

export interface FrameDetails {
  name: string // useful noyl during assigning frames, not later
  sourceRect: number[]
  destinationRect: Rect,
  textureIndex: number
}

export const centerPivot: Point = {
  x: 995.7482,
  y: 1155.8067,
} // for now we made all assets with one and same pivot point
// would be greta to stic this wy

const AssetsDescriptor = {
  [AssetId.ElephantHead]: elephantHead,
  [AssetId.RegularBody]: regularBody,
  [AssetId.RegularAccesories]: regularRifle
} as const

export default AssetsDescriptor

function getFrameNamePrefix(fullName: string) {
  return fullName.slice(0, fullName.length - 8)
}

export function initializeAssetsDescriptor(frames: FrameDetails[]) {
  const framesByPrefix = frames.reduce(
    (acc, frame) => {
      const namePrefix = getFrameNamePrefix(frame.name)
      return {
        ...acc,
        [namePrefix]: [...(acc[namePrefix] || []), frame]
      }
    },
    {} as Record<string, FrameDetails[]>
  )

  Object.values(AssetsDescriptor).forEach(assetDescriptor => {
    Object.values(assetDescriptor).forEach(stateDescriptor => {
      const frames = [...framesByPrefix[stateDescriptor.prefix]]
      frames.sort((a, b) => a.name > b.name ? 1 : -1) // they are never equal

      stateDescriptor.frames = frames
    })
  })
}
