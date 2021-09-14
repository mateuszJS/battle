import { AdvancePoint } from "~/map-creator"
import getPortalCoords from '~/consts/get-portal-coords'

const getObstaclesInnerTrack = (
  portals: AdvancePoint[],
  distanceOffset: number,
): Point[] => (
  portals
    .map(portal => getPortalCoords(portal.x, portal.y, portal.angle, distanceOffset))
    .flat()
)

export default getObstaclesInnerTrack