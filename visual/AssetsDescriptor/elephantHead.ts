import { FrameByState } from "."
import { UnitState } from "logic-contants"

const frameByState: FrameByState = {
  [UnitState.RUN]: {
    prefix: 'elephant_head_run',
    animationLength: 16,
    angles: 12,
    timePerFrame: 50, // speed in seconds
    frames: [],
  },
  [UnitState.SHOOT]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.ABILITY]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.CHASING]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.DIE]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.FLY]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.GETUP]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.IDLE]: {
    prefix: 'elephant_head_shoot',
    animationLength: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  }
}

export default frameByState
