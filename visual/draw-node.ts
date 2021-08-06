import drawRailingLine from './draw-railing'
import nodePlatformCoords from '~/consts/node-platform-coords'

const nodePlatformTexture = PIXI.Texture.from('assets/node-platform.png')
let container = null
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
  nodePlatformCoords.forEach((point, index) => {

    pixels.beginFill(index === 0 ? 0x00ff00 : 0xff0000)
    const pointX = point.x * radius + x
    const pointY = point.y * 0.52 * radius + y - yOffset
    pixels.drawRect(pointX - 5, pointY - 5, 10, 10)

    const nextCoord = nodePlatformCoords[(index + 1) % nodePlatformCoords.length]
    
    const sinMean = (Math.sin(point.angle) + Math.sin(nextCoord.angle)) / 2
    const cosMean = (Math.cos(point.angle) + Math.cos(nextCoord.angle)) / 2
    const angleMean = Math.atan2(sinMean, cosMean)
    const isBridgeIndex = (index - 1) / 2
    if (isBridgesList[isBridgeIndex]) return
    container.addChild(drawRailingLine(
      {
        x: pointX,
        y: pointY,
      },
      {
        x: nextCoord.x * radius + x,
        y: nextCoord.y * 0.52 * radius + y - yOffset,
      },
      angleMean + Math.PI,
      index % 2 === 0,
    ))
    // draw connection to the next point
  })
  container.addChild(pixels)

  return {
    graphic: container,
    // points: geom.map()
  }
}

export default drawNode