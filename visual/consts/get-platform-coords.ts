
const getCoords = (offsetDistance: number = 0, offsetAngle: number = 0) => {
  const bridgeAngle = 53.6 * Math.PI / 180 - offsetAngle
  const diagonallyAngle = 37 * Math.PI / 180 + offsetAngle
  const radius = 600 * 0.483 - offsetDistance
  let tempAngle = - bridgeAngle / 2 - diagonallyAngle

  return Array.from({ length: 8 }, (_, index) => {
    tempAngle += index % 2 === 0 ? diagonallyAngle : bridgeAngle
    return {
      x: Math.sin(tempAngle) * radius,
      y: -Math.cos(tempAngle) * radius,
      angle: tempAngle,
    }
  })
}

export default getCoords