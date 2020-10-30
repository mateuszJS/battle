export enum STATE {
  ABILITY = 8,
  FLY = 7,
  GO = 6,

  SHOOT = 5,
  STAY = 4,
  GETUP = 3,
  DIE = 0,
}

export enum UNIT_TYPE {
  WARRIOR_REGULAR = 'WARRIOR_REGULAR',
  SOLIDER_REGULAR = 'SOLIDER_REGULAR',
  SOLIDER_LASER = 'SOLIDER_LASER',
  WARRIOR_ASSAULT = 'WARRIOR_ASSAULT',
}

export const MAP_WIDTH = 2700
export const MAP_HEIGHT = 2100
export const MAX_CAMERA_MOVE_SPEED = 15
export const MAX_CAMERA_X = 0
export const MAX_CAMERA_Y = 0
export const MIN_CAMERA_X = -(MAP_WIDTH - window.innerWidth)
export const MIN_CAMERA_Y = -(MAP_HEIGHT - window.innerHeight)
export const START_MOVING_CAMERA_BOUNDARY = 100
export const HALF_UNIT_HEIGHT = 20
export const USER_FACTION_ID = 1
export const INFLUENCE_CELL_SIZE = 175.0
export const INFLUENCE_MAP_SCALE = 1.0 / INFLUENCE_CELL_SIZE
export const INFLUENCE_MAP_WIDTH = Math.floor(MAP_WIDTH * INFLUENCE_MAP_SCALE + 1.0)
export const INFLUENCE_MAP_HEIGHT = Math.floor(MAP_HEIGHT * INFLUENCE_MAP_SCALE + 1.0)
