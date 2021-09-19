import { NORMAL_SQUAD_RADIUS, USER_FACTION_ID } from "../../logic/constants"
import { SerializedMapInfo } from "../map-creator"
import getPlatformCoords from '~/consts/get-platform-coords'
import getPortalCoords from '~/consts/get-portal-coords'
import getBridgesInnerTrack from './get-bridges-inner-track'
import getObstaclesInnerTrack from './get-obstacles-inner-track'
import getSerializedObstacles from './get-serialized-obstacles'

const getSerializedWorldInfo = (
  serializedMapInfo: SerializedMapInfo,
) => {
  const serializedFactions = new Float32Array(
    serializedMapInfo.portals.map((graphic, index) => 
      [USER_FACTION_ID + index, graphic.x, graphic.y, 0]
    ).flat()
  )

  const serializedObstacles = getSerializedObstacles(
    serializedMapInfo.nodes,
    serializedMapInfo.connections,
    serializedMapInfo.portals,
    0,
  )
  const serializedTrackOuter = getSerializedObstacles(
    serializedMapInfo.nodes,
    serializedMapInfo.connections,
    serializedMapInfo.portals,
    NORMAL_SQUAD_RADIUS - 5,
  )
  const bridgesInnerTrack = getBridgesInnerTrack(
    serializedMapInfo.connections,
    getPlatformCoords(NORMAL_SQUAD_RADIUS, 0.1),
  )
  const obstaclesInnerTrack = getObstaclesInnerTrack(
    serializedMapInfo.portals,
    NORMAL_SQUAD_RADIUS,
  )
  const serializedTrackInner = new Float32Array(
    [...bridgesInnerTrack, ...obstaclesInnerTrack].map(
      point => point === null ? -1 : [point.x, point.y]
    ).flat()
  )

  return {
    factions: window.getFloat32ArrayPointer(serializedFactions),
    obstacles: window.getFloat32ArrayPointer(serializedObstacles),
    blockingTrackPoints: window.getFloat32ArrayPointer(serializedTrackOuter),
    rawTrackPoints: window.getFloat32ArrayPointer(serializedTrackInner),
    bridgeSecondToLastPointIndex: bridgesInnerTrack.length - 1,
  }
}

export default getSerializedWorldInfo
