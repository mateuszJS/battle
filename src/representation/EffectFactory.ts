import { getFrames } from './utils'

class EffectsFactory {
  static boomEffectFrames = []
  static portalEffectFrames = []

  static initialize() {
    EffectsFactory.boomEffectFrames = getFrames(
      7,
      (id: string) => `fireEffect_${id[3]}.png`,
    )
    EffectsFactory.portalEffectFrames = getFrames(
      97,
      id => `Gate_FX_000${id.slice(-2)}.png`,
    )
  }

  static createBoomEffect(x: number, y: number) {
    const movieClip = new PIXI.AnimatedSprite(EffectsFactory.boomEffectFrames)
    movieClip.animationSpeed = 0.55
    movieClip.anchor.set(0.5)
    movieClip.x = x
    movieClip.y = y
    movieClip.loop = false
    movieClip.scale.set(2)
    movieClip.onComplete = function() {
      this.destroy()
    }
    window.app.stage.addChild(movieClip)
    movieClip.play()
  }

  static createPortalEffect(x: number, y: number) {
    const movieclip = new PIXI.AnimatedSprite(EffectsFactory.portalEffectFrames)
    movieclip.animationSpeed = 0.4
    movieclip.anchor.set(0.5, 1)
    movieclip.x = x
    movieclip.y = y
    movieclip.loop = false

    movieclip.onFrameChange = function() {
      if (this.currentFrame > 65) {
        this.alpha = (this.totalFrames - this.currentFrame) / 30
      }
    }
    return movieclip
  }
}

export default EffectsFactory
