export enum RepresentationId {
  Faction = 0,
  EnemyFactory = 1,
  Solider = 2,
  UserFactory = 3,
  Bullets = 4,
  Raptor = 5,
  Non = 6,
  StrategicPoint = 7,
}

export enum AbilityType {
  Grenade = 1,
  Jump = 2,
}

export enum WeaponType {
  StandardRifle = 1,
  // LaserRifle = 1,
  Grenade = 2,
  HitGround = 3,
  Non = 0,
}

export enum UnitState {
  CHASING = 9,
  ABILITY = 8,
  FLY = 7,
  RUN = 6,
  SHOOT = 5,
  IDLE = 4,
  GETUP = 3,
  DIE = 0,
}

export const NORMAL_SQUAD_RADIUS = 50;
export const OBSTACLES_DIVIDER = -1.0
export const MAP_SKEW_ANGLE = -0.65
export const MAP_VERTICAL_MOD = 0.52
export const UPDATE_SQUAD_CENTER_PERIOD = 15
export const CHECK_SQUADS_CORRECTNESS_PERIOD = 2 * UPDATE_SQUAD_CENTER_PERIOD
// always before search for enemies we should do squads correctness
export const SEARCH_FOR_ENEMIES_PERIOD = 2 * CHECK_SQUADS_CORRECTNESS_PERIOD
export const USER_FACTION_ID = 0;
export const UINT_DATA_SETS_DIVIDER = 0
export const MATH_PI_HALF = Math.PI / 2
export const MATH_PI_2 = Math.PI * 2
export const SQUARE_OF_TWO = Math.sqrt(2)
export const GRID_CELL = 300
export const OBSTACLES_CELL_SIZE = 300
export const PLATFORM_RADIUS = 600
export const CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD = 100
export const PRODUCTION_LINE_LENGTH = 5;