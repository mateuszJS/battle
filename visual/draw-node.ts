import drawRailingLine from './draw-railing'

const nodePlatformTexture = PIXI.Texture.from('assets/node-platform.png')

let container = null

const bridgeAngle = 53.6 * Math.PI / 180
const diagonallyAngle = 37 * Math.PI / 180

let tempAngle = - bridgeAngle / 2 - 0.65 // -25.5 * Math.PI / 180
const geom = Array.from({ length: 8 }, (_, index) => {
  tempAngle += index % 2 === 0 ? bridgeAngle : diagonallyAngle

  return {
    x: Math.sin(tempAngle),
    y: -Math.cos(tempAngle) * 0.52,
    angle: tempAngle,
  }
})

const DEFAULT_NODE_PLATFORM_TEXTURE_WIDTH = 600

const drawNode = (
  x: number,
  y: number,
  isBridgesList: boolean[],
  width = DEFAULT_NODE_PLATFORM_TEXTURE_WIDTH,
) => {
  if (container) {
    window.world.removeChild(container)
  }
  container = new PIXI.Container()
  const nodePlatform = new PIXI.Sprite(nodePlatformTexture)
  const scale = width / nodePlatform.width
  nodePlatform.scale.set(scale)
  nodePlatform.anchor.set(0.5)

  nodePlatform.x = x
  nodePlatform.y = y
  container.addChild(nodePlatform)
  window.world.addChild(container)

  const pixels = new PIXI.Graphics()
  const radius = width * 0.483
  const yOffset = width * 0.375
  geom.forEach((point, index) => {

    pixels.beginFill(index === 0 ? 0x00ff00 : 0xff0000)
    const pointX = point.x * radius + x
    const pointY = point.y * radius + y - yOffset
    pixels.drawRect(pointX - 5, pointY - 5, 10, 10)

    const nextGeom = geom[(index + 1) % geom.length]

    const sinMean = (Math.sin(point.angle) + Math.sin(nextGeom.angle)) / 2
    const cosMean = (Math.cos(point.angle) + Math.cos(nextGeom.angle)) / 2
    const angleMean = Math.atan2(sinMean, cosMean)
    const isBridgeIndex = (index - 1) / 2
    if (isBridgesList[isBridgeIndex]) return
    container.addChild(drawRailingLine(
      {
        x: pointX,
        y: pointY,
      },
      {
        x: nextGeom.x * radius + x,
        y: nextGeom.y * radius + y - yOffset,
      },
      angleMean + Math.PI,
      index % 2 === 0,
    ))
    // draw connection to the next point
  })
  container.addChild(pixels)
  window.world.addChild(container)
}

export default drawNode