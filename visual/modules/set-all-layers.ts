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

const setAllLayers = (mapPoints: Point[]): void => {
  const sortableLayer = new PIXI.display.Group(0, (sprite: PIXI.Sprite & { zOrder: number }) => {
    sprite.zOrder = sprite.y
  })

  window.world = new PIXI.display.Layer(sortableLayer)
  window.smallPieces = new PIXI.Container()
  window.ui = new PIXI.Container()

  window.app.stage = new PIXI.display.Stage()
  const background = createBackgroundTexture(mapPoints)
  window.app.stage.addChild(background) // prob should be included in window.world
  window.app.stage.addChild(window.world)
  window.app.stage.addChild(window.smallPieces)
  window.app.stage.addChild(window.ui)

  window.updateBackground = (sprite: PIXI.Sprite, isAlreadySkew = false): void => {
    background.addChild(sprite)
    // const rectTexture = getTexture(background, 1, 1)
  }
}

export default setAllLayers
