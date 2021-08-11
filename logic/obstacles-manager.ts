import { OBSTACLES_DIVIDER } from "./constants";
import { getId } from "./get-id";
import { Point } from "./geom-types";

class ObstaclePoint extends Point {
  id: u32
}

var obstacles: ObstaclePoint[][] = [[]];

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

export function getObstacles(): ObstaclePoint[][] {
  return obstacles
}