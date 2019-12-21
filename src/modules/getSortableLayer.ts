const getSortableLayer = (background: PIXI.Sprite) => {
  const sortableLayer = new PIXI.display.Group(
    0,
    (sprite: PIXI.Sprite & { zOrder: number }) => {
      sprite.zOrder = sprite.y
    },
  )

  window.app.stage = new PIXI.display.Stage();
  window.app.stage.sortableChildren = true;

  window.app.stage.addChild(background);

  window.app.stage.addChild(new PIXI.display.Layer(sortableLayer));
  return sortableLayer;
}

export default getSortableLayer
