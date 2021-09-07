import { Point } from "./geom-types"
import { checkIntersection } from "./geom-utils"
import { ObstacleLine, obstacleLines, ObstaclePoint, obstaclePoints, permanentObstaclesGraph } from "./obstacles-manager"

export function getTrack(startPoint: Point, endPoint: Point): ObstaclePoint[] {
  const obstacleStartPoint: ObstaclePoint = {
    id: 0,
    x: startPoint.x,
    y: startPoint.y,
  }
  const obstacleEndPoint: ObstaclePoint = {
    id: 1,
    x: endPoint.x,
    y: endPoint.y,
  }
  // ------------START checking intersection-------------------
  let direct_connection_line: ObstacleLine =  {
    p1: obstacleStartPoint,
    p2: obstacleEndPoint,
  }
  let is_possible_direct_connection = true
  for (let i = 0; i < obstacleLines.length; i++) {
    if (checkIntersection(direct_connection_line, obstacleLines[i])) {
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

function addNewPointToGraph(graph: Map<u32, ObstaclePoint[]>, point: ObstaclePoint, isStart: bool): void {
  for (let i = 0; i < obstaclePoints.length; i++) {
    const obstaclePoint = obstaclePoints[i]
    const newLine: ObstacleLine = {
      p1: point,
      p2: obstaclePoint,
    }

    let isIntersect = false
    for (let j = 0; j < obstacleLines.length; j++) {
      const obstacleLine = obstacleLines[j]
      if (
        obstacleLine.p1.id != obstaclePoint.id
        && obstacleLine.p2.id != obstaclePoint.id
        && checkIntersection(newLine, obstacleLine)
      ) {
        isIntersect = true
        break
      }
    }

    // ------------end checking intersection-------------------
    if (!isIntersect) {
      const key = isStart ? point.id : obstaclePoint.id
      const newPoint = isStart ? obstaclePoint : point
      if (graph.has(key)) {
        graph.get(key).push(newPoint)
      } else {
        graph.set(key, [newPoint])
      }
    }
  }
}

function getComplicatedTrack(startPoint: ObstaclePoint, endPoint: ObstaclePoint): ObstaclePoint[] {
  let graph: Map<u32, ObstaclePoint[]> = new Map()
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
  point: ObstaclePoint
  path: ObstaclePoint[]
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
  graph: Map<u32, ObstaclePoint[]>,
  sourceNode: ObstaclePoint,
  destinationNode: ObstaclePoint,
): ObstaclePoint[] {
  let queue: QueueItem[] = [{
    point: sourceNode,
    path: [sourceNode],
    current_length: 0.0,
    heuristic: 0.0,
  }];
  let visited: u32[] = []
  let fullPath: ObstaclePoint[] = []

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

      const dist_to_neighbor = Math.hypot(neighbor.x - currentNode.point.x, neighbor.y - currentNode.point.y) as f32
      const current_length = currentNode.current_length + dist_to_neighbor;
      const heuristic = current_length + Math.hypot(neighbor.x - destinationNode.x, neighbor.y - destinationNode.y) as f32;
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
