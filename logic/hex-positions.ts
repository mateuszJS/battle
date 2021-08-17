import { Point } from "./geom-types"

export var HEX_POSITIONS:StaticArray<StaticArray<Point>> = [[{ x: 90, y: -156 },{ x: 180, y: 0 },{ x: 90, y: 156 },{ x: -90, y: 156 },{ x: -180, y: 0 },{ x: -90, y: -156 }],[{ x: 0, y: -312 },{ x: 180, y: -312 },{ x: 270, y: -156 },{ x: 360, y: 0 },{ x: 270, y: 156 },{ x: 180, y: 312 },{ x: 0, y: 312 },{ x: -180, y: 312 },{ x: -270, y: 156 },{ x: -360, y: 0 },{ x: -270, y: -156 },{ x: -180, y: -312 }],[{ x: 90, y: -468 },{ x: 270, y: -468 },{ x: 360, y: -312 },{ x: 450, y: -156 },{ x: 540, y: 0 },{ x: 450, y: 156 },{ x: 360, y: 312 },{ x: 270, y: 468 },{ x: 90, y: 468 },{ x: -90, y: 468 },{ x: -270, y: 468 },{ x: -360, y: 312 },{ x: -450, y: 156 },{ x: -540, y: 0 },{ x: -450, y: -156 },{ x: -360, y: -312 },{ x: -270, y: -468 },{ x: -90, y: -468 }],[{ x: 0, y: -624 },{ x: 180, y: -624 },{ x: 360, y: -624 },{ x: 450, y: -468 },{ x: 540, y: -312 },{ x: 630, y: -156 },{ x: 720, y: 0 },{ x: 630, y: 156 },{ x: 540, y: 312 },{ x: 450, y: 468 },{ x: 360, y: 624 },{ x: 180, y: 624 },{ x: 0, y: 624 },{ x: -180, y: 624 },{ x: -360, y: 624 },{ x: -450, y: 468 },{ x: -540, y: 312 },{ x: -630, y: 156 },{ x: -720, y: 0 },{ x: -630, y: -156 },{ x: -540, y: -312 },{ x: -450, y: -468 },{ x: -360, y: -624 },{ x: -180, y: -624 }],[{ x: 90, y: -780 },{ x: 270, y: -780 },{ x: 450, y: -780 },{ x: 540, y: -624 },{ x: 630, y: -468 },{ x: 720, y: -312 },{ x: 810, y: -156 },{ x: 900, y: 0 },{ x: 810, y: 156 },{ x: 720, y: 312 },{ x: 630, y: 468 },{ x: 540, y: 624 },{ x: 450, y: 780 },{ x: 270, y: 780 },{ x: 90, y: 780 },{ x: -90, y: 780 },{ x: -270, y: 780 },{ x: -450, y: 780 },{ x: -540, y: 624 },{ x: -630, y: 468 },{ x: -720, y: 312 },{ x: -810, y: 156 },{ x: -900, y: 0 },{ x: -810, y: -156 },{ x: -720, y: -312 },{ x: -630, y: -468 },{ x: -540, y: -624 },{ x: -450, y: -780 },{ x: -270, y: -780 },{ x: -90, y: -780 }]]

/*
const NORMAL_SQUAD_RADIUS = 60
const MAX_POSSIBLE_WEAPON_RANGE = 600

const TRIANGLE_BASE_WIDTH = 180
const TRIANGLE_HEIGHT = 156

const DISTANCE_BETWEEN_ATTACKERS = 2.0 * NORMAL_SQUAD_RADIUS
const NUMBER_OF_RANGE_BREAKPOINTS = Math.floor(MAX_POSSIBLE_WEAPON_RANGE / DISTANCE_BETWEEN_ATTACKERS)

function getAllHexes() {
  let results = []
  for (let i = 1; i <= NUMBER_OF_RANGE_BREAKPOINTS; i++) {
    results.push(getHexPositions(Infinity, 0, 0, i))
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
  x: f32,
  y: f32,
): Point[] {
  let multiple_radius: i16 = 0
  // let last_visited_result_point_index: i32 = -1
  let results: Point[] = [{ x, y }]

  // let initial_point = { x, y }
  // if !CalcPositions::get_is_point_inside_any_obstacle(initial_point, true) {
  // results.push(initial_point)
  // last_visited_result_point_index += 1
  // }

  while (results.length < number_of_needed_position) {
    // let center = results.length == 0
    //   ? initial_point
    //   : results[last_visited_result_point_index]

    const hexes = HEX_POSITIONS[multiple_radius]
    // let positions: Point[] = []
    for (let i = 0; i < hexes.length; i++) {
      results.push({
        x: hexes[i].x + x,
        y: hexes[i].y + y,
      })
    }
    multiple_radius = (multiple_radius + 1) % (HEX_POSITIONS.length as i16)
    // CalcPositions::get_hex_circle_position(
    //   number_of_needed_position - results.length,
    //   center.x,
    //   center.y,
    //   multiple_radius,
    //   &results,
    // );
    // results = results.concat(positions);

    // if (last_visited_result_point_index == results.length - 1) {
    //   if (last_visited_result_point_index != -1) {
    //     last_visited_result_point_index = 0;
    //   }
    //   multiple_radius += 1;
    // } else {
    //   last_visited_result_point_index += 1;
    // }
  }

  return results
}