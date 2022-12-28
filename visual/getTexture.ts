// const getTexture = (
//   display: PIXI.Sprite | PIXI.Container | PIXI.Mesh | PIXI.Graphics,
//   width: number,
//   height: number,
//   destroyProps: Parameters<PIXI.Container['destroy']>[0] = {},
//   x = 0,
//   y = 0,
// ) => {
//   const baseRenderTexture = new PIXI.BaseRenderTexture({
//     width,
//     height,
//     scaleMode: PIXI.SCALE_MODES.LINEAR,
//     resolution: 1,
//   })
//   display.x -= x // we should do it in transform, it's parameter of the `render` function
//   display.y -= y
//   const renderTexture = new PIXI.RenderTexture(baseRenderTexture)
//   window.app.renderer.render(display, renderTexture) // TODO: can be changed to this.renderer.generateTexture(target);

//   display.destroy({
//     children: true,
//     texture: true,
//     baseTexture: true,
//     ...destroyProps,
//   })

//   return renderTexture
// }

// export default getTexture
