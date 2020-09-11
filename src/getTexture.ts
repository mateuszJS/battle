const getTexture = (
  display: PIXI.Sprite | PIXI.Container | PIXI.Mesh,
  width: number,
  height: number,
  destroyProps: Parameters<PIXI.Container['destroy']>[0] = {},
) => {
  const baseRenderTexture = new PIXI.BaseRenderTexture({
    width,
    height,
    scaleMode: PIXI.SCALE_MODES.LINEAR,
    resolution: 1,
  })
  const renderTexture = new PIXI.RenderTexture(baseRenderTexture)
  window.app.renderer.render(display, renderTexture)

  display.destroy({
    children: true,
    texture: true,
    baseTexture: true,
    ...destroyProps,
  })

  return renderTexture
}

export default getTexture
