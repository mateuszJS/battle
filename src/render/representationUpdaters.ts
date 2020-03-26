import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'

export const updateFactory = (
  factory: Factory,
  [progress, ...items]: number[],
) => {
  if (items[0] !== 0) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }

  factory.updateProductionLine(progress, items)
}

export const updateUnit = (
  unit: Unit,
  [x, y, angle, state, firstStateParam]: number[],
) => {
  unit.update(state, x, y, angle, firstStateParam)
}
