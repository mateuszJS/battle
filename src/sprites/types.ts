export type ModelDetails = {
  movieClip: PIXI.AnimatedSprite
  riflePoints: Point[]
  angles: number[]
  scale: number
  verticalOffset: number
  framesPeriods: {
    [key: string]: {
      first: number
      sides: number
      length: number
      last: number
    }
  }
}
