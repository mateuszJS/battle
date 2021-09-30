import { OBSTACLES_DIVIDER } from "./constants"
import { Line, Point } from "./geom-types"
import { checkIntersection } from "./geom-utils"
import { getId } from "./get-id"
import { UniqueLine, UniquePoint } from "./geom-types"

export var trackPoints: UniquePoint[] = []
export var blockingTrackLines: Line[] = [] // exported just because of debugging
export var permanentObstaclesGraph: Map<u32, UniquePoint[]> = new Map()

export function getTrack(startPoint: Point, endPoint: Point): UniquePoint[] {
  const obstacleStartPoint: UniquePoint = {
    id: 0,
    x: startPoint.x,
    y: startPoint.y,
  }
  const obstacleEndPoint: UniquePoint = {
    id: 1,
    x: endPoint.x,
    y: endPoint.y,
  }
  // ------------START checking intersection-------------------
  let direct_connection_line: UniqueLine =  {
    p1: obstacleStartPoint,
    p2: obstacleEndPoint,
  }
  let is_possible_direct_connection = true
  for (let i = 0; i < blockingTrackLines.length; i++) {
    if (checkIntersection(direct_connection_line, blockingTrackLines[i])) {
      is_possible_direct_connection = false
      break
    }
  }
  if (is_possible_direct_connection) {
    return [
      obstacleStartPoint,
      obstacleEndPoint,
    ]
  }

  return getComplicatedTrack(
    obstacleStartPoint,
    obstacleEndPoint,
  )
}

function addNewPointToGraph(graph: Map<u32, UniquePoint[]>, point: UniquePoint, isStart: bool): void {
  for (let i = 0; i < trackPoints.length; i++) {
    const innerTrackPoint = trackPoints[i]
    const newLine: UniqueLine = {
      p1: point,
      p2: innerTrackPoint,
    }

    let isIntersect = false
    for (let j = 0; j < blockingTrackLines.length; j++) {
      const blockingLine = blockingTrackLines[j]
      if (checkIntersection(newLine, blockingLine)) {
        isIntersect = true
        break
      }
    }

    // ------------end checking intersection-------------------
    if (!isIntersect) {
      const key = isStart ? point.id : innerTrackPoint.id
      const newPoint = isStart ? innerTrackPoint : point
      if (graph.has(key)) {
        graph.get(key).push(newPoint)
      } else {
        graph.set(key, [newPoint])
      }
    }
  }
}

function getComplicatedTrack(startPoint: UniquePoint, endPoint: UniquePoint): UniquePoint[] {
  let graph: Map<u32, UniquePoint[]> = new Map()
  const permanentObstaclesGraphKeys = permanentObstaclesGraph.keys()
  for (let i = 0; i < permanentObstaclesGraphKeys.length; i++) {
    const key = permanentObstaclesGraphKeys[i]
    graph.set(key, permanentObstaclesGraph.get(key).slice(0))
  }

  addNewPointToGraph(graph, startPoint, true)
  addNewPointToGraph(graph, endPoint, false)
  
  return shortestPathAStart(graph, startPoint, endPoint)
}

class QueueItem {
  point: UniquePoint
  path: UniquePoint[]
  current_length: f32
  heuristic: f32
}

function getSortedIndex(list: QueueItem[], value: f32): i32 {
  let low: i32 = 0;
  let high: i32 = list.length;

  while (low < high) {
    let mid: i32 = (low + high) >> 1;
    if (list[mid].heuristic > value) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return low
}

function shortestPathAStart(
  graph: Map<u32, UniquePoint[]>,
  sourceNode: UniquePoint,
  destinationNode: UniquePoint,
): UniquePoint[] {
  let queue: QueueItem[] = [{
    point: sourceNode,
    path: [sourceNode],
    current_length: 0.0,
    heuristic: 0.0,
  }];
  let visited: u32[] = []
  let fullPath: UniquePoint[] = []

  while (queue.length > 0) {
    let currentNode = queue.pop()
    let direct_path_to_destination = false
    const neighbors = graph.get(currentNode.point.id)
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].id == destinationNode.id) {
        direct_path_to_destination = true
        break;
      }
    }

    if (direct_path_to_destination) {
      fullPath = currentNode.path.slice(0)
      fullPath.push(destinationNode)
      break
    }
    visited.push(currentNode.point.id);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i]
      if (visited.includes(neighbor.id)) continue

      const dist_to_neighbor = Mathf.hypot(neighbor.x - currentNode.point.x, neighbor.y - currentNode.point.y)
      const current_length = currentNode.current_length + dist_to_neighbor;
      const heuristic = current_length + Mathf.hypot(neighbor.x - destinationNode.x, neighbor.y - destinationNode.y)
      const index = getSortedIndex(queue, heuristic);
      let path = currentNode.path.slice(0)
      path.push(neighbor);
      let newNode: QueueItem =  {
        point: neighbor,
        path,
        current_length,
        heuristic,
      };
      const newQueue = queue.slice(0, index)
      newQueue.push(newNode)
      queue = newQueue.concat(queue.slice(index))
    }

  }
  return fullPath
}

function insertLinesToGraph(
  graph: Map<u32, UniquePoint[]>,
  pointA: UniquePoint,
  pointB: UniquePoint,
): void {
  if (graph.has(pointA.id)) {
    graph.get(pointA.id).push(pointB)
  } else {
    graph.set(pointA.id, [pointB])
  }
}

function getConnectedPoints(data: Float32Array): Point[][] {
  let obstacleIndex: i32 = 0
  let i: i32 = 0;
  let result: Point[][] = [[]]

  //====================CREATE POINTS FOR OBSTACLES=========================
  while (i < data.length) {
    if (data[i] == OBSTACLES_DIVIDER) {
      result.push([])
      obstacleIndex ++
      i ++
    } else {
      result[obstacleIndex].push({
        x: data[i],
        y: data[i + 1],
      })
      i += 2
    }
  }

  return result
}

function getInnerUniquePoints(data: Float32Array): UniquePoint[] {
  let i: i32 = 0
  let result: UniquePoint[] = []

  while (i < data.length) {
    const point: UniquePoint = {
      id: getId(),
      x: unchecked(data[i]),
      y: unchecked(data[i + 1]),
    }
    result.push(point)
    i += 2
  }

  return result
}

function getConnectedLines(data: Point[][]): Line[] {
  let result: Line[] = []

  for (let i = 0; i < data.length; i++) {
    const obstacle = data[i]
    for (let j = 0; j < obstacle.length; j++) {
      result.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }

  return result
}

function getConnectedUniqueLines(data: UniquePoint[][]): UniqueLine[] {
  let result: UniqueLine[] = []

  for (let i = 0; i < data.length; i++) {
    const obstacle = data[i]
    for (let j = 0; j < obstacle.length; j++) {
      result.push({
        p1: obstacle[j],
        p2: obstacle[(j + 1) % obstacle.length],
      })
    }
  }

  return result
}

export function createPermanentTrackGraph(
  blockingTrackPoints: Float32Array,
  rawTrackPoints: Float32Array,
  bridgeSecondToLastPointIndex: i32,
): void {
  trackPoints = getInnerUniquePoints(rawTrackPoints)
  const pointsOuter = getConnectedPoints(blockingTrackPoints)
  blockingTrackLines = getConnectedLines(pointsOuter)

  /*========GO OVER ALL POINTS ONLY IN iObstacle TO CONNECTED THEM===========*/
  for (let m = 0; m < trackPoints.length; m++) {
    let startN = m + 1
    if (m <= bridgeSecondToLastPointIndex && m % 2 == 0) {
      startN += 1 // to avoid connecting two bridge sites (on the same node),
      // it will be never used in any track
    }
    for (let n = startN; n < trackPoints.length; n++) {
      let isIntersect = false
      const newLine: UniqueLine = {
        p1: trackPoints[m],
        p2: trackPoints[n],
      }
      for (let p = 0; p < blockingTrackLines.length; p++) {
        if (checkIntersection(newLine, blockingTrackLines[p])) {
          isIntersect = true
          break
        }
      }

      if (!isIntersect) {
        insertLinesToGraph(permanentObstaclesGraph, newLine.p1, newLine.p2)
        insertLinesToGraph(permanentObstaclesGraph, newLine.p2, newLine.p1)
      }
    }
  }

  // for (let i = 0; i < trackPoints.length; i++) {
  //   const iObstacle = trackPoints[i]
    // for (let j = i + 1; j < pointsInner.length; j++) {
    //   const jObstacle = pointsInner[j]

    //   for (let m = 0; m < iObstacle.length; m++) {
    //     for (let n = 0; n < jObstacle.length; n++) {

    //       const mPoint = iObstacle[m]
    //       const nPoint = jObstacle[n]
    //       const newLine: UniqueLine = {
    //         p1: mPoint,
    //         p2: nPoint,
    //       }

    //       let isIntersect = false
    //       for (let p = 0; p < blockingTrackLines.length; p++) {
    //         if (checkIntersection(newLine, blockingTrackLines[p])) {
    //           isIntersect = true
    //           break
    //         }
    //       }

    //       if (!isIntersect) {
    //         permanentObstaclesGraph.get(mPoint.id).push(nPoint)
    //         permanentObstaclesGraph.get(nPoint.id).push(mPoint)
    //       }

    //     }
    //   }
    // }
  // }
}
