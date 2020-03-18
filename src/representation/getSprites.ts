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

export type Result = {
  movieClip: PIXI.AnimatedSprite
  goToIdle(angle: number): void
  goToRun(angle: number): void
  goToShoot(angle: number): void
  goToFly(angle: number): void
  goToGetUp(angle: number): void
}

export default () => {
  const frames = []

  // [{ sides: 12, lenght: 6}].map((item, index, arr) => ({
  //   ...item,
  //   first:
  //   last:
  // }))

  const framesPeriods = {
    STAY: {
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
    GO: {
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
    framesPeriods.STAY.sides * framesPeriods.STAY.length,
    id => `idle_${id}_solider_run${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.SHOOT.sides * framesPeriods.SHOOT.length,
    id => `_${id}_s_f${id}.png.png`,
  )

  addFrames(
    frames,
    framesPeriods.GO.sides * framesPeriods.GO.length,
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
    movieClip.animationSpeed = 0.4
    movieClip.scale.set(0.7)
    // movieClip.anchor.set(0.5, 0);

    return {
      movieClip,
      goToIdle(angle: number) {
        movieClip.gotoAndStop(framesPeriods.STAY.first)
      },
      goToRun(angle: number) {
        // repeat
        movieClip.gotoAndStop(framesPeriods.GO.first)
      },
      goToShoot(angle: number) {
        // stop at end frame
        // call again if isShoot = true
        movieClip.gotoAndStop(framesPeriods.SHOOT.first)
      },
      goToFly(angle: number) {
        // stop and last frame
        movieClip.gotoAndStop(framesPeriods.FLY.first)
      },
      goToGetUp(angle: number) {
        // stop and last frame
        movieClip.gotoAndStop(framesPeriods.GETUP.first)
      },
    }
  }
}
