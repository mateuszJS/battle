import getTexture from '~/getTexture'

const createBackgroundTexture = (mapPoints: Point[]) => {
  const rect = new PIXI.Graphics()
  rect.beginFill(0x444, 1)
  rect.drawRect(0, 0, 1, 1)
  const rectTexture = getTexture(rect, 1, 1)

  const map = new (PIXI.projection as { Sprite2d: any }).Sprite2d(rectTexture)
  map.proj.mapSprite(map, mapPoints)

  return map
}

export default createBackgroundTexture

