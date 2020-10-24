pub const MATH_PI: f32 = std::f64::consts::PI as f32;
pub const MAX_NUMBER_ITEMS_IN_PRODUCTION_LINE: usize = 5;
pub const NORMAL_SQUAD_RADIUS: f32 = 60.0;
pub const MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS: f32 = NORMAL_SQUAD_RADIUS + 100.0;
pub const THRESHOLD_MAX_UNIT_DISTANCE_FROM_SQUAD_CENTER: f32 =
  MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS + 100.0; // above this distance squad is recognized as too far

pub const UPDATE_SQUAD_CENTER_PERIOD: u32 = 20;
pub const CHECK_SQUADS_CORRECTNESS_PERIOD: u32 = 2 * UPDATE_SQUAD_CENTER_PERIOD;
pub const MANAGE_HUNTERS_PERIOD: u32 = 4 * UPDATE_SQUAD_CENTER_PERIOD;

pub const FACTORY_INFLUENCE_VALUE: f32 = 0.1;
pub const FACTORY_INFLUENCE_RANGE: f32 = 350.0;

pub const MAP_WIDTH: f32 = 2700.0;
pub const MAP_HEIGHT: f32 = 2100.0;

// pub const INFLUENCE_CELL_SIZE: f32 =

pub const INFLUENCE_MAP_SCALE: f32 = 0.1;
// TODO: so prob we should add plus one also here, the same as with GRID
pub const INFLUENCE_MAP_WIDTH: usize = (MAP_WIDTH * INFLUENCE_MAP_SCALE) as usize;
pub const INFLUENCE_MAP_HEIGHT: usize = (MAP_HEIGHT * INFLUENCE_MAP_SCALE) as usize;

pub const GRID_CELL_SIZE: f32 = 400.0;
pub const GRID_MAP_SCALE: f32 = 1.0 / GRID_CELL_SIZE;
pub const GRID_MAP_WIDTH: usize = (MAP_WIDTH * GRID_MAP_SCALE + 1.0) as usize;
pub const GRID_MAP_HEIGHT: usize = (MAP_HEIGHT * GRID_MAP_SCALE + 1.0) as usize;

pub const OBSTACLES_CELL_SIZE: f32 = 20.0; // remember to change also in debug/obstaclesMap.ts
pub const OBSTACLES_MAP_SCALE: f32 = 1.0 / OBSTACLES_CELL_SIZE;
pub const OBSTACLES_MAP_WIDTH: usize = (MAP_WIDTH * OBSTACLES_MAP_SCALE + 1.0) as usize;
pub const OBSTACLES_MAP_HEIGHT: usize = (MAP_HEIGHT * OBSTACLES_MAP_SCALE + 1.0) as usize;
