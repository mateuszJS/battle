import { Ability, ABILITY_DETAILS } from "./ability-details"
import { AbilityType, RepresentationId } from "./constants"

export class SquadDetails {
  representationId: f32
  productionTime: u16
  numberOfMembers: u8
  maxHealth: u16
  movementSpeed: f32
  unitRadius: f32
  ability: Ability | null
}

export var SQUAD_DETAILS = new Map<RepresentationId, SquadDetails>()

SQUAD_DETAILS.set(RepresentationId.Solider, {
  representationId: RepresentationId.Solider as f32,
  productionTime: 60,
  numberOfMembers: 7,
  maxHealth: 100,
  movementSpeed: 2.5,
  unitRadius: 40,
  ability: ABILITY_DETAILS.get(AbilityType.Grenade)
})

SQUAD_DETAILS.set(RepresentationId.EnemyFactory, {
  representationId: 0,
  productionTime: 0,
  numberOfMembers: 0,
  maxHealth: 2000,
  movementSpeed: 0,
  unitRadius: 150,
  ability: null,
})
