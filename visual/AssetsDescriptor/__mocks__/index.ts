import { FrameByState } from "AssetsDescriptor"
import AssetId from "AssetsDescriptor/AssetId"
import initPRNG from "initPRNG"
import { UnitState } from "logic-contants"
import Rect from "Rect"

const prng = initPRNG(2850771051)

function getFrames(namePrefix: string, length: number) {
  return Array.from({ length }, (_, i) => ({
    name: `${namePrefix}_${i}`,
    sourceRect: Array.from({ length: 8 }, () => prng()) as [number, number, number, number, number, number, number, number],
    destinationRect: new Rect(prng() * -2000, prng() * -2000, prng() * 300 | 0, prng() * 300 | 0),
    textureIndex: prng() * 7 | 0,
  }))
}
type MockedAssets = AssetId.ElephantHead | AssetId.RegularBody
const AssetsDescriptorMock: Record<MockedAssets, Partial<FrameByState>>  = {
  [AssetId.ElephantHead]: {
    [UnitState.RUN]: {
      prefix: 'elephant_head_run',
      animationLength: 6,
      angles: 4,
      timePerFrame: 50, // speed in seconds
      frames: getFrames('elephant_head_run', 4 * 6),
    },
    [UnitState.SHOOT]: {
      prefix: 'elephant_head_shoot',
      animationLength: 4,
      angles: 8,
      timePerFrame: 60,
      frames: getFrames('elephant_head_shoot', 4 * 8),
    },
  },
  [AssetId.RegularBody]: {
    [UnitState.RUN]: {
      prefix: 'regular_body_run',
      animationLength: 5,
      angles: 4,
      timePerFrame: 50, // speed in seconds
      frames: getFrames('regular_body_run', 5 * 4),
    },
    [UnitState.SHOOT]: {
      prefix: 'regular_body_shoot',
      animationLength: 3,
      angles: 8,
      timePerFrame: 60,
      frames: getFrames('regular_body_shoot', 3 * 8),
    },
  }
}

export default AssetsDescriptorMock