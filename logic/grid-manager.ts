import { mapHeightGlob, mapWidthGlob } from ".";
import { convertLogicCoordsToVisual } from "./convert-coords-between-logic-and-visual";
import { Faction } from "./faction";
import { Point } from "./geom-types";
import { Squad } from "./squad";

const EMPTY_GRID_INDEX = -100
const GRID_CELL: f32 = 300
const GRID_MAP_SCALE: f32 = 1 / GRID_CELL
var gridMapWidth: i32 = 0
var gridMapHeight: i32 = 0

var gridMapWidth_f32: f32 = 0
var gridMapHeight_f32: f32 = 0

var gridMapScaleX: f32 = 0
var gridMapScaleY: f32 = 0
var grid: Array<Squad[] | null>

export function initializeGrid(mapWidth: f32, mapHeight: f32): void {
  gridMapWidth = Mathf.ceil(mapWidth * GRID_MAP_SCALE) as i32
  gridMapHeight = Mathf.ceil(mapHeight * GRID_MAP_SCALE) as i32
  gridMapWidth_f32 = gridMapWidth as f32
  gridMapHeight_f32 = gridMapHeight as f32
  gridMapScaleX = gridMapWidth_f32 / mapWidth
  gridMapScaleY = gridMapHeight_f32 / mapHeight
}

export function fillGrid(factions: Faction[]): void {
  grid = new Array(gridMapWidth * gridMapHeight)

  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      squad.updateCenter()
      const index = getIndexFromRealPosition(squad.centerPoint.x, squad.centerPoint.y)
      const array = unchecked(grid[index])
      if (array) {
        array.push(squad)
      } else {
        unchecked(grid[index] = [squad])
      }
    })
  })
}

function getRealPositionFromIndex(index: f32): Point {
  return {
    x: Mathf.floor(index % (gridMapWidth as f32)) / gridMapScaleX,
    y: Mathf.floor(index / (gridMapWidth as f32)) / gridMapScaleY,
  }
}

function getIndexFromRealPosition(x: f32, y: f32): i32 {
  let column = (x * gridMapScaleX) as i32
  let row = (y * gridMapScaleY) as i32
  return row * gridMapWidth + column
}

export function debugGridNumbers(): f32[] {
  const lines: f32[] = []
  for (let i: f32 = 0; i < gridMapWidth_f32; i++) {
    lines.push(i / gridMapScaleX)
    lines.push(0)
    lines.push(i / gridMapScaleX)
    lines.push(gridMapHeight_f32 / gridMapScaleY)
  }
  for (let j: f32 = 0; j < gridMapHeight_f32; j++) {
    lines.push(0)
    lines.push(j / gridMapScaleY)
    lines.push(gridMapWidth_f32 / gridMapScaleX)
    lines.push(j / gridMapScaleY)
  }
  lines.push(-1)
  const gridData = grid.map<f32[]>((gridCell, index) => {
    const position = getRealPositionFromIndex(index as f32)
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
    x: Mathf.floor(point.x * gridMapScaleX),
    y: Mathf.floor(point.y * gridMapScaleY),
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
  const hypot = Mathf.hypot(direction.x, direction.y)
  const normDirection: Point = {
    x: direction.x / hypot,
    y: direction.y / hypot,
  }

  //Distance to the nearest square side
  const nearX = (stepX > 0) ? (startCell.x + 1) / gridMapScaleX - startPoint.x : startPoint.x - (startCell.x / gridMapScaleX)
  const nearY = (stepY > 0) ? (startCell.y + 1) / gridMapScaleY - startPoint.y : startPoint.y - (startCell.y / gridMapScaleY)

  //How far along the ray we must move to cross the first vertical (ray_step_to_vside) / or horizontal (ray_step_to_hside) grid line
  let ray_step_to_vside: f32 = (normDirection.x != 0) ? nearX / normDirection.x : Infinity
  let ray_step_to_hside: f32 = (normDirection.y != 0) ? nearY / normDirection.y : Infinity

  //How far along the ray we must move for horizontal (dx)/ or vertical (dy) component of such movement to equal the cell size
  const dx: f32 = (normDirection.x != 0) ? (1 / gridMapScaleX) / normDirection.x : Infinity
  const dy: f32 = (normDirection.y != 0) ? (1 / gridMapScaleY) / normDirection.y : Infinity

  //Tracing loop
  let cells: Point[] = []
  cells.push(startCell)

  let x = startCell.x
  let y = startCell.y

  const grid_bound_x: usize = Mathf.abs(lastCell.x - startCell.x) as usize
  const grid_bound_y: usize = Mathf.abs(lastCell.y - startCell.y) as usize

  let counter: usize = 0
  while (counter != (grid_bound_x + grid_bound_y)) {
    if (Mathf.abs(ray_step_to_vside) < Mathf.abs(ray_step_to_hside)) {
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

export function getSquadsFromGrid(points: Point[]): Squad[] {
  const cellIndexes = pickCells(points)
  let result: Squad[] = []

  for (let i = 0; i < cellIndexes.length; i++) {
    const gridCell = unchecked(grid[cellIndexes[i]])
    if (gridCell) {
      result = result.concat(gridCell)
    }
  }

  return result
}

export function pickCellsDebug(points: Point[]): Point[] {
  let fMaxY: f32 = -Infinity
  let fMinY: f32 = Infinity
  for (let i = 0; i < points.length; i++) {
    let point = pointToGridFnc(unchecked(points[i]))
    if (fMinY > point.y) fMinY = point.y
    if (fMaxY < point.y) fMaxY = point.y
    
  }
  let minY = Mathf.floor(fMinY) as i32
  const maxY = Mathf.ceil(fMaxY) as i32
  let length = maxY - minY + 1

  let startEdge = new Array<i32>(length).fill(EMPTY_GRID_INDEX)
  let endEdge = new Array<i32>(length).fill(EMPTY_GRID_INDEX)
  
  for (let i = 0; i < points.length; i++) {
    const results = traceLine(
      unchecked(points[i]),
      unchecked(points[(i + 1) % points.length]),
    )
    for (let j = 0; j < results.length; j++) {
      const currentCell = unchecked(results[j])
      const cellY = currentCell.y as i32 - minY
      const cellX = currentCell.x as i32
      if (unchecked(startEdge[cellY]) == EMPTY_GRID_INDEX) {
        unchecked(startEdge[cellY] = cellX)
        unchecked(endEdge[cellY] = cellX)
      } else {
        if (unchecked(startEdge[cellY]) > cellX) {
          unchecked(startEdge[cellY] = cellX)
        }
        if (endEdge[cellY] < cellX) {
          unchecked(endEdge[cellY] =  cellX)
        }
      }
    }
  }

  let cells: Point[] = []
  /* ========BEGIN - add 1 y to the bottom and to the top========= */
  if (minY > 0) {
    startEdge.unshift(unchecked(startEdge[0]))
    endEdge.unshift(unchecked(endEdge[0]))
    minY --
    length ++
  }
  if (length - 1 + minY < gridMapHeight - 1) {
    startEdge.push(unchecked(startEdge[startEdge.length - 1]))
    endEdge.push(unchecked(endEdge[endEdge.length - 1]))
    length ++
  }
  /* ========END - add 1 y to the bottom and to the top========= */
  for (let i = 0; i < length; i++) { 
    // if (startEdge[i] === EMPTY_GRID_INDEX) continue // seems like it's not needed anymore
    // const start = startEdge[i]
    // const end = endEdge[i]
    const start = Math.max(unchecked(startEdge[i]) - 1, 0) as i32 // add x - 1
    const end = Math.min(unchecked(endEdge[i]) + 1, gridMapWidth - 1) as i32 // add x + 1
    for (let x = start; x <= end; x++) {
      const y = i + minY
      if (x >= 0 && x < gridMapWidth && y >= 0 && y < gridMapHeight) {
        cells.push({ x: x as f32, y: y as f32 })
      }
    }
  }

  return cells.map<Point>(point => (
    convertLogicCoordsToVisual(
      point.x / gridMapScaleX + (1/(2 * gridMapScaleX)),
      point.y / gridMapScaleY + (1/(2 * gridMapScaleY)),
    )
  ));
}

function pickCells(points: Point[]): i32[] {
  let fMaxY: f32 = -Infinity
  let fMinY: f32 = Infinity
  for (let i = 0; i < points.length; i++) {
    let point = pointToGridFnc(unchecked(points[i]))
    if (fMinY > point.y) fMinY = point.y
    if (fMaxY < point.y) fMaxY = point.y
    
  }
  let minY = Mathf.floor(fMinY) as i32
  const maxY = Mathf.ceil(fMaxY) as i32
  let length = maxY - minY + 1

  let startEdge = new Array<i32>(length).fill(EMPTY_GRID_INDEX)
  let endEdge = new Array<i32>(length).fill(EMPTY_GRID_INDEX)
  
  for (let i = 0; i < points.length; i++) {
    const results = traceLine(
      unchecked(points[i]),
      unchecked(points[(i + 1) % points.length]),
    )
    for (let j = 0; j < results.length; j++) {
      const currentCell = unchecked(results[j])
      const cellY = currentCell.y as i32 - minY
      const cellX = currentCell.x as i32
      if (unchecked(startEdge[cellY]) == EMPTY_GRID_INDEX) {
        unchecked(startEdge[cellY] = cellX)
        unchecked(endEdge[cellY] = cellX)
      } else {
        if (unchecked(startEdge[cellY]) > cellX) {
          unchecked(startEdge[cellY] = cellX)
        }
        if (unchecked(endEdge[cellY]) < cellX) {
          unchecked(endEdge[cellY] =  cellX)
        }
      }
    }
  }

  let selectedIndexes: i32[] = []
  /* ========BEGIN - add 1 y to the bottom and to the top========= */
  if (minY > 0) {
    startEdge.unshift(unchecked(startEdge[0]))
    endEdge.unshift(unchecked(endEdge[0]))
    minY --
    length ++
  }
  if (length - 1 + minY < gridMapHeight - 1) {
    startEdge.push(unchecked(startEdge[startEdge.length - 1]))
    endEdge.push(unchecked(endEdge[endEdge.length - 1]))
    length ++
  }

  for (let i = 0; i < length; i++) { 
    // if (startEdge[i] === EMPTY_GRID_INDEX) continue // seems like it's not needed anymore
    // const start = startEdge[i]
    // const end = endEdge[i]
    const start = Mathf.max(unchecked(startEdge[i] as f32) - 1, 0) as i32 // add x - 1
    const end = Mathf.min(unchecked(endEdge[i] as f32) + 1, gridMapWidth as f32 - 1) as i32 // add x + 1
    for (let x = start; x <= end; x++) {
      const y = i + minY
      if (x >= 0 && x < gridMapWidth && y >= 0 && y < gridMapHeight) {
        selectedIndexes.push(y * gridMapWidth + x)
      }
    }
  }

  return selectedIndexes
}