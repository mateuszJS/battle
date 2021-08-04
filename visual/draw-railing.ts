const RAILING_DISTANCE = 100

const getNumberOfRailings = (totalDistance) => {
  const numberOfRailings = totalDistance / RAILING_DISTANCE
  const roundFunction = ((numberOfRailings % 1) < 0.5 && numberOfRailings > 1) ? Math.floor : Math.ceil
  return roundFunction(numberOfRailings)
}

const drawRailingLine = (
  startPoint: Point,
  endPoint: Point,
  offsetAngle: number,
  withEdgeSticks = true,
) => {
  const container = new PIXI.Container()
  const totalDistance = Math.hypot(startPoint.x - endPoint.x, startPoint.y - endPoint.y)
  const numberOfRailings = getNumberOfRailings(totalDistance)
  const modX = (endPoint.x - startPoint.x) / numberOfRailings
  const modY = (endPoint.y - startPoint.y) / numberOfRailings

  const railingOffsetX = Math.sin(offsetAngle) * 7
  const railingOffsetY = -Math.cos(offsetAngle) * 7
  const lines = new PIXI.Graphics()
  lines.lineStyle(1, 0x333333, 1);
  lines.moveTo(startPoint.x + railingOffsetX, startPoint.y - 22 + railingOffsetY)
  lines.lineTo(endPoint.x + railingOffsetX, endPoint.y - 22 + railingOffsetY)

  lines.moveTo(startPoint.x + railingOffsetX, startPoint.y - 13 + railingOffsetY)
  lines.lineTo(endPoint.x + railingOffsetX, endPoint.y - 13 + railingOffsetY)
  container.addChild(lines)

  const correctAngle = (-0.57 - offsetAngle) % (Math.PI * 2)
  const safeAngle = correctAngle < 0
    ? correctAngle + Math.PI * 2
    : correctAngle
  const normalizedAngles = safeAngle / (Math.PI * 2)
  const index = Math.round(normalizedAngles * 30).toString().padStart(2, '0')
  let startIndex = withEdgeSticks ? 0 : 1;
  let endIndex = withEdgeSticks ? numberOfRailings : numberOfRailings - 1;
  for (let i = startIndex; i <= endIndex; i ++) {
    const railingSprite = new PIXI.Sprite(PIXI.Texture.from(`track_railing_${index}.png`))
    railingSprite.anchor.set(0.5, 0.95)
    railingSprite.x = startPoint.x + i * modX + railingOffsetX
    railingSprite.y = startPoint.y + i * modY + railingOffsetY
    container.addChild(railingSprite)
  }

  return container
}

export default drawRailingLine
