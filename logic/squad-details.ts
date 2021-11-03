import { Ability, ABILITY_DETAILS } from "./ability-details"
import { AbilityType, REPRESENTATION_SOLIDER } from "./constants"

export enum SquadType {
  Portal,
  Squad
}

export class SquadDetails {
  representationId: f32
  productionTime: u16
  numberOfMembers: u8
  maxHealth: u16
  movementSpeed: f32
  unitRadius: f32
  ability: Ability | null
}

export var SQUAD_DETAILS = new Map<SquadType,SquadDetails>()

SQUAD_DETAILS.set(SquadType.Squad, {
  representationId: REPRESENTATION_SOLIDER,
  productionTime: 60,
  numberOfMembers: 7,
  maxHealth: 100,
  movementSpeed: 2.5,
  unitRadius: 40,
  ability: ABILITY_DETAILS.get(AbilityType.Grenade)
})

SQUAD_DETAILS.set(SquadType.Portal, {
  representationId: 0,
  productionTime: 0,
  numberOfMembers: 0,
  maxHealth: 2000,
  movementSpeed: 0,
  unitRadius: 150,
  ability: null,
})

export var MAP_SQUAD_REPRESENTATION_TO_TYPE = new Map<f32, SquadType>()

MAP_SQUAD_REPRESENTATION_TO_TYPE.set(REPRESENTATION_SOLIDER, SquadType.Squad)