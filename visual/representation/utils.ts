// import { SHOOT_MOVIE_CLIP_SPEED } from './get-movie-clip-creator'

// const getFormattedNumber = (value: number) => {
//   const stringifiedValue = `${value}`
//   return new Array(5 - stringifiedValue.length).join('0') + stringifiedValue
// }

// const MATH_PI_2 = 2 * Math.PI

// const getAngleOffsetInFrames = (angle: number, numberOfSides: number) => {
//   const singleAngleSlice = MATH_PI_2 / numberOfSides
//   const safeAngle = (angle + Math.PI + singleAngleSlice / 2) % MATH_PI_2
//   return Math.floor(safeAngle / singleAngleSlice)
// }

// export const getFrames = (numberOfIteration: number, getTextureName: (id: string) => string) => {
//   const frames: PIXI.Texture[] = []
//   for (let i = 1; i <= numberOfIteration; i++) {
//     const formattedNumber = getFormattedNumber(i)
//     const textureName = getTextureName(formattedNumber)
//     frames.push(PIXI.Texture.from(textureName))
//   }
//   return frames
// }

// export const getIndexOfStartingFrame = (
//   angle,
//   { first, sides, length }: { first: number; sides: number; length: number },
// ) => {
//   const angleOffset = getAngleOffsetInFrames(angle, sides)
//   return first + angleOffset * length
// }

// export const getCallbackStopOnLastFrame = (lastFrame: number) =>
//   function() {
//     if (this.currentFrame > lastFrame) {
//       this.onFrameChange = null
//       this.gotoAndStop(lastFrame)
//       return true // stop rendering a new frame
//     }
//   }

// export const getCallbackStopOnLastFrameAndRunCustomCallback = (
//   lastFrame: number,
//   customCallback: VoidFunction,
// ) =>
//   function() {
//     if (this.currentFrame > lastFrame) {
//       this.onFrameChange = null
//       this.gotoAndStop(lastFrame)
//       customCallback()
//       return true // stop rendering a new frame
//     }
//   }

// export const getCallbackGoToFirstOnLastFrame = (firstFrame: number, lastFrame: number) =>
//   function() {
//     if (this.currentFrame > lastFrame) {
//       this.gotoAndPlay(firstFrame)
//       return true // stop rendering a new frame
//     }
//   }

// export const getCallbackGoBackOnLastFrameAndStop = (firstFrame: number, lastFrame: number) =>
//   function() {
//     if (this.currentFrame > lastFrame) {
//       this.animationSpeed = -SHOOT_MOVIE_CLIP_SPEED

//       this.onFrameChange = function() {
//         if (this.currentFrame < firstFrame) {
//           this.gotoAndStop(firstFrame)
//           this.animationSpeed = SHOOT_MOVIE_CLIP_SPEED
//           return true
//         }
//       }
//       return true // stop rendering a new frame
//     }
//   }
