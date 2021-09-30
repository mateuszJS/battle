// import { alert } from "./utils";
// import { foo, bar } from "./constants"

import { Faction } from "./faction";
import { outerBoundaries, storeBoundaries } from "./obstacles-manager";
import { Line, Point, UniquePoint } from "./geom-types";
import { MAP_SQUAD_REPRESENTATION_TO_TYPE, SquadType } from "./squad-details";
import { convertLogicCoordsToVisual, convertVisualCoordsToLogic } from "./convert-coords-between-logic-and-visual";
import { initializeGrid, fillGrid, debugGridNumbers, traceLine, pickCellsDebug, getSquadsFromGrid } from "./grid-manager";
import { CHECK_SQUADS_CORRECTNESS_PERIOD, OBSTACLES_CELL_SIZE, UINT_DATA_SETS_DIVIDER, UPDATE_SQUAD_CENTER_PERIOD } from "./constants";
import { isPointInPolygon } from "./geom-utils";
import { Squad } from "./squad";
import { createPermanentTrackGraph, trackPoints, blockingTrackLines, permanentObstaclesGraph } from "./track-manager";

var factions: Faction[] = []
export var mapWidthGlob: f32 = 0
export var mapHeightGlob: f32 = 0
var time: usize = 0

export const Float32Array_ID = idof<Float32Array>()
export const Uint32Array_ID = idof<Uint32Array>()

var wasEnemyCreated = false
var userFaction = new Faction(0, true, 0, 0, 0)

export function initUniverse(
  factionData: Float32Array,
  obstacles: Float32Array,
  blockingTrackPoints: Float32Array,
  rawTrackPoints: Float32Array,
  bridgeSecondToLastPointIndex: i32,
  mapWidth: f32,
  mapHeight: f32,
): void {
  for (let i = 0; i < factionData.length; i += 4) {
    const isUser = i == 0
    const faction = new Faction(
      factionData[i] as u32,
      isUser,
      factionData[i + 1],
      factionData[i + 2],
      factionData[i + 3],
    )
    if (isUser) {
      userFaction = faction
    }
    factions.push(faction)
  }

  storeBoundaries(obstacles, blockingTrackPoints)
  createPermanentTrackGraph(blockingTrackPoints, rawTrackPoints, bridgeSecondToLastPointIndex)
  // testTracer()

  mapWidthGlob = mapWidth
  mapHeightGlob = mapHeight

  initializeGrid(mapWidth, mapHeight)
}

function getPointCoordsById(id: i32): UniquePoint {
  for (let i = 0; i < trackPoints.length; i++) {
    if (trackPoints[i].id == id) {
      return trackPoints[i]
    }
  }

  return {
    id: 0,
    x: 0,
    y: 0,
  }
}

export function debugObstacles(): Float32Array {
  let data = outerBoundaries.map<f32[]>(linesList => {
    if (!linesList) return [-2]
    if (linesList.length === 0) return [-3]
    return linesList.map<f32[]>(line => [line.p1.x, line.p1.y, line.p2.x, line.p2.y]).flat().concat([-1])
  }).flat()
  let result = new Float32Array(data.length)

  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    result[i] = item
  }
  return result
}

export function debugOuterTrack(): Float32Array {
  let data = blockingTrackLines.map<f32[]>(line => [line.p1.x, line.p1.y, line.p2.x, line.p2.y, -1.0]).flat()
  let result = new Float32Array(data.length)

  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    result[i] = item
  }
  return result
}

export function debugInnerTrack(): Float32Array {
  let data: f32[] = []

  const keys = permanentObstaclesGraph.keys()
  for (let i = 0; i < keys.length; i++) {
    const point = getPointCoordsById(keys[i])
    const connectedPoints = permanentObstaclesGraph.get(keys[i])

    for (let j = 0; j < connectedPoints.length; j++) {
      data = data.concat([
        point.x,
        point.y,
        connectedPoints[j].x,
        connectedPoints[j].y,
        -1,
      ])
    }
  }

  let result = new Float32Array(data.length)

  for (let i = 0; i < data.length; i++) {
    let item = data[i]
    result[i] = item
  }
  return result
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

  /*==========DEBUGGING STUFF===============*/
  if (!wasEnemyCreated && factions.length > 1) {
    wasEnemyCreated = true
    factions[1].factory.addSquadDoProduction(SquadType.Squad)
  }
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
  userFaction.factory.addSquadDoProduction(MAP_SQUAD_REPRESENTATION_TO_TYPE.get(squadType))
}

function getAttackedEnemy(target: Point): Squad | null {
  const allSquadsAround = getSquadsFromGrid([target])

  for (let i = 0; i < allSquadsAround.length; i++) {
    const squad = unchecked(allSquadsAround[i])

    if (squad.factionId == userFaction.id) continue

    const unitRadius = squad.squadDetails.unitRadius
    for (let j = 0; j < squad.members.length; j++) {
      const unit = unchecked(squad.members[j])
      const distance = Mathf.hypot(unit.x - target.x, unit.y - unitRadius - target.y)
      if (distance < unitRadius) {
        return squad
      }
    }
  }

  return null
}

export function moveUnits(squadsIds: Uint32Array, x: f32, y: f32): Float32Array {
  const logicCoords = convertVisualCoordsToLogic(x, y)
  const enemySquad = getAttackedEnemy(logicCoords)
  let result: f32[] = []

  if (enemySquad) {
    userFaction.taskAddEnemy(squadsIds, enemySquad)
    for (let k = 0; k < enemySquad.members.length; k++) {
      result.push(unchecked(enemySquad.members[k].id))
    }
  } else {
    userFaction.taskAddDestination(squadsIds, logicCoords)
  }

  result.push(UINT_DATA_SETS_DIVIDER as f32)

  for (let i = 0; i < userFaction.squads.length; i++) {
    const squad = userFaction.squads[i]
    if (squadsIds.includes(squad.id)) {
      const destinationLogic = squad.track.length > 0
        ? squad.track[squad.track.length - 1]
        : squad.centerPoint
      const destinationVisual = convertLogicCoordsToVisual(destinationLogic.x, destinationLogic.y)
      result.push(destinationVisual.x)
      result.push(destinationVisual.y)
    }
  }

  let serializedResult = new Float32Array(result.length)
  for (let i: i32 = 0; i < result.length; i++) {
    serializedResult[i] = result[i]
  }
  return serializedResult

  // return attackers.map<f32[]>(attacker => {
  //   const destination: Point = attacker.track.length > 0
  //     ? attacker.track[attacker.track.length - 1]
  //     : attacker.centerPoint
  //   return [destination.x, destination.y]
  // }).flat()

  // return new Float32Array(0)
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
  const squads = getSquadsFromGrid(points)
  const selectedOurSquads: Squad[] = []

  let lines = points.map<Line>((point, index, allPoints) => ({
    p1: point,
    p2: unchecked(allPoints[(index + 1) % allPoints.length]),
  }))

  for (let i = 0; i < squads.length; i++) {
    const squad = unchecked(squads[i])
    if (squad.factionId == userFaction.id) {
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

// export function debugObstaclesMap(): Uint32Array {
//   let result = new Uint32Array(obstaclesMap.length)
//   for (let i = 0 ; i < obstaclesMap.length; i++) {
//     result[i] = obstaclesMap[i] as u32
//   }
//   return result
// }

// function toTypedArray<T, TyArr>(arr: Array<T>): TyArr {
//   let len = arr.length;
//   let result = instantiate<TyArr>(len);
//   memory.copy(result.dataStart, arr.dataStart, len);
//   return result;
// }

// const typedf32arr = toTypedArray<f32, Float32Array>(arrf32);