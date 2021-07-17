// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";
import { MAP_SQUAD_REPRESENTATION_TO_TYPE } from "./squad-details";


var factions: Array<Faction> = []


export const Float32Array_ID = idof<Float32Array>()
export const Uint32Array_ID = idof<Uint32Array>()

export function initUniverse(
  factionData: Float32Array,
): void {
  for (let i = 0; i < factionData.length; i += 4) {
    factions.push(new Faction(
      factionData[i] as u32,
      i == 0,
      factionData[i + 1],
      factionData[i + 2],
      factionData[i + 3],
    ))
  }
}


export function getFactoriesInitData(): Float32Array {
  let result = new Float32Array(factions.length * 5)
  for (let i = 0; i < factions.length; i++) {
    let faction = factions[i]
    result[i * 5 + 0] = faction.id as f32
    result[i * 5 + 1] = faction.factory.id
    result[i * 5 + 2] = faction.factory.x
    result[i * 5 + 3] = faction.factory.y
    result[i * 5 + 4] = faction.factory.angle
  }
  return result
}

function updateUniverse(): void {
  factions.forEach(faction => {
    faction.update()
  })
}

export function getUniverseRepresentation(): Float32Array {
  updateUniverse()

  let representation = factions.map<f32[]>(faction => faction.getRepresentation()).flat()
  let result = new Float32Array(representation.length)
  for (let i: i32 = 0; i < representation.length; i++) {
    result[i] = representation[i]
  }

  return result
}

export function createSquad(squadType: f32): void {
  unchecked(factions[0]).factory.addSquadDoProduction(MAP_SQUAD_REPRESENTATION_TO_TYPE.get(squadType))
}

export function moveUnits(squadsIds: Uint32Array, x: f32, y: f32): Uint32Array {
  return new Uint32Array(0)
}

export function getSelectedUnitsIds(x1: f32, y1: f32, x2: f32, y2: f32): Uint32Array {
  return new Uint32Array(0)
}

export function useAbility(squadsIds: Uint32Array, abilityType: u8, x: f32, y: f32): void {
}

export function getAbilitiesCoolDowns(squadsIds: Uint32Array, abilityType: u8): Float32Array {
  return new Float32Array(0)
}

// function toTypedArray<T, TyArr>(arr: Array<T>): TyArr {
//   let len = arr.length;
//   let result = instantiate<TyArr>(len);
//   memory.copy(result.dataStart, arr.dataStart, len);
//   return result;
// }

// const typedf32arr = toTypedArray<f32, Float32Array>(arrf32);