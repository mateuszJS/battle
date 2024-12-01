import { UnitState } from "logic-contants"
import { FrameByState } from "."

const frameByState: FrameByState = {
  [UnitState.RUN]: {
    prefix: 'regular_body_run',
    animationLength: 16,
    angles: 12,
    timePerFrame: 50,
    frames: [], // speed in seconds
  },
  [UnitState.SHOOT]: {
    prefix: 'regular_body_shoot',
    animationLength: 7,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.ABILITY]: {
    prefix: 'regular_body_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.CHASING]: {
    prefix: 'regular_body_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.DIE]: {
    prefix: 'regular_body_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.FLY]: {
    prefix: 'regular_body_fly',
    animationLength: 30,
    angles: 8,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.GETUP]: {
    prefix: 'regular_body_getup',
    animationLength: 25,
    angles: 8,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.IDLE]: {
    prefix: 'regular_body_idle',
    animationLength: 1,
    angles: 12,
    timePerFrame: 60,
    frames: [],
  }
}

export default frameByState
