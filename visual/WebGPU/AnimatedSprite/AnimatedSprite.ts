interface AnimSpriteCnfig {
  firstFrame: number
  animationLength: number
  timePerFrame: number | null
}

/** 
 * This object is used only for error catching purposes, ot make sure config is always provided
 */
const defaultConfig = new Proxy({} as AnimSpriteCnfig, {
  get() {
    throw Error('AnimatedSprite - config was not yet passed by calling updateConfig method')
  }
})

export default class AnimatedSprite {
  private config = defaultConfig
  private frameLocalIndex = 0
  private prevDtSum = 0 // result of module from all dt / timePerFrame

  public updateConfig(
    config: AnimSpriteCnfig,
  ) {
    this.config = config
    this.frameLocalIndex = 0
    this.prevDtSum = 0
  }

  public get frameIndex() {
    return this.config.firstFrame + this.frameLocalIndex
  }

  public progress(amountOfProgress: number /* ∈ <0, 1>*/): void {
    if (typeof this.config.timePerFrame === 'number') {
      throw Error('This animation should only be updated by tick(), NOT progress()!')
    }

    this.frameLocalIndex = amountOfProgress === 0
      ? 0
      : Math.ceil(amountOfProgress * this.config.animationLength) - 1
  }

  public tick(dt: DOMHighResTimeStamp) {
    const { timePerFrame, animationLength } = this.config

    if (typeof timePerFrame !== 'number') {
      throw Error('This animation should only be updated by progress(), NOT tick()!')
    }

    const dtSum = this.prevDtSum + dt
    this.prevDtSum = dtSum % timePerFrame

    if (dtSum >= timePerFrame) {
      const advanceBy = Math.floor(dtSum / timePerFrame)
      this.frameLocalIndex = (this.frameLocalIndex + advanceBy) % animationLength
    }
  }
}
