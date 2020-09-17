import createEntityTexture from './createEntityTexture'

let entityTexture: PIXI.RenderTexture
let container: PIXI.Container
let factionsContainersList: { [key: number]: PIXI.Container } = {}
let lastContainer: PIXI.Container

export const setupInfluenceMap = () => {
  entityTexture = createEntityTexture()
}

export const updateInfluenceMap = (influence: Float32Array) => {
  window.world.removeChild(container)
  container = new PIXI.Container()
  factionsContainersList = {}
  let checkedFactions = 0

  let i = 0
  while (i < influence.length) {
    if (influence[i] === -1) {
      lastContainer = new PIXI.Container()
      factionsContainersList[influence[i + 1]] = lastContainer
      container.addChild(lastContainer)
      checkedFactions++
      i += 2
    } else {
      const sprite = new PIXI.Sprite(entityTexture)
      sprite.anchor.set(0.5, 0.5)
      sprite.width = influence[i + 3]
      sprite.height = influence[i + 3]
      sprite.alpha = influence[i + 2]
      sprite.x = influence[i]
      sprite.y = influence[i + 1]
      sprite.tint = checkedFactions === 1 ? 0x00ff00 : 0xff0000
      lastContainer.addChild(sprite)
      i += 4
    }
  }
  console.log(window.app.renderer.extract.pixels(lastContainer))
  // we have to create texture with added all the units
  // then create for each faction all - faction
  // then for each squad in the faction (or for each army(?)) we should calculate value of the each pixel
  // then just choose pixel with the highest value, get index, calc x and y

  // to figure out, somehow we have to know id of the squads under the pixels
  window.world.addChild(container)
}
