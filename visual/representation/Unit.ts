import EffectFactory from './EffectFactory'
import type { FrameUpdaters } from './UnitFactory'
import { ObjectType } from '~/render/representationsIds'
import { UpdateAbilityCallback } from './UnitFactory'

type PixiUnitStuff = {
  container: PIXI.Container
  frameUpdaters: FrameUpdaters
  selectionSprite: PIXI.Sprite
}

enum State {
  CHASING = 9,
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
  public frameUpdaters: FrameUpdaters
  public type: ObjectType
  public squadId?: number // value is set when ability icon will be created
  // bc it's only used to disable ability for the whole squad
  private selectionSprite: PIXI.Sprite
  private indicator: PIXI.Graphics
  private updateAbility: UpdateAbilityCallback
  private id: number

  constructor(
    id: number,
    x: number,
    y: number,
    angle: number,
    pixiStuff: PixiUnitStuff,
    type: ObjectType,
    updateAbility: UpdateAbilityCallback,
  ) {
    this.id = id
    this.type = type
    this.updateAbility = updateAbility.bind(this)
    this.graphics = pixiStuff.container
    this.frameUpdaters = pixiStuff.frameUpdaters
    this.selectionSprite = pixiStuff.selectionSprite

    this.graphics.x = x
    this.graphics.y = y
    this.frameUpdaters.goToFly(angle, Number.MAX_SAFE_INTEGER)

    window.world.addChild(this.graphics)
    EffectFactory.createBoomEffect(x, y)

    this.indicator = new PIXI.Graphics()

    this.indicator.beginFill(0xff0000)
    this.indicator.drawRect(-2, -2, 2, 2)
    this.indicator.endFill()

    this.graphics.addChild(this.indicator)
  }

  update(state: State, x: number, y: number, angle: number, firstStateParam: number) {
    this.graphics.x = x
    this.graphics.y = y

    switch (state) {
      case State.ABILITY:
        this.updateAbility(x, y, angle, firstStateParam)
        break

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
        this.deselect()
        this.frameUpdaters.goToDie(angle, this.id)
        break
      }
      case State.CHASING: {
        this.frameUpdaters.goToChasing(angle) // there is additional parma from rust, but for solider we don't use it
      }
    }
  }

  select() {
    this.selectionSprite.visible = true
  }

  deselect() {
    this.selectionSprite.visible = false
  }
}

export default Unit
