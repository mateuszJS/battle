interface AnimSpriteCnfig {
  firstFrame: number
  animationLength: number
  timePerFrame: number
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
  private configUpdateTime = 0

  public updateConfig(
    config: AnimSpriteCnfig,
    time: DOMHighResTimeStamp // consider providign time in a different way
  ) {
    this.config = config
    this.configUpdateTime = time
    this.frameLocalIndex = 0
  }

  public get frameIndex() {
    return this.config.firstFrame + this.frameLocalIndex
  }

  public tick(time: DOMHighResTimeStamp) {
    this.frameLocalIndex = Math.floor(
      (time - this.configUpdateTime) / this.config.timePerFrame
    ) % this.config.animationLength
  }
}

