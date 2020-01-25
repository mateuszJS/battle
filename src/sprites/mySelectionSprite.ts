export default () => () => {
  const selection = new PIXI.Sprite(
    window.app.loader.resources['assets/selectMyUnit.png'].texture,
  )
  selection.visible = false
  selection.scale.set(0.5)
  selection.anchor.set(0.5, 0.5)
  return selection
}
