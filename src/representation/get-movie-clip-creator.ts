import {
  getFrames,
  getIndexOfStartingFrame,
  getCallbackStopOnLastFrame,
  getCallbackGoToFirstOnLastFrame,
  getCallbackGoToFirstOnLastFrameAndStop,
  getCallbackStopOnLastFrameAndRunCustomCallback,
} from './utils'
import type { FrameDataEntry } from './frame-periods'
import { getFramePeriods } from './frame-periods'

const STATE_IDLE_BASE = 1000
const STATE_SHOOT_BASE = 2000
const STATE_RUN_BASE = 3000
const STATE_FLY_UP_BASE = 4000
const STATE_FLY_MIDDLE_BASE = 5000
const STATE_FLY_DOWN_BASE = 6000
const STATE_GETUP_BASE = 7000
const STATE_DIE_BASE = 8000
const STATE_CHASING_BASE = 9000

const getMovieClipCreator = (framesData: readonly FrameDataEntry[]) => () => {
  const framesPeriods = getFramePeriods(framesData)
  const frames = Object.values(framesPeriods).reduce(
    (result, { sides, length, anchor, getName }) => [...result, ...getFrames(sides * length, anchor, getName)],
    [],
  )

  const movieClip = new PIXI.AnimatedSprite(frames)
  movieClip.animationSpeed = 0.01
  let previousPhase = 0

  return {
    movieClip,
    goToIdle(angle: number) {
      const currentPhase = STATE_IDLE_BASE + Math.round(angle * 100)
      if (previousPhase !== currentPhase) {
        previousPhase = currentPhase
        movieClip.onFrameChange = null
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.IDLE)
        movieClip.gotoAndStop(indexOfStartingFrame)
      }
    },
    goToRun(angle: number) {
      const currentPhase = STATE_RUN_BASE + Math.round(angle * 100)
      if (previousPhase !== currentPhase) {
        previousPhase = currentPhase
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.RUN)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.RUN.length - 1
        console.log(
          indexOfStartingFrame,
          indexOfLastFrame,
        )
        movieClip.onFrameChange = getCallbackGoToFirstOnLastFrame(
          indexOfStartingFrame,
          indexOfLastFrame,
        )
        movieClip.gotoAndPlay(indexOfStartingFrame)
      }
    },
    goToChasing(angle: number, angleOfWeapon: number) {
      // for now it's the same as running
      const currentPhase = STATE_CHASING_BASE + Math.round(angle * 100)
      if (previousPhase !== currentPhase) {
        previousPhase = currentPhase
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.RUN)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.RUN.length - 1
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
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.SHOOT)
        movieClip.gotoAndStop(indexOfStartingFrame)
      }

      if (isShoot) {
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.SHOOT)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.SHOOT.length - 1
        // actually we cold create frames with half of shotY
        // and after the last frame, just animate in reverse, to first frame
        movieClip.onFrameChange = getCallbackGoToFirstOnLastFrameAndStop(
          indexOfStartingFrame,
          indexOfLastFrame,
        )
        movieClip.gotoAndPlay(indexOfStartingFrame)
      }
    },
    goToFly(angle: number, flyingProgress: number) {
      // stop and last frame
      const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.FLY)

      const { currentFrame } = movieClip
      if (currentFrame < framesPeriods.FLY.first || currentFrame > framesPeriods.FLY.last) {
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
      } else if (flyingProgress <= 4 && previousPhase === STATE_FLY_MIDDLE_BASE) {
        previousPhase = STATE_FLY_DOWN_BASE
        movieClip.onFrameChange = getCallbackStopOnLastFrame(
          indexOfStartingFrame + framesPeriods.FLY.length - 1,
        )
        movieClip.play()
      }
    },
    goToGetUp(angle: number, getUppingProgress: number) {
      const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.GETUP)
      movieClip.onFrameChange = null
      const indexOfCurrentFrame =
        indexOfStartingFrame + Math.floor(getUppingProgress * (framesPeriods.GETUP.length - 1))
      movieClip.gotoAndStop(indexOfCurrentFrame)
      previousPhase = STATE_GETUP_BASE
    },
    goToDie(angle: number, clearUnitArtefacts: VoidFunction) {
      if (previousPhase !== STATE_DIE_BASE) {
        previousPhase = STATE_DIE_BASE
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.FLY)

        movieClip.onFrameChange = getCallbackStopOnLastFrameAndRunCustomCallback(
          indexOfStartingFrame + framesPeriods.FLY.length - 1,
          clearUnitArtefacts,
        )

        movieClip.gotoAndPlay(indexOfStartingFrame)
      }
    },
    getAngleWhenShooting() {
      // const currentPhase = STATE_SHOOT_BASE + Math.round(angle * 100)
      return (previousPhase - STATE_SHOOT_BASE) / 100
      // const { first, length, sides } = framesPeriods.SHOOT
      // const movieClipAngle = (Math.floor((movieClip.currentFrame - first) / length) / sides) * (2 * Math.PI)
      // const angle = 2 * Math.PI - movieClipAngle - 0.5 * Math.PI
      // return angle
    },
  }
}

export default getMovieClipCreator
