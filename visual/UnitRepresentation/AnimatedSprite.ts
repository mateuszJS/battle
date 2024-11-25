export default class AnimatedSprite {
  private frameLocalIndex = 0

  constructor(
    private firstFrame: number,
    private animationLength: number,
    private timePerFrame: number,
    private configUpdateTime: DOMHighResTimeStamp
  ) {}

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

  public update(time: DOMHighResTimeStamp) {

    this.frameLocalIndex = Math.floor(
      (time - this.configUpdateTime) / this.timePerFrame
    ) % this.animationLength

    // if (time - this.lastChangeTime >= this.timePerFrame) {
    //   this.frameLocalIndex = (this.frameLocalIndex + 1) % this.animationLength
    //   this.lastChangeTime = time
    // }
  }
}

