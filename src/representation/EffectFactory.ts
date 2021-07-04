import { getFrames } from './utils'

class EffectsFactory {
  static boomEffectFrames = []
  static portalEffectFrames = []

  static initialize() {
    EffectsFactory.boomEffectFrames = getFrames(7, (id: string) => `fireEffect_${id[3]}.png`)
    EffectsFactory.portalEffectFrames = getFrames(97, id => `Gate_FX_000${id.slice(-2)}.png`)
  }

  static createBoomEffect(x: number, y: number) {
    const movieClip = new PIXI.AnimatedSprite(EffectsFactory.boomEffectFrames)
    movieClip.animationSpeed = 0.55
    movieClip.x = x
    movieClip.y = y
    movieClip.loop = false
    movieClip.anchor.set(0.5)
    movieClip.scale.set(2)
    movieClip.onComplete = function() {
      this.destroy()
    }
    window.world.addChild(movieClip)
    movieClip.play()
  }

  static createPortalEffect(x: number, y: number) {
    const movieClip = new PIXI.AnimatedSprite(EffectsFactory.portalEffectFrames)
    movieClip.animationSpeed = 0.4
    movieClip.x = x
    movieClip.y = y
    movieClip.loop = false
    movieClip.anchor.set(0.5 ,1)

    movieClip.onFrameChange = function() {
      if (this.currentFrame > 65) {
        this.alpha = (this.totalFrames - this.currentFrame) / 30
      }
    }
    return movieClip
  }
}

export default EffectsFactory
