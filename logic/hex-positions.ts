import { Ability } from "./ability-details"
import { DISTANCE_BETWEEN_ATTACKERS, PRECALCULATED_ATTACKERS_POSITIONS } from "./attacker-positions"
import { MAP_HEIGHT, MAP_WIDTH, NORMAL_SQUAD_RADIUS } from "./constants"
import { Point } from "./geom-types"
import { getIsPointAvailable } from "./obstacles-manager"
import { Squad } from "./squad"

export var HEX_POSITIONS:StaticArray<StaticArray<Point>> = [[{ x: 0, y: 0 }],[{ x: 90, y: -156 },{ x: 180, y: 0 },{ x: 90, y: 156 },{ x: -90, y: 156 },{ x: -180, y: 0 },{ x: -90, y: -156 }],[{ x: 0, y: -312 },{ x: 180, y: -312 },{ x: 270, y: -156 },{ x: 360, y: 0 },{ x: 270, y: 156 },{ x: 180, y: 312 },{ x: 0, y: 312 },{ x: -180, y: 312 },{ x: -270, y: 156 },{ x: -360, y: 0 },{ x: -270, y: -156 },{ x: -180, y: -312 }],[{ x: 90, y: -468 },{ x: 270, y: -468 },{ x: 360, y: -312 },{ x: 450, y: -156 },{ x: 540, y: 0 },{ x: 450, y: 156 },{ x: 360, y: 312 },{ x: 270, y: 468 },{ x: 90, y: 468 },{ x: -90, y: 468 },{ x: -270, y: 468 },{ x: -360, y: 312 },{ x: -450, y: 156 },{ x: -540, y: 0 },{ x: -450, y: -156 },{ x: -360, y: -312 },{ x: -270, y: -468 },{ x: -90, y: -468 }],[{ x: 0, y: -624 },{ x: 180, y: -624 },{ x: 360, y: -624 },{ x: 450, y: -468 },{ x: 540, y: -312 },{ x: 630, y: -156 },{ x: 720, y: 0 },{ x: 630, y: 156 },{ x: 540, y: 312 },{ x: 450, y: 468 },{ x: 360, y: 624 },{ x: 180, y: 624 },{ x: 0, y: 624 },{ x: -180, y: 624 },{ x: -360, y: 624 },{ x: -450, y: 468 },{ x: -540, y: 312 },{ x: -630, y: 156 },{ x: -720, y: 0 },{ x: -630, y: -156 },{ x: -540, y: -312 },{ x: -450, y: -468 },{ x: -360, y: -624 },{ x: -180, y: -624 }],[{ x: 90, y: -780 },{ x: 270, y: -780 },{ x: 450, y: -780 },{ x: 540, y: -624 },{ x: 630, y: -468 },{ x: 720, y: -312 },{ x: 810, y: -156 },{ x: 900, y: 0 },{ x: 810, y: 156 },{ x: 720, y: 312 },{ x: 630, y: 468 },{ x: 540, y: 624 },{ x: 450, y: 780 },{ x: 270, y: 780 },{ x: 90, y: 780 },{ x: -90, y: 780 },{ x: -270, y: 780 },{ x: -450, y: 780 },{ x: -540, y: 624 },{ x: -630, y: 468 },{ x: -720, y: 312 },{ x: -810, y: 156 },{ x: -900, y: 0 },{ x: -810, y: -156 },{ x: -720, y: -312 },{ x: -630, y: -468 },{ x: -540, y: -624 },{ x: -450, y: -780 },{ x: -270, y: -780 },{ x: -90, y: -780 }],[{ x: 0, y: -936 },{ x: 180, y: -936 },{ x: 360, y: -936 },{ x: 540, y: -936 },{ x: 630, y: -780 },{ x: 720, y: -624 },{ x: 810, y: -468 },{ x: 900, y: -312 },{ x: 990, y: -156 },{ x: 1080, y: 0 },{ x: 990, y: 156 },{ x: 900, y: 312 },{ x: 810, y: 468 },{ x: 720, y: 624 },{ x: 630, y: 780 },{ x: 540, y: 936 },{ x: 360, y: 936 },{ x: 180, y: 936 },{ x: 0, y: 936 },{ x: -180, y: 936 },{ x: -360, y: 936 },{ x: -540, y: 936 },{ x: -630, y: 780 },{ x: -720, y: 624 },{ x: -810, y: 468 },{ x: -900, y: 312 },{ x: -990, y: 156 },{ x: -1080, y: 0 },{ x: -990, y: -156 },{ x: -900, y: -312 },{ x: -810, y: -468 },{ x: -720, y: -624 },{ x: -630, y: -780 },{ x: -540, y: -936 },{ x: -360, y: -936 },{ x: -180, y: -936 }],[{ x: 90, y: -1092 },{ x: 270, y: -1092 },{ x: 450, y: -1092 },{ x: 630, y: -1092 },{ x: 720, y: -936 },{ x: 810, y: -780 },{ x: 900, y: -624 },{ x: 990, y: -468 },{ x: 1080, y: -312 },{ x: 1170, y: -156 },{ x: 1260, y: 0 },{ x: 1170, y: 156 },{ x: 1080, y: 312 },{ x: 990, y: 468 },{ x: 900, y: 624 },{ x: 810, y: 780 },{ x: 720, y: 936 },{ x: 630, y: 1092 },{ x: 450, y: 1092 },{ x: 270, y: 1092 },{ x: 90, y: 1092 },{ x: -90, y: 1092 },{ x: -270, y: 1092 },{ x: -450, y: 1092 },{ x: -630, y: 1092 },{ x: -720, y: 936 },{ x: -810, y: 780 },{ x: -900, y: 624 },{ x: -990, y: 468 },{ x: -1080, y: 312 },{ x: -1170, y: 156 },{ x: -1260, y: 0 },{ x: -1170, y: -156 },{ x: -1080, y: -312 },{ x: -990, y: -468 },{ x: -900, y: -624 },{ x: -810, y: -780 },{ x: -720, y: -936 },{ x: -630, y: -1092 },{ x: -450, y: -1092 },{ x: -270, y: -1092 },{ x: -90, y: -1092 }],[{ x: 0, y: -1248 },{ x: 180, y: -1248 },{ x: 360, y: -1248 },{ x: 540, y: -1248 },{ x: 720, y: -1248 },{ x: 810, y: -1092 },{ x: 900, y: -936 },{ x: 990, y: -780 },{ x: 1080, y: -624 },{ x: 1170, y: -468 },{ x: 1260, y: -312 },{ x: 1350, y: -156 },{ x: 1440, y: 0 },{ x: 1350, y: 156 },{ x: 1260, y: 312 },{ x: 1170, y: 468 },{ x: 1080, y: 624 },{ x: 990, y: 780 },{ x: 900, y: 936 },{ x: 810, y: 1092 },{ x: 720, y: 1248 },{ x: 540, y: 1248 },{ x: 360, y: 1248 },{ x: 180, y: 1248 },{ x: 0, y: 1248 },{ x: -180, y: 1248 },{ x: -360, y: 1248 },{ x: -540, y: 1248 },{ x: -720, y: 1248 },{ x: -810, y: 1092 },{ x: -900, y: 936 },{ x: -990, y: 780 },{ x: -1080, y: 624 },{ x: -1170, y: 468 },{ x: -1260, y: 312 },{ x: -1350, y: 156 },{ x: -1440, y: 0 },{ x: -1350, y: -156 },{ x: -1260, y: -312 },{ x: -1170, y: -468 },{ x: -1080, y: -624 },{ x: -990, y: -780 },{ x: -900, y: -936 },{ x: -810, y: -1092 },{ x: -720, y: -1248 },{ x: -540, y: -1248 },{ x: -360, y: -1248 },{ x: -180, y: -1248 }],[{ x: 90, y: -1404 },{ x: 270, y: -1404 },{ x: 450, y: -1404 },{ x: 630, y: -1404 },{ x: 810, y: -1404 },{ x: 900, y: -1248 },{ x: 990, y: -1092 },{ x: 1080, y: -936 },{ x: 1170, y: -780 },{ x: 1260, y: -624 },{ x: 1350, y: -468 },{ x: 1440, y: -312 },{ x: 1530, y: -156 },{ x: 1620, y: 0 },{ x: 1530, y: 156 },{ x: 1440, y: 312 },{ x: 1350, y: 468 },{ x: 1260, y: 624 },{ x: 1170, y: 780 },{ x: 1080, y: 936 },{ x: 990, y: 1092 },{ x: 900, y: 1248 },{ x: 810, y: 1404 },{ x: 630, y: 1404 },{ x: 450, y: 1404 },{ x: 270, y: 1404 },{ x: 90, y: 1404 },{ x: -90, y: 1404 },{ x: -270, y: 1404 },{ x: -450, y: 1404 },{ x: -630, y: 1404 },{ x: -810, y: 1404 },{ x: -900, y: 1248 },{ x: -990, y: 1092 },{ x: -1080, y: 936 },{ x: -1170, y: 780 },{ x: -1260, y: 624 },{ x: -1350, y: 468 },{ x: -1440, y: 312 },{ x: -1530, y: 156 },{ x: -1620, y: 0 },{ x: -1530, y: -156 },{ x: -1440, y: -312 },{ x: -1350, y: -468 },{ x: -1260, y: -624 },{ x: -1170, y: -780 },{ x: -1080, y: -936 },{ x: -990, y: -1092 },{ x: -900, y: -1248 },{ x: -810, y: -1404 },{ x: -630, y: -1404 },{ x: -450, y: -1404 },{ x: -270, y: -1404 },{ x: -90, y: -1404 }],[{ x: 0, y: -1560 },{ x: 180, y: -1560 },{ x: 360, y: -1560 },{ x: 540, y: -1560 },{ x: 720, y: -1560 },{ x: 900, y: -1560 },{ x: 990, y: -1404 },{ x: 1080, y: -1248 },{ x: 1170, y: -1092 },{ x: 1260, y: -936 },{ x: 1350, y: -780 },{ x: 1440, y: -624 },{ x: 1530, y: -468 },{ x: 1620, y: -312 },{ x: 1710, y: -156 },{ x: 1800, y: 0 },{ x: 1710, y: 156 },{ x: 1620, y: 312 },{ x: 1530, y: 468 },{ x: 1440, y: 624 },{ x: 1350, y: 780 },{ x: 1260, y: 936 },{ x: 1170, y: 1092 },{ x: 1080, y: 1248 },{ x: 990, y: 1404 },{ x: 900, y: 1560 },{ x: 720, y: 1560 },{ x: 540, y: 1560 },{ x: 360, y: 1560 },{ x: 180, y: 1560 },{ x: 0, y: 1560 },{ x: -180, y: 1560 },{ x: -360, y: 1560 },{ x: -540, y: 1560 },{ x: -720, y: 1560 },{ x: -900, y: 1560 },{ x: -990, y: 1404 },{ x: -1080, y: 1248 },{ x: -1170, y: 1092 },{ x: -1260, y: 936 },{ x: -1350, y: 780 },{ x: -1440, y: 624 },{ x: -1530, y: 468 },{ x: -1620, y: 312 },{ x: -1710, y: 156 },{ x: -1800, y: 0 },{ x: -1710, y: -156 },{ x: -1620, y: -312 },{ x: -1530, y: -468 },{ x: -1440, y: -624 },{ x: -1350, y: -780 },{ x: -1260, y: -936 },{ x: -1170, y: -1092 },{ x: -1080, y: -1248 },{ x: -990, y: -1404 },{ x: -900, y: -1560 },{ x: -720, y: -1560 },{ x: -540, y: -1560 },{ x: -360, y: -1560 },{ x: -180, y: -1560 }]]

export function getSquadPositions(
  positionsNumber: i32,
  centerX: f32,
  centerY: f32,
): Point[] {
  let points: Point[] = []

  for (
    let i = 0;
    i < HEX_POSITIONS.length;
    i = (i + 1) % HEX_POSITIONS.length
  ) {
    const positionsList = HEX_POSITIONS[i]
    for (let j = 0; j < positionsList.length; j++) {
      const position = positionsList[j]
      const x = position.x + centerX
      const y = position.y + centerY
      if (getIsPointAvailable(position.x + centerX, position.y + centerY, true)) {
        points.push({ x, y })
      }

      if (points.length == positionsNumber) {
        return points
      }
    }
  }

  // TODO: not enough positions! Handle this case
  return points
}

const THRESHOLD_SQUADS_IN_ONE_GROUP: f32 = NORMAL_SQUAD_RADIUS * 6

function addSquadToDividedGroup(dividedGroups: Squad[][], squad: Squad): void {
  for (let i = 0; i < dividedGroups.length; i++) {
    const dividedSquadsGroup = dividedGroups[i]
    for (let j = 0; j < dividedSquadsGroup.length; j++) {
      const dividedSquad = dividedSquadsGroup[j]
      const distance = Mathf.hypot(
        squad.centerPoint.x - dividedSquad.centerPoint.x,
        squad.centerPoint.y - dividedSquad.centerPoint.y,
      )
      if (distance < THRESHOLD_SQUADS_IN_ONE_GROUP) {
        const isSameRange = Mathf.abs(squad.weaponDetails.range - dividedSquad.weaponDetails.range) < f32.EPSILON
        if (isSameRange) {
          dividedSquadsGroup.push(squad) // close to the existing group
          return
        }
      }
    }
  }

  dividedGroups.push([squad]) // a new group
}

function getSquadsCenter(squads: Squad[]): Point {
  const sumPoint = squads.reduce((acc, squad) => ({
    x: acc.x + squad.centerPoint.x,
    y: acc.y + squad.centerPoint.y,
  }), { x: 0, y: 0 } as Point)
  const length = squads.length as f32

  return {
    x: sumPoint.x / length,
    y: sumPoint.y / length,
  }
}

function calc_attackers_positions(
  target: Point,
  source: Point,
  needed_positions: i32,
  range: f32,
): Point[] {
  const breakpoint = (range / DISTANCE_BETWEEN_ATTACKERS) as i32 - 1
  const precalculated_positions = unchecked(PRECALCULATED_ATTACKERS_POSITIONS[breakpoint])

  const precalculated_positions_number = precalculated_positions.length
  let result: Point[] = []
  let position_index = 0;
  const angle_from_target = Mathf.atan2(source.x - target.x, target.y - source.y)
  while (result.length < needed_positions) {
    const precalculatedPoint = unchecked(precalculated_positions[position_index])
    const x = Mathf.sin(angle_from_target + precalculatedPoint.x) * precalculatedPoint.y + target.x
    const y = -Mathf.cos(angle_from_target + precalculatedPoint.x) * precalculatedPoint.y + target.y
    
    if (getIsPointAvailable(x, y, true)) {
      result.push({ x, y });
    }
    position_index = (position_index + 1) % precalculated_positions_number;
  }
  return result
}

function getPositions(squads: Squad[], target: Point, range: f32): Point[] {
  let positions = calc_attackers_positions(
    target,
    getSquadsCenter(squads),
    squads.length,
    range,
  );

  positions.sort((a, b) => a.y - b.y as i32)
  
  return positions
}

function getSquadsDividedByRangeAndLocalization (squads: Squad[]): Squad[][] {
  let copyOfSquads = squads.slice(0)
  let dividedByLocalization: Squad[][] = []

  while (copyOfSquads.length != 0) {
    const squad = unchecked(copyOfSquads.splice(0, 1)[0])
    addSquadToDividedGroup(dividedByLocalization, squad)
  }

  return dividedByLocalization
}

export function setAbilityPositions(squads: Squad[], ability: Ability, target: Point): void {
  const squadsOutOfRange: Squad[] = []
  const maxSquadRange = ability.range - NORMAL_SQUAD_RADIUS

  // set ability for squads which are in range
  // collect all squads out of the range
  for (let i = 0; i < squads.length; i++) {
    const squad = squads[i]
    const distance = Mathf.hypot(
      squad.centerPoint.x - target.x,
      squad.centerPoint.y - target.y,
    )
    if (maxSquadRange < distance) {
      squadsOutOfRange.push(squad)
    } else {
      squad.setTask(null, null, target)
    }
  }

  if (squadsOutOfRange.length == 0) return

  const positions = getPositions(squadsOutOfRange, target, maxSquadRange)
  squadsOutOfRange.sort((a, b) => a.centerPoint.y - b.centerPoint.y as i32)
  for (let i = 0; i < squadsOutOfRange.length; i++) {
    unchecked(
      squadsOutOfRange[i].setTask(positions[i], null, target)
    )
  }
}

export function setAggressorPositions(squads: Squad[], enemySquad: Squad): void {
    const squadsOutOfRange: Squad[] = []
    const enemySquadCenter = enemySquad.centerPoint

    // set ability for squads which are in range
    // collect all squads out of the range
    for (let i = 0; i < squads.length; i++) {
      const squad = squads[i]
      const distance = Mathf.hypot(
        squad.centerPoint.x - enemySquadCenter.x,
        squad.centerPoint.y - enemySquadCenter.y,
      )
      if (squad.weaponDetails.range - NORMAL_SQUAD_RADIUS < distance) {
        squadsOutOfRange.push(squad)
      } else {
        squad.setTask(null, enemySquad, null)
      }
    }

    const squadsDividedByRangeAndLocalization = getSquadsDividedByRangeAndLocalization(squadsOutOfRange)

    for (let i = 0; i < squadsDividedByRangeAndLocalization.length; i++) {
      const squadGroup = unchecked(squadsDividedByRangeAndLocalization[i])
      const positions = getPositions(
        squadGroup,
        enemySquad.centerPoint,
        unchecked(squadGroup[0]).weaponDetails.range - NORMAL_SQUAD_RADIUS,
      )
      squadGroup.sort((a, b) => a.centerPoint.y - b.centerPoint.y as i32)
      for (let i = 0; i < squads.length; i++) {
        unchecked(
          squads[i].setTask(positions[i], enemySquad, null)
        )
      }
    }
  }