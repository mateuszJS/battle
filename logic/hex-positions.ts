import { Point } from "./geom-types"
import { getIsPointInsideAnyObstacle } from "./obstacles-manager"

export var HEX_POSITIONS:StaticArray<StaticArray<Point>> = [[{ x: 0, y: 0 }],[{ x: 90, y: -156 },{ x: 180, y: 0 },{ x: 90, y: 156 },{ x: -90, y: 156 },{ x: -180, y: 0 },{ x: -90, y: -156 }],[{ x: 0, y: -312 },{ x: 180, y: -312 },{ x: 270, y: -156 },{ x: 360, y: 0 },{ x: 270, y: 156 },{ x: 180, y: 312 },{ x: 0, y: 312 },{ x: -180, y: 312 },{ x: -270, y: 156 },{ x: -360, y: 0 },{ x: -270, y: -156 },{ x: -180, y: -312 }],[{ x: 90, y: -468 },{ x: 270, y: -468 },{ x: 360, y: -312 },{ x: 450, y: -156 },{ x: 540, y: 0 },{ x: 450, y: 156 },{ x: 360, y: 312 },{ x: 270, y: 468 },{ x: 90, y: 468 },{ x: -90, y: 468 },{ x: -270, y: 468 },{ x: -360, y: 312 },{ x: -450, y: 156 },{ x: -540, y: 0 },{ x: -450, y: -156 },{ x: -360, y: -312 },{ x: -270, y: -468 },{ x: -90, y: -468 }],[{ x: 0, y: -624 },{ x: 180, y: -624 },{ x: 360, y: -624 },{ x: 450, y: -468 },{ x: 540, y: -312 },{ x: 630, y: -156 },{ x: 720, y: 0 },{ x: 630, y: 156 },{ x: 540, y: 312 },{ x: 450, y: 468 },{ x: 360, y: 624 },{ x: 180, y: 624 },{ x: 0, y: 624 },{ x: -180, y: 624 },{ x: -360, y: 624 },{ x: -450, y: 468 },{ x: -540, y: 312 },{ x: -630, y: 156 },{ x: -720, y: 0 },{ x: -630, y: -156 },{ x: -540, y: -312 },{ x: -450, y: -468 },{ x: -360, y: -624 },{ x: -180, y: -624 }],[{ x: 90, y: -780 },{ x: 270, y: -780 },{ x: 450, y: -780 },{ x: 540, y: -624 },{ x: 630, y: -468 },{ x: 720, y: -312 },{ x: 810, y: -156 },{ x: 900, y: 0 },{ x: 810, y: 156 },{ x: 720, y: 312 },{ x: 630, y: 468 },{ x: 540, y: 624 },{ x: 450, y: 780 },{ x: 270, y: 780 },{ x: 90, y: 780 },{ x: -90, y: 780 },{ x: -270, y: 780 },{ x: -450, y: 780 },{ x: -540, y: 624 },{ x: -630, y: 468 },{ x: -720, y: 312 },{ x: -810, y: 156 },{ x: -900, y: 0 },{ x: -810, y: -156 },{ x: -720, y: -312 },{ x: -630, y: -468 },{ x: -540, y: -624 },{ x: -450, y: -780 },{ x: -270, y: -780 },{ x: -90, y: -780 }],[{ x: 0, y: -936 },{ x: 180, y: -936 },{ x: 360, y: -936 },{ x: 540, y: -936 },{ x: 630, y: -780 },{ x: 720, y: -624 },{ x: 810, y: -468 },{ x: 900, y: -312 },{ x: 990, y: -156 },{ x: 1080, y: 0 },{ x: 990, y: 156 },{ x: 900, y: 312 },{ x: 810, y: 468 },{ x: 720, y: 624 },{ x: 630, y: 780 },{ x: 540, y: 936 },{ x: 360, y: 936 },{ x: 180, y: 936 },{ x: 0, y: 936 },{ x: -180, y: 936 },{ x: -360, y: 936 },{ x: -540, y: 936 },{ x: -630, y: 780 },{ x: -720, y: 624 },{ x: -810, y: 468 },{ x: -900, y: 312 },{ x: -990, y: 156 },{ x: -1080, y: 0 },{ x: -990, y: -156 },{ x: -900, y: -312 },{ x: -810, y: -468 },{ x: -720, y: -624 },{ x: -630, y: -780 },{ x: -540, y: -936 },{ x: -360, y: -936 },{ x: -180, y: -936 }],[{ x: 90, y: -1092 },{ x: 270, y: -1092 },{ x: 450, y: -1092 },{ x: 630, y: -1092 },{ x: 720, y: -936 },{ x: 810, y: -780 },{ x: 900, y: -624 },{ x: 990, y: -468 },{ x: 1080, y: -312 },{ x: 1170, y: -156 },{ x: 1260, y: 0 },{ x: 1170, y: 156 },{ x: 1080, y: 312 },{ x: 990, y: 468 },{ x: 900, y: 624 },{ x: 810, y: 780 },{ x: 720, y: 936 },{ x: 630, y: 1092 },{ x: 450, y: 1092 },{ x: 270, y: 1092 },{ x: 90, y: 1092 },{ x: -90, y: 1092 },{ x: -270, y: 1092 },{ x: -450, y: 1092 },{ x: -630, y: 1092 },{ x: -720, y: 936 },{ x: -810, y: 780 },{ x: -900, y: 624 },{ x: -990, y: 468 },{ x: -1080, y: 312 },{ x: -1170, y: 156 },{ x: -1260, y: 0 },{ x: -1170, y: -156 },{ x: -1080, y: -312 },{ x: -990, y: -468 },{ x: -900, y: -624 },{ x: -810, y: -780 },{ x: -720, y: -936 },{ x: -630, y: -1092 },{ x: -450, y: -1092 },{ x: -270, y: -1092 },{ x: -90, y: -1092 }],[{ x: 0, y: -1248 },{ x: 180, y: -1248 },{ x: 360, y: -1248 },{ x: 540, y: -1248 },{ x: 720, y: -1248 },{ x: 810, y: -1092 },{ x: 900, y: -936 },{ x: 990, y: -780 },{ x: 1080, y: -624 },{ x: 1170, y: -468 },{ x: 1260, y: -312 },{ x: 1350, y: -156 },{ x: 1440, y: 0 },{ x: 1350, y: 156 },{ x: 1260, y: 312 },{ x: 1170, y: 468 },{ x: 1080, y: 624 },{ x: 990, y: 780 },{ x: 900, y: 936 },{ x: 810, y: 1092 },{ x: 720, y: 1248 },{ x: 540, y: 1248 },{ x: 360, y: 1248 },{ x: 180, y: 1248 },{ x: 0, y: 1248 },{ x: -180, y: 1248 },{ x: -360, y: 1248 },{ x: -540, y: 1248 },{ x: -720, y: 1248 },{ x: -810, y: 1092 },{ x: -900, y: 936 },{ x: -990, y: 780 },{ x: -1080, y: 624 },{ x: -1170, y: 468 },{ x: -1260, y: 312 },{ x: -1350, y: 156 },{ x: -1440, y: 0 },{ x: -1350, y: -156 },{ x: -1260, y: -312 },{ x: -1170, y: -468 },{ x: -1080, y: -624 },{ x: -990, y: -780 },{ x: -900, y: -936 },{ x: -810, y: -1092 },{ x: -720, y: -1248 },{ x: -540, y: -1248 },{ x: -360, y: -1248 },{ x: -180, y: -1248 }],[{ x: 90, y: -1404 },{ x: 270, y: -1404 },{ x: 450, y: -1404 },{ x: 630, y: -1404 },{ x: 810, y: -1404 },{ x: 900, y: -1248 },{ x: 990, y: -1092 },{ x: 1080, y: -936 },{ x: 1170, y: -780 },{ x: 1260, y: -624 },{ x: 1350, y: -468 },{ x: 1440, y: -312 },{ x: 1530, y: -156 },{ x: 1620, y: 0 },{ x: 1530, y: 156 },{ x: 1440, y: 312 },{ x: 1350, y: 468 },{ x: 1260, y: 624 },{ x: 1170, y: 780 },{ x: 1080, y: 936 },{ x: 990, y: 1092 },{ x: 900, y: 1248 },{ x: 810, y: 1404 },{ x: 630, y: 1404 },{ x: 450, y: 1404 },{ x: 270, y: 1404 },{ x: 90, y: 1404 },{ x: -90, y: 1404 },{ x: -270, y: 1404 },{ x: -450, y: 1404 },{ x: -630, y: 1404 },{ x: -810, y: 1404 },{ x: -900, y: 1248 },{ x: -990, y: 1092 },{ x: -1080, y: 936 },{ x: -1170, y: 780 },{ x: -1260, y: 624 },{ x: -1350, y: 468 },{ x: -1440, y: 312 },{ x: -1530, y: 156 },{ x: -1620, y: 0 },{ x: -1530, y: -156 },{ x: -1440, y: -312 },{ x: -1350, y: -468 },{ x: -1260, y: -624 },{ x: -1170, y: -780 },{ x: -1080, y: -936 },{ x: -990, y: -1092 },{ x: -900, y: -1248 },{ x: -810, y: -1404 },{ x: -630, y: -1404 },{ x: -450, y: -1404 },{ x: -270, y: -1404 },{ x: -90, y: -1404 }],[{ x: 0, y: -1560 },{ x: 180, y: -1560 },{ x: 360, y: -1560 },{ x: 540, y: -1560 },{ x: 720, y: -1560 },{ x: 900, y: -1560 },{ x: 990, y: -1404 },{ x: 1080, y: -1248 },{ x: 1170, y: -1092 },{ x: 1260, y: -936 },{ x: 1350, y: -780 },{ x: 1440, y: -624 },{ x: 1530, y: -468 },{ x: 1620, y: -312 },{ x: 1710, y: -156 },{ x: 1800, y: 0 },{ x: 1710, y: 156 },{ x: 1620, y: 312 },{ x: 1530, y: 468 },{ x: 1440, y: 624 },{ x: 1350, y: 780 },{ x: 1260, y: 936 },{ x: 1170, y: 1092 },{ x: 1080, y: 1248 },{ x: 990, y: 1404 },{ x: 900, y: 1560 },{ x: 720, y: 1560 },{ x: 540, y: 1560 },{ x: 360, y: 1560 },{ x: 180, y: 1560 },{ x: 0, y: 1560 },{ x: -180, y: 1560 },{ x: -360, y: 1560 },{ x: -540, y: 1560 },{ x: -720, y: 1560 },{ x: -900, y: 1560 },{ x: -990, y: 1404 },{ x: -1080, y: 1248 },{ x: -1170, y: 1092 },{ x: -1260, y: 936 },{ x: -1350, y: 780 },{ x: -1440, y: 624 },{ x: -1530, y: 468 },{ x: -1620, y: 312 },{ x: -1710, y: 156 },{ x: -1800, y: 0 },{ x: -1710, y: -156 },{ x: -1620, y: -312 },{ x: -1530, y: -468 },{ x: -1440, y: -624 },{ x: -1350, y: -780 },{ x: -1260, y: -936 },{ x: -1170, y: -1092 },{ x: -1080, y: -1248 },{ x: -990, y: -1404 },{ x: -900, y: -1560 },{ x: -720, y: -1560 },{ x: -540, y: -1560 },{ x: -360, y: -1560 },{ x: -180, y: -1560 }]]
/*
class HexPoint extends Point {
  location: u8
}

const TRIANGLE_BASE_WIDTH: f32 = 180
const TRIANGLE_HEIGHT: f32 = 156

function propagateLocation(origin: HexPoint): HexPoint[] {
  switch (origin.location) {
    case 0: return [
      { location: 0, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
    ]
    case 1: return [
      { location: 1, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
      { location: 2, x: origin.x + TRIANGLE_BASE_WIDTH, y: origin.y },
    ]
    case 2: return [
      { location: 2, x: origin.x + TRIANGLE_BASE_WIDTH, y: origin.y },
    ]
    case 3: return [
      { location: 2, x: origin.x + TRIANGLE_BASE_WIDTH, y: origin.y },
      { location: 3, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
    ]
    case 4: return [
      { location: 4, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
    ]
    case 5: return [
      { location: 4, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
      { location: 5, x: origin.x - TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
      { location: 7, x: origin.x - TRIANGLE_BASE_WIDTH, y: origin.y },
    ]
    case 6: return [
      { location: 1, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
      { location: 2, x: origin.x + TRIANGLE_BASE_WIDTH, y: origin.y },
      { location: 3, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
      { location: 5, x: origin.x - TRIANGLE_BASE_WIDTH / 2, y: origin.y + TRIANGLE_HEIGHT },
      { location: 7, x: origin.x - TRIANGLE_BASE_WIDTH, y: origin.y },
      { location: 8, x: origin.x - TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
    ]
    case 7: return [
      { location: 7, x: origin.x - TRIANGLE_BASE_WIDTH, y: origin.y },
    ]
    case 8: return [
      { location: 7, x: origin.x - TRIANGLE_BASE_WIDTH, y: origin.y },
      { location: 8, x: origin.x - TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
      { location: 0, x: origin.x + TRIANGLE_BASE_WIDTH / 2, y: origin.y - TRIANGLE_HEIGHT },
    ]
    default: return []
  }
}
*/


/*
const TRIANGLE_BASE_WIDTH = 180
const TRIANGLE_HEIGHT = 156
const NUMBER_OF_RANGE_BREAKPOINTS = 10

function getAllHexes() {
  let results = []
  for (let i = 0; i <= NUMBER_OF_RANGE_BREAKPOINTS; i++) {
    results.push(getHexPositions(i === 0 ? 1 : Infinity, 0, 0, i))
  }
  return `[${results.join()}]`
}

function getHexPositions(
  number_of_needed_position,
  center_x,
  center_y,
  multiple_range_factor,
) {
  const curr_x_edge = multiple_range_factor * TRIANGLE_BASE_WIDTH
  const prev_x_edge = curr_x_edge / 2
  const initial_offset_x = multiple_range_factor % 2 == 1
    ? -TRIANGLE_BASE_WIDTH / 2
    : -TRIANGLE_BASE_WIDTH
  let state = 0
  let offset_y = -multiple_range_factor * TRIANGLE_HEIGHT
  let mod_offset_x = TRIANGLE_BASE_WIDTH
  let offset_x = initial_offset_x
  let mod_offset_y = 0
  let points = []

  while (points.length < number_of_needed_position) {
    offset_x += mod_offset_x
    offset_y += mod_offset_y

    points.push(`{ x: ${center_x + offset_x}, y: ${center_y + offset_y} }`)
    

    if (state == 0 && offset_x == prev_x_edge) {
      mod_offset_x = TRIANGLE_BASE_WIDTH / 2
      mod_offset_y = TRIANGLE_HEIGHT
      state = 1
      continue
    }

    if (state == 1 && offset_x == curr_x_edge) {
      mod_offset_x = -TRIANGLE_BASE_WIDTH / 2
      state = 2
      continue
    }

    if (state == 2 && offset_x == prev_x_edge) {
      mod_offset_x = -TRIANGLE_BASE_WIDTH
      mod_offset_y = 0
      state = 3
      continue
    }

    if (state == 3 && offset_x == -prev_x_edge) {
      mod_offset_x = -TRIANGLE_BASE_WIDTH / 2
      mod_offset_y = -TRIANGLE_HEIGHT
      state = 4
      continue
    }

    if (state == 4 && offset_x == -curr_x_edge) {
      mod_offset_x = TRIANGLE_BASE_WIDTH / 2
      state = 5
      continue
    }

    if (state == 5 && offset_x == -prev_x_edge) {
      mod_offset_x = TRIANGLE_BASE_WIDTH
      mod_offset_y = 0
      state = 6
      // only when multiple_range_factor <= 2 (because then there is no point between
      // last point and start point,so there is no iterator to go from state 6 -> 7)
      if (offset_x >= initial_offset_x) {
        break
      }
      continue
    }

    if (state == 6 && offset_x == initial_offset_x) {
      break
    }
  }

  return `[${points.join()}]`
}
*/

export function getSquadPositions(
  number_of_needed_position: i32,
  centerX: f32,
  centerY: f32,
): Point[] {
  let points: Point[] = []

  for (let i = 0; i < HEX_POSITIONS.length; i++) {
    const positionsList = HEX_POSITIONS[i]
    for (let j = 0; j < positionsList.length; j++) {
      const position = positionsList[j]
      if (!getIsPointInsideAnyObstacle(position.x + centerX, position.y + centerY, true)) {
        points.push({
          x: position.x + centerX,
          y: position.y + centerY,
        })
      }

      if (points.length == number_of_needed_position) {
        return points
      }
    }
  }

  // TODO: not enough positions!

  return points
}
// export function getSquadPositions(
//   number_of_needed_position: i32,
//   centerX: f32,
//   centerY: f32,
// ): Point[] {
//   let validHexes: HexPoint[] = []
//   let invalidHexes: HexPoint[] = []

//   const hexArrToPutFirstHex = getIsPointInsideAnyObstacle(centerX, centerY, true)
//     ? invalidHexes
//     : validHexes;
//   hexArrToPutFirstHex.push({ location: 6, x: centerX, y: centerY })

//   let lastVisitedValidHexIndex: i32 = 0
//   let lastVisitedInvalidHexIndex: i32 = 0

//   while (validHexes.length < number_of_needed_position) {
//     let nextHexes: HexPoint[] = []
//     if (lastVisitedValidHexIndex == validHexes.length) {
//       nextHexes = propagateLocation(invalidHexes[lastVisitedInvalidHexIndex])
//       lastVisitedInvalidHexIndex ++
//     } else {
//       nextHexes = propagateLocation(validHexes[lastVisitedValidHexIndex])
//       lastVisitedValidHexIndex ++
//     }
    
//     for (let i = 0; i < nextHexes.length; i++) {
//       if (getIsPointInsideAnyObstacle(nextHexes[i].x, nextHexes[i].y, true)) {
//         invalidHexes.push(nextHexes[i])
//       } else {
//         validHexes.push(nextHexes[i])
//       }
//     }
//   }

//   return validHexes.map<Point>(hex => ({ x: hex.x, y: hex.y }))
// }