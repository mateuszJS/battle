import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, [progress, ...items]: number[]) => {
  if (items[0] !== 0) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }

  if (items.length > 1) {
    // it's user factory
    factory.updateProductionLine(progress, items)
  }
}

export const updateUnit = (unit: Unit, [x, y, angle, state, firstStateParam]: number[]) => {
  unit.update(state, x, y, angle, firstStateParam)
}

export const updateStrategicPoint = (
  strategicPoint: StrategicPoint,
  [progress, ownerFactionId]: number[],
) => {
  strategicPoint.update(progress, ownerFactionId)
}
