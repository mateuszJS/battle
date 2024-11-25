import { UnitState } from "logic-contants"
import { FrameByState } from "."

const frameByState: FrameByState = {
  [UnitState.RUN]: {
    prefix: 'body_run',
    length: 16,
    angles: 12,
    timePerFrame: 50,
    frames: [], // speed in seconds
  },
  [UnitState.SHOOT]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.ABILITY]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.CHASING]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.DIE]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.FLY]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.GETUP]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  },
  [UnitState.IDLE]: {
    prefix: 'body_shoot',
    length: 6,
    angles: 16,
    timePerFrame: 60,
    frames: [],
  }
}

export default frameByState
