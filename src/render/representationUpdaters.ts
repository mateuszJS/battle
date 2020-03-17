import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, [isProducing]: number[]) => {
  if (isProducing) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }
}

export const updateUnit = (unit: Unit, [state, x, y, angle]: number[]) => {
  unit.update(state, x, y, angle, false)
}
