import { Faction } from "./faction";
import { getIsPointAvailable, outerBoundaries, storeBoundaries } from "./obstacles-manager";
import { Line, Point, UniquePoint } from "./geom-types";
import { convertLogicAngleToVisual, convertLogicCoordsToVisual, convertVisualCoordsToLogic, getUnitOffset } from "./convert-coords-between-logic-and-visual";
import { initializeGrid, fillGrid, debugGridNumbers, pickCellIndexesInPolygonDebug, getSquadsFromGridByPolygon, getSquadsFromGridByCircle } from "./grid-manager";
import { CHECK_SQUADS_CORRECTNESS_PERIOD, UINT_DATA_SETS_DIVIDER, UPDATE_SQUAD_CENTER_PERIOD, SEARCH_FOR_ENEMIES_PERIOD, MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS, RepresentationId, MAP_SKEW_ANGLE } from "./constants";
import { isPointInPolygon } from "./geom-utils";
import { Squad } from "./squad";
import { createPermanentTrackGraph, trackPoints, blockingTrackLines, permanentObstaclesGraph } from "./track-manager";
import { getBulletsRepresentation, updateBullets } from "./bullets-manager";
import searchForEnemy from "./search-for-enemy";

var factions: Faction[] = []
export var mapWidthGlob: f32 = 0
export var mapHeightGlob: f32 = 0
var time: usize = 0

export const Float32Array_ID = idof<Float32Array>()
export const Uint32Array_ID = idof<Uint32Array>()

var wasEnemyCreated = false
var userFaction = new Faction(0, true, 0, 0, 0)
// fake factions, just a placeholder

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
  const data = outerBoundaries.map<f32[]>(linesList => {
    if (!linesList) return [-2]
    if (linesList.length === 0) return [-3]
    return linesList.map<f32[]>(line => [line.p1.x, line.p1.y, line.p2.x, line.p2.y]).flat().concat([-1])
  }).flat()

  return toFloat32Array(data)
}

export function debugOuterTrack(): Float32Array {
  const data = blockingTrackLines.map<f32[]>(line => [line.p1.x, line.p1.y, line.p2.x, line.p2.y, -1.0]).flat()
  return toFloat32Array(data)
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

  return toFloat32Array(data)
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
    result[i * 5 + 4] = faction.factory.angle + MAP_SKEW_ANGLE // convertLogicAngleToVisual(faction.factory.angle)
  }
  return result
}

function updateUniverse(): void {
  time = (time + 1) % 1000

  // update the center
  if (time % UPDATE_SQUAD_CENTER_PERIOD == 0) {
    factions.forEach(faction => {
      faction.squads.forEach((squad) => {
        squad.updateCenter()
      })
    })
  }

  // check correctness, remove all squads which are not longer alive
  if (time % CHECK_SQUADS_CORRECTNESS_PERIOD == 0) {
    factions.forEach(faction => {
      faction.checkSquadsCorrectness()
    })
  }
  
  // fill grid wit hall valid squads now
  if (time % UPDATE_SQUAD_CENTER_PERIOD == 0) {
    fillGrid(factions)
  }
  
  // now let's start using the grid
  if (time % SEARCH_FOR_ENEMIES_PERIOD == 0) {
    searchForEnemy(factions)
  }

  updateBullets()
  
  factions.forEach(faction => {
    faction.update()
  })

  /*==========DEBUGGING STUFF===============*/
  if (!wasEnemyCreated && factions.length > 1) {
    wasEnemyCreated = true
    factions[1].factory.addSquadDoProduction(RepresentationId.Solider)
  }
}

export function debugGrid(): Float32Array {
  return toFloat32Array(debugGridNumbers())
}

export function getUniverseRepresentation(): Float32Array {
  updateUniverse()
  const representation = factions.map<f32[]>(faction => faction.getRepresentation()).flat()

  return toFloat32Array(
    representation.concat(getBulletsRepresentation())
  )
}

export function createSquad(representationId: i32): void {
  userFaction.factory.addSquadDoProduction(representationId as RepresentationId)
}

function getAttackedEnemy(target: Point): Squad | null {
  const allSquadsAround = getSquadsFromGridByPolygon([target])

  for (let i = 0; i < allSquadsAround.length; i++) {
    const squad = unchecked(allSquadsAround[i])

    if (squad.factionId == userFaction.id) continue

    const unitRadius = squad.squadDetails.unitRadius
    const offset = getUnitOffset(squad)
    const unitSize = unitRadius * 1.5
    for (let j = 0; j < squad.members.length; j++) {
      const unit = unchecked(squad.members[j])
      const distance = Mathf.hypot(
        unit.x + offset.x - target.x,
        unit.y + offset.y - target.y,
      )
      if (distance < unitSize) {
        return squad
      }
    }
  }

  return null
}

function getSquadsDestinations(squadsIds: Uint32Array): f32[] {
  let result: f32[] = []
  for (let i = 0; i < userFaction.squads.length; i++) {
    const squad = userFaction.squads[i]
    if (squadsIds.includes(squad.id)) {

      let destinationLogic = squad.centerPoint
      const taskTodoDestination = squad.taskTodo.trackDestination
      if (squad.isDuringFixingSquadCenter && taskTodoDestination) {
        destinationLogic = taskTodoDestination
      } else if (squad.track.length > 0) {
        destinationLogic = squad.track[squad.track.length - 1]
      }

      const destinationVisual = convertLogicCoordsToVisual(destinationLogic.x, destinationLogic.y)
      result.push(destinationVisual.x)
      result.push(destinationVisual.y)
    }
  }

  return result
}

export function moveUnits(squadsIds: Uint32Array, x: f32, y: f32): Float32Array {
  const logicCoords = convertVisualCoordsToLogic(x, y)

  const isValidDestination = getIsPointAvailable(logicCoords.x, logicCoords.y, false)
  if (!isValidDestination) {
    return new Float32Array(0)
  }

  const enemySquad = getAttackedEnemy(logicCoords)
  let result: f32[] = []

  if (enemySquad) {
    userFaction.taskAddEnemy(squadsIds, enemySquad)
    result = enemySquad.members.map<f32>(unit => unit.id)
  } else {
    userFaction.taskAddDestination(squadsIds, logicCoords)
  }

  result.push(UINT_DATA_SETS_DIVIDER as f32)

  const destinations = getSquadsDestinations(squadsIds)

  return toFloat32Array(result.concat(destinations))
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

  const squads = getSquadsFromGridByPolygon(points)
  const selectedOurSquads: Squad[] = []

  const lines = points.map<Line>((point, index, allPoints) => ({
    p1: point,
    p2: unchecked(allPoints[(index + 1) % allPoints.length]),
  }))

  for (let i = 0; i < squads.length; i++) {
    const squad = unchecked(squads[i])
    const offset = getUnitOffset(squad)

    if (squad.factionId == userFaction.id) {
      let isInside = false
      for (let j = 0; j < squad.members.length; j++) {
        const member = unchecked(squad.members[j])
        if (
          isPointInPolygon(
            { x: member.x + offset.x, y: member.y + offset.y },
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

  return toTypedArray<u32, Uint32Array>(concatedData)
}

export function debugSelecting(x1: f32, y1: f32, x2: f32, y2: f32): Float32Array {
  const leftTopCorner = convertVisualCoordsToLogic(x1, y1)
  const rightTopCorner = convertVisualCoordsToLogic(x2, y1)
  const rightBottomCorner = convertVisualCoordsToLogic(x2, y2)
  const leftBottomCorner = convertVisualCoordsToLogic(x1, y2)

  const data = pickCellIndexesInPolygonDebug([
    leftTopCorner,
    rightTopCorner,
    rightBottomCorner,
    leftBottomCorner,
  ]).map<f32[]>(point => [point.x, point.y]).flat();

  return toFloat32Array(data)
}

export function useAbility(squadsIds: Uint32Array, abilityType: u8, x: f32, y: f32): Float32Array {
  const logicCoords = convertVisualCoordsToLogic(x, y)

  const isValidDestination = getIsPointAvailable(logicCoords.x, logicCoords.y, false)
  if (!isValidDestination) {
    return new Float32Array(0)
  }

  userFaction.taskAddAbility(squadsIds, abilityType, logicCoords)

  return toFloat32Array(getSquadsDestinations(squadsIds))
}

export function getAbilitiesCoolDowns(squadsIds: Uint32Array, abilityType: u8): Float32Array {
  let result: f32[] = []

  for (let i = 0; i < userFaction.squads.length; i++) {
    const squad = unchecked(userFaction.squads[i])
    const ability = squad.squadDetails.ability
    if (
      squadsIds.includes(squad.id)
      && ability
      && (
        abilityType < f32.EPSILON
        || Math.abs(squad.squadDetails.representationId - abilityType) < f32.EPSILON
      )
    ) {
      squad.updateCenter()
      const coords = convertLogicCoordsToVisual(squad.centerPoint.x, squad.centerPoint.y)
      result = result.concat([
        ability.type as f32,
        squad.abilityCoolDown == 0 ? 1 : 0,
        squad.abilityCoolDown as f32 / ability.reloadTime as f32,
        coords.x,
        coords.y,
      ])
    }
  }

  return toFloat32Array(result)
}

// export function debugObstaclesMap(): Uint32Array {
//   let result = new Uint32Array(obstaclesMap.length)
//   for (let i = 0 ; i < obstaclesMap.length; i++) {
//     result[i] = obstaclesMap[i] as u32
//   }
//   return result
// }

function toFloat32Array(arr: f32[]): Float32Array {
  const len = arr.length
  const result = instantiate<Float32Array>(len)
  memory.copy(result.dataStart, arr.dataStart, len * sizeof<f32>())
  return result
}

function toTypedArray<T, TyArr>(arr: Array<T>): TyArr {
  const len = arr.length;
  const result = instantiate<TyArr>(len);
  memory.copy(result.dataStart, arr.dataStart, len * sizeof<T>());
  return result;
}
