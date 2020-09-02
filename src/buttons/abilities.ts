import REPRESENTATION_IDS from '~/render/representationsIds'
import { UniverseRepresentation } from '~/setup'
import Unit from '~/representation/Unit'

const ICON_WIDTH = 62 * 0.9
const ICON_HEIGHT = 47 * 0.9
const ICON_VERTICAL_OFFSET = -120

const MAP_ID_TO_ABILITY_DETAILS = {
  [REPRESENTATION_IDS.SOLIDER]: {
    iconNormal: PIXI.Texture.from('assets/grenade_icon_blue.png'),
    iconHover: PIXI.Texture.from('assets/grenade_icon_blue_hover.png'),
    renewTimeTotal: 5000,
  },
} as const

type RepresentationId = keyof typeof MAP_ID_TO_ABILITY_DETAILS

type AbilityIcon = {
  unitsIds: number[]
  sprite: PIXI.Sprite
  squadId: number
  type: RepresentationId
  renewTime: number
  renewTimeTotal: number
}

let abilityIcons: {
  [key: number]: AbilityIcon
} = {}

const addNewIcon = (
  x: number,
  y: number,
  representationId: RepresentationId,
  onClick: VoidFunction,
) => {
  const icon = new PIXI.Sprite(MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal)
  icon.x = x
  icon.y = y
  icon.width = ICON_WIDTH
  icon.height = ICON_HEIGHT
  icon.interactive = true
  icon.buttonMode = true
  icon.on('mouseover', function() {
    this.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconHover
  })
  icon.on('mouseout', function() {
    this.texture = MAP_ID_TO_ABILITY_DETAILS[representationId].iconNormal
  })

  icon.on('mouseup', function(event) {
    event.stopPropagation()
    onClick()
  })

  icon.on('mousedown', function(event) {
    event.stopPropagation()
  })

  return icon
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

    if (!abilityIcons[squadId]) {
      const unit = universeRepresentation[sameSquadUnits[0]] as Unit
      const sprite = addNewIcon(position.x, position.y, unit.type as RepresentationId, () =>
        selectAbility(unit.type),
      )

      window.app.stage.addChild(sprite)

      abilityIcons[squadId] = {
        unitsIds: sameSquadUnits,
        sprite,
        squadId,
        type: unit.type as RepresentationId,
        renewTime: 0,
        renewTimeTotal: MAP_ID_TO_ABILITY_DETAILS[unit.type].renewTimeTotal,
      }
    } else if (!abilityIcons[squadId].sprite.visible) {
      abilityIcons[squadId].sprite.visible = true
      abilityIcons[squadId].sprite.x = position.x
      abilityIcons[squadId].sprite.y = position.y
    }
  })
}

export const hideAbilitiesButtons = () => {
  Object.values(abilityIcons).forEach(icon => {
    icon.sprite.visible = false
  })
}

export const updateAbilitiesButtons = (universeRepresentation: UniverseRepresentation) => {
  Object.values(abilityIcons).forEach(ability => {
    if (!ability.sprite.visible) return

    if (ability.renewTime !== 0) {
      ability.sprite.alpha = ability.renewTime / ability.renewTimeTotal
      ability.renewTime--
    }

    const newPosition = getAbilityIconPosition(universeRepresentation, ability.unitsIds)
    ability.sprite.x = newPosition.x
    ability.sprite.y = newPosition.y
  })
}

export const clearAbilitiesIcons = (universeRepresentation: UniverseRepresentation) => {
  abilityIcons = Object.values(abilityIcons).reduce((result, icon) => {
    const existingMembers = icon.unitsIds.filter(unitId => !!universeRepresentation[unitId])
    if (existingMembers.length) {
      return {
        ...result,
        [icon.squadId]: icon,
      }
    }

    window.app.stage.removeChild(icon.sprite)
    return result
  }, {})
}

export const selectAllSimilarAbilities = (type: number, squadsIds: number[]) => {
  squadsIds.forEach(squadId => {
    const ability = abilityIcons[squadId]
    if (ability.sprite.visible && ability.renewTime === 0 && ability.type === type) {
      ability.sprite.interactive = false
      ability.sprite.texture = MAP_ID_TO_ABILITY_DETAILS[ability.type].iconHover
    }
  })
}

export const deselectAllSimilarAbilities = (type: number, squadsIds: number[]) => {
  squadsIds.forEach(squadId => {
    const ability = abilityIcons[squadId]
    if (ability.sprite.visible && ability.renewTime === 0 && ability.type === type) {
      ability.sprite.texture = MAP_ID_TO_ABILITY_DETAILS[ability.type].iconNormal
      ability.sprite.interactive = true
    }
  })
}
