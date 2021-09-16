export const PRODUCTION_LINE_LENGTH: usize = 5
export const NORMAL_SQUAD_RADIUS: f32 = 60
export const MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS: f32 = NORMAL_SQUAD_RADIUS + 100
export const VERTICAL_PERSPECTIVE_FACTOR: f32 = 0.507122507

export const REPRESENTATION_FACTION_ID: f32 = 0.0
export const REPRESENTATION_ENEMY_FACTORY: f32 = 1.0
export const REPRESENTATION_SOLIDER: f32 = 2.0
export const REPRESENTATION_USER_FACTORY: f32 = 3.0
export const REPRESENTATION_BULLETS: f32 = 4.0
export const REPRESENTATION_RAPTOR: f32 = 5.0
export const REPRESENTATION_STRATEGIC_POINT: f32 = 7.0

export enum UnitState {
  DIE,
  FLY,
  GETUP,
  ABILITY,
  IDLE,
  SHOOT,
  RUN,
  CHASING,
}

export const MAP_WIDTH: f32 = 2000
export const MAP_HEIGHT: f32 = 4500

export const OBSTACLES_DIVIDER: f32 = -1.0

export const MAP_SKEW_ANGLE: f32 = -0.65
export const MAP_VERTICAL_MOD: f32 = 0.52

export const UPDATE_SQUAD_CENTER_PERIOD: usize = 15
export const CHECK_SQUADS_CORRECTNESS_PERIOD: usize = 2 * UPDATE_SQUAD_CENTER_PERIOD

export const USER_FACTION_ID: u32 = 0;
export const UINT_DATA_SETS_DIVIDER: u32 = 0

export const MATH_PI: f32 = Math.PI as f32
export const MATH_PI_2: f32 = 2 * MATH_PI


export const OBSTACLES_CELL_SIZE: f32 = 300