import * as PIXI from 'pixi.js'
import WeaponTypes from '~/weapons/WeaponTypes'
import EffectsFactory from '~/effects/EffectsFactory'
import Utils from 'Utils'
import SETTINGS from '~/modules/gameSettings'

class Grenade {
  public x: number
  public y: number
  private modX: number
  private modY: number
  private graphics: PIXI.Graphics
  private updateBullet: () => any
  private jumpFunction: (x: number) => number

  constructor(x, y, aim) {
    this.x = x
    this.y = y
    const angle = Utils.ang(this, aim)
    const { speed } = WeaponTypes['SOLIDER_GRENADE']
    this.modX = Math.sin(angle) * speed
    this.modY = -Math.cos(angle) * speed

    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff88ff)
    graphics.drawRect(0, 0, 10, 10)
    graphics.x = x
    graphics.y = y
    window.app.stage.addChild(graphics)
    this.graphics = graphics

    const center = {
      x: (x + aim.x) / 2,
      y: (y + aim.y) / 2 + 100, // 200 - height of jump, in WarriorAssault.ts
    }

    const A1 = -(x ** 2) + center.x ** 2,
      B1 = -x + center.x,
      D1 = -y + center.y,
      A2 = -(center.x ** 2) + aim.x ** 2,
      B2 = -center.x + aim.x,
      D2 = -center.y + aim.y,
      Bmulti = -(B2 / B1),
      A3 = Bmulti * A1 + A2,
      D3 = Bmulti * D1 + D2,
      a = D3 / A3,
      b = (D1 - A1 * a) / B1,
      c = y - a * x ** 2 - b * x

    this.jumpFunction = (x: number) => a * x ** 2 + b * x + c
  }

  onDestroy() {
    const bullet = {
      x: this.x,
      y: this.y,
      damage: WeaponTypes['SOLIDER_GRENADE'].damage,
      explosion: WeaponTypes['SOLIDER_GRENADE'].explosion,
    }
    window.allSquads.map(fact => {
      fact.map(squad => {
        if (
          Utils.dis(squad.center, this) <
          bullet.explosion.range + SETTINGS.MAX_DISTANCE_BETWEEN_SQUAD_MEMBERS
        ) {
          squad.members.map(unit => {
            if (Utils.dis(this, unit) < bullet.explosion.range) {
              // Is on the front
              unit.takeDamage(bullet)
            }
          })
        }
      })
    })

    EffectsFactory.createBoomEffect(this.x, this.y)
    //add bullet animation
    window.app.stage.removeChild(this.graphics)
    window.bulletContainer.splice(window.bulletContainer.indexOf(this), 1)
    this.graphics.destroy()
    this.graphics = undefined
  }

  update() {
    const gravity = this.y - this.jumpFunction(this.x)
    if (gravity > 1) {
      this.onDestroy()
      return
    }
    this.x += this.modX
    this.y += this.modY
    this.graphics.x = this.x
    this.graphics.y = this.y + gravity
  }
}

export default (type: string, source: any, target: any) => {
  window.bulletContainer.push(new Grenade(source.x, source.y, target))
}
