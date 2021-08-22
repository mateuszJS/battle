import { IS_NOT_IN_OBSTACLE, MAP_HEIGHT, MAP_WIDTH, MATH_PI_2, NORMAL_SQUAD_RADIUS, OBSTACLES_CELL_SIZE, OBSTACLES_DIVIDER, SQUAD_INSIDE_OBSTACLE, UNIT_INSIDE_OBSTACLE } from "./constants";
import { getId } from "./get-id";
import { Line, Point } from "./geom-types";
import { isPointInPolygon } from "./geom-utils";

class ObstaclePoint extends Point {
  id: u32
}

export var obstacles: ObstaclePoint[][] = [[]];
export var obstaclesMap: u8[] = [];

const OBSTACLES_MAP_WIDTH: f32 = MAP_WIDTH / OBSTACLES_CELL_SIZE

export function storeObstacles(data: Float32Array): void {
  let obstacleIndex: i32 = 0
  let i: i32 = 0;

  while (i < data.length) {
    if (unchecked(data[i]) == OBSTACLES_DIVIDER) {
      obstacles.push([])
      obstacleIndex ++
      i ++
    } else {
      obstacles[obstacleIndex].push({
        id: getId(),
        x: unchecked(data[i]),
        y: unchecked(data[i + 1]),
      })
      i += 2
    }
  }
}

export function calculateObstaclesMap(): void {
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
  const obstacleLines: Line[] = []
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i]
    for (let j = 0; j < obstacle.length; j++) {
      obstacleLines.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }

  for (let y: f32 = 0; y < MAP_HEIGHT; y += OBSTACLES_CELL_SIZE) {
      for (let x: f32 = 0; x < MAP_WIDTH; x += OBSTACLES_CELL_SIZE) {

      let unit_will_collide_with_any_obstacle = false
      for (let i = 0; i < check_cell_corners.length; i++) {
        const point = check_cell_corners[i]
        if (
          isPointInPolygon(
            { x: x + point.x, y: y + point.y },
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
          isPointInPolygon(
            { x: x + point.x, y: y + point.y },
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
  const index = Math.floor(y / OBSTACLES_CELL_SIZE) * OBSTACLES_MAP_WIDTH + x / OBSTACLES_CELL_SIZE as i32
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