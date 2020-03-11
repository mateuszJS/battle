import EffectsFactory from '~/effects/EffectsFactory'

const portalProperties = [
  {
    portalEffect: { x: 5, y: 90, width: 100, height: 300, skewY: 0 },
    gateTop: { x: 9, y: 118, anchorY: 1.2 },
    gateBottom: { x: 0, y: 88, anchorY: 0.9 },
  },
  {
    portalEffect: { x: 7, y: 45, width: 220, height: 220, skewY: 0.5 },
    gateTop: { x: 28, y: 68, anchorY: 0.9 },
    gateBottom: { x: -30, y: -37, anchorY: 0.55 },
  },
  {
    portalEffect: { x: -5, y: 10, width: 280, height: 180, skewY: 0 },
    gateTop: { x: 5, y: 51, anchorY: 2 },
    gateBottom: { x: 5, y: 5, anchorY: 0.9 },
  },
  {
    portalEffect: { x: -10, y: 40, width: 220, height: 220, skewY: -0.5 },
    gateTop: { x: -18, y: 66, anchorY: 0.9 },
    gateBottom: { x: 28, y: -48, anchorY: 0.6 },
  },
]

class Factory {
  private portalFX: PIXI.AnimatedSprite

  constructor(
    factionId: number,
    factoryId: number,
    x: number,
    y: number,
    angle: number,
    sortingLayer: PIXI.display.Group,
  ) {
    const safeAngle = angle % (Math.PI * 2)
    // index = 0, 1, 2, 3
    const index = Math.floor(safeAngle / (Math.PI / 4))
    const gateBottom = new PIXI.Sprite(PIXI.Texture.from(`gate${index}a.png`))
    const gateTop = new PIXI.Sprite(PIXI.Texture.from(`gate${index}b.png`))

    const props = portalProperties[index]

    gateTop.x = props.gateTop.x
    gateTop.y = props.gateTop.y
    gateBottom.x = props.gateBottom.x
    gateBottom.y = props.gateBottom.y

    const portalFX = EffectsFactory.createPortalEffect(
      props.portalEffect.x,
      props.portalEffect.y,
    )

    portalFX.height = props.portalEffect.height
    portalFX.width = props.portalEffect.width
    portalFX.skew.set(0, props.portalEffect.skewY)

    gateTop.anchor.set(0.5, props.gateTop.anchorY)
    gateBottom.anchor.set(0.5, props.gateBottom.anchorY)

    gateBottom.parentGroup = sortingLayer
    portalFX.parentGroup = sortingLayer
    gateTop.parentGroup = sortingLayer

    window.app.stage.addChild(gateBottom)
    window.app.stage.addChild(portalFX)
    window.app.stage.addChild(gateTop)

    const sprites = [gateBottom, portalFX, gateTop]
    sprites.forEach(child => {
      child.x += x
      child.y += y
    })
    portalFX.alpha = 0.9

    this.portalFX = portalFX
  }

  turnOnProduction() {
    if (!this.portalFX.visible) {
      this.portalFX.visible = true
      this.portalFX.alpha = 1
      this.portalFX.gotoAndPlay(0)
    }
  }
  turnOffProduction() {
    if (this.portalFX.visible) {
      this.portalFX.visible = false
      this.portalFX.alpha = 0
      this.portalFX.stop()
    }
  }
}

export default Factory
