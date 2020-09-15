import debounce from 'debounce'
import initGame from '~/initGame'
import createItem from './createItem'

const setup = () => {
  const backgroundTexture = PIXI.Texture.from('assets/pure_background_with_traced_images.jpg')
  const startBtnTexture = PIXI.Texture.from('assets/start_btn.png')
  const donateBtnTexture = PIXI.Texture.from('assets/donate_btn.png')
  const dividerTexture = PIXI.Texture.from('assets/divider.png')
  const background = new PIXI.Sprite(backgroundTexture)
  const menuContainer = new PIXI.Container()
  window.app.stage.addChild(menuContainer)
  // TODO: read difference between mesh and shader AND pixi filters

  //==========================================================================================

  menuContainer.addChild(background)

  let itemsToClear = []

  const onResize = () => {
    itemsToClear.forEach(item => menuContainer.removeChild(item))
    window.app.renderer.resize(window.innerWidth, window.innerHeight)
    background.width = window.innerWidth
    background.height = window.innerHeight
    const windowSize = Math.min(window.innerHeight * 1.75, window.innerWidth)

    const startBtn = createItem(
      startBtnTexture,
      backgroundTexture,
      -1.2,
      0.14,
      1.941,
      1.4,
      [-0.137, 0.148, 1.057, 1],
      windowSize,
    )
    startBtn.interactive = true
    startBtn.buttonMode = true
    startBtn.on('pointerover', function() {
      this.tint = 0xaaaaaa
    })
    startBtn.on('pointerout', function() {
      this.tint = 0xffffff
    })
    startBtn.on('click', function() {
      initGame()
    })

    const donateBtn = createItem(
      donateBtnTexture,
      backgroundTexture,
      0.2,
      0.14,
      1.941,
      1.4,
      [0, -0.105, 0.756, 1],
      windowSize,
    )
    donateBtn.interactive = true
    donateBtn.buttonMode = true
    donateBtn.on('pointerover', function() {
      console.log(this.tint)
      // this.tint = 0xaaaaaa
      this.alpha = 0.5
      this.x -= 100
      this.texture = startBtn.texture
    })
    donateBtn.on('pointerout', function() {
      // this.tint = 0xffffff
      this.alpha = 1
      this.x += 100
    })

    const divider = createItem(
      dividerTexture,
      backgroundTexture,
      -0.46,
      0.31,
      0.0697,
      0.5,
      null,
      windowSize,
    )

    itemsToClear = [startBtn, donateBtn, divider]
    menuContainer.addChild(...itemsToClear)
  }

  window.addEventListener('resize', debounce(onResize, 1000))
  onResize()
}

export default setup
