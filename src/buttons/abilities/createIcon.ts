import REPRESENTATION_IDS from '~/render/representationsIds'
import getTexture from '~/getTexture'

const ICON_WIDTH = 62 * 0.9
export const ICON_HEIGHT = 47 * 0.9
const ICON_Y_OFFSET = 120

const progressBarTexture = PIXI.Texture.from('assets/ability_progress_bar.png')

const MAP_ID_TO_ABILITY_DETAILS = {
  [REPRESENTATION_IDS.SOLIDER]: {
    iconNormal: PIXI.Texture.from('assets/grenade_icon_blue.png'),
    iconHover: PIXI.Texture.from('assets/grenade_icon_blue_hover.png'),
  },
  [REPRESENTATION_IDS.RAPTOR]: {
    iconNormal: PIXI.Texture.from('assets/wing_icon_blue.png'),
    iconHover: PIXI.Texture.from('assets/wing_icon_blue_hover.png'),
  },
} as const

export type RepresentationId = keyof typeof MAP_ID_TO_ABILITY_DETAILS

const getDisableIconTexture = (representationId: RepresentationId) => {
  const sprite = new PIXI.Sprite(MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal)
  sprite.width = ICON_WIDTH
  sprite.height = ICON_HEIGHT

  const colorMatrix = new PIXI.filters.ColorMatrixFilter()
  sprite.filters = [colorMatrix]
  colorMatrix.desaturate()

  const container = new PIXI.Container()
  container.addChild(sprite)

  return getTexture(container, ICON_WIDTH, ICON_HEIGHT, {
    texture: false,
  })
}

export type Ability = {
  sprite: PIXI.Sprite
  container: PIXI.Container
  mask: PIXI.Graphics
  disableAbilitySprite: PIXI.Sprite
  progressBar: PIXI.Sprite
  representationId: RepresentationId
  select: VoidFunction
  deselect: VoidFunction
}

const createNewIcon = (
  x: number,
  y: number,
  representationId: RepresentationId,
  onClick: VoidFunction,
): Ability => {
  const container = new PIXI.Container()

  const sprite = new PIXI.Sprite(MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal)
  sprite.width = ICON_WIDTH
  sprite.height = ICON_HEIGHT
  container.addChild(sprite)

  const mask = new PIXI.Graphics()
  mask.beginFill(0xff0000)
  mask.drawRect(0, 0, ICON_WIDTH, ICON_HEIGHT)
  mask.scale.set(1, 0.5)
  mask.visible = false
  mask.pivot.set(0, ICON_HEIGHT)
  mask.y = ICON_HEIGHT
  container.addChild(mask)

  const disableAbilitySprite = new PIXI.Sprite(getDisableIconTexture(representationId))
  disableAbilitySprite.width = ICON_WIDTH
  disableAbilitySprite.height = ICON_HEIGHT
  disableAbilitySprite.mask = mask
  disableAbilitySprite.visible = false
  container.addChild(disableAbilitySprite)

  const progressBar = new PIXI.Sprite(progressBarTexture)
  progressBar.width = ICON_WIDTH * 1.1
  progressBar.height = ICON_WIDTH * 0.1
  progressBar.pivot.set(0, progressBar.height / 2)
  progressBar.x = -ICON_WIDTH * 0.05
  progressBar.visible = false
  container.addChild(progressBar)
  container.pivot.set(ICON_WIDTH / 2, ICON_Y_OFFSET)
  container.x = x
  container.y = y
  container.interactive = true
  container.buttonMode = true

  container.on('mouseover', function() {
    sprite.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconHover
  })
  container.on('mouseout', function() {
    sprite.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal
  })

  container.on('mouseup', function(event) {
    event.stopPropagation()
    onClick()
  })

  container.on('mousedown', function(event) {
    event.stopPropagation()
  })

  window.ui.addChild(container)

  const select = () => {
    container.interactive = false // to disable changing texture by hover (and unhover)
    sprite.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconHover
  }
  const deselect = () => {
    console.log('deselect')
    container.interactive = true // can hover now
    sprite.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal
  }

  return {
    sprite,
    container,
    mask,
    disableAbilitySprite,
    progressBar,
    representationId,
    select,
    deselect,
  }
}

export default createNewIcon
