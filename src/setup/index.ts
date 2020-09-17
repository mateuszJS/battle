import debounce from 'debounce'
import initGame from '~/initGame'
import createItem from './createItem'
import blendColorBurn from './blendColorBurn'

const setup = () => {
  const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images.jpg')
  const startBtnPrimaryTexture = PIXI.Texture.from('assets/start_btn.png')
  const donateBtnPrimaryTexture = PIXI.Texture.from('assets/donate_btn.png')
  const dividerPrimaryTexture = PIXI.Texture.from('assets/divider.png')
  const background = new PIXI.Sprite(backgroundTexture)
  const menuContainer = new PIXI.Container()
  // TODO: read difference between mesh and shader AND pixi filters

  window.app.stage.addChild(menuContainer)
  menuContainer.addChild(background)

  const handleResize = debounce(onResize, 1000)
  window.addEventListener('resize', handleResize)

  const onClickStart = () => {
    window.removeEventListener('resize', handleResize)
    initGame()
    menuContainer.visible = false
  }

  let itemsToClear = []

  function onResize() {
    itemsToClear.forEach(item => menuContainer.removeChild(item))
    window.app.renderer.resize(window.innerWidth, window.innerHeight)
    background.width = window.innerWidth
    background.height = window.innerHeight
    const windowSize = Math.min(window.innerHeight * 1.75, window.innerWidth)

    /* ====== CREATING GEMOTERY AND TEXTURES NEEDED FOR COLOR BURN SHADER ======= */
    const { geometry: startBtnGeometry, texture: startBtnTexture } = createItem(
      startBtnPrimaryTexture,
      backgroundTexture,
      -1.2,
      0.14,
      1.941,
      1.4,
      [-0.137, 0.148, 1.057, 1],
      windowSize,
    )

    const { geometry: donateBtnGeometry, texture: donateBtnTexture } = createItem(
      donateBtnPrimaryTexture,
      backgroundTexture,
      0.2,
      0.14,
      1.941,
      1.4,
      [0, -0.105, 0.756, 1],
      windowSize,
    )

    const { geometry: dividerGeometry, texture: dividerTexture } = createItem(
      dividerPrimaryTexture,
      backgroundTexture,
      -0.46,
      0.31,
      0.0697,
      0.5,
      null,
      windowSize,
    )

    /* ====== CREATING GEMOTERY AND TEXTURES NEEDED FOR COLOR BURN SHADER ======= */
    const startBtnMesh = blendColorBurn(startBtnTexture, backgroundTexture, startBtnGeometry, false)
    const donateBtnMesh = blendColorBurn(
      donateBtnTexture,
      backgroundTexture,
      donateBtnGeometry,
      false,
    )
    const dividerMesh = blendColorBurn(dividerTexture, backgroundTexture, dividerGeometry, false)
    const startBtnMeshHover = blendColorBurn(
      startBtnTexture,
      backgroundTexture,
      startBtnGeometry,
      true,
    )
    const donateBtnMeshHover = blendColorBurn(
      donateBtnTexture,
      backgroundTexture,
      donateBtnGeometry,
      true,
    )
    let time = 0
    const startBtnAlphaFilter = new PIXI.filters.AlphaFilter(0)
    const donateBtnAlphaFilter = new PIXI.filters.AlphaFilter(0)

    startBtnMeshHover.filters = [startBtnAlphaFilter]
    donateBtnMeshHover.filters = [donateBtnAlphaFilter]

    window.app.ticker.add((delta: number) => {
      time++
      startBtnAlphaFilter.alpha = (Math.sin(time / 50) - 0.8) * 3.030303
      donateBtnAlphaFilter.alpha = (Math.cos(time / 50) - 0.8) * 3.030303
    })

    // startBtnMeshHover.visible = false
    // donateBtnMeshHover.visible = false

    const interactiveItems = [startBtnMesh, donateBtnMesh, startBtnMeshHover, donateBtnMeshHover]
    interactiveItems.forEach(item => {
      item.interactive = true
      item.buttonMode = true
    })

    startBtnMesh.on('pointerover', function() {
      startBtnMesh.visible = false
      startBtnMeshHover.visible = true
    })
    startBtnMeshHover.on('pointerout', function() {
      startBtnMesh.visible = true
      startBtnMeshHover.visible = false
    })
    startBtnMeshHover.on('click', onClickStart)

    donateBtnMesh.on('pointerover', function() {
      donateBtnMesh.visible = false
      donateBtnMeshHover.visible = true
    })
    donateBtnMeshHover.on('pointerout', function() {
      donateBtnMesh.visible = true
      donateBtnMeshHover.visible = false
    })

    itemsToClear = [...interactiveItems, dividerMesh]
    menuContainer.addChild(...itemsToClear)
  }

  onResize()
}

export default setup
