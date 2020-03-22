import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, [isProducing]: number[]) => {
  if (isProducing) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }
}

export const updateUnit = (
  unit: Unit,
  [x, y, angle, state, firstStateParam]: number[],
) => {
  unit.update(state, x, y, angle, firstStateParam)
}
