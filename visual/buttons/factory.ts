import REPRESENTATION_IDS from '~/render/representationsIds'

const ICON_SIZE = 50

const MAP_ID_TO_RESOURCE = {
  [REPRESENTATION_IDS.SOLIDER]: 'assets/soliderRegularAvatar.png',
  [REPRESENTATION_IDS.RAPTOR]: 'assets/soliderRegularAvatar.png',
} as const

type RepresentationId = keyof typeof MAP_ID_TO_RESOURCE

type Icons = {
  buyListContainer: PIXI.Container
  productionListContainer: PIXI.Container
  buyList: Array<{
    sprite: PIXI.Sprite
    representationId: RepresentationId
  }>
  productionList: PIXI.Sprite[]
}

const icons: Icons = {
  buyListContainer: new PIXI.Container(),
  productionListContainer: new PIXI.Container(),
  buyList: [],
  productionList: [],
}

function mouseOver() {
  this.alpha = 0.8
}

function mouseOut() {
  this.alpha = 1
}

const addNewIcon = (
  x: number,
  y: number,
  representationId: RepresentationId,
  onClick?: VoidFunction,
) => {
  const icon = new PIXI.Sprite(PIXI.Texture.from(MAP_ID_TO_RESOURCE[representationId]))
  icon.x = x
  icon.y = y
  icon.width = ICON_SIZE
  icon.height = ICON_SIZE
  icon.interactive = true
  icon.buttonMode = true
  icon.on('mouseover', mouseOver)
  icon.on('mouseout', mouseOut)

  if (onClick) {
    icon.on('mousedown', function(event) {
      event.stopPropagation()
    })
    icon.on('mouseup', function(event) {
      event.stopPropagation()
      onClick()
    })
  }

  return icon
}

const addItemToBuyList = (
  representationId: RepresentationId,
  createItemCallback: (representationId: RepresentationId) => void,
) => {
  const sprite = addNewIcon(icons.buyList.length * ICON_SIZE, 0, representationId, () =>
    createItemCallback(representationId),
  )
  icons.buyList.push({
    representationId,
    sprite,
  })

  icons.buyListContainer.addChild(sprite)
}

export const createFactoryButtons = (
  x: number,
  y: number,
  createItemCallback: (representationId: RepresentationId) => void,
) => {
  icons.buyListContainer.x = x
  icons.buyListContainer.y = y
  window.ui.addChild(icons.buyListContainer)

  icons.productionListContainer.x = x
  icons.productionListContainer.y = y + ICON_SIZE
  window.ui.addChild(icons.productionListContainer)

  addItemToBuyList(REPRESENTATION_IDS.SOLIDER, createItemCallback)
  addItemToBuyList(REPRESENTATION_IDS.RAPTOR, createItemCallback)
}

export const addItemToProductionLine = (index: number, type: number) => {
  if (icons.productionList[index]) return

  const icon = addNewIcon(icons.productionList.length * ICON_SIZE, 0, type as RepresentationId)
  icons.productionList[index] = icon
  icons.productionListContainer.addChild(icon)
}

export const removeItemFromProductionLine = (index: number) => {
  if (icons.productionList[index]) {
    icons.productionListContainer.removeChild(icons.productionList[index])
    icons.productionList.splice(index, 1)
  }
}

export const updateItemInProductionLine = (progress: number) => {
  icons.productionList[0].alpha = progress
}
