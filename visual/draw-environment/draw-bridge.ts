import drawRailingLine from './draw-railing'
import { DrawEnvResult } from '.'

const trackSideTexture = PIXI.Texture.from('assets/bridge/track-side.jpg')
const trackSurfaceTexture = PIXI.Texture.from('assets/bridge/track-surface.jpg')

/*
  Always points array should be like:
    1. point on one side of the first platform
    2. Connected point but on the second platform
    3. Second point on that second platform
    4. Back to the second point on the first platform
*/

const getSidePoints = (points: Point[]) => {
  const avgNode1 = {
    x: (points[0].x + points[3].x) / 2,
    y: (points[0].y + points[3].y) / 2,
  }
  const avgNode2 = {
    x: (points[1].x + points[2].x) / 2,
    y: (points[1].y + points[2].y) / 2,
  }
  if (avgNode1.x === avgNode2.x) {
    return null
  }
  const angle = Math.atan2(avgNode1.x - avgNode2.x, avgNode2.y - avgNode1.y)
  const factor = ((angle < Math.PI && angle > Math.PI / 2) || (angle < 0 && angle > -Math.PI / 2))
    ? 1
    : -1

  return points[0].x * factor < points[3].x * factor
    ? [points[0], points[1]]
    : [points[2], points[3]]
}

const getSurfaceAndSide = (logicPoints: Point[]): PIXI.Container => {
  const preNormalizedPoints = logicPoints.map(point => {
    const [x, y] = window.convertLogicCoordToVisual(point.x, point.y)
    return { x, y }
  })

  const minX = Math.min(...preNormalizedPoints.map(point => point.x))
  const minY = Math.min(...preNormalizedPoints.map(point => point.y))

  const normalizedPoints = preNormalizedPoints.map(point => ({
    x: point.x - minX,
    y: point.y - minY,
  }))

  const container = new PIXI.Container()

  /* DRAWING SURFACE */
  const bridgeWidth = Math.hypot(logicPoints[0].x - logicPoints[3].x, logicPoints[0].y - logicPoints[3].y)
  const bridgeTextureMaxLength = (bridgeWidth / trackSurfaceTexture.width) * trackSurfaceTexture.height
  const bridgeLength = Math.hypot(logicPoints[0].x - logicPoints[1].x, logicPoints[0].y - logicPoints[1].y)
  const surface = new (PIXI.projection as { TilingSprite2d: any }).TilingSprite2d(
    trackSurfaceTexture,
    trackSurfaceTexture.width,
    trackSurfaceTexture.height,
  )
  surface.proj.mapSprite(surface, normalizedPoints)
  surface.tileScale.x = bridgeTextureMaxLength / bridgeLength
  container.addChild(surface)


  /* DRAWING SIDE */
  const sidePoints = getSidePoints(normalizedPoints)
  if (sidePoints !== null) {
    const side = new (PIXI.projection as { TilingSprite2d: any }).TilingSprite2d(
      trackSideTexture,
      trackSideTexture.width,
      trackSideTexture.height,
    )
    const sideHeight = 35
    const sideTextureMaxLength = (sideHeight / trackSideTexture.height) * trackSideTexture.width
    side.tileScale.x = sideTextureMaxLength / bridgeLength
    side.proj.mapSprite(side, [
      sidePoints[0],
      sidePoints[1],
      { x: sidePoints[1].x, y: sidePoints[1].y + sideHeight },
      { x: sidePoints[0].x, y: sidePoints[0].y + sideHeight },
    ])
    container.addChild(side)
  }

  const pixels = new PIXI.Graphics()
  pixels.beginFill(0xffff00)
  normalizedPoints.forEach(point => {
    pixels.drawRect(point.x - 2, point.y - 2, 4, 4)
  })
  container.addChild(pixels)

  const containerHalfWidth = container.width / 2
  const containerHalfHeight = container.height / 2
  container.children.forEach(child => {
    child.x -= containerHalfWidth
    child.y -= containerHalfHeight
  })

  container.x = containerHalfWidth + minX
  container.y = containerHalfHeight + minY

  return container
}

const getRailings = (logicPoints: Point[]): PIXI.Container[] => {
  const visualPoints = logicPoints.map(point => {
    const [x, y] = window.convertLogicCoordToVisual(point.x, point.y)
    return { x, y }
  })

  const sortableItems = []

  /* DRAWING RAILINGS */
  let railingA: PIXI.Container
  let railingB: PIXI.Container

  const sidePoints = getSidePoints(visualPoints)

  if (sidePoints === null) { // is a vertical bridge
    const [modRailingA, modRailingB] = visualPoints[0].y > visualPoints[1].y
      ? [0.5 * Math.PI, 1.5 * Math.PI]
      : [1.5 * Math.PI, 0.5 * Math.PI]

    railingA = drawRailingLine(visualPoints[0], visualPoints[1], modRailingA)
    railingB = drawRailingLine(visualPoints[2], visualPoints[3], modRailingB)
  } else {
    const secondSide = visualPoints.filter(point => point !== sidePoints[0] && point !== sidePoints[1])

    const sidePointAvg = {
      x: (sidePoints[0].x + sidePoints[1].x) / 2,
      y: (sidePoints[0].y + sidePoints[1].y) / 2,
    }
    const secondSidePointAvg = {
      x: (secondSide[0].x + secondSide[1].x) / 2,
      y: (secondSide[0].y + secondSide[1].y) / 2,
    }
    railingA = drawRailingLine(
      sidePoints[0],
      sidePoints[1],
      Math.atan2(secondSidePointAvg.x - sidePointAvg.x, sidePointAvg.y - secondSidePointAvg.y),
    )
    railingB = drawRailingLine(
      secondSide[0],
      secondSide[1],
      Math.atan2(sidePointAvg.x - secondSidePointAvg.x, secondSidePointAvg.y - sidePointAvg.y),
    )
  }

  sortableItems.push(railingA)
  sortableItems.push(railingB)

  return sortableItems
}

const drawBridge = (logicPoints: Point[]): DrawEnvResult => {
  return {
    background: getSurfaceAndSide(logicPoints),
    sortableItems: getRailings(logicPoints),
  }
}

export default drawBridge