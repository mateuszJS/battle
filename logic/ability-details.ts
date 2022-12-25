import { addBullet } from "./bullets-manager"
import { AbilityType } from "./constants"
import { Unit } from "./unit"
import { WEAPON_DETAILS } from "./weapon-details"
import { WeaponType } from "./constants"

export class Usage {
  public attack: bool
  public transport: bool
}

function startGrenade(unit: Unit): void {
  const abilityTarget = unit.squad.abilityTarget
  if (abilityTarget) {
    const distance = Mathf.hypot(
      unit.x - abilityTarget.x,
      unit.y - abilityTarget.y,
    )
    addBullet(
      unit,
      Mathf.atan2(abilityTarget.x - unit.x, unit.y - abilityTarget.y),
      WEAPON_DETAILS.get(WeaponType.Grenade),
      null,
      abilityTarget,
      distance,
      true
    )
    unit.squad.abilityCoolDown = (unit.squad.squadDetails.ability as Ability).reloadTime
    unit.squad.abilityTarget = null
  }
}

export class Ability {
  public type: AbilityType
  public reloadTime: u16
  public is_squad_spread: bool
  public range: f32
  public called_by_one_members: bool

  /* rest are useful only for AI */
  public usage: Usage
  public effect_lifetime: u16

  start(unit: Unit): void {
    switch ((unit.squad.squadDetails.ability as Ability).type) {
      case AbilityType.Grenade: {
        startGrenade(unit)
      }
    }
  }
  update(unit: Unit): void {

  }
}

export var ABILITY_DETAILS = new Map<AbilityType, Ability>()

// function startJump(unit: Unit) {
  
//   const abilityTarget = unit.squad.abilityTarget
//   const targetX = abilityTarget.x + unit.position_offset_x;
//   const targetX = abilityTarget.y + unit.position_offset_y;

//   unit.angle = (target_x - unit.x).atan2(unit.y - target_y);
//   unit.mod_x = unit.angle.sin() * JUMPING_SPEED;
//   unit.mod_y = -unit.angle.cos() * JUMPING_SPEED;
//   unit.ability_start_point = unit.x;
//   unit.get_upping_progress = 0.0;
//   unit.time_to_next_shoot = 0;
// }

ABILITY_DETAILS.set(AbilityType.Grenade, {
  type: AbilityType.Grenade,
  reloadTime: 1200,
  is_squad_spread: false,
  range: 600.0,
  called_by_one_members: true,
  effect_lifetime: 75,
  usage: {
    attack: true,
    transport: false,
  },
})

ABILITY_DETAILS.set(AbilityType.Jump, {
  type: AbilityType.Jump,
  reloadTime: 900,
  is_squad_spread: true,
  range: 900.0,
  called_by_one_members: false,
  effect_lifetime: 45,
  usage: {
    attack: true,
    transport: true,
  },
})
