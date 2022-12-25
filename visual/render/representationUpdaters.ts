import Factory from '~/representation/Factory'
import StrategicPoint from '~/representation/StrategicPoint'
import Unit from '~/representation/Unit'

export const updateFactory = (factory: Factory, hp: number, progress: number, productionLine?: Float32Array) => {
  if (progress !== 0) {
    factory.turnOnProduction()
  } else {
    factory.turnOffProduction()
  }

  if (productionLine && productionLine.length > 0) {
    factory.updateProductionLine(progress, productionLine)
  }

  if (hp < 2000) {
    console.log("hp", hp)
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
