export default class AnimatedSprite {
  private frameLocalIndex = 0
  private firstFrame = 0
  private animationLength = 0
  private timePerFrame = 0
  private configUpdateTime = 0

  public updateConfig(
    firstFrame: number,
    animationLength: number,
    timePerFrame: number,
    time: DOMHighResTimeStamp // consider providign time in a different way
  ) {
    this.firstFrame = firstFrame
    this.animationLength = animationLength
    this.timePerFrame = timePerFrame
    this.configUpdateTime = time
    this.frameLocalIndex = 0
  }

  public get frameIndex() {
    return this.firstFrame + this.frameLocalIndex
  }

  public tick(time: DOMHighResTimeStamp) {
    this.frameLocalIndex = Math.floor(
      (time - this.configUpdateTime) / this.timePerFrame
    ) % this.animationLength
  }
}

