// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";
import { calculateObstaclesMap, obstacles, obstaclesMap, storeObstacles } from "./obstacles-manager";
import { Line, Point } from "./geom-types";
import { MAP_SQUAD_REPRESENTATION_TO_TYPE } from "./squad-details";
import { convertLogicCoordsToVisual, convertVisualCoordsToLogic } from "./convert-coords-between-logic-and-visual";
import { initializeGrid, fillGrid, debugGridNumbers, traceLine, pickCellsDebug, getSquads } from "./grid-manager";
import { CHECK_SQUADS_CORRECTNESS_PERIOD, UINT_DATA_SETS_DIVIDER, UPDATE_SQUAD_CENTER_PERIOD, USER_FACTION_ID } from "./constants";
import { isPointInPolygon } from "./geom-utils";
import { Squad } from "./squad";

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
  let data = obstacles.map<f32[]>(obstacle => (
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

  if (time % CHECK_SQUADS_CORRECTNESS_PERIOD == 0) {
    for (let i = 0; i < factions.length; i++) {
      const faction = unchecked(factions[i])
      faction.checkSquadsCorrectness()
    }
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
    unchecked(result[i] = representation[i])
  }

  return result
}

export function createSquad(squadType: f32): void {
  unchecked(factions[0]).factory.addSquadDoProduction(MAP_SQUAD_REPRESENTATION_TO_TYPE.get(squadType))
}

export function moveUnits(squadsIds: Uint32Array, x: f32, y: f32): Uint32Array {
  const userFactionIndex = factions.findIndex(faction => faction.id == USER_FACTION_ID)
  unchecked(factions[userFactionIndex]).taskAddDestination(squadsIds, convertVisualCoordsToLogic(x, y))

  return new Uint32Array(0)
}

export function getSelectedUnitsIds(x1: f32, y1: f32, x2: f32, y2: f32): Uint32Array {
  const leftTopCorner = convertVisualCoordsToLogic(x1, y1)
  const rightTopCorner = convertVisualCoordsToLogic(x2, y1)
  const rightBottomCorner = convertVisualCoordsToLogic(x2, y2)
  const leftBottomCorner = convertVisualCoordsToLogic(x1, y2)
  const points = [
    leftTopCorner,
    rightTopCorner,
    rightBottomCorner,
    leftBottomCorner,
  ]
  const squads = getSquads(points)
  const selectedOurSquads: Squad[] = []

  let lines = points.map<Line>((point, index, allPoints) => ({
    p1: point,
    p2: unchecked(allPoints[(index + 1) % allPoints.length]),
  }))

  for (let i = 0; i < squads.length; i++) {
    const squad = unchecked(squads[i])
    if (squad.factionId == USER_FACTION_ID) {
      let isInside = false
      for (let j = 0; j < squad.members.length; j++) {
        const member = unchecked(squad.members[j])
        if (
          isPointInPolygon(
            { x: member.x, y: member.y },
            lines,
            )
        ) {
          isInside = true
          break
        }
      }
      if (isInside) {
        selectedOurSquads.push(squad)
      }
    }
  }
 
  const squadsIds = selectedOurSquads.map<u32>(squad => squad.id)
  const unitsIds = selectedOurSquads.map<u32[]>(squad => squad.members.map<u32>(unit => unit.id as u32)).flat()
  const concatedData = unitsIds.concat([UINT_DATA_SETS_DIVIDER]).concat(squadsIds)

  let result = new Uint32Array(concatedData.length)
  for (let i = 0; i < concatedData.length; i++) {
    unchecked(result[i] = concatedData[i])
  }
  return result
}

export function debugSelecting(x1: f32, y1: f32, x2: f32, y2: f32): Float32Array {
  const leftTopCorner = convertVisualCoordsToLogic(x1, y1)
  const rightTopCorner = convertVisualCoordsToLogic(x2, y1)
  const rightBottomCorner = convertVisualCoordsToLogic(x2, y2)
  const leftBottomCorner = convertVisualCoordsToLogic(x1, y2)

  const data = pickCellsDebug([
    leftTopCorner,
    rightTopCorner,
    rightBottomCorner,
    leftBottomCorner,
  ]).map<f32[]>(point => [point.x, point.y]).flat();


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

export function debugObstaclesMap(): Uint32Array {
  calculateObstaclesMap()
  let result = new Uint32Array(obstaclesMap.length)
  for (let i = 0 ; i < obstaclesMap.length; i++) {
    result[i] = obstaclesMap[i] as u32
  }
  return result
}

// function toTypedArray<T, TyArr>(arr: Array<T>): TyArr {
//   let len = arr.length;
//   let result = instantiate<TyArr>(len);
//   memory.copy(result.dataStart, arr.dataStart, len);
//   return result;
// }

// const typedf32arr = toTypedArray<f32, Float32Array>(arrf32);