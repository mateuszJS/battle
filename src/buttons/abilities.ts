import REPRESENTATION_IDS from '~/render/representationsIds'
import { UniverseRepresentation } from '~/setup'
import Unit from '~/representation/Unit'

const ICON_WIDTH = 62 * 0.9
const ICON_HEIGHT = 47 * 0.9
const ICON_VERTICAL_OFFSET = -120

// const progressBarTexture = PIXI.Texture.from('assets/ability_progress_bar.png')
const progressBarTexture = PIXI.Texture.from('assets/ability_progress_bar_saturated.png')

const MAP_ID_TO_ABILITY_DETAILS = {
  [REPRESENTATION_IDS.SOLIDER]: {
    // +1 just to don't overlap
    iconNormal: PIXI.Texture.from('assets/grenade_icon_blue.png'),
    iconHover: PIXI.Texture.from('assets/grenade_icon_blue_hover.png'),
    iconDisabled: PIXI.Texture.from('assets/grenade_icon_blue_greyscale.png'),
    renewTimeTotal: 1200,
  },
  [REPRESENTATION_IDS.RAPTOR]: {
    iconNormal: PIXI.Texture.from('assets/wing_icon_blue.png'),
    iconHover: PIXI.Texture.from('assets/wing_icon_blue_hover.png'),
    iconDisabled: PIXI.Texture.from('assets/wing_icon_blue_greyscale.png'),
    renewTimeTotal: 1200,
  },
} as const

type RepresentationId = keyof typeof MAP_ID_TO_ABILITY_DETAILS

type Ability = {
  unitsIds: number[]
  sprite: PIXI.Sprite
  container: PIXI.Container
  mask: PIXI.Graphics
  disableAbilitySprite: PIXI.Sprite
  progressBar: PIXI.Sprite
  squadId: number
  type: RepresentationId
  renewTime: number
  renewTimeTotal: number
}

let abilities: {
  [key: number]: Ability
} = {}

const addNewIcon = (
  x: number,
  y: number,
  representationId: RepresentationId,
  onClick: VoidFunction,
) => {
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

  const disableAbilitySprite = new PIXI.Sprite(
    MAP_ID_TO_ABILITY_DETAILS[representationId].iconDisabled,
  )
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

  return { sprite, container, mask, disableAbilitySprite, progressBar }
}

const getAbilityIconPosition = (
  universeRepresentation: UniverseRepresentation,
  unitsIds: number[],
) => {
  const positionsSum = unitsIds.reduce(
    (result, unitId) => {
      const unit = universeRepresentation[unitId] as Unit
      if (!unit) return result
      return {
        x: result.x + unit.graphics.x,
        y: result.y + unit.graphics.y,
        number: result.number + 1,
      }
    },
    { x: 0, y: 0, number: 0 } as { x: number; y: number; number: number },
  )

  return {
    x: positionsSum.x / positionsSum.number - ICON_WIDTH / 2,
    y: positionsSum.y / positionsSum.number + ICON_VERTICAL_OFFSET,
  }
}

export const addAbilitiesButton = (
  universeRepresentation: UniverseRepresentation,
  units: number[][],
  squadsIds: Float32Array,
  selectAbility: (abilityId: number) => void,
) => {
  let squadsIdsIndex = 0
  units.forEach(sameSquadUnits => {
    const position = getAbilityIconPosition(universeRepresentation, sameSquadUnits)
    const squadId = squadsIds[squadsIdsIndex]
    squadsIdsIndex++

    if (!abilities[squadId]) {
      const unit = universeRepresentation[sameSquadUnits[0]] as Unit
      const { container, sprite, mask, disableAbilitySprite, progressBar } = addNewIcon(
        position.x,
        position.y,
        unit.type as RepresentationId,
        () => selectAbility(unit.type),
      )

      window.app.stage.addChild(container)

      abilities[squadId] = {
        unitsIds: sameSquadUnits,
        sprite,
        container,
        mask,
        disableAbilitySprite,
        progressBar,
        squadId,
        type: unit.type as RepresentationId,
        renewTime: 0,
        renewTimeTotal: MAP_ID_TO_ABILITY_DETAILS[unit.type].renewTimeTotal,
      }
    } else if (!abilities[squadId].container.visible) {
      abilities[squadId].container.visible = true
      abilities[squadId].container.x = position.x
      abilities[squadId].container.y = position.y
    }
  })
}

export const hideAbilitiesButtons = () => {
  Object.values(abilities).forEach(ability => {
    ability.container.visible = false
  })
}

export const updateAbilitiesButtons = (universeRepresentation: UniverseRepresentation) => {
  Object.values(abilities).forEach(ability => {
    if (!ability.container.visible) return

    if (ability.renewTime !== 0) {
      if (!ability.mask.visible) {
        ability.disableAbilitySprite.visible = true
        ability.progressBar.visible = true
        ability.mask.visible = true
      }
      ability.renewTime--
      const progress = ability.renewTime / ability.renewTimeTotal
      ability.mask.scale.set(1, progress)
      ability.progressBar.y = (1 - progress) * ICON_HEIGHT
    } else if (ability.mask.visible) {
      ability.disableAbilitySprite.visible = false
      ability.progressBar.visible = false
      ability.mask.visible = false
    }

    const newPosition = getAbilityIconPosition(universeRepresentation, ability.unitsIds)
    ability.container.x = newPosition.x
    ability.container.y = newPosition.y
  })
}

export const clearAbilitiesIcons = (universeRepresentation: UniverseRepresentation) => {
  abilities = Object.values(abilities).reduce((result, ability) => {
    const existingMembers = ability.unitsIds.filter(unitId => !!universeRepresentation[unitId])
    if (existingMembers.length) {
      return {
        ...result,
        [ability.squadId]: ability,
      }
    }

    window.app.stage.removeChild(ability.container)
    return result
  }, {})
}

export const selectAllSimilarAbilities = (abilityId: number, squadsIds: number[]) => {
  squadsIds.forEach(squadId => {
    const ability = abilities[squadId]
    if (ability.container.visible && ability.renewTime === 0 && ability.type === abilityId) {
      ability.container.interactive = false
      ability.sprite.texture = MAP_ID_TO_ABILITY_DETAILS[ability.type].iconHover
    }
  })
}

export const deselectAllSimilarAbilities = (type: number, squadsIds: number[]) => {
  squadsIds.forEach(squadId => {
    const ability = abilities[squadId]
    if (ability.container.visible && ability.renewTime === 0 && ability.type === type) {
      ability.container.interactive = true
      ability.sprite.texture = MAP_ID_TO_ABILITY_DETAILS[ability.type].iconNormal
    }
  })
}

export const disableAbility = (unitId: number) => {
  const ability = Object.values(abilities).find(ability => ability.unitsIds.includes(unitId))
  ability.renewTime = ability.renewTimeTotal
}