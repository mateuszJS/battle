import getTexture from '~/getTexture'

const getPerspectiveTexture = (sprite2d: PIXI.projection.Sprite2d, yOffsetsNormal: number[]) => {
  const { width, height } = sprite2d
  const yPoints = yOffsetsNormal.map(value => value * height)
  const minY = Math.min(...yPoints)
  const maxY = Math.max(...yPoints)
  const maxHeight = maxY - minY
  const yPointsFromZero = yPoints.map(value => value - minY) // have to be positive value

  sprite2d.proj.mapSprite(sprite2d, [
    { x: 0, y: yPointsFromZero[0] },
    { x: width, y: yPointsFromZero[1] },
    { x: width, y: yPointsFromZero[2] },
    { x: 0, y: yPointsFromZero[3] },
  ])

  return getTexture(sprite2d, width, maxHeight)
}

export default getPerspectiveTexture
