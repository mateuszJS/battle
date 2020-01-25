import Unit from './Unit'
import WeaponTypes from '~/weapons/WeaponTypes'
import Utils from '../utils/Utils'
import Squad from './Squad'
import { STATE, UNIT_TYPE } from 'Consts'
import EffectsFactory from '~/effects/EffectsFactory'
import SETTINGS from '~/modules/gameSettings'
import { AdditionalGraphics } from './types'
import { ModelDetails } from '~/sprites/types'

class WarriorAssault extends Unit {
  private z: number
  public jumpFunction: (x: number) => number

  constructor(
    graphics: AdditionalGraphics,
    model: ModelDetails,
    pos: Point,
    faction: number,
    type: UNIT_TYPE,
    squad: Squad,
  ) {
    //pass only weapons PARAMS, not copy reference to primary weapon object
    super(graphics, model, pos, faction, type, squad)
    this.z = 0
  }

  getTheMostImportantAim(aims: Unit[]) {
    const index = Utils.getIndexOfTheNearestItem(aims, this)
    return aims[index]
  }

  finishJump() {
    this.z = 0
    this.graphics.scale.set(1)
    this.aim = undefined
    this.defaultBehavior()

    const bullet = {
      x: this.x,
      y: this.y,
      damage: WeaponTypes['ASSAULT_JUMP'].damage,
      explosion: WeaponTypes['ASSAULT_JUMP'].explosion,
    }

    window.allSquads.map((fact, idx) => {
      if (idx !== this.squad.faction) {
        fact.map(squad => {
          if (
            Utils.dis(squad.center, this) <
            WeaponTypes['ASSAULT_JUMP'].range +
              SETTINGS.MAX_DISTANCE_BETWEEN_SQUAD_MEMBERS
          ) {
            squad.members.map(unit => {
              if (Utils.dis(this, unit) < WeaponTypes['ASSAULT_JUMP'].range) {
                unit.takeDamage(bullet)
              }
            })
          }
        })
      }
    })
  }

  animate() {
    if (this.state === STATE.ABILITY) {
      if (window.timer % 3 === 0) {
        this.graphics.scale.set(1 - this.z / (200 * 2)) // in jupming.ts
        if (window.timer % 2 === 0) {
          EffectsFactory.addSmoke(this.graphics.x, this.graphics.y + 30, 1)
        }
      }
      this.z = this.y - this.jumpFunction(this.x) // + 1 because 0 can get z > 0
      if (this.z > 1) {
        this.finishJump()
      }
    }

    this.x += this.modX
    this.y += this.modY
    this.graphics.x = this.x
    this.graphics.y = this.y + this.model.offsetY + this.z
    this.draw()
  }
}

export default WarriorAssault
