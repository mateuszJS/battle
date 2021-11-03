import { STANDARD_RIFLE, GRENADE } from "./constants"

export enum WeaponType {
  StandardRifle,
  Grenade,
}

export class WeaponDetails {
  representationId: f32
  range: f32
  scatter: f32 // angle in radians
  chanceForReload: f32 // 1 -> will always reload, 0 -> will never reload
  reloadTime: u16
  shootTime: u16
  bulletSpeed: f32
  damage: u16
  shotDuringRun: bool
  explosionRange: f32
  maxChasingShootAngle: f32
}

export var WEAPON_DETAILS = new Map<WeaponType,WeaponDetails>()

WEAPON_DETAILS.set(WeaponType.StandardRifle, {
  representationId: STANDARD_RIFLE,
  range: 600,
  scatter: 0.15,
  chanceForReload: 0.25,
  reloadTime: 200,
  shootTime: 50,
  bulletSpeed: 10,
  damage: 1,
  shotDuringRun: true,
  explosionRange: 0,
  maxChasingShootAngle: 0.52,
})

WEAPON_DETAILS.set(WeaponType.Grenade, {
  representationId: GRENADE,
  range: 0, // N/A
  scatter: 0, // N/A
  chanceForReload: 0, // N/A
  reloadTime: 0, // N/A
  shootTime: 0, // N/A
  bulletSpeed: 5,
  damage: 5,
  shotDuringRun: false, // N/A
  explosionRange: 150,
  maxChasingShootAngle: 0,
})

export var MAX_POSSIBLE_WEAPON_RANGE: f32 = WEAPON_DETAILS.values().reduce((acc, weaponDetails) => (
  Mathf.max(weaponDetails.range, acc)
), 0 as f32)
