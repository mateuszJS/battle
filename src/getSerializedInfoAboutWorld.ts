import { USER_FACTION_ID } from 'Consts'
import { obstaclesDebug } from '~/debug'

const OBSTACLES_DIVIDER = -1

const players = [
  {
    id: USER_FACTION_ID,
    base: {
      x: 100,
      y: 100,
      angle: 2.25,
    },
  },
  {
    id: 2,
    base: {
      x: 1200,
      y: 1200,
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

const getSerializedInfoAboutWorld = (): {
  factions: Float32Array
  obstacles: Float32Array
} => {
  obstaclesDebug(obstacles)
  const serializedPlayers = players
    .map(({ id, base }) => [id, base.x, base.y, base.angle])
    .flat()
  const serializedObstacles = obstacles
    .map(obstaclePoints => [...obstaclePoints.flat(), OBSTACLES_DIVIDER])
    .flat()
  serializedObstacles.pop() // remove last -1.0
  return {
    factions: new Float32Array(serializedPlayers),
    obstacles: new Float32Array(serializedObstacles),
  }
}

export default getSerializedInfoAboutWorld
