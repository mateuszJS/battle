import { NORMAL_SQUAD_RADIUS } from "./constants";
import { Point } from "./geom-types";
import { SquadType, SQUAD_DETAILS } from "./squad-details";
import { MAX_POSSIBLE_WEAPON_RANGE } from "./weapon-details";

export const DISTANCE_BETWEEN_ATTACKERS: f32 = 2 * (NORMAL_SQUAD_RADIUS + SQUAD_DETAILS.get(SquadType.Squad).unitRadius)
const NUMBER_OF_RANGE_BREAKPOINTS: i32 = Mathf.ceil(MAX_POSSIBLE_WEAPON_RANGE / DISTANCE_BETWEEN_ATTACKERS) as i32
export var PRECALCULATED_ATTACKERS_POSITIONS: Point[][] = []

function sortAttackerPositions(points: Point[], maxDistance: f32): void {
  let done = false
  while (!done) {
    done = true
    for (let i = 1; i < points.length; i += 1) {
      const pointA = points[i - 1]
      const pointB = points[i]
      const a_x = Mathf.sin(pointA.x) * pointA.y
      const a_y = Mathf.cos(-pointA.x) * pointA.y
      const b_x = Mathf.sin(pointB.x) * pointB.y
      const b_y = Mathf.cos(-pointB.x) * pointB.y
      const a_dis = Mathf.hypot(a_x, a_y + maxDistance) // a_y - (-ATTACKERS_DISTANCE)
      const b_dis = Mathf.hypot(b_x, b_y + maxDistance)

      if (a_dis < b_dis) {
        done = false;
        const tmp = points[i - 1]
        points[i - 1] = points[i]
        points[i] = tmp
      }
    }
  }
}

for (let i = 1; i <= NUMBER_OF_RANGE_BREAKPOINTS; i++) {
  const max_distance = i as f32 * DISTANCE_BETWEEN_ATTACKERS
  let distance = max_distance
  let positions: Point[] = []

  while (distance > DISTANCE_BETWEEN_ATTACKERS / 2) {
    const diffAngle =
      Mathf.acos(
        1.0 - (
          (DISTANCE_BETWEEN_ATTACKERS * DISTANCE_BETWEEN_ATTACKERS) / (2.0 * (distance * distance))
        )
      )
    let multipleBy: f32 = 0

    while (Mathf.abs(multipleBy * diffAngle) < Mathf.PI - diffAngle / 2.0) {
      positions.push({
        x: multipleBy * diffAngle,
        y: distance,
      })

      if (multipleBy > 0) {
        multipleBy = -multipleBy
      } else {
        multipleBy = 1.0 - multipleBy
      }
    }
    distance -= DISTANCE_BETWEEN_ATTACKERS;
  }

  sortAttackerPositions(positions, max_distance)

  PRECALCULATED_ATTACKERS_POSITIONS.push(positions)
}
