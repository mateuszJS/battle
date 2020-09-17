const getSortableLayer = (background: PIXI.Sprite) => {
  const sortableLayer = new PIXI.display.Group(0, (sprite: PIXI.Sprite & { zOrder: number }) => {
    sprite.zOrder = sprite.y
  })

  window.world = new PIXI.display.Layer(sortableLayer)
  window.ui = new PIXI.Container()

  window.app.stage = new PIXI.display.Stage()

  window.app.stage.addChild(background) // prob should be included in window.world
  window.app.stage.addChild(window.world)
  window.app.stage.addChild(window.ui)
}

export default getSortableLayer
