import {
  getFrames,
  getIndexOfStartingFrame,
  getCallbackStopOnLastFrame,
  getCallbackGoToFirstOnLastFrame,
  getCallbackGoToFirstOnLastFrameAndStop,
} from './utils'

const STATE_IDLE_BASE = 1000
const STATE_SHOOT_BASE = 2000
const STATE_RUN_BASE = 3000
const STATE_FLY_UP_BASE = 4000
const STATE_FLY_MIDDLE_BASE = 5000
const STATE_FLY_DOWN_BASE = 6000
const STATE_GETUP_BASE = 7000
const STATE_DIE_BASE = 8000

type FramesPeriods = {
  [key in 'IDLE' | 'SHOOT' | 'RUN' | 'FLY' | 'GETUP' | 'DIE']: {
    first: number
    sides: number
    length: number
    last: number
  }
}

const framesData = [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    getName: (id: string) => `idle_${id}_solider_run${id}.png.png`,
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 6,
    getName: (id: string) => `_${id}_s_f${id}.png.png`,
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    getName: (id: string) => `_${id}_s_g${id}.png.png`,
  },
  {
    name: 'FLY',
    sides: 8,
    length: 31,
    getName: (id: string) => `_${id}_s_h${id}.png.png`,
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 24,
    getName: (id: string) => `_${id}_s_gu${id}.png.png`,
  },
]

export const framesPeriods = framesData.reduce((result, item, index, array) => {
  const first = index === 0 ? 0 : result[array[index - 1].name].last + 1
  return {
    ...result,
    [item.name]: {
      first,
      sides: item.sides,
      length: item.length,
      last: first + item.sides * item.length - 1,
      getName: item.getName,
    },
  }
}, {} as FramesPeriods)

const getSprites = () => {
  const frames = framesData.reduce(
    (result, { sides, length, getName }) => [
      ...result,
      ...getFrames(sides * length, getName),
    ],
    [],
  )

  return () => {
    const movieClip = new PIXI.AnimatedSprite(frames)
    movieClip.animationSpeed = 0.01
    movieClip.scale.set(0.7)
    movieClip.stop()
    let previousPhase = 0

    return {
      movieClip,
      goToIdle(angle: number) {
        const currentPhase = STATE_IDLE_BASE + Math.round(angle * 100)
        if (previousPhase !== currentPhase) {
          previousPhase = currentPhase
          movieClip.onFrameChange = null
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.IDLE,
          )
          movieClip.gotoAndStop(indexOfStartingFrame)
        }
      },
      goToRun(angle: number) {
        const currentPhase = STATE_RUN_BASE + Math.round(angle * 100)
        if (previousPhase !== currentPhase) {
          previousPhase = currentPhase
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.RUN,
          )
          const indexOfLastFrame =
            indexOfStartingFrame + framesPeriods.RUN.length
          movieClip.onFrameChange = getCallbackGoToFirstOnLastFrame(
            indexOfStartingFrame,
            indexOfLastFrame,
          )
          movieClip.gotoAndPlay(indexOfStartingFrame)
        }
      },
      goToShoot(angle: number, shootProgress: number) {
        const isShoot = shootProgress === 0
        const currentPhase = STATE_SHOOT_BASE + Math.round(angle * 100)

        if (previousPhase !== currentPhase) {
          previousPhase = currentPhase
          movieClip.onFrameChange = null
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.SHOOT,
          )
          movieClip.gotoAndStop(indexOfStartingFrame)
        }

        if (isShoot) {
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.SHOOT,
          )
          const indexOfLastFrame =
            indexOfStartingFrame + framesPeriods.SHOOT.length
          // actually we cold create frames with half of shotY
          // and after the last frame, just animate in reverse, to first frame
          movieClip.onFrameChange = getCallbackGoToFirstOnLastFrameAndStop(
            indexOfStartingFrame,
            indexOfLastFrame,
          )
          movieClip.gotoAndPlay(indexOfStartingFrame)
        }

        // movieClip.gotoAndStop(framesPeriods.SHOOT.first)
      },
      goToFly(angle: number, flyingProgress: number) {
        // stop and last frame
        const indexOfStartingFrame = getIndexOfStartingFrame(
          angle,
          framesPeriods.FLY,
        )

        const { currentFrame } = movieClip
        if (
          currentFrame < framesPeriods.FLY.first ||
          currentFrame > framesPeriods.FLY.last
        ) {
          previousPhase = STATE_FLY_UP_BASE
          movieClip.onFrameChange = null
          movieClip.animationSpeed = 0.3
          movieClip.gotoAndPlay(indexOfStartingFrame)
        } else if (
          previousPhase === STATE_FLY_UP_BASE &&
          currentFrame > indexOfStartingFrame + framesPeriods.FLY.length / 2 - 1
        ) {
          previousPhase = STATE_FLY_MIDDLE_BASE
          movieClip.stop()
        } else if (
          flyingProgress <= 4 &&
          previousPhase === STATE_FLY_MIDDLE_BASE
        ) {
          previousPhase = STATE_FLY_DOWN_BASE
          movieClip.onFrameChange = getCallbackStopOnLastFrame(
            indexOfStartingFrame + framesPeriods.FLY.length - 1,
          )
          movieClip.play()
        }
      },
      goToGetUp(angle: number, getUppingProgress: number) {
        const indexOfStartingFrame = getIndexOfStartingFrame(
          angle,
          framesPeriods.GETUP,
        )
        movieClip.onFrameChange = null
        const indexOfCurrentFrame =
          indexOfStartingFrame +
          Math.floor(getUppingProgress * (framesPeriods.GETUP.length - 1))
        movieClip.gotoAndStop(indexOfCurrentFrame)
        previousPhase = STATE_GETUP_BASE
      },
      goToDie(angle: number) {
        if (previousPhase !== STATE_DIE_BASE) {
          previousPhase = STATE_DIE_BASE
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.FLY,
          )
          movieClip.onFrameChange = getCallbackStopOnLastFrame(
            indexOfStartingFrame + framesPeriods.FLY.length - 1,
          )
          movieClip.gotoAndPlay(indexOfStartingFrame)
        }
      },
    }
  }
}

export type FrameUpdaters = Omit<
  ReturnType<ReturnType<typeof getSprites>>,
  'movieClip'
>

export default getSprites
