import {
  getFrames,
  getIndexOfStartingFrame,
  getCallbackStopOnLastFrame,
  getCallbackGoToFirstOnLastFrame,
  getCallbackGoBackOnLastFrameAndStop,
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

const STANDARD_MOVIE_CLIP_SPEED = 0.3;
export const SHOOT_MOVIE_CLIP_SPEED = 0.45;

const getMovieClipCreator = (framesData: readonly FrameDataEntry[]) => () => {
  const framesPeriods = getFramePeriods(framesData)
  const frames = Object.values(framesPeriods).reduce(
    (result, { sides, length, getName }) => [...result, ...getFrames(sides * length, getName)],
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
        movieClip.anchor.set(framesPeriods.IDLE.anchor.x, framesPeriods.IDLE.anchor.y)
        movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
        movieClip.onFrameChange = null
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.IDLE)
        movieClip.gotoAndStop(indexOfStartingFrame)
      }
    },
    goToRun(angle: number) {
      const currentPhase = STATE_RUN_BASE + Math.round(angle * 100)
      if (previousPhase !== currentPhase) {
        previousPhase = currentPhase
        movieClip.anchor.set(framesPeriods.RUN.anchor.x, framesPeriods.RUN.anchor.y)
        movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.RUN)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.RUN.length - 1
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
        movieClip.anchor.set(framesPeriods.RUN.anchor.x, framesPeriods.RUN.anchor.y)
        movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
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
        movieClip.anchor.set(framesPeriods.SHOOT.anchor.x, framesPeriods.SHOOT.anchor.y)
        movieClip.onFrameChange = null
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.SHOOT)
        movieClip.gotoAndStop(indexOfStartingFrame)
      }

      if (isShoot) {
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.SHOOT)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.SHOOT.length - 1
        // actually we cold create frames with half of shotY
        // and after the last frame, just animate in reverse, to first frame
        movieClip.onFrameChange = getCallbackGoBackOnLastFrameAndStop(
          indexOfStartingFrame,
          indexOfLastFrame,
        )
        movieClip.animationSpeed = SHOOT_MOVIE_CLIP_SPEED
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
        movieClip.anchor.set(framesPeriods.FLY.anchor.x, framesPeriods.FLY.anchor.y)
        movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
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
      movieClip.anchor.set(framesPeriods.GETUP.anchor.x, framesPeriods.GETUP.anchor.y)
      movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
    },
    goToDie(angle: number, clearUnitArtefacts: VoidFunction) {
      if (previousPhase !== STATE_DIE_BASE) {
        previousPhase = STATE_DIE_BASE
        movieClip.anchor.set(framesPeriods.FLY.anchor.x, framesPeriods.FLY.anchor.y)
        movieClip.animationSpeed = STANDARD_MOVIE_CLIP_SPEED
        const indexOfStartingFrame = getIndexOfStartingFrame(angle, framesPeriods.FLY)
        const indexOfLastFrame = indexOfStartingFrame + framesPeriods.FLY.length - 1
        const isAlreadyFly = indexOfStartingFrame <= movieClip.currentFrame && movieClip.currentFrame <= indexOfLastFrame
        movieClip.onFrameChange = getCallbackStopOnLastFrameAndRunCustomCallback(
          indexOfLastFrame,
          clearUnitArtefacts,
        )

        movieClip.gotoAndPlay(isAlreadyFly ? movieClip.currentFrame : indexOfStartingFrame)
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
