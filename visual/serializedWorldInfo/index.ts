import { NORMAL_SQUAD_RADIUS, USER_FACTION_ID } from "../../logic/constants"
import { SerializedMapInfo } from "../map-creator/get-serialized-map-info"
import getPlatformCoords from '~/consts/get-platform-coords'
import getPortalCoords from '~/consts/get-portal-coords'
import getBridgesInnerTrack from './get-bridges-inner-track'
import getObstaclesInnerTrack from './get-obstacles-inner-track'
import getSerializedObstacles from './get-serialized-obstacles'
import { WasmModule } from "~/initGame"

const getSerializedWorldInfo = (
  serializedMapInfo: SerializedMapInfo,
  wasmModule: WasmModule,
) => {
  const serializedFactions = new Float32Array(
    serializedMapInfo.portals.map((portal, index) => 
      [USER_FACTION_ID + index, portal.x, portal.y, portal.angle]
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

  const serializedWorldInfo = {
    factions: wasmModule.__pin(window.getFloat32ArrayPointer(serializedFactions)),
    obstacles: wasmModule.__pin(window.getFloat32ArrayPointer(serializedObstacles)),
    blockingTrackPoints: wasmModule.__pin(window.getFloat32ArrayPointer(serializedTrackOuter)),
    rawTrackPoints: wasmModule.__pin(window.getFloat32ArrayPointer(serializedTrackInner)),
    bridgeSecondToLastPointIndex: bridgesInnerTrack.length - 1,
  }

  const unpinAllInfo = () => {
    wasmModule.__unpin(serializedWorldInfo.factions)
    wasmModule.__unpin(serializedWorldInfo.obstacles)
    wasmModule.__unpin(serializedWorldInfo.blockingTrackPoints)
    wasmModule.__unpin(serializedWorldInfo.rawTrackPoints)
  }

  return {
    serializedWorldInfo,
    unpinAllInfo,
  }
}

export default getSerializedWorldInfo
