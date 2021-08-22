const bridgeAngle = 53.6 * Math.PI / 180
const diagonallyAngle = 37 * Math.PI / 180
let tempAngle = - bridgeAngle / 2 - diagonallyAngle
const radius = 600 * 0.483
const coords = Array.from({ length: 8 }, (_, index) => {
  tempAngle += index % 2 === 0 ? diagonallyAngle : bridgeAngle
  return {
    x: Math.sin(tempAngle) * radius,
    y: -Math.cos(tempAngle) * radius,
    angle: tempAngle,
  }
})

export default coords