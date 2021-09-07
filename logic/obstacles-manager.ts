import { IS_NOT_IN_OBSTACLE, MAP_HEIGHT, MAP_WIDTH, MATH_PI, MATH_PI_2, NORMAL_SQUAD_RADIUS, OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER, SQUAD_INSIDE_OBSTACLE, UNIT_INSIDE_OBSTACLE } from "./constants";
import { getId } from "./get-id";
import { Line, Point } from "./geom-types";
import { checkIntersection, isObstaclePointInPolygon } from "./geom-utils";
import getMeanAngle from "./get-mean-angle";
import isAngleWithinRange from "./is-angle-within-range";
import { getAngleDiff } from "./get-angle-diff";

export class ObstaclePoint extends Point {
  id: u32
}

export class ObstacleLine {
  p1: ObstaclePoint
  p2: ObstaclePoint
}

export var obstacles: ObstaclePoint[][] = [[]];
export var obstaclePoints: ObstaclePoint[] = [];
export var obstacleLines: ObstacleLine[] = [];
export var obstaclesMap: u8[] = [];
export var permanentObstaclesGraph: Map<u32, ObstaclePoint[]> = new Map()
export var trackLines: Line[] = []
const CELL_DIAGONAL_HALF: f32 = Math.sqrt(1 + 1) / 2 as f32
const OBSTACLES_MAP_WIDTH: i32 = MAP_WIDTH / OBSTACLES_CELL_SIZE as i32
const OBSTACLES_MAP_HEIGHT: i32 = MAP_HEIGHT / OBSTACLES_CELL_SIZE as i32

export function storeObstacles(data: Float32Array): void {
  let obstacleIndex: i32 = 0
  let i: i32 = 0;
  //====================CREATE POINTS FOR OBSTACLES=========================
  while (i < data.length) {
    if (unchecked(data[i]) == OBSTACLES_DIVIDER) {
      obstacles.push([])
      obstacleIndex ++
      i ++
    } else {
      const newPoint: ObstaclePoint = {
        id: getId(),
        x: unchecked(data[i]),
        y: unchecked(data[i + 1]),
      }
      obstaclePoints.push(newPoint)
      obstacles[obstacleIndex].push(newPoint)
      i += 2
    }
  }
  //====================CREATE LINES FOR OBSTACLES=========================
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i]
    for (let j = 0; j < obstacle.length; j++) {
      obstacleLines.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }
  //====================CREATE OBSTACLES MAP=========================
  createObstaclesMap()
  //====================CREATE OBSTACLES MAP=========================
  createObstaclesBoundaries()
  //====================CREATE PERMANENT OBSTACLES GRAPH=========================
  createPermanentObstaclesGraph()
}

function isCloseToSquadDisableCell(x: i32, y: i32): bool {
  if (y != 0 && obstaclesMap[(y - 1) * OBSTACLES_MAP_WIDTH + x] == SQUAD_INSIDE_OBSTACLE) return true
  if (y != OBSTACLES_MAP_HEIGHT - 1 && obstaclesMap[(y + 1) * OBSTACLES_MAP_WIDTH + x] == SQUAD_INSIDE_OBSTACLE) return true
  if (x != 0 && obstaclesMap[y * OBSTACLES_MAP_WIDTH + x - 1] == SQUAD_INSIDE_OBSTACLE) return true
  if (x != OBSTACLES_MAP_WIDTH - 1 && obstaclesMap[y * OBSTACLES_MAP_WIDTH + x + 1] == SQUAD_INSIDE_OBSTACLE) return true
  return false
}

class LinerFunction {
  a: f32
  b: f32
  c: f32

  constructor(p1: Point, p2: Point) {
    this.a = p2.y - p1.y
    this.b = p1.x - p2.x
    this.c = this.a * p1.x + this.b * p1.y

    // if (this.a == 0) {
    //   // vertical line
    //   this.b = p1.x
    // }
  }

  getDistanceFromLine(point: Point): f32 {
    return (
      (this.a * point.x + this.b * point.y + this.c)
      /
      Math.sqrt(this.a * this.a + this.b * this.b)
    )
  }
}

function getObstaclesMapBoundaries(): bool[] {
  let boundaries: bool[] = new Array<bool>(obstaclesMap.length).fill(false)

  for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
    for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {
      const index = y * OBSTACLES_MAP_WIDTH + x
      if (obstaclesMap[index] == IS_NOT_IN_OBSTACLE) {
        if (isCloseToSquadDisableCell(x, y)) {
          boundaries[index] = true
        }
      }
    }
  }

  return boundaries
}

class NextPointDataSet {
  point: Point
  minAngle: f32
  maxAngle: f32
}

function getObstacleMapCellCorners(coords: Point, distanceMod: f32 = 1.0): Point[] {
  let result: Point[] = []

  for (let i = 0; i < 4; i++) {
    result.push({
      x: coords.x + (Math.sin(i as f32 * MATH_PI / 2 + MATH_PI / 4) as f32) * (CELL_DIAGONAL_HALF * distanceMod),
      y: coords.y - (Math.cos(i as f32 * MATH_PI / 2 + MATH_PI / 4) as f32) * (CELL_DIAGONAL_HALF * distanceMod),
    })
  }

  return result
}

function getNextPoint(
  startPoint: Point,
  minAngle: f32,
  maxAngle: f32,
  neighbor: Point,
): NextPointDataSet | null {
  const angleToNeighbor = Math.atan2(neighbor.x - startPoint.x, startPoint.y - neighbor.y) as f32
  const safeMinAngle = minAngle == Infinity ? angleToNeighbor - MATH_PI / 3 : minAngle
  const safeMaxAngle = maxAngle == Infinity ? angleToNeighbor + MATH_PI / 3 : maxAngle

  // find all corners of the square which are in angles range
  let squareCornersAngle: f32[] = []
  const corners = getObstacleMapCellCorners(neighbor)
  for (let i = 0; i < 4; i++) {
    const currAngle = Math.atan2(corners[i].x - startPoint.x, startPoint.y - corners[i].y) as f32
    squareCornersAngle.push(currAngle)
  }

  let cornerMinAngle = angleToNeighbor
  let cornerMaxAngle = angleToNeighbor
  let isAnyCornerInRange = false

  for (let i = 0; i < squareCornersAngle.length; i++) {
    const angle = squareCornersAngle[i]

    if (isAngleWithinRange(angle, safeMinAngle, safeMaxAngle)) {
      isAnyCornerInRange = true
      const angleDiff = getAngleDiff(angle, angleToNeighbor)
      const cornerMinAngleDiff = getAngleDiff(cornerMinAngle, angleToNeighbor)
      const cornerMaxAngleDiff = getAngleDiff(cornerMaxAngle, angleToNeighbor)
      if (angleDiff > cornerMinAngleDiff) {
        if (cornerMinAngleDiff > cornerMaxAngleDiff) {
          cornerMaxAngle = cornerMinAngle
        }
        cornerMinAngle = angle
      } else if (angleDiff > cornerMaxAngleDiff) {
        cornerMaxAngle = angle
      }
    }
  }

  if (!isAnyCornerInRange) {
    // no corners in the range of min/maxAngle
    return null
  }

  const isMinAngleBetween = isAngleWithinRange(safeMinAngle, cornerMinAngle, cornerMaxAngle)
  const isMaxAngleBetween = isAngleWithinRange(safeMaxAngle, cornerMinAngle, cornerMaxAngle)
  const previousRangeAngle: f32 = isMinAngleBetween
    ? safeMinAngle
    : (isMaxAngleBetween ? safeMaxAngle : Infinity)

  if (previousRangeAngle == Infinity) {
    if (cornerMinAngle && cornerMaxAngle) {
      // This neighbor is in angles range, all corners are in the range of min/maxAngle
      return {
        point: neighbor,
        minAngle: cornerMinAngle,
        maxAngle: cornerMaxAngle,
      }
    }
    // This neighbor's corners are all out of min/maxAngle
    return null
  }

  // This neighbor is in angles range, all corners are in the range of min/maxAngle
  const nextMinAngle = previousRangeAngle
  let nextMaxAngle: f32
  if (!cornerMaxAngle) {
    // only one neighbor's corner is in min/maxAngle range
    nextMaxAngle = cornerMinAngle
  } else {
    // two corners are in the range
    nextMaxAngle = getAngleDiff(cornerMinAngle, previousRangeAngle) > getAngleDiff(cornerMaxAngle, previousRangeAngle)
      ? cornerMinAngle
      : cornerMaxAngle
  }
  return {
    point: neighbor,
    minAngle: nextMinAngle,
    maxAngle: nextMaxAngle,
  }
}

function createObstaclesBoundaries(): void {
  const boundaries = getObstaclesMapBoundaries()
  let lines: Line[] = []
  let lastStartPointIndex: i32 = 0
  
  while(true) {
    let collectedPositions: Point[] = []
    /*=========FIND nextPoint===========*/
    lastStartPointIndex ++
    for (; lastStartPointIndex < boundaries.length; lastStartPointIndex++) {
      if (boundaries[lastStartPointIndex]) {
        break
      }
    }

    if (lastStartPointIndex == boundaries.length) {
      // trackLines = lines
      return
    }

    const middleOfStartPoint: Point = {
      x: lastStartPointIndex % OBSTACLES_MAP_WIDTH as f32,
      y: Math.floor(lastStartPointIndex / OBSTACLES_MAP_WIDTH) as f32
    }

    // const allStartPointCoords = [middleOfStartPoint]
    const allStartPointCoords = [middleOfStartPoint]
      .concat(getObstacleMapCellCorners(middleOfStartPoint, 0.5))
      .concat(getObstacleMapCellCorners(middleOfStartPoint, 0.9))

    let startPointsCoords: NextPointDataSet[] = allStartPointCoords.map<NextPointDataSet>(point => ({
      point,
      minAngle: Infinity,
      maxAngle: Infinity,
    }))

    let nextPoint: Point = middleOfStartPoint

    while (true) { // collecting points for a line
      /*=========MARK nextPoint AS VISITED===========*/
      const nextPointIndex = nextPoint.y as i32 * OBSTACLES_MAP_WIDTH + (nextPoint.x as i32)
      boundaries[nextPointIndex] = false
      collectedPositions.push(nextPoint)
   
      /*=========GET ALL NEIGHBORS==============*/
      let neighbors: Point[] = []
      const startY = Math.max(nextPoint.y - 1, 0) as i32
      const endY = Math.min(nextPoint.y + 1, OBSTACLES_MAP_HEIGHT - 1) as i32
      const startX = Math.max(nextPoint.x - 1, 0) as i32
      const endX = Math.min(nextPoint.x + 1, OBSTACLES_MAP_WIDTH - 1) as i32

      for (let y: i32 = startY; y <= endY; y++) {
        for (let x: i32 = startX; x <= endX; x++) {
          const index = y * OBSTACLES_MAP_WIDTH + x
          if (boundaries[index]) {
            neighbors.push({ x: x as f32, y: y as f32 })
          }
        }
      }
      /*=========GET A NEIGHBOR IN RANGE==============*/
      let filteredStartPointsCoords: NextPointDataSet[] = []
      let isNextPointChosen = false
      
      for (let dataSetIndex = 0; dataSetIndex < startPointsCoords.length; dataSetIndex++) {
        const dataSet = startPointsCoords[dataSetIndex]
        let nextPointResults: NextPointDataSet | null = null

        for (let neighborIndex: i32 = 0; neighborIndex < neighbors.length; neighborIndex++) {
          // two neighbors are possible only for very first starting point, I believe
          const neighbor = neighbors[neighborIndex]
          nextPointResults = getNextPoint(
            dataSet.point,
            dataSet.minAngle,
            dataSet.maxAngle,
            neighbor,
          )
          if (nextPointResults) {
            break
          }
        }

        if (nextPointResults) {
          filteredStartPointsCoords.push({
            point: dataSet.point, // keep starting point the same all the time
            minAngle: nextPointResults.minAngle,
            maxAngle: nextPointResults.maxAngle,
          })
          if (!isNextPointChosen) {
            isNextPointChosen = true
            // In most cases actually there is only one valid neighbor
            nextPoint = nextPointResults.point
            neighbors = [nextPointResults.point]
            // let's check just this one neighbor for all startPointCoords
          }
        }
      }

      if (filteredStartPointsCoords.length > 0) {
        startPointsCoords = filteredStartPointsCoords
      } else {
        break
      }
    }
    // if we are out of while(true), it means that there is no cells in the line
    trackLines.push({
      p1: {
        x: startPointsCoords[0].point.x + 0.5,
        y: startPointsCoords[0].point.y + 0.5,
      },
      p2: {
        x: collectedPositions[collectedPositions.length - 1].x + 0.5,
        y: collectedPositions[collectedPositions.length - 1].y + 0.5,
      },
    })
  }
}

function createObstaclesMap(): void {
  const check_cell_corners: Point[] = [
    { x: 0.0, y: 0.0 },
    { x: 0.0, y: OBSTACLES_CELL_SIZE },
    { x: OBSTACLES_CELL_SIZE, y: OBSTACLES_CELL_SIZE },
    { x: OBSTACLES_CELL_SIZE, y: 0.0 },
    { x: OBSTACLES_CELL_SIZE / 2.0, y: OBSTACLES_CELL_SIZE / 2.0 },
  ];

  const check_squad_distance_from_obstacles: Point[] = []
  for (let i = 0; i < 16; i++) {
    let angle = (i as f32 / 16.0) * MATH_PI_2;
    check_squad_distance_from_obstacles.push({
      x: Math.sin(angle) as f32 * NORMAL_SQUAD_RADIUS + OBSTACLES_CELL_SIZE / 2.0,
      y: -Math.cos(angle) as f32 * NORMAL_SQUAD_RADIUS + OBSTACLES_CELL_SIZE / 2.0,  
    })
  }

  for (let y: f32 = 0; y < MAP_HEIGHT; y += OBSTACLES_CELL_SIZE) {
      for (let x: f32 = 0; x < MAP_WIDTH; x += OBSTACLES_CELL_SIZE) {

      let unit_will_collide_with_any_obstacle = false
      for (let i = 0; i < check_cell_corners.length; i++) {
        const point = check_cell_corners[i]
        if (
          isObstaclePointInPolygon(
            { id: 0, x: x + point.x, y: y + point.y },
            obstacleLines,
          )
        ) {
          unit_will_collide_with_any_obstacle = true
          break
        }
      }

      if (unit_will_collide_with_any_obstacle) {
        obstaclesMap.push(UNIT_INSIDE_OBSTACLE)
        continue;
      }

      let squad_will_collide_with_any_obstacle = false
      for (let i = 0; i < check_squad_distance_from_obstacles.length; i++) {
        const point = check_squad_distance_from_obstacles[i]
        if (
          isObstaclePointInPolygon(
            { id: 0, x: x + point.x, y: y + point.y },
            obstacleLines,
          )
        ) {
          squad_will_collide_with_any_obstacle = true
          break
        }
      }

      if (squad_will_collide_with_any_obstacle) {
        obstaclesMap.push(SQUAD_INSIDE_OBSTACLE)
        continue;
      }

      obstaclesMap.push(IS_NOT_IN_OBSTACLE)
    }
  }
}

export function getIsPointInsideAnyObstacle(x: f32, y: f32, is_squad: bool): bool {
  /*=====CHECK IF SQUAD/UNIT IS NOT OUT OF THE MAP======*/
  const boundaries_offset = is_squad
    ? NORMAL_SQUAD_RADIUS
    : 0

  if (
    x < boundaries_offset
    || y < boundaries_offset
    || x >= MAP_WIDTH - boundaries_offset
    || y >= MAP_HEIGHT - boundaries_offset
  ) {
    return true
  }

  /*=====CHECK IF SQUAD/UNIT IS NOT ON THE OBSTACLES======*/
  const index = Math.floor(y / OBSTACLES_CELL_SIZE) * (OBSTACLES_MAP_WIDTH as f32) + x / OBSTACLES_CELL_SIZE as i32
  const cellValue = obstaclesMap[index]

  if (cellValue == IS_NOT_IN_OBSTACLE) {
    return false
  } else if (is_squad) {
    // cellValue it's not free
    return true
  } else if (cellValue == UNIT_INSIDE_OBSTACLE) {
    // it's unit, and cellValue not available for unit
    return true
  }
  // place is not available for squad, but we are checking unit
  return false
}


function insertLinesToGraph(
  graph: Map<u32, ObstaclePoint[]>,
  pointA: ObstaclePoint,
  pointB: ObstaclePoint,
): void {
  if (graph.has(pointA.id)) {
    graph.get(pointA.id).push(pointB)
  } else {
    graph.set(pointA.id, [pointB])
  }
}

function createPermanentObstaclesGraph(): void {
  for (let i = 0; i < obstacleLines.length; i++) {
    const line = obstacleLines[i]
    insertLinesToGraph(permanentObstaclesGraph, line.p1, line.p2)
    insertLinesToGraph(permanentObstaclesGraph, line.p2, line.p1)
  }

  for (let i = 0; i < obstacles.length; i++) {
    const iObstacle = obstacles[i]

    for (let j = i + 1; j < obstacles.length; j++) {
      const jObstacle = obstacles[j]

      for (let m = 0; m < iObstacle.length; m++) {
        for (let n = 0; n < jObstacle.length; n++) {
          const mPoint = iObstacle[m]
          const nPoint = jObstacle[n]
          const newLine: ObstacleLine = {
            p1: mPoint,
            p2: nPoint,
          }

          let isIntersect = false
          for (let p = 0; p < obstacleLines.length; p++) {
            const obstacleLine = obstacleLines[p]
            if (
              obstacleLine.p1.id != mPoint.id
              && obstacleLine.p1.id != nPoint.id
              && obstacleLine.p2.id != mPoint.id
              && obstacleLine.p2.id != nPoint.id
              && checkIntersection(newLine, obstacleLine)
            ) {
              isIntersect = true
              break
            }
          }

          if (!isIntersect) {
            permanentObstaclesGraph.get(mPoint.id).push(nPoint)
            permanentObstaclesGraph.get(nPoint.id).push(mPoint)
          }

        }
      }
    }
  }
}
