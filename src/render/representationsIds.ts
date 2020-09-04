const REPRESENTATIONS_IDS = {
  FACTION: 0.0,
  ENEMY_FACTORY: 1.0,
  SOLIDER: 2.0,
  USER_FACTORY: 3.0,
  BULLETS: 4.0,
  RAPTOR: 5.0,
} as const

export type ObjectType = ValueOf<typeof REPRESENTATIONS_IDS>

export default REPRESENTATIONS_IDS
