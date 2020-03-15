import Factory from '~/representation/Factory'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, [isProducing]: number[]) => {
  if (isProducing) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }
}

export const updateUnit = (unit: Unit, [x, y, angle]: number[]) => {
  // unit.x = x
  // unit.y = y
  // unit.angle = angle
}
