import { convertLogicCoordsToVisual } from "./convert-coords-between-logic-and-visual";
import { Faction } from "./faction";
import { Point } from "./point";
import { Squad } from "./squad";

const GRID_CELL: f32 = 300
const GRID_MAP_SCALE: f32 = 1 / GRID_CELL
var gridMapWidth: i32 = 0
var gridMapHeight: i32 = 0
var gridMapScaleX: f32 = 0
var gridMapScaleY: f32 = 0
var grid: Array<Squad[] | null>

export function initializeGrid(mapWidth: f32, mapHeight: f32): void {
  gridMapWidth = Math.ceil(mapWidth * GRID_MAP_SCALE) as i32
  gridMapHeight = Math.ceil(mapHeight * GRID_MAP_SCALE) as i32
  gridMapScaleX = gridMapWidth as f32 / mapWidth
  gridMapScaleY = gridMapHeight as f32 / mapHeight
}

export function fillGrid(factions: Faction[]): void {
  grid = new Array(gridMapWidth * gridMapHeight)

  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      squad.updateCenter()
      const index = getIndexFromRealPosition(squad.centerPoint.x, squad.centerPoint.y)
      const array = grid[index]
      if (array) {
        array.push(squad)
      } else {
        grid[index] = [squad]
      }
    })
  })
}

function getRealPositionFromIndex(index: i32): Point {
  return {
    x: Math.floor(index % gridMapWidth) as f32 / gridMapScaleX,
    y: Math.floor(index / gridMapWidth) as f32 / gridMapScaleY,
  }
}

function getIndexFromRealPosition(x: f32, y: f32): i32 {
  let column = (x * gridMapScaleX) as i32
  let row = (y * gridMapScaleY) as i32
  return row * gridMapWidth + column
}

export function debugGridNumbers(): f32[] {
  const lines: f32[] = []
  for (let i: f32 = 0; i < (gridMapWidth as f32); i++) {
    lines.push(i / gridMapScaleX)
    lines.push(0)
    lines.push(i / gridMapScaleX)
    lines.push(gridMapHeight as f32 / gridMapScaleY)
  }
  for (let j: f32 = 0; j < (gridMapHeight as f32); j++) {
    lines.push(0)
    lines.push(j / gridMapScaleY)
    lines.push(gridMapWidth as f32 / gridMapScaleX)
    lines.push(j / gridMapScaleY)
  }
  lines.push(-1)
  const gridData = grid.map<f32[]>((gridCell, index) => {
    const position = getRealPositionFromIndex(index)
    return [
      gridCell ? gridCell.length as f32 : 0,
      position.x + (1 / gridMapScaleX) / 2,
      position.y + (1 / gridMapScaleY) / 2,
    ]
  }).flat()
  return lines.concat(gridData)
}






// https://stackoverflow.com/questions/23557638/rotated-rectangle-rasterisation-algorithm

function pointToGridFnc(point: Point): Point {
  return {
    x: Math.floor(point.x * gridMapScaleX) as f32,
    y: Math.floor(point.y * gridMapScaleY) as f32,
  }
}

export function traceLine(startPoint: Point, endPoint: Point): Point[] {   
  const startCell = pointToGridFnc(startPoint)
  const lastCell = pointToGridFnc(endPoint)
  const direction: Point = {
    x: endPoint.x - startPoint.x,
    y: endPoint.y - startPoint.y,
  }

  //Moving direction (cells)
  const stepX: f32 = (direction.x >= 0) ? 1 : -1;
  const stepY: f32 = (direction.y >= 0) ? 1 : -1;

  //Normalize vector
  const hypot = Math.hypot(direction.x, direction.y) as f32
  const normDirection: Point = {
    x: direction.x / hypot,
    y: direction.y / hypot,
  }

  //Distance to the nearest square side
  const nearX = (stepX > 0) ? (startCell.x + 1) / gridMapScaleX - startPoint.x : startPoint.x - (startCell.x / gridMapScaleX)
  const nearY = (stepY > 0) ? (startCell.y + 1) / gridMapScaleY - startPoint.y : startPoint.y - (startCell.y / gridMapScaleY)

  //How far along the ray we must move to cross the first vertical (ray_step_to_vside) / or horizontal (ray_step_to_hside) grid line
  let ray_step_to_vside: f32 = (normDirection.x != 0) ? nearX / normDirection.x : (Infinity as f32)
  let ray_step_to_hside: f32 = (normDirection.y != 0) ? nearY / normDirection.y : (Infinity as f32)

  //How far along the ray we must move for horizontal (dx)/ or vertical (dy) component of such movement to equal the cell size
  const dx: f32 = (normDirection.x != 0) ? (1 / gridMapScaleX) / normDirection.x : (Infinity as f32)
  const dy: f32 = (normDirection.y != 0) ? (1 / gridMapScaleY) / normDirection.y : (Infinity as f32)

  //Tracing loop
  let cells: Point[] = []
  cells.push(startCell)

  let x = startCell.x
  let y = startCell.y

  const grid_bound_x: usize = Math.abs(lastCell.x - startCell.x) as usize
  const grid_bound_y: usize = Math.abs(lastCell.y - startCell.y) as usize

  let counter: usize = 0
  while (counter != (grid_bound_x + grid_bound_y)) {
    if (Math.abs(ray_step_to_vside) < Math.abs(ray_step_to_hside)) {
      ray_step_to_vside += dx //to the next vertical grid line
      x += stepX
    } else {
      ray_step_to_hside += dy//to the next horizontal grid line
      y += stepY
    }
    ++counter

    cells.push({
      x: x,
      y: y,
    })
  }

  return cells
}


export function pickCells(points: Point[]): Point[] {
  let maxY = -Infinity
  let minY = Infinity
  for (let i = 0; i < points.length; i++) {
    let point = points[i]
    if (minY > point.y) minY = point.y
    if (maxY < point.y) maxY = point.y
    
  }

  const edgeLengths = Math.ceil(maxY) as i32
  let startEdge = new Array<i32>(edgeLengths).fill(-1)
  let endEdge = new Array<i32>(edgeLengths).fill(-1)

  for (let i = 0; i < points.length; i++) {
    const results = traceLine(points[i], points[(i + 1) % points.length])
    for (let j = 0; j < results.length; j++) {
      let currentCell = results[j]
      
      const index = currentCell.y as i32
      if (startEdge[index] == -1 || startEdge[index] > (currentCell.x as i32)) {
        startEdge[index] = currentCell.x as i32
      }
      if (endEdge[index] == -1 || endEdge[index] < (currentCell.x as i32)) {
        endEdge[index] =  currentCell.x as i32
      }
    }
  }

  let selectedCells: Point[] = []
  for (let i = Math.floor(minY); i < edgeLengths; i++) {
    const start = startEdge[i]
    if (start === -1) continue

    const end = endEdge[i]
    for (let x = start; x <= end; x++) {
      selectedCells.push({
        x: x as f32,
        y: i as f32,
      })
    }
  }
  return selectedCells.map<Point>(point => (
    convertLogicCoordsToVisual(
      point.x / gridMapScaleX + (1/(2 * gridMapScaleX)),
      point.y / gridMapScaleY + (1/(2 * gridMapScaleY)),
    )
  ));
}