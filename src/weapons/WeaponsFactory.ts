import Bullet from './Bullet'
import WeaponTypes from './WeaponTypes'
import Utils from 'Utils'
import Unit from '~/units/Unit'
import { UNIT_TYPE } from 'Consts'

type Position = {
  x: number
  y: number
  angle: number
}

class WeaponsFactory {
  static createBullet(
    type: keyof typeof WeaponTypes,
    position: Position,
    aim: Unit,
    modifyDamage = 1,
  ) {
    const bullet = new Bullet(
      position.x,
      position.y,
      position.angle + Utils.normalRandomLUT(WeaponTypes[type].scatter),
      aim,
      WeaponTypes[type].damage * modifyDamage,
      WeaponTypes[type].drawAndAddProps,
    )
    window.bulletContainer.push(bullet)
  }

  static getWeaponByUnit(type: UNIT_TYPE): WeaponType {
    switch (type) {
      case UNIT_TYPE.SOLIDER_LASER:
        return WeaponTypes.SOLIDER_LASER
      case UNIT_TYPE.SOLIDER_REGULAR:
        return WeaponTypes.SOLIDER_REGULAR
      case UNIT_TYPE.WARRIOR_ASSAULT:
        return WeaponTypes.WARRIOR_ASSAULT
      case UNIT_TYPE.WARRIOR_REGULAR:
        return WeaponTypes.WARRIOR_REGULAR
    }
  }
}

export default WeaponsFactory
