import { NORMAL_SQUAD_RADIUS } from "./constants";
import { Squad } from "./squad";

export function getInitialTrackIndex(currentIndex: i8, x: f32, y: f32, squad: Squad): i8 {
  const distanceUnitFromSquadCenter = Mathf.hypot(
    x - squad.centerPoint.x,
    y - squad.centerPoint.y,
  )

  if (distanceUnitFromSquadCenter < NORMAL_SQUAD_RADIUS * 1.2 && currentIndex == 0) {
    return 1
  } else {
    const doesNextPointExist = (squad.track.length as i8) != currentIndex + 1
    if (doesNextPointExist) {
      if (/* check if can go to the next point */ true) {
        return currentIndex + 1
      }
    }
    return currentIndex
  }
}