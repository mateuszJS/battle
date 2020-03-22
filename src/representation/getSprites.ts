const getFormattedNumber = (value: number) => {
  const stringifiedValue = `${value}`
  return new Array(5 - stringifiedValue.length).join('0') + stringifiedValue
}

const addFrames = (
  frames: PIXI.Texture[],
  numberOfIteration: number,
  getTextureName: (value: string) => string,
) => {
  for (let i = 0; i < numberOfIteration; i++) {
    const formattedNumber = getFormattedNumber(i)
    const textureName = getTextureName(formattedNumber)
    frames.push(PIXI.Texture.from(textureName))
  }
}

const getAngleOffsetInFrames = (angle: number, numberOfSides: number) => {
  const oneAngleSlice = (2 * Math.PI) / numberOfSides
  const centeredAngle = angle - oneAngleSlice / 2

  const positiveCenteredAngle =
    centeredAngle < 0 ? centeredAngle + Math.PI * 2 : centeredAngle
  const framesAngle =
    Math.abs(positiveCenteredAngle - 2 * Math.PI) + 2 * Math.PI * 0.75
  const preparedAngle = framesAngle % (Math.PI * 2)
  return Math.floor(preparedAngle / oneAngleSlice)
}

const getIndexOfStartingFrame = (
  angle,
  { first, sides, length }: { first: number; sides: number; length: number },
) => {
  const angleOffset = getAngleOffsetInFrames(angle, sides)
  return first + angleOffset * length
}

export type Result = {
  movieClip: PIXI.AnimatedSprite
  goToIdle(angle: number): void
  goToRun(angle: number): void
  goToShoot(angle: number): void
  goToFly(angle: number, flyingProgress: number): void
  goToGetUp(angle: number, getUppingProgress: number): void
}

export default () => {
  const frames = []

  // [{ sides: 12, length: 6}].map((item, index, arr) => ({
  //   ...item,
  //   first:
  //   last:
  // }))

  const framesPeriods = {
    IDLE: {
      first: 0,
      sides: 12,
      length: 1,
      last: 11,
    },
    SHOOT: {
      first: 12,
      sides: 12,
      length: 6,
      last: 12 * 6 + 12 - 1,
    },
    RUN: {
      first: 72 + 12,
      sides: 12,
      length: 16,
      last: 12 * 16 + 72 + 12 - 1,
    },
    FLY: {
      first: 192 + 72 + 12,
      sides: 8,
      length: 31,
      last: 8 * 31 + 192 + 72 + 12 - 1,
    },
    GETUP: {
      first: 248 + 192 + 72 + 12,
      sides: 8,
      length: 24,
      last: 8 * 24 + 248 + 192 + 72 + 12 - 1,
    },
  }

  addFrames(
    frames,
    framesPeriods.IDLE.sides * framesPeriods.IDLE.length,
    id => `idle_${id}_solider_run${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.SHOOT.sides * framesPeriods.SHOOT.length,
    id => `_${id}_s_f${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.RUN.sides * framesPeriods.RUN.length,
    id => `_${id}_s_g${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.FLY.sides * framesPeriods.FLY.length,
    id => `_${id}_s_h${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.GETUP.sides * framesPeriods.GETUP.length,
    id => `_${id}_s_gu${id}.png.png`,
  )

  return (): Result => {
    const movieClip = new PIXI.AnimatedSprite(frames)
    movieClip.animationSpeed = 0.3
    movieClip.scale.set(0.7)
    // movieClip.anchor.set(0.5, 0);

    return {
      movieClip,
      goToIdle(angle: number) {
        const indexOfStartingFrame = getIndexOfStartingFrame(
          angle,
          framesPeriods.IDLE,
        )
        movieClip.gotoAndStop(indexOfStartingFrame)
      },
      goToRun(angle: number) {
        // repeat
        movieClip.gotoAndStop(framesPeriods.RUN.first)
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
        // console.log(movieClip.playing);
        if (movieClip.playing) {
          if (movieClip.currentFrame > indexOfStartingFrame + framesPeriods.FLY.length / 2 - 1) {
            if (movieClip.onFrameChange === undefined) {
              movieClip.stop()
            }
          }
        } else if (
          movieClip.currentFrame >= framesPeriods.FLY.first &&
          movieClip.currentFrame <= framesPeriods.FLY.last
        ) {
          if (flyingProgress <= 4 && movieClip.onFrameChange === undefined) {
            movieClip.play()
            movieClip.onFrameChange = () => {
              if (movieClip.currentFrame >= indexOfStartingFrame + framesPeriods.FLY.length - 1) {
                movieClip.stop()
              }
            }
          }
        } else {
          movieClip.gotoAndPlay(indexOfStartingFrame)
          movieClip.onFrameChange = undefined
        }
      },
      goToGetUp(angle: number, getUppingProgress: number) {
        const indexOfStartingFrame = getIndexOfStartingFrame(
          angle,
          framesPeriods.GETUP,
        )
        const indexOfCurrentFrame =
          indexOfStartingFrame +
          Math.floor(getUppingProgress * framesPeriods.GETUP.length)
        movieClip.gotoAndStop(indexOfCurrentFrame)
      },
    }
  }
}
