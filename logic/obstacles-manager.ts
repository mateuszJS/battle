import { MAP_HEIGHT, MAP_WIDTH, OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER } from "./constants";
import { Line, Point } from "./geom-types";
import { checkIntersection, isObstaclePointInPolygon, isPointInPolygon, isPointInPolygonLine } from "./geom-utils";

const OBSTACLES_MAP_WIDTH: i32 = Mathf.ceil(MAP_WIDTH / OBSTACLES_CELL_SIZE) as i32
const OBSTACLES_MAP_WIDTH_HALF: i32 = OBSTACLES_MAP_WIDTH / 2 as i32
const OBSTACLES_MAP_HEIGHT: i32 = Mathf.ceil(MAP_HEIGHT / OBSTACLES_CELL_SIZE) as i32
export var outerBoundaries: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);
var innerBoundaries: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);
// null -> available position
// array.length === 0 -> disabled position
// array.length > 0 -> have to check if position is blocked

export function storeBoundaries(outerRawData: Float32Array, innerRawData: Float32Array): void {
  outerBoundaries = getMap(outerRawData)
  innerBoundaries = getMap(innerRawData)
}

export function getMap(data: Float32Array): Array<Line[] | null> {
  let obstacleIndex: i32 = 0
  let i: i32 = 0;
  let obstacles: Point[][] = [[]]

  //====================CREATE POINTS FOR OBSTACLES=========================
  while (i < data.length) {
    if (data[i] == OBSTACLES_DIVIDER) {
      obstacles.push([])
      obstacleIndex ++
      i ++
    } else {
      obstacles[obstacleIndex].push({
        x: data[i],
        y: data[i + 1],
      })
      i += 2
    }
  }

  //====================CREATE LINES FOR OBSTACLES=========================
  let obstacleLines: Line[] = []
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i]
    for (let j = 0; j < obstacle.length; j++) {
      obstacleLines.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }

  let linesMap: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);

  for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
    for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {

      const realCoordsPoint: Point = {
        x: (x as f32) * OBSTACLES_CELL_SIZE,
        y: (y as f32) * OBSTACLES_CELL_SIZE,
      }

      const x1: f32 = x <= OBSTACLES_MAP_WIDTH_HALF ? 0 : realCoordsPoint.x
      const x2: f32 = x <= OBSTACLES_MAP_WIDTH_HALF ? realCoordsPoint.x + OBSTACLES_CELL_SIZE : MAP_WIDTH

      const cellPoints: Point[] = [
        { x: x1, y: realCoordsPoint.y },
        { x: x2, y: realCoordsPoint.y },
        { x: x2, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
        { x: x1, y: realCoordsPoint.y + OBSTACLES_CELL_SIZE },
      ]

      const cellLines: Line[] = cellPoints.map<Line>((point, index, allPoints) => ({
        p1: point,
        p2: allPoints[(index + 1) % allPoints.length]
      }))

      let allLinesInsideCell: Line[] = []

      for (let i = 0; i < obstacleLines.length; i++) {

        const line = obstacleLines[i]

        let isIntersection = false
        for (let j = 0; j < cellLines.length; j++) {
          if (checkIntersection(line, cellLines[j])) {
            isIntersection = true
            break
          }
        }
        if (isIntersection) {
          allLinesInsideCell.push(line)
          continue
        }
        
        // line do not cross the cell boundaries, so can be whole inside the cell or outside
        if (
          isPointInPolygon(line.p1, cellLines)
          || isPointInPolygon(line.p2, cellLines)
        ) {
          allLinesInsideCell.push(line)
        }
      }

      const index = y * OBSTACLES_MAP_WIDTH + x

      // so there is crossed lines or/and inside the cell
      if (allLinesInsideCell.length > 0) {
        linesMap[index] = allLinesInsideCell
        continue
      }

      // need to check if cell is out or in the obstacles
      if (!isPointInPolygon(realCoordsPoint, obstacleLines)) {
        // is out of polygon, so it's disabled position
        linesMap[index] = []
      }
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
