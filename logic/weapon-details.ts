export enum WeaponType {
  StandardRifle
}

export class WeaponDetails {
  range: f32
  scatter: f32
  chanceForReload: f32
  reloadTime: u16
  shootTime: u16
}

export var WEAPON_DETAILS = new Map<WeaponType,WeaponDetails>()

WEAPON_DETAILS.set(WeaponType.StandardRifle, {
  range: 600,
  scatter: 0.15, // angle in radians
  chanceForReload: 0.2, // 1 -> no reload after shoot, 0 -> always reload after every shoot
  reloadTime: 30,
  shootTime: 5,
})
