import EffectsFactory from '~/representation/EffectFactory'
import {
  addItemToProductionLine,
  removeItemFromProductionLine,
  updateItemInProductionLine,
} from '~/buttons/factory'

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

function onFrameChange() {
  if (this.currentFrame > 70) {
    this.gotoAndPlay(25)
  }
}

type ProductionItem = {
  id: number
  node: HTMLButtonElement | null
}

class Factory {
  private x: number
  private y: number
  private portalFX: PIXI.AnimatedSprite
  private productionLine: ProductionItem[]

  constructor(
    // factionId: number,
    x: number,
    y: number,
    angle: number,
  ) {
    const safeAngle = (angle + 2 * Math.PI * 0.75) % (Math.PI * 2)
    // index = 0, 1, 2, 3
    const index = Math.floor(safeAngle / ((2 * Math.PI) / 8)) % 4
    const gateBottom = new PIXI.Sprite(PIXI.Texture.from(`gate${index}a.png`))
    const gateTop = new PIXI.Sprite(PIXI.Texture.from(`gate${index}b.png`))

    const props = portalProperties[index]

    gateTop.x = props.gateTop.x
    gateTop.y = props.gateTop.y
    gateBottom.x = props.gateBottom.x
    gateBottom.y = props.gateBottom.y

    const portalFX = EffectsFactory.createPortalEffect(props.portalEffect.x, props.portalEffect.y)

    portalFX.height = props.portalEffect.height
    portalFX.width = props.portalEffect.width
    portalFX.skew.set(0, props.portalEffect.skewY)

    gateTop.anchor.set(0.5, props.gateTop.anchorY)
    gateBottom.anchor.set(0.5, props.gateBottom.anchorY)

    window.world.addChild(gateBottom)
    window.world.addChild(portalFX)
    window.world.addChild(gateTop)

    const sprites = [gateBottom, portalFX, gateTop]
    sprites.forEach(child => {
      child.x += x
      child.y += y
    })
    portalFX.alpha = 0.9
    portalFX.visible = false

    this.portalFX = portalFX
    portalFX.onFrameChange = onFrameChange

    this.x = x
    this.y = y
  }

  turnOnProduction() {
    if (!this.portalFX.visible) {
      this.portalFX.visible = true
      this.portalFX.alpha = 1
      this.portalFX.gotoAndPlay(0)
    }
  }
  turnOffProduction() {
    // it depends on animation but maybe we will need to add some internal status
    // like "isProduction", and then isProduction is false, then do not repeat
    // animation in "onFrameChange"
    if (this.portalFX.visible) {
      this.portalFX.visible = false
      this.portalFX.alpha = 0
      this.portalFX.stop()
    }
  }

  updateProductionLine(progress: number, data: number[]) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        addItemToProductionLine(i, data[i])
      } else {
        removeItemFromProductionLine(i)
      }
    }
    if (progress !== 0) {
      updateItemInProductionLine(progress)
    }
  }
}

export default Factory
