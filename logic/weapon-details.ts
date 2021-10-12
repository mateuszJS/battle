import { STANDARD_RIFLE } from "./constants"

export enum WeaponType {
  StandardRifle
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
  damage: 0,
  shotDuringRun: true,
})

export var MAX_POSSIBLE_WEAPON_RANGE: f32 = WEAPON_DETAILS.values().reduce((acc, weaponDetails) => (
  Mathf.max(weaponDetails.range, acc)
), 0 as f32)
