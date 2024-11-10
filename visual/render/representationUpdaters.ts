// import Factory from 'representation/Factory'
// import StrategicPoint from 'representation/StrategicPoint'
// import Unit from 'representation/Unit'

// export const updateFactory = (factory: Factory, progress: number, productionLine?: Float32Array) => {
//   if (progress !== 0) {
//     factory.turnOnProduction()
//   } else {
//     factory.turnOffProduction()
//   }

//   if (productionLine && productionLine.length > 0) {
//     factory.updateProductionLine(progress, productionLine)
//   }
// }

// export const updateUnit = (unit: Unit, data: Float32Array) => {
//   // data = [x, y, angle, state, firstStateParam]
//   const [x, y] = window.convertLogicCoordToVisual(data[0], data[1])
//   const angle = window.convertLogicAngleToVisual(data[2])
//   unit.update(data[3], x, y, angle, data[4])
// }

// export const updateStrategicPoint = (
//   strategicPoint: StrategicPoint,
//   [progress, ownerFactionId]: Float32Array,
// ) => {
//   strategicPoint.update(progress, ownerFactionId)
// }
