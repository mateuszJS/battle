import {
  getFrames,
  getIndexOfStartingFrame,
  getCallbackStopOnLastFrame,
  getCallbackGoToFirstOnLastFrame,
} from './utils'

type FramesPeriods = {
  [key in 'IDLE' | 'SHOOT' | 'RUN' | 'FLY' | 'GETUP']: {
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

const framesPeriods = framesData.reduce((result, item, index, array) => {
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
    let phase = '0' // TODO: describe phase, or even better, create enum (or string better to include rotation)

    return {
      movieClip,
      goToIdle(angle: number) {
        const correctPhase = `idle${Math.round(angle)}`
        if (phase !== correctPhase) {
          phase = correctPhase
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.IDLE,
          )
          movieClip.gotoAndStop(indexOfStartingFrame)
        }
      },
      goToRun(angle: number) {
        const correctPhase = `run${Math.round(angle)}`
        if (phase !== correctPhase) {
          phase = correctPhase
          movieClip.animationSpeed = 0.4
          movieClip.onFrameChange = null
          movieClip.gotoAndStop(framesPeriods.RUN.first)
          const indexOfStartingFrame = getIndexOfStartingFrame(
            angle,
            framesPeriods.RUN,
          )
          const indexOfLastFrame =
            indexOfStartingFrame + framesPeriods.RUN.length
          movieClip.gotoAndPlay(indexOfStartingFrame)
          movieClip.onFrameChange = getCallbackGoToFirstOnLastFrame(
            indexOfStartingFrame,
            indexOfLastFrame,
          )
        }
      },
      goToShoot(angle: number) {
        // stop at end frame
        // call again if isShoot = true
        movieClip.gotoAndStop(framesPeriods.SHOOT.first)
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
          phase = 'fly1' // TODO: use correct names, and assign to consts
          movieClip.animationSpeed = 0.3
          movieClip.gotoAndPlay(indexOfStartingFrame)
        } else if (
          phase === 'fly1' &&
          currentFrame > indexOfStartingFrame + framesPeriods.FLY.length / 2 - 1
        ) {
          phase = 'fly2'
          movieClip.stop()
        } else if (flyingProgress <= 4 && phase === 'fly2') {
          phase = 'fly3'
          movieClip.play()
          movieClip.onFrameChange = getCallbackStopOnLastFrame(
            indexOfStartingFrame + framesPeriods.FLY.length - 1,
          )
        }
      },
      goToGetUp(angle: number, getUppingProgress: number) {
        const indexOfStartingFrame = getIndexOfStartingFrame(
          angle,
          framesPeriods.GETUP,
        )
        const indexOfCurrentFrame =
          indexOfStartingFrame +
          Math.floor(getUppingProgress * (framesPeriods.GETUP.length - 1))
        movieClip.gotoAndStop(indexOfCurrentFrame)
        phase = 'getup'
      },
    }
  }
}

export type FrameUpdaters = Omit<
  ReturnType<ReturnType<typeof getSprites>>,
  'movieClip'
>

export default getSprites
