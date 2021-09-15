import { IS_NOT_IN_OBSTACLE, MAP_HEIGHT, MAP_WIDTH, MATH_PI, MATH_PI_2, NORMAL_SQUAD_RADIUS, OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER, SQUAD_INSIDE_OBSTACLE, UNIT_INSIDE_OBSTACLE } from "./constants";
import { getId } from "./get-id";
import { Line, Point } from "./geom-types";
import { checkIntersection, isObstaclePointInPolygon, isPointInPolygon, isPointInPolygonLine } from "./geom-utils";

const OBSTACLES_MAP_WIDTH: i32 = Math.ceil(MAP_WIDTH / OBSTACLES_CELL_SIZE) as i32
const OBSTACLES_MAP_WIDTH_HALF: i32 = OBSTACLES_MAP_WIDTH / 2 as i32
const OBSTACLES_MAP_HEIGHT: i32 = Math.ceil(MAP_HEIGHT / OBSTACLES_CELL_SIZE) as i32
var obstaclesMap: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);
// null -> available position
// array.length === 0 -> disabled position
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

  // obstaclesMap.forEach(linesList => {
  //   trace("new cell========================")
    // if (linesList) {
      // obstacleLines.forEach(line => {
      //   trace("-------------", 4, line.p1.x, line.p1.y, line.p2.x, line.p2.y)
      // })
  //   } else {
  //     trace("---------null")
  //   }
  // })

  for (let y: i32 = 0; y < OBSTACLES_MAP_HEIGHT; y ++) {
    for (let x: i32 = 0; x < OBSTACLES_MAP_WIDTH; x ++) {
      const realCoordsPoint: Point = {
        x: (x as f32) * OBSTACLES_CELL_SIZE,
        y: (y as f32) * OBSTACLES_CELL_SIZE,
      }
      // trace("coords", 2, realCoordsPoint.x, realCoordsPoint.y)
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
        // trace("==================")
        // allLinesInsideCell.forEach(line => {
        //   trace("-------------", 4, line.p1.x, line.p1.y, line.p2.x, line.p2.y)
        // })
        obstaclesMap[index] = allLinesInsideCell
        continue
      }

      // need to check if cell is out or in the obstacles
      if (!isPointInPolygon(realCoordsPoint, obstacleLines)) {
        // is out of polygon, so it's disabled position
        obstaclesMap[index] = []
      }

    }

    // obstaclesMap.forEach(linesList => {
    //   trace("new cell========================")
    //   if (linesList) {
    //     linesList.forEach(line => {
    //       trace("-------------", 4, line.p1.x, line.p1.y, line.p2.x, line.p2.y)
    //     })
    //   } else {
    //     trace("---------null")
    //   }
    // })
  }

  trace("==================== collected data ====================")
  obstaclesMap.forEach(linesList => {
    trace("new cell========================")
    if (linesList) {
      linesList.forEach(line => {
        trace("-------------", 4, line.p1.x, line.p1.y, line.p2.x, line.p2.y)
      })
    } else {
      trace("---------null")
    }
  })

}


// var obstaclesMap: Array<Line[] | null> = new Array(OBSTACLES_MAP_WIDTH * OBSTACLES_MAP_HEIGHT);
// null -> no blocked position
// array.length === 0 -> blocked position
// array.length > 0 -> have to check if position is blocked


export function getIsPointAvailable(x: f32, y: f32, is_squad: bool): bool {
  /*=====CHECK IF SQUAD/UNIT IS NOT OUT OF THE MAP======*/
  // const boundaries_offset = is_squad
  //   ? NORMAL_SQUAD_RADIUS
  //   : 0

  // if (
  //   x < boundaries_offset
  //   || y < boundaries_offset
  //   || x >= MAP_WIDTH - boundaries_offset
  //   || y >= MAP_HEIGHT - boundaries_offset
  // ) {
  //   return true
  // }

  /*=====CHECK IF SQUAD/UNIT IS NOT ON THE OBSTACLES======*/

  // TODO: handle squads as well
  const cellX = x / OBSTACLES_CELL_SIZE as i32
  const index = Math.floor(y / OBSTACLES_CELL_SIZE) * (OBSTACLES_MAP_WIDTH as f32) + cellX as i32
  trace(
    "index",
    5,
    Math.floor(y / OBSTACLES_CELL_SIZE),
    Math.floor(y / OBSTACLES_CELL_SIZE) * (OBSTACLES_MAP_WIDTH as f32),
    cellX,
    index,
    obstaclesMap.length,
  )
  const linesList = obstaclesMap[index] // Index out of range

  if (!linesList) {
    trace("null")
    return true
  }
  if (linesList.length == 0) {
    trace("an empty array")
    return false
  }

  const line: Line = {
    p1: {
      x: cellX <= OBSTACLES_MAP_WIDTH_HALF ? -1 : MAP_WIDTH + 1,
      y,
    },
    p2: { x, y },
  }
  trace("xxx", 1, cellX <= OBSTACLES_MAP_WIDTH_HALF ? -1 : MAP_WIDTH + 1)
  trace("point", 2, x, y)

  linesList.forEach(line => {
    trace("line", 4, line.p1.x, line.p1.y, line.p2.x, line.p2.y)
  })
  return isPointInPolygonLine(line, linesList)
}
