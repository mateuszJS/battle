const getFormattedNumber = (value: number) => {
  const stringifiedValue = `${value}`
  return new Array(5 - stringifiedValue.length).join('0') + stringifiedValue
}

const getAngleOffsetInFrames = (angle: number, numberOfSides: number) => {
  const singleAngleSlice = (2 * Math.PI) / numberOfSides
  const safeAngle = (angle + Math.PI + singleAngleSlice / 2) % (2 * Math.PI)
  return Math.floor(safeAngle / singleAngleSlice)
}

export const getFrames = (numberOfIteration: number, anchor: Point, getTextureName: (id: string) => string) => {
  const frames: PIXI.Texture[] = []
  for (let i = 0; i < numberOfIteration; i++) {
    const formattedNumber = getFormattedNumber(i)
    const textureName = getTextureName(formattedNumber)
    const texture = PIXI.Texture.from(textureName)
    texture.defaultAnchor.set(anchor.x, anchor.y)
    frames.push(texture)
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
    if (this.currentFrame > lastFrame) {
      this.onFrameChange = null
      this.gotoAndStop(lastFrame)
      return true // stop rendering a new frame
    }
  }

export const getCallbackStopOnLastFrameAndRunCustomCallback = (
  lastFrame: number,
  customCallback: VoidFunction,
) =>
  function() {
    if (this.currentFrame > lastFrame) {
      this.onFrameChange = null
      this.gotoAndStop(lastFrame)
      customCallback()
      return true // stop rendering a new frame
    }
  }

export const getCallbackGoToFirstOnLastFrame = (firstFrame: number, lastFrame: number) =>
  function() {
    if (this.currentFrame > lastFrame) {
      this.gotoAndPlay(firstFrame)
      return true // stop rendering a new frame
    }
  }

export const getCallbackGoToFirstOnLastFrameAndStop = (firstFrame: number, lastFrame: number) =>
  function() {
    if (this.currentFrame > lastFrame) {
      this.gotoAndStop(firstFrame)
      this.onFrameChange = null
      return true // stop rendering a new frame
    }
  }
