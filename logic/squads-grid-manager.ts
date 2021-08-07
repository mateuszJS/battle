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
