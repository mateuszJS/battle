import ResPoint from '~/modules/resPoint'
import Factory from '~/factory/Factory'

const createFactories = (
  factionsCount: number,
  sortingLayer: PIXI.display.Group,
) => {
  const resourcesPoints: ResPoint[] = []
  const getPos = (faction: number) => {
    const angle = (faction / factionsCount) * (Math.PI * 2)

    const rp = new ResPoint(
      Math.sin(angle) * 1200 + window.mapWidth / 2,
      -Math.cos(angle) * 500 + window.mapHeight / 2,
      sortingLayer,
    )

    resourcesPoints.push(rp)

    return {
      x: Math.sin(angle) * 1800 + window.mapWidth / 2,
      y: -Math.cos(angle) * 800 + window.mapHeight / 2,
      angle,
    }
  }

  const factories: Factory[] = []

  for (let i = 0; i < factionsCount; i++) {
    window.allSquads.push([])
    const { x, y, angle } = getPos(i)
    const fact = new Factory(i, x, y, angle, sortingLayer)
    factories.push(fact)
  }

  return {
    factories,
    resourcesPoints,
  }
}

export default createFactories
