const getFormattedNumber = (value: number) => {
  const stringifiedValue = `${value}`
  return new Array(5 - stringifiedValue.length).join('0') + stringifiedValue
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

export const getFrames = (
  numberOfIteration: number,
  getTextureName: (id: string) => string,
) => {
  const frames: PIXI.Texture[] = []
  for (let i = 0; i < numberOfIteration; i++) {
    const formattedNumber = getFormattedNumber(i)
    const textureName = getTextureName(formattedNumber)
    frames.push(PIXI.Texture.from(textureName))
  }
  return frames
}

export const getIndexOfStartingFrame = (
  angle,
  { first, sides, length }: { first: number; sides: number; length: number },
) => {
  const angleOffset = getAngleOffsetInFrames(angle, sides)
  return first + angleOffset * length
}

export const getCallbackStopOnLastFrame = (lastFrame: number) =>
  function() {
    if (this.currentFrame >= lastFrame) {
      this.onFrameChange = null
      this.gotoAndStop(lastFrame)
    }
  }
