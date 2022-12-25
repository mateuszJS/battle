import EffectFactory from './EffectFactory'
import type { FrameUpdaters } from './UnitFactory'
import { RepresentationId } from '../../logic/constants'
import { UpdateAbilityCallback } from './UnitFactory'
import { UnitState } from '../../logic/constants'

type PixiUnitStuff = {
  container: PIXI.Container
  frameUpdaters: FrameUpdaters
  selectionSprite: PIXI.Sprite
}

class Unit {
  public graphics: PIXI.Container
  public frameUpdaters: FrameUpdaters
  public type: RepresentationId
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
    type: RepresentationId,
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

  update(state: UnitState, x: number, y: number, angle: number, firstStateParam: number) {
    this.graphics.x = x
    this.graphics.y = y

    switch (state) {
      case UnitState.ABILITY:
        this.updateAbility(x, y, angle, firstStateParam)
        break

      case UnitState.IDLE: {
        this.frameUpdaters.goToIdle(angle)
        break
      }
      case UnitState.SHOOT: {
        this.frameUpdaters.goToShoot(angle, firstStateParam)
        break
      }
      case UnitState.RUN: {
        this.frameUpdaters.goToRun(angle)
        break
      }
      case UnitState.FLY: {
        this.frameUpdaters.goToFly(angle, firstStateParam)
        break
      }
      case UnitState.GETUP: {
        this.frameUpdaters.goToGetUp(angle, firstStateParam)
        break
      }
      case UnitState.DIE: {
        this.deselect()
        this.frameUpdaters.goToDie(angle, this.id)
        break
      }
      case UnitState.CHASING: {
        this.frameUpdaters.goToChasing(angle)
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
