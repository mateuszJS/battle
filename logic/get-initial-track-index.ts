import { NORMAL_SQUAD_RADIUS } from "./constants";
import { Squad } from "./squad";

export function getInitialTrackIndex(currentIndex: usize, x: f32, y: f32, squad: Squad): usize {
  let distanceUnitFromSquadCenter = Math.hypot(
    x - squad.centerPoint.x,
    y - squad.centerPoint.y,
  )

  if (distanceUnitFromSquadCenter < NORMAL_SQUAD_RADIUS * 1.1 && currentIndex == 0) {
    return 1
  } else {
    let doesNextPointExist = squad.track.length !== currentIndex + 1
    if (doesNextPointExist) {
      if (/* check if can go to the next point */ true) {
        return currentIndex + 1
      }
    }
    return currentIndex
  }
}