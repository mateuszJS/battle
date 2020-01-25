import soliderRegular from './weaponTypes/soliderRegular'
import warriorRegular from './weaponTypes/warriorRegular'
import soliderLaser from './weaponTypes/soliderLaser'
import SETTING from 'Settings'

const factor = SETTING.CHANGE_STATE_THROTTLE
const modifier = 1
export type WeaponName =
  | 'WARRIOR_REGULAR'
  | 'SOLIDER_REGULAR'
  | 'SOLIDER_LASER'
  | 'SOLIDER_GRENADE'
  | 'WARRIOR_ASSAULT'
  | 'ASSAULT_JUMP'

const WeaponTypes: {
  [key in WeaponName]: WeaponType
} = {
  WARRIOR_REGULAR: {
    reloadTime: 10 / factor,
    range: 500,
    speed: 10,
    scatter: 0.2,
    damage: 5 * modifier,
    waitReloadingTime: 50 / factor,
    drawAndAddProps: warriorRegular.drawAndAddProps,
    type: 'WARRIOR_REGULAR',
  },
  SOLIDER_REGULAR: {
    reloadTime: 10 / factor,
    range: 400,
    speed: 10,
    scatter: 0.2,
    damage: 5 * modifier,
    waitReloadingTime: 50 / factor,
    drawAndAddProps: soliderRegular.drawAndAddProps,
    type: 'SOLIDER_REGULAR',
  },
  SOLIDER_LASER: {
    reloadTime: 10 / factor,
    range: 400,
    speed: NaN,
    scatter: 0.2,
    damage: 5 * modifier,
    waitReloadingTime: 60 / factor,
    drawAndAddProps: soliderLaser.drawAndAddProps,
    type: 'SOLIDER_LASER',
  },
  SOLIDER_GRENADE: {
    reloadTime: NaN,
    range: NaN,
    speed: 3,
    scatter: NaN,
    damage: 30 * modifier,
    waitReloadingTime: NaN,
    explosion: {
      range: 100,
      strength: 6,
    },
    drawAndAddProps: () => null,
    type: 'SOLIDER_GRENADE',
  },
  WARRIOR_ASSAULT: {
    reloadTime: 120 / factor,
    range: 300,
    speed: 0,
    scatter: 0,
    damage: 0.3 * modifier,
    waitReloadingTime: NaN,
    drawAndAddProps: () => null,
    type: 'WARRIOR_ASSAULT',
  },
  ASSAULT_JUMP: {
    reloadTime: NaN,
    range: 100,
    speed: NaN,
    scatter: NaN,
    damage: 5 * modifier,
    waitReloadingTime: NaN,
    explosion: {
      range: 100,
      strength: 6,
    },
    drawAndAddProps: () => null,
    type: 'ASSAULT_JUMP',
  },
}

export default WeaponTypes
