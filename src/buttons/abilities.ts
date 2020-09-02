import REPRESENTATION_IDS from '~/render/representationsIds'
import { UniverseRepresentation } from '~/setup'
import Unit from '~/representation/Unit'

const ICON_SIZE = 30
const ICON_VERTICAL_OFFSET = -100

const MAP_ABILITY_TO_IMG = {
  [REPRESENTATION_IDS.SOLIDER]: 'assets/soliderRegularAvatar.png',
} as const

type RepresentationId = keyof typeof MAP_ABILITY_TO_IMG

type AbilityIcon = {
  unitsIds: number[]
  sprite: PIXI.Sprite
  squadId: number
}

let abilityIcons: {
  [key: number]: AbilityIcon
} = {}

function mouseOver() {
  this.alpha = 0.6
}

function mouseOut() {
  this.alpha = 1
}

const addNewIcon = (
  x: number,
  y: number,
  representationId: RepresentationId,
  onClick: VoidFunction,
) => {
  const icon = new PIXI.Sprite(
    PIXI.Texture.from(MAP_ABILITY_TO_IMG[representationId]),
  )
  icon.x = x
  icon.y = y
  icon.width = ICON_SIZE
  icon.height = ICON_SIZE
  icon.interactive = true
  icon.buttonMode = true
  icon.on('mouseover', mouseOver)
  icon.on('mouseout', mouseOut)

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
    x: positionsSum.x / positionsSum.number - ICON_SIZE / 2,
    y: positionsSum.y / positionsSum.number + ICON_VERTICAL_OFFSET,
  }
}

export const addAbilitiesButton = (
  universeRepresentation: UniverseRepresentation,
  units: number[][],
  squadsIds: Float32Array,
) => {
  let squadsIdsIndex = 0
  units.forEach(sameSquadUnits => {
    const position = getAbilityIconPosition(
      universeRepresentation,
      sameSquadUnits,
    )
    const squadId = squadsIds[squadsIdsIndex]
    squadsIdsIndex++

    if (!abilityIcons[squadId]) {
      const unit = universeRepresentation[sameSquadUnits[0]] as Unit
      const sprite = addNewIcon(
        position.x,
        position.y,
        unit.type as RepresentationId,
        () => console.log('throw grenade'),
      )

      window.app.stage.addChild(sprite)

      abilityIcons[squadId] = {
        unitsIds: sameSquadUnits,
        sprite,
        squadId,
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

export const updateAbilitiesButtons = (
  universeRepresentation: UniverseRepresentation,
) => {
  Object.values(abilityIcons).forEach(icon => {
    const newPosition = getAbilityIconPosition(
      universeRepresentation,
      icon.unitsIds,
    )
    icon.sprite.x = newPosition.x
    icon.sprite.y = newPosition.y
  })
}

export const clearAbilitiesIcons = (
  universeRepresentation: UniverseRepresentation,
) => {
  abilityIcons = Object.values(abilityIcons).reduce((result, icon) => {
    const existingMembers = icon.unitsIds.filter(
      unitId => !!universeRepresentation[unitId],
    )
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
