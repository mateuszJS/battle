import { Faction } from "./faction";
import { Point } from "./point";
import { Squad } from "./squad";

const GRID_CELL: f32 = 300
const GRID_MAP_SCALE: f32 = 1 / GRID_CELL
var gridMapWidth: i32 = 0
var gridMapHeight: i32 = 0
var gridMapScaleX: f32 = 0
var gridMapScaleY: f32 = 0
var grid: Squad[][];

export function initializeGrid(mapWidth: f32, mapHeight: f32) {
  gridMapWidth = mapWidth * GRID_MAP_SCALE + 1.0
  gridMapHeight = mapHeight * GRID_MAP_SCALE + 1.0
  gridMapScaleX = gridMapWidth / mapWidth
  gridMapScaleY = gridMapHeight / mapHeight
}

export function fillGrid(factions: Faction[]) {
  grid = new Array(gridMapWidth * gridMapHeight)

  factions.forEach(faction => {
    faction.squads.forEach(squad => {
      squad.updateCenter()
      const index = getIndexFromRealPosition(squad.centerPoint.x, squad.centerPoint.y)
      if (grid[index]) {
        grid[index].push(squad)
      } else {
        grid[index] = [squad]
      }
    })
  })
}

function getRealPositionFromIndex(index: i32): Point {
  return {
    x: (index / gridMapWidth) as f32 / gridMapScaleY,
    y: (index % gridMapWidth) as f32 / gridMapScaleX,
  }
}

function getIndexFromRealPosition(x: f32, y: f32): i32 {
  let column = (x * gridMapScaleX) as i32
  let row = (y * gridMapScaleY) as i32
  return row * gridMapWidth + column
}

export function debugGridNumbers(): i32[] {
  return grid.map(gridCell => gridCell ? gridCell.length : 0)
}

// pub const GRID_MAP_WIDTH: usize = (MAP_WIDTH * GRID_MAP_SCALE + 1.0) as usize;
// pub const GRID_MAP_HEIGHT: usize = (MAP_HEIGHT * GRID_MAP_SCALE + 1.0) as usize;
// pub const GRID_MAP_SCALE_X: f32 = GRID_MAP_WIDTH as f32 / MAP_WIDTH;
// pub const GRID_MAP_SCALE_Y: f32 = GRID_MAP_HEIGHT as f32 / MAP_HEIGHT;
// pub const GRID_MAP_SCALE_AVG: f32 = (GRID_MAP_SCALE_X + GRID_MAP_SCALE_Y) / 2.0; // to scale the radius stuff like weapon range