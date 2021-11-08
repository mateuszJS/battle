export const PRODUCTION_LINE_LENGTH: usize = 5
export const NORMAL_SQUAD_RADIUS: f32 = 60
export const MAX_SQUAD_SPREAD_FROM_CENTER_RADIUS: f32 = NORMAL_SQUAD_RADIUS + 100
export const VERTICAL_PERSPECTIVE_FACTOR: f32 = 0.507122507

export const REPRESENTATION_FACTION_ID: f32 = 0
export const REPRESENTATION_ENEMY_FACTORY: f32 = 1
export const REPRESENTATION_SOLIDER: f32 = 2
export const REPRESENTATION_USER_FACTORY: f32 = 3
export const REPRESENTATION_BULLETS: f32 = 4
export const REPRESENTATION_RAPTOR: f32 = 5
export const REPRESENTATION_STRATEGIC_POINT: f32 = 7

export const STANDARD_RIFLE: f32 = 1
export const GRENADE: f32 = 2
export const HIT_THE_GROUND: f32 = 3

export enum AbilityType {
  Grenade,
  Jump,
}

export enum UnitState {
  DIE,
  FLY,
  GETUP,
  ABILITY, // last state which disables the state change
  // (when unit is dying, flying, getting up, using ability, then cannot change the state)
  IDLE,
  SHOOT,
  RUN,
  CHASING,
}

export const MoveStates: UnitState[] = [UnitState.FLY, UnitState.RUN, UnitState.CHASING]

export const MAP_WIDTH: f32 = 2000
export const MAP_HEIGHT: f32 = 4500

export const OBSTACLES_DIVIDER: f32 = -1.0

export const MAP_SKEW_ANGLE: f32 = -0.65
export const MAP_VERTICAL_MOD: f32 = 0.52

export const UPDATE_SQUAD_CENTER_PERIOD: usize = 15
export const CHECK_SQUADS_CORRECTNESS_PERIOD: usize = 2 * UPDATE_SQUAD_CENTER_PERIOD
// always before search for enemies we should do squads correctness
export const SEARCH_FOR_ENEMIES_PERIOD: usize = 2 * CHECK_SQUADS_CORRECTNESS_PERIOD

export const USER_FACTION_ID: u32 = 0;
export const UINT_DATA_SETS_DIVIDER: u32 = 0

export const MATH_PI_HALF: f32 = Math.PI / 2 as f32
export const MATH_PI_2: f32 = Math.PI * 2 as f32
export const SQUARE_OF_TWO: f32 = Math.sqrt(2) as f32

export const GRID_CELL: f32 = 300
export const OBSTACLES_CELL_SIZE: f32 = 300