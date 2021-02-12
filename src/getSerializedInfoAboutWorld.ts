import { USER_FACTION_ID } from 'Consts'

const OBSTACLES_DIVIDER = -1

const players = [
  {
    id: USER_FACTION_ID, // faction ids should start with 1, never 0! 0 is used for placeholder sometimes
    base: {
      x: 250,
      y: 250,
      angle: 2.25,
    },
  },
  {
    id: 2,
    base: {
      x: 2500,
      y: 1900,
      angle: 5.39,
    },
  },
]

const obstacles = [
  [
    [600.0, 100.0],
    [900.0, 100.0],
    [900.0, 300.0],
    [600.0, 300.0],
  ],
  [
    [700.0, 400.0],
    [900.0, 400.0],
    [900.0, 600.0],
    [700.0, 600.0],
    [600.0, 500.0],
  ],
]

const strategicPoints = [
  [2000.0, 500.0],
  [1250.0, 1250.0],
  [500.0, 2000.0],
]

const getSerializedInfoAboutWorld = (): {
  factions: Float32Array
  obstacles: Float32Array
  strategicPoints: Float32Array
} => {
  const serializedPlayers = players.map(({ id, base }) => [id, base.x, base.y, base.angle]).flat()
  const serializedObstacles = obstacles
    .map(obstaclePoints => [...obstaclePoints.flat(), OBSTACLES_DIVIDER])
    .flat()
  serializedObstacles.pop() // remove last -1.0
  const serializedStrategicPoints = strategicPoints.flat()
  return {
    factions: new Float32Array(serializedPlayers),
    obstacles: new Float32Array(serializedObstacles),
    strategicPoints: new Float32Array(serializedStrategicPoints),
  }
}

export default getSerializedInfoAboutWorld
