import { UnitState } from "logic-contants"
import { FrameByState } from "."

const frameByState: FrameByState = {
  [UnitState.RUN]: {
    prefix: 'regular_rifle_run',
    animationLength: 16,
    angles: 12,
    timePerFrame: 50,
    frames: [],
  },
  [UnitState.SHOOT]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 7,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.ABILITY]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.CHASING]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.DIE]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.FLY]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.GETUP]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.IDLE]: {
    prefix: 'regular_rifle_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  }
}

export default frameByState
