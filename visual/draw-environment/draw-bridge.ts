import drawRailingLine from './draw-railing'

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

// let container = null

const drawBridge = (points: Point[]): PIXI.Container => {
  // if (container) {
  //   window.world.removeChild(container)
  // }
  const container = new PIXI.Container()

  /* DRAWING SURFACE */
  const bridgeWidth = Math.hypot(points[0].x - points[3].x, points[0].y - points[3].y)
  const bridgeTextureMaxLength = (bridgeWidth / trackSurfaceTexture.width) * trackSurfaceTexture.height
  const bridgeLength = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y)
  const surface = new (PIXI.projection as { TilingSprite2d: any }).TilingSprite2d(
    trackSurfaceTexture,
    trackSurfaceTexture.width,
    trackSurfaceTexture.height,
  )
  surface.proj.mapSprite(surface, points)
  surface.tileScale.x = bridgeTextureMaxLength / bridgeLength
  container.addChild(surface)

  /* DRAWING SIDE */
  const sidePoints = getSidePoints(points)
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

  /* DRAWING RAILINGS */
  if (sidePoints === null) { // is a vertical bridge
    const [modRailingA, modRailingB] = points[0].y > points[1].y
      ? [0.5 * Math.PI, 1.5 * Math.PI]
      : [1.5 * Math.PI, 0.5 * Math.PI]

    drawRailingLine(points[0], points[1], modRailingA)
    drawRailingLine(points[2], points[3], modRailingB)
  } else {
    const secondSide = points.filter(point => point !== sidePoints[0] && point !== sidePoints[1])

    const sidePointAvg = {
      x: (sidePoints[0].x + sidePoints[1].x) / 2,
      y: (sidePoints[0].y + sidePoints[1].y) / 2,
    }
    const secondSidePointAvg = {
      x: (secondSide[0].x + secondSide[1].x) / 2,
      y: (secondSide[0].y + secondSide[1].y) / 2,
    }
    container.addChild(
      drawRailingLine(
        sidePoints[0],
        sidePoints[1],
        Math.atan2(secondSidePointAvg.x - sidePointAvg.x, sidePointAvg.y - secondSidePointAvg.y),
      )
    )
    container.addChild(
      drawRailingLine(
        secondSide[0],
        secondSide[1],
        Math.atan2(sidePointAvg.x - secondSidePointAvg.x, secondSidePointAvg.y - sidePointAvg.y),
      )
    )
  }

  const pixels = new PIXI.Graphics()
  pixels.beginFill(0xff0000)
  points.forEach(point => {
    pixels.drawRect(point.x - 5, point.y - 5, 10, 10)
  })
  container.addChild(pixels)
  // window.world.addChild(container)
  return container
}

export default drawBridge