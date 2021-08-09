// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";
import { getObstacles, storeObstacles } from "./obstacles-manager";
import { Point } from "./point";
import { MAP_SQUAD_REPRESENTATION_TO_TYPE } from "./squad-details";
import { convertLogicCoordsToVisual, convertVisualCoordsToLogic } from "./convert-coords-between-logic-and-visual";
import { initializeGrid, fillGrid, debugGridNumbers, traceLine, pickCells } from "./grid-manager";
import { UPDATE_SQUAD_CENTER_PERIOD } from "./constants";

var factions: Faction[] = []
export var mapWidthGlob: f32 = 0
export var mapHeightGlob: f32 = 0
var time: usize = 0

export const Float32Array_ID = idof<Float32Array>()
export const Uint32Array_ID = idof<Uint32Array>()

export function initUniverse(
  factionData: Float32Array,
  obstacles: Float32Array,
  mapWidth: f32,
  mapHeight: f32,
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

  storeObstacles(obstacles)

  mapWidthGlob = mapWidth
  mapHeightGlob = mapHeight

  initializeGrid(mapWidth, mapHeight)
}

export function debugObstacles(): Float32Array {
  let data = getObstacles().map<f32[]>(obstacle => (
    obstacle.map<f32[]>((point, index, array) => (
      index !== array.length - 1 ? [point.x, point.y] : [point.x, point.y, -1.0]
    )).flat()
  )).flat()
  let flattenData = data

  let result = new Float32Array(flattenData.length)

  for (let i = 0; i < flattenData.length; i++) {
    let item = flattenData[i]
    result[i] = item
  }
  return result
  //   .iter()
  //   .flat_map(|obstacle_points_list| {
  //     let mut result = obstacle_points_list
  //       .iter()
  //       .flat_map(|point| vec![point.x, point.y])
  //       .collect::<Vec<f32>>();
  //     result.push(-1.0);
  //     result
  //   })
  //   .collect::<Vec<f32>>();
  // js_sys::Float32Array::from(&result[..])
}

export function getFactoriesInitData(): Float32Array {
  let result = new Float32Array(factions.length * 5)
  for (let i = 0; i < factions.length; i++) {
    let faction = factions[i]
    const factoryPos = convertLogicCoordsToVisual(faction.factory.x, faction.factory.y)
    result[i * 5 + 0] = faction.id as f32
    result[i * 5 + 1] = faction.factory.id
    result[i * 5 + 2] = factoryPos.x
    result[i * 5 + 3] = factoryPos.y
    result[i * 5 + 4] = faction.factory.angle
  }
  return result
}

function updateUniverse(): void {
  time = (time + 1) % 1000
  if (time % UPDATE_SQUAD_CENTER_PERIOD == 0) {
    fillGrid(factions)
  }
  
  factions.forEach(faction => {
    faction.update()
  })
}

export function debugGrid(): Float32Array {
  const gridData = debugGridNumbers()
  const result = new Float32Array(gridData.length)
  for(let i = 0; i < gridData.length; i++) {
    result[i] = gridData[i]
  }

  return result
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
  const leftTopCorner = convertVisualCoordsToLogic(x1, y1)
  const rightTopCorner = convertVisualCoordsToLogic(x2, y1)
  const rightBottomCorner = convertVisualCoordsToLogic(x2, y2)
  const leftBottomCorner = convertVisualCoordsToLogic(x1, y2)

  return new Uint32Array(0)
}

export function debugSelecting(x1: f32, y1: f32, x2: f32, y2: f32): Float32Array {
  const leftTopCorner = convertVisualCoordsToLogic(x1, y1)
  const rightTopCorner = convertVisualCoordsToLogic(x2, y1)
  const rightBottomCorner = convertVisualCoordsToLogic(x2, y2)
  const leftBottomCorner = convertVisualCoordsToLogic(x1, y2)

  const data = pickCells([
    leftTopCorner,
    rightTopCorner,
    rightBottomCorner,
    leftBottomCorner,
  ]).map<f32[]>(point => [point.x, point.y]).flat()
  // const data = traceLine(leftTopCorner, rightBottomCorner).map<f32[]>(point => [
  //   point.x,
  //   point.y
  // ]).flat()

  let result = new Float32Array(data.length)
  for (let i: i32 = 0; i < data.length; i++) {
    result[i] = data[i]
  }
  return result
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