import EffectFactory from './EffectFactory'
import { FrameUpdaters } from './getSprites'
import { ObjectType } from '~/render/representationsIds'

type PixiUnitStuff = {
  sortingLayer: PIXI.display.Group
  container: PIXI.Container
  movieClip: PIXI.AnimatedSprite
  frameUpdaters: FrameUpdaters
  selectionSprite: PIXI.Sprite
}

enum State {
  ABILITY = 8,
  FLY = 7,
  RUN = 6,

  SHOOT = 5,
  IDLE = 4,
  GETUP = 3,
  DIE = 0,
}

class Unit {
  public graphics: PIXI.Container
  public movieClip: PIXI.AnimatedSprite
  private frameUpdaters: FrameUpdaters
  private selectionSprite: PIXI.Sprite
  private indicator: PIXI.Graphics
  public type: ObjectType

  constructor(x: number, y: number, angle: number, pixiStuff: PixiUnitStuff, type: ObjectType) {
    this.type = type

    this.graphics = pixiStuff.container
    this.movieClip = pixiStuff.movieClip
    this.frameUpdaters = pixiStuff.frameUpdaters
    this.selectionSprite = pixiStuff.selectionSprite

    this.graphics.addChild(this.selectionSprite)
    this.graphics.addChild(this.movieClip)
    this.movieClip.x = -this.movieClip.width / 2
    this.movieClip.y = -this.movieClip.height * 0.7

    this.graphics.parentGroup = pixiStuff.sortingLayer

    this.graphics.x = x
    this.graphics.y = y
    this.frameUpdaters.goToFly(angle, Number.MAX_SAFE_INTEGER)

    window.app.stage.addChild(this.graphics)
    EffectFactory.createBoomEffect(x, y)

    this.indicator = new PIXI.Graphics()

    this.indicator.beginFill(0xff0000)
    this.indicator.drawRect(-2, -2, 2, 2)
    this.indicator.endFill()

    this.graphics.addChild(this.indicator)
  }

  goToFrame(frame: number) {
    if (frame !== this.movieClip.currentFrame) {
      this.movieClip.gotoAndStop(frame)
    }
  }

  update(state: State, x: number, y: number, angle: number, firstStateParam: number) {
    this.graphics.x = x
    this.graphics.y = y

    switch (state) {
      case State.ABILITY:
      case State.IDLE: {
        this.frameUpdaters.goToIdle(angle)
        break
      }
      case State.SHOOT: {
        this.frameUpdaters.goToShoot(angle, firstStateParam)
        break
      }
      case State.RUN: {
        this.frameUpdaters.goToRun(angle)
        break
      }
      case State.FLY: {
        this.frameUpdaters.goToFly(angle, firstStateParam)
        break
      }
      case State.GETUP: {
        this.frameUpdaters.goToGetUp(angle, firstStateParam)
        break
      }
      case State.DIE: {
        this.frameUpdaters.goToDie(angle)
        break
      }
    }
  }

  remove() {
    window.app.stage.removeChild(this.graphics)
    this.graphics.destroy()
    this.graphics = undefined
  }

  select() {
    this.selectionSprite.visible = true
  }

  deselect() {
    this.selectionSprite.visible = false
  }
}

export default Unit
