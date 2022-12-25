import drawRailingLine from './draw-railing'
import getNodePlatformCoords from '~/consts/get-platform-coords'
import { PLATFORM_RADIUS } from 'Constants'
import { DrawEnvResult } from '.'

const platformCoords = getNodePlatformCoords()

const nodePlatformTexture = PIXI.Texture.from('assets/node-platform-shaded.png')

export const getNodePlatform = (
  logicX: number,
  logicY: number,
  width = 2.1 * PLATFORM_RADIUS,
): PIXI.Sprite => {
  const [x, y] = window.convertLogicCoordToVisual(logicX, logicY)
  const nodePlatform = new PIXI.Sprite(nodePlatformTexture)
  const scale = width / nodePlatform.width
  nodePlatform.scale.set(scale)
  nodePlatform.anchor.set(0.5, 0.2)
  nodePlatform.x = x
  nodePlatform.y = y

  return nodePlatform
}

const drawNode = (
  logicX: number,
  logicY: number,
  isBridgesList: boolean[],
  width = 2.1 * PLATFORM_RADIUS,
): DrawEnvResult => {
  const nodePlatform = getNodePlatform(logicX, logicY, width)
  const sortableItems = []
  const pixels = new PIXI.Graphics()

  platformCoords.forEach((point, index) => {
    pixels.beginFill(index === 0 ? 0x00ff00 : 0xff0000)
    const [pointX, pointY] = window.convertLogicCoordToVisual(point.x + logicX, point.y + logicY)
    pixels.drawRect(pointX - 5, pointY - 5, 10, 10)

    const isBridgeIndex = (index) / 2
    if (isBridgesList[isBridgeIndex]) return

    const nextPoint = platformCoords[(index + 1) % platformCoords.length]
    const [nextCoordX, nextCoordY] = window.convertLogicCoordToVisual(nextPoint.x + logicX, nextPoint.y + logicY)
    
    const angleMean = Math.atan2(nextCoordX - pointX, pointY - nextCoordY)

    const railingContainer = drawRailingLine(
      {
        x: pointX,
        y: pointY,
      },
      {
        x: nextCoordX,
        y: nextCoordY,
      },
      angleMean + Math.PI / 2,
      index % 2 === 0,
    )
    sortableItems.push(railingContainer)
  })
  nodePlatform.addChild(pixels)


  return {
    background: nodePlatform,
    sortableItems,
  }
}

export default drawNode