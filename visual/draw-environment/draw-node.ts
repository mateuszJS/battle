import drawRailingLine from './draw-railing'
import getNodePlatformCoords from '~/consts/get-platform-coords'
import { PLATFORM_RADIUS } from 'Constants'

const platformCoords = getNodePlatformCoords()

const nodePlatformTexture = PIXI.Texture.from('assets/node-platform.png')
let container: PIXI.Container | null = null

const drawNode = (
  logicX: number,
  logicY: number,
  isBridgesList: boolean[],
  width = 2.1 * PLATFORM_RADIUS,
) => {
  // if (container) {
  //   window.world.removeChild(container)
  // }
  container = new PIXI.Container()

  const [x, y] = window.convertLogicCoordToVisual(logicX, logicY)
  const nodePlatform = new PIXI.Sprite(nodePlatformTexture)
  const scale = width / nodePlatform.width
  nodePlatform.scale.set(scale)
  nodePlatform.anchor.set(0.5, 0.2)

  container.addChild(nodePlatform)
  // window.world.addChild(container)

  const pixels = new PIXI.Graphics()
  const radius = width * 0.483
  const yOffset = width * 0.375

  platformCoords.forEach((point, index) => {

    pixels.beginFill(index === 0 ? 0x00ff00 : 0xff0000)
    // const pointX = point.x * radius + x
    // const pointY = point.y * 0.52 * radius + y - yOffset
    const [pointX, pointY] = window.convertLogicCoordToVisual(point.x + logicX, point.y + logicY)
    pixels.drawRect(pointX - 5, pointY - 5, 10, 10)

    const isBridgeIndex = (index) / 2
    if (isBridgesList[isBridgeIndex]) return
    // console.log(pointX, pointY)
    const nextPoint = platformCoords[(index + 1) % platformCoords.length]
    const [nextCoordX, nextCoordY] = window.convertLogicCoordToVisual(nextPoint.x + logicX, nextPoint.y + logicY)
    
    const angleMean = Math.atan2(nextCoordX - pointX, pointY - nextCoordY)

    container.addChild(drawRailingLine(
      {
        x: pointX - x,
        y: pointY - y,
      },
      {
        x: nextCoordX - x,
        y: nextCoordY - y, //  * 0.52 * radius + y - yOffset,
      },
      angleMean + Math.PI / 2,
      index % 2 === 0,
    ))
    // draw connection to the next point
  })
  container.addChild(pixels)

  container.x = x
  container.y = y

  return {
    graphic: container,
    // points: geom.map()
  }
}

export default drawNode