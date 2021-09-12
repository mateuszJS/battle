import { IS_NOT_IN_OBSTACLE, MAP_HEIGHT, MAP_WIDTH, MATH_PI, MATH_PI_2, NORMAL_SQUAD_RADIUS, OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER, SQUAD_INSIDE_OBSTACLE, UNIT_INSIDE_OBSTACLE } from "./constants";
import { getId } from "./get-id";
import { Line, Point } from "./geom-types";
import { checkIntersection, isObstaclePointInPolygon, isPointInPolygon } from "./geom-utils";

const OBSTACLES_MAP_WIDTH: i32 = Math.ceil(MAP_WIDTH / OBSTACLES_CELL_SIZE) as i32
const OBSTACLES_MAP_WIDTH_HALF: i32 = OBSTACLES_MAP_WIDTH / 2 as i32
const OBSTACLES_MAP_HEIGHT: i32 = Math.ceil(MAP_HEIGHT / OBSTACLES_CELL_SIZE) as i32
var obstaclesMap: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);
// null -> no blocked position
// array.length === 0 -> blocked position
// array.length > 0 -> have to check if position is blocked

export function storeObstacles(data: Float32Array): void {
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

  for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
    for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {
      const realCoordsPoint: Point = {
        x: (x as f32) / OBSTACLES_CELL_SIZE,
        y: (y as f32) / OBSTACLES_CELL_SIZE,
      }

      const cellPoints: Point[] = [
        realCoordsPoint,
        {
          x: realCoordsPoint.x + OBSTACLES_CELL_SIZE,
          y: realCoordsPoint.y,
        },
        {
          x: realCoordsPoint.x,
          y: realCoordsPoint.y + OBSTACLES_CELL_SIZE,
        },
        {
          x: realCoordsPoint.x + OBSTACLES_CELL_SIZE,
          y: realCoordsPoint.y + OBSTACLES_CELL_SIZE,
        },
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
        obstaclesMap[index] = allLinesInsideCell
        continue
      }

      // need to check if cell is out or in the obstacles
      if (!isPointInPolygon(realCoordsPoint, obstacleLines)) {
        // is out of polygon, so it's disabled position
        obstaclesMap[index] = []
      }

    }

    // we should also push here ALL the lines for the all cells which are between closest map boundary and this cell

    // from the left:
    for (let x = 1; x <= OBSTACLES_MAP_WIDTH_HALF; x++) {
      const index = y * OBSTACLES_MAP_WIDTH + x
      const lineList = obstaclesMap[index]
      if (lineList && lineList.length > 0) { // remember that it can be null!
        // and length == 0, should stay 0

        let indexOfPrevious = index - 1
        const minPrevIndex = y * OBSTACLES_MAP_WIDTH + 0
        let prevLineList: Line[] | null = null
        while (true) {
          const _prevLineList = obstaclesMap[indexOfPrevious]
          if (
            _prevLineList
            && _prevLineList.length > 0
          ) {
            prevLineList = _prevLineList
            break
          }
          indexOfPrevious --
          if (x < minPrevIndex) break
        }
        // obstaclesMap[prevIndex] can be null as well!
        // but also length == 0 should stay the same!

        if (prevLineList) {
          obstaclesMap[index] = lineList.concat(prevLineList)
        }
      }
    }
    // from the right:
    // -1 because last cell in a row has index OBSTACLES_MAP_WIDTH - 1
    // plus additional -1 (so -2) because very last cell is actually on the edge of the map
    for (let x = OBSTACLES_MAP_WIDTH - 2; x > OBSTACLES_MAP_WIDTH_HALF; x--) {
      const index = y * OBSTACLES_MAP_WIDTH + x
      const lineList = obstaclesMap[index]
      if (lineList && lineList.length > 0) { // remember that it can be null!
        // and length == 0, should stay 0

        let indexOfNext = index + 1
        const minNextIndex = y * OBSTACLES_MAP_WIDTH + (OBSTACLES_MAP_WIDTH - 1)
        let nextLineList: Line[] | null = null
        while (true) {
          const _nextLineList = obstaclesMap[indexOfNext]
          if (
            _nextLineList
            && _nextLineList.length > 0
          ) {
            nextLineList = _nextLineList
            break
          }
          indexOfNext --
          if (x > minNextIndex) break
        }
        // obstaclesMap[prevIndex] can be null as well!
        // but also length == 0 should stay the same!

        if (nextLineList) {
          obstaclesMap[index] = lineList.concat(nextLineList)
        }
      }
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
  const cellX = x / OBSTACLES_CELL_SIZE as i32
  const index = Math.floor(y / OBSTACLES_CELL_SIZE) * (OBSTACLES_MAP_WIDTH as f32) + cellX as i32
  const linesList = obstaclesMap[index]

  if (!linesList) return false
  if (linesList.length == 0) return true
  return !isPointInPolygon(
    {
      x: cellX <= OBSTACLES_MAP_WIDTH_HALF ? -1 : MAP_WIDTH + 1,
      y,
    },
    linesList,
  )
}
