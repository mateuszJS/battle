import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, [progress, ...items]: Float32Array) => {
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

export const updateUnit = (unit: Unit, data: Float32Array) => {
  // data = [x, y, angle, state, firstStateParam]
  unit.update(data[3], data[0], data[1], data[2], data[4])
}

export const updateStrategicPoint = (
  strategicPoint: StrategicPoint,
  [progress, ownerFactionId]: Float32Array,
) => {
  strategicPoint.update(progress, ownerFactionId)
}
