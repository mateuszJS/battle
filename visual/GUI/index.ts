// import debounce from 'debounce'
// import createItem from './createItem'
// import blendColorBurn from './blendColorBurn'
// import hoverMesh from './hoverMesh'
import mapCreator from 'map-creator'

import { drawSpritesProgram } from 'webgl/programs'
import render from 'webgl/renders/renderSprite'
import { TEXTURES_CACHE } from 'webgl/textures'

import { instantiate } from "@assemblyscript/loader"
// import type * as ExportedWasmModule from '../../logic'
import { WasmModule } from 'initGame'

export default function setup() {
  mapCreator()
  return
  drawSpritesProgram.setup({
    texUnitIndex: TEXTURES_CACHE.GUIbackground.bind(0),
  })
  render(null)

  drawSpritesProgram.setup({
    texUnitIndex: TEXTURES_CACHE.GUIdivider.bind(0),
    position: TEXTURES_CACHE.GUIdivider.getPositionCenter(
      window.gl.drawingBufferWidth * .5,
      window.gl.drawingBufferHeight * .5,
      window.gl.drawingBufferWidth * .025,
    ),
  })
  render(null)

  drawSpritesProgram.setup({
    texUnitIndex: TEXTURES_CACHE.GUIstartBtn.bind(0),
    position: TEXTURES_CACHE.GUIstartBtn.getPositionCenter(
      window.gl.drawingBufferWidth * .22,
      window.gl.drawingBufferHeight * .3,
      window.gl.drawingBufferWidth * .3,
    ),
  })
  render(null)

  drawSpritesProgram.setup({
    texUnitIndex: TEXTURES_CACHE.GUIdonateBtn.bind(0),
    position: TEXTURES_CACHE.GUIdonateBtn.getPositionCenter(
      window.gl.drawingBufferWidth * .22,
      window.gl.drawingBufferHeight * .65,
      window.gl.drawingBufferWidth * .3,
    ),
  })
  render(null)

  // const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images.jpg')
  // const startBtnPrimaryTexture = PIXI.Texture.from('assets/start_btn.png')
  // const startBtnPrimaryHoverTexture = PIXI.Texture.from('assets/btnStartHover.png')
  // const donateBtnPrimaryTexture = PIXI.Texture.from('assets/donate_btn.png')
  // const dividerPrimaryTexture = PIXI.Texture.from('assets/divider.png')

  // const background = new PIXI.Sprite(backgroundTexture)
  // const menuContainer = new PIXI.Container()
  // // TODO: read difference between mesh and shader AND pixi filters

  // window.app.stage.addChild(menuContainer)
  // menuContainer.addChild(background)

  // const handleResize = debounce(onResize, 500, undefined)
  // window.addEventListener('resize', handleResize)

  const startGame = (wasmModule: WasmModule) => {
    // window.removeEventListener('resize', handleResize)
    mapCreator()
    // menuContainer.visible = false
  }

  let startWhenLoaded = false
  let wasmModule: null | WasmModule = null

  const loadWasmModule = async () => {
    // not sure if I recall, but wasm cannot be loaded in initial chunk?
    // GUI setup is not the best place for loading wasm from DX
    const response = await instantiate<any>(fetch("/logic-build/index.wasm"));
    // const response = await instantiate<typeof ExportedWasmModule>(fetch("/logic-build/index.wasm"));
    wasmModule = response.exports as unknown as WasmModule
    if (startWhenLoaded) {
      startGame(wasmModule)
    }
  }

  setTimeout(mapCreator, 3000)

  // const onClickStart = () => {
  //   if (wasmModule) {
  //     startGame(wasmModule)
  //   } else {
  //     startWhenLoaded = true
  //   }
  // }

  // let itemsToClear: PIXI.Mesh[] = []

  // function onResize() {
  //   itemsToClear.forEach(item => menuContainer.removeChild(item))
  //   window.app.renderer.resize(window.innerWidth, window.innerHeight)
  //   background.width = window.innerWidth
  //   background.height = window.innerHeight
  //   const windowSize = Math.min(window.innerHeight * 1.75, window.innerWidth)

  //   /* ====== CREATING GEOMETRY AND TEXTURES NEEDED FOR COLOR BURN SHADER ======= */
  //   const { geometry: startBtnGeometry, texture: startBtnTexture } = createItem(
  //     startBtnPrimaryTexture,
  //     backgroundTexture,
  //     -1.2,
  //     0.14,
  //     1.941,
  //     1.4,
  //     [-0.137, 0.148, 1.057, 1],
  //     windowSize,
  //   )

  //   const { texture: startBtnHoverTexture } = createItem(
  //     startBtnPrimaryHoverTexture,
  //     backgroundTexture,
  //     -1.2,
  //     0.14,
  //     1.941,
  //     1.4,
  //     [-0.137, 0.148, 1.057, 1],
  //     windowSize,
  //     {
  //       distance: 0,
  //       blur: 3,
  //       alpha: 2,
  //       quality: 5,
  //       color: 0xff0000,
  //     },
  //   )
  //   const { mesh: startBtnHoverMesh, shader } = hoverMesh(startBtnHoverTexture, startBtnGeometry, 1)
  //   // const startBtnHoverMesh = new Sprite(startBtnHoverTexture)

  //   const { geometry: donateBtnGeometry, texture: donateBtnTexture } = createItem(
  //     donateBtnPrimaryTexture,
  //     backgroundTexture,
  //     0.2,
  //     0.14,
  //     1.941,
  //     1.4,
  //     [0, -0.105, 0.756, 1],
  //     windowSize,
  //   )

  //   const { geometry: dividerGeometry, texture: dividerTexture } = createItem(
  //     dividerPrimaryTexture,
  //     backgroundTexture,
  //     -0.46,
  //     0.31,
  //     0.0697,
  //     0.5,
  //     null,
  //     windowSize,
  //   )

  //   /* ====== CREATING GEMOTERY AND TEXTURES NEEDED FOR COLOR BURN SHADER ======= */
  //   const startBtnMesh = blendColorBurn(startBtnTexture, backgroundTexture, startBtnGeometry, false)
  //   const donateBtnMesh = blendColorBurn(
  //     donateBtnTexture,
  //     backgroundTexture,
  //     donateBtnGeometry,
  //     false,
  //   )
  //   const dividerMesh = blendColorBurn(dividerTexture, backgroundTexture, dividerGeometry, false)
  //   const startBtnMeshAccent = blendColorBurn(
  //     startBtnTexture,
  //     backgroundTexture,
  //     startBtnGeometry,
  //     true,
  //   )
  //   const donateBtnMeshAccent = blendColorBurn(
  //     donateBtnTexture,
  //     backgroundTexture,
  //     donateBtnGeometry,
  //     true,
  //   )
  //   let time = 0
  //   const startBtnAccentAlphaFilter = new PIXI.filters.AlphaFilter(0)
  //   const donateBtnAccentAlphaFilter = new PIXI.filters.AlphaFilter(0)

  //   startBtnMeshAccent.filters = [startBtnAccentAlphaFilter]
  //   donateBtnMeshAccent.filters = [donateBtnAccentAlphaFilter]

  //   let startBtnHoverFactor = 0
  //   let isStartBtnHover = false

  //   window.app.ticker.add((delta: number) => {
  //     startBtnHoverFactor = Math.clamp(
  //       startBtnHoverFactor + (isStartBtnHover ? 0.007 : -0.012),
  //       0,
  //       1,
  //     )
  //     // if (startBtnHoverFactor !== shader.uniforms.factor) {
  //     shader.uniforms.factor = startBtnHoverFactor
  //     // }
  //     // shader.uniforms.factor = (time % 100) / 100
  //     time++
  //     startBtnAccentAlphaFilter.alpha = (Math.sin(time / 30) - 0.5) * 2
  //     donateBtnAccentAlphaFilter.alpha = (Math.cos(time / 30) - 0.5) * 2
  //   })

  //   // startBtnMeshHover.visible = false
  //   // donateBtnMeshHover.visible = false

  //   const interactiveItems = [
  //     startBtnMesh,
  //     donateBtnMesh,
  //     startBtnMeshAccent,
  //     donateBtnMeshAccent,
  //     startBtnHoverMesh,
  //   ]
  //   interactiveItems.forEach(item => {
  //     item.interactive = true
  //     item.buttonMode = true
  //   })

  //   startBtnHoverMesh.on('pointerover', function() {
  //     isStartBtnHover = true
  //   })
  //   startBtnHoverMesh.on('pointerout', function() {
  //     isStartBtnHover = false
  //   })
  //   startBtnHoverMesh.on('click', onClickStart)

  //   // donateBtnMesh.on('pointerover', function() {
  //   // })
  //   // donateBtnMesh.on('pointerout', function() {
  //   // })

  //   itemsToClear = [...interactiveItems, dividerMesh]
  //   menuContainer.addChild(...itemsToClear)
  // }

  // onResize()
}
