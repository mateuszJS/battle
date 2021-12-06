import { OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER } from "./constants";
import { Line, Point } from "./geom-types";
import { checkIntersection, isPointInPolygon, isPointInPolygonLine } from "./geom-utils";

var OBSTACLES_MAP_WIDTH: i32
var OBSTACLES_MAP_WIDTH_HALF: i32
var OBSTACLES_MAP_HEIGHT: i32
export var outerBoundaries: Array<Line[] | null>
var innerBoundaries: Array<Line[] | null>
// null -> available position
// array.length === 0 -> disabled position
// array.length > 0 -> have to check if position is blocked

export function initObstaclesManager(mapWidth: f32, mapHeight: f32): void {
  OBSTACLES_MAP_WIDTH = Mathf.ceil(mapWidth / OBSTACLES_CELL_SIZE) as i32
  OBSTACLES_MAP_WIDTH_HALF = OBSTACLES_MAP_WIDTH / 2 as i32
  OBSTACLES_MAP_HEIGHT  = Mathf.ceil(mapHeight / OBSTACLES_CELL_SIZE) as i32
  outerBoundaries = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT)
  innerBoundaries = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT)
}

function getAllLinesWithinPolygon(lines: Line[], polygon: Point[]): Line[] {
  let linesWithinPolygon: Line[] = []
  const polygonLines: Line[] = polygon.map<Line>((point, index, allPoints) => ({
    p1: point,
    p2: allPoints[(index + 1) % allPoints.length]
  }))

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i]

    let isIntersection = false
    for (let j = 0; j < polygonLines.length; j++) {
      if (checkIntersection(line, polygonLines[j])) {
        isIntersection = true
        break
      }
    }
    if (isIntersection) {
      linesWithinPolygon.push(line)
      continue
    }
    
    // line do not cross the cell boundaries, so can be whole inside the cell or outside
    if (isPointInPolygon(line.p1, polygonLines)) {
      linesWithinPolygon.push(line)
    }
  }

  return linesWithinPolygon
}

export function storeBoundaries(outerRawData: Float32Array, innerRawData: Float32Array): void {
  outerBoundaries = getMap(outerRawData)
  innerBoundaries = getMap(innerRawData)
}

export function getConnectedPoints(data: Float32Array): Point[][] {
  let obstacleIndex: i32 = 0
  let i: i32 = 0;
  let result: Point[][] = [[]]

  //====================CREATE POINTS FOR OBSTACLES=========================
  while (i < data.length) {
    if (data[i] == OBSTACLES_DIVIDER) {
      result.push([])
      obstacleIndex ++
      i ++
    } else {
      result[obstacleIndex].push({
        x: data[i],
        y: data[i + 1],
      })
      i += 2
    }
  }

  return result
}

export function getConnectedLines(data: Point[][]): Line[] {
  let result: Line[] = []

  for (let i = 0; i < data.length; i++) {
    const obstacle = data[i]
    for (let j = 0; j < obstacle.length; j++) {
      result.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }

  return result
}

export function getMap(data: Float32Array): Array<Line[] | null> {
  const obstacles = getConnectedPoints(data)
  const obstacleLines = getConnectedLines(obstacles)

  let linesMap: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);

  for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
    for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {

      const realCoordsPoint: Point = {
        x: (x as f32) * OBSTACLES_CELL_SIZE,
        y: (y as f32) * OBSTACLES_CELL_SIZE,
      }

      const cellArea: Point[] = [
        { x: realCoordsPoint.x, y: realCoordsPoint.y },
        { x: realCoordsPoint.x + OBSTACLES_CELL_SIZE, y: realCoordsPoint.y },
        { x: realCoordsPoint.x + OBSTACLES_CELL_SIZE, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
        { x: realCoordsPoint.x, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
      ]
      const linesInsideCell = getAllLinesWithinPolygon(obstacleLines, cellArea)
      const index = y * OBSTACLES_MAP_WIDTH + x

      // need to check if cell is out or in the obstacles
      if (linesInsideCell.length === 0 ) {
        if (!isPointInPolygon(realCoordsPoint, obstacleLines)) {
          // is out of polygon, so it's disabled position
          linesMap[index] = []
        }
        continue
      }

      const x1: f32 = x <= OBSTACLES_MAP_WIDTH_HALF ? 0 : realCoordsPoint.x
      const x2: f32 = x <= OBSTACLES_MAP_WIDTH_HALF ? realCoordsPoint.x + OBSTACLES_CELL_SIZE : MAP_WIDTH
      const searchArea: Point[] = [
        { x: x1, y: realCoordsPoint.y },
        { x: x2, y: realCoordsPoint.y },
        { x: x2, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
        { x: x1, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
      ]
      // collect all obstacles' lines in a row, to test it
      linesMap[index] = getAllLinesWithinPolygon(obstacleLines, searchArea)
    }
  }

  return linesMap
}

export function getIsPointAvailable(x: f32, y: f32, isSquad: bool): bool {
  if (x < 0 || x >= MAP_WIDTH || y < 0 || y >= MAP_HEIGHT) {
    return false
  }

  const boundaries = isSquad ? innerBoundaries : outerBoundaries
  const cellX = x / OBSTACLES_CELL_SIZE as i32
  const index = (y / OBSTACLES_CELL_SIZE as i32) * OBSTACLES_MAP_WIDTH + cellX

  const linesList = boundaries[index]

  if (!linesList) return true
  if (linesList.length == 0) return false

  const line: Line = {
    p1: {
      x: cellX <= OBSTACLES_MAP_WIDTH_HALF ? -1 : MAP_WIDTH + 1,
      y,
    },
    p2: { x, y },
  }

  return isPointInPolygonLine(line, linesList)
}








/*==============USEFUL FOR TRACK MANAGER====================*/
// We commented this out because we solve problem of "center squad out of allowed boundary"
// by firstly making sure that squad is in the boundary, after that that is no issue

// export function initTrackBlockerLines(obstacleLines: Line[]): void {
//   for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
//     for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {

//       const realCoordsPoint: Point = {
//         x: (x as f32) * OBSTACLES_CELL_SIZE,
//         y: (y as f32) * OBSTACLES_CELL_SIZE,
//       }

//       const cellArea: Point[] = [
//         { x: realCoordsPoint.x, y: realCoordsPoint.y },
//         { x: realCoordsPoint.x + OBSTACLES_CELL_SIZE, y: realCoordsPoint.y },
//         { x: realCoordsPoint.x + OBSTACLES_CELL_SIZE, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
//         { x: realCoordsPoint.x, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
//       ]
//       const index = y * OBSTACLES_MAP_WIDTH + x
//       trackBlockers[index] = getAllLinesWithinPolygon(obstacleLines, cellArea)
//     }
//   }
// }

// // https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
// function getDistancePointToSegment<T extends Point>(
//   p: T,
//   l1: Point,
//   l2: Point,
// ) : f32 {
//   const A = p.x - l1.x
//   const B = p.y - l1.y
//   const C = l2.x - l1.x
//   const D = l2.y - l1.y
//   const dot = A * C + B * D
//   const len_sq = C * C + D * D
//   const param = dot / len_sq // doesn't handle cae when len_sq (line length) is 0
//   let xx: f32 = 0
//   let yy: f32 = 0
//   if (param < 0) {
//     xx = l1.x
//     yy = l1.y
//   } else if (param > 1) {
//     xx = l2.x
//     yy = l2.y
//   } else {
//     xx = l1.x + param * C
//     yy = l1.y + param * D
//   }
//   const dx: f32 = p.x - xx
//   const dy: f32 = p.y - yy

//   return Mathf.sqrt(dx * dx + dy * dy)
// }

// class PointI32 {
//   x: i32
//   y: i32
// }

// function getIndexOffsets(point: Point): PointI32[] {
//   let result: PointI32[] = [{ x: 0, y: 0 }]
//   // actually 4 closes cells will be enough
//   const normX = point.x % OBSTACLES_CELL_SIZE
//   const modX: i32 = normX < OBSTACLES_CELL_SIZE / 2 ? -1 : 1

//   const normY = point.y % OBSTACLES_CELL_SIZE
//   const modY: i32 = normY < OBSTACLES_CELL_SIZE / 2 ? -1 : 1

//   if (Math.abs(OBSTACLES_CELL_SIZE - normX) < Math.abs(OBSTACLES_CELL_SIZE - normY)) {
//     // if normX is closer to the half of the cell than normY
//     // then normX is further from the edge, so should go as the second
//     result.push({ x: 0, y: modY })
//     result.push({ x: modX, y: 0 })
//   } else {
//     // otherwise push items in the revers order
//     result.push({ x: modX, y: 0 })
//     result.push({ x: 0, y: modY })
//   }

//   result.push({ x: modX, y: modY })

//   return result
// }

// export function getClosestTrackBLockerLine(point: UniquePoint): Line {
//   const originCellX = point.x / OBSTACLES_CELL_SIZE as i32
//   const originCellY = point.y / OBSTACLES_CELL_SIZE as i32
//   const offsetsList = getIndexOffsets(point)
  
//   let offsetIndex = 0;
//   let linesInCell: Line[] = []

//   // Find the closest group of lines
//   while (offsetIndex < offsetsList.length) {
//     const offset = unchecked(offsetsList[offsetIndex])
//     const cellX = originCellX + offset.x
//     const cellY = originCellY + offset.y

//     if (cellX < 0 || cellX >= OBSTACLES_MAP_WIDTH || cellY < 0 || cellY >= OBSTACLES_MAP_HEIGHT) {
//       continue
//     }
//     const index = cellY * OBSTACLES_MAP_WIDTH + cellX
//     const lines = unchecked(trackBlockers[index])
//     if (lines && lines.length > 0) {
//       linesInCell = lines
//       break
//     }
//     offsetIndex ++
//   }

//   // Find the closest line
//   let closestLineIndex = 0
//   let minDistance = Infinity

//   for (let i = 0; i < linesInCell.length; i++) {
//     const lines = unchecked(linesInCell[i])
//     const distance = getDistancePointToSegment(point, lines.p1, lines.p2)

//     if (distance < minDistance) {
//       closestLineIndex = i
//       minDistance = distance
//     }
//   }

//   return unchecked(linesInCell[closestLineIndex])
// }