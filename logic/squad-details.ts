import { REPRESENTATION_SOLIDER } from "./constants"

export enum SquadType {
  Portal
}

export class SquadDetails {
  representationId: f32
  productionTime: u16
  numberOfMembers: u8
  maxHealth: u16
  movementSpeed: f32
  isAllowedToChase: bool
  maxChasingShootAngle: f32
}

export var SQUAD_DETAILS = new Map<SquadType,SquadDetails>()

SQUAD_DETAILS.set(SquadType.Portal, {
  representationId: REPRESENTATION_SOLIDER,
  productionTime: 60,
  numberOfMembers: 7,
  maxHealth: 100,
  movementSpeed: 2.5,
  isAllowedToChase: true,
  maxChasingShootAngle: 0.52,
})


export var MAP_SQUAD_REPRESENTATION_TO_TYPE = new Map<f32, SquadType>()

MAP_SQUAD_REPRESENTATION_TO_TYPE.set(REPRESENTATION_SOLIDER, SquadType.Portal)