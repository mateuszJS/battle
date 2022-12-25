export default (
  x: number,
  y: number,
  angle: number,
  offsetDistance: number = 0,
  offsetAngle: number = 0,
): Point[] => {
  const bridgeAngle = 120 * Math.PI / 180 - offsetAngle
  const diagonallyAngle = 60 * Math.PI / 180 + offsetAngle
  const radius = 100 + offsetDistance
  let tempAngle = -bridgeAngle / 2 - diagonallyAngle

  return Array.from({ length: 4 }, (_, index) => {
    tempAngle += index % 2 === 0 ? diagonallyAngle : bridgeAngle
    return {
      x: Math.sin(tempAngle + angle) * radius + x,
      y: -Math.cos(tempAngle + angle) * radius + y,
    }
  })
}