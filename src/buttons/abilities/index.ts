import REPRESENTATION_IDS from '~/render/representationsIds'
import { Universe } from 'crate/pkg'
import createNewIcon, { Ability, RepresentationId, ICON_HEIGHT } from './createIcon'

const abilitiesIcons: {
  [key in RepresentationId]: Ability[]
} = {
  [REPRESENTATION_IDS.SOLIDER]: [],
  [REPRESENTATION_IDS.RAPTOR]: [],
}

const updateAbilityIcon = (
  ability: Ability,
  x: number,
  y: number,
  progress: number,
  isAvailable: boolean,
  isSelected: boolean,
) => {
  console.log('isAvailable', isAvailable)
  if (isSelected) {
    if (ability.container.interactive) {
      ability.select()
    }
  } else {
    if (!ability.container.interactive) {
      ability.deselect()
    }
  }

  if (isAvailable) {
    if (ability.mask.visible) {
      ability.disableAbilitySprite.visible = false
      ability.progressBar.visible = false
      ability.mask.visible = false
    }
  } else {
    if (!ability.mask.visible) {
      // is disabled texture visible
      ability.disableAbilitySprite.visible = true
      ability.progressBar.visible = true
      ability.mask.visible = true
    }
    ability.mask.scale.set(1, progress)
    ability.progressBar.y = (1 - progress) * ICON_HEIGHT
  }

  ability.container.x = x
  ability.container.y = y
}

const updateAbilitiesButtons = (
  selectedSquadsIds: Uint32Array,
  universe: Universe,
  selectedAbility: RepresentationId,
  selectAbility: (ability: RepresentationId) => void,
) => {
  const abilitiesData = universe.get_abilities_cool_downs(selectedSquadsIds, selectedAbility || 0)

  const abilitiesIndexes = {
    [REPRESENTATION_IDS.SOLIDER]: 0,
    [REPRESENTATION_IDS.RAPTOR]: 0,
  }

  for (let i = 0; i < abilitiesData.length; i += 5) {
    const squadType = abilitiesData[i] as RepresentationId
    // we need a type of the squad

    // create an icon, if there is no enough icons of certain type
    if (abilitiesIndexes[squadType] == abilitiesIcons[squadType].length) {
      const newIcon = createNewIcon(0, 0, squadType, () => {
        selectAbility(squadType)
      })
      abilitiesIcons[squadType].push(newIcon)
    }

    const indexOfIcon = abilitiesIndexes[squadType]
    const ability = abilitiesIcons[squadType][indexOfIcon]
    ability.container.visible = true

    updateAbilityIcon(
      ability,
      abilitiesData[i + 3],
      abilitiesData[i + 4],
      abilitiesData[i + 2],
      abilitiesData[i + 1] > 0.5,
      !!selectedAbility,
    )
    abilitiesIndexes[squadType]++
  }

  // hide rest of the icons
  ;[REPRESENTATION_IDS.SOLIDER, REPRESENTATION_IDS.RAPTOR].forEach(squadType => {
    const index = abilitiesIndexes[squadType]
    if (abilitiesIcons[squadType][index] && abilitiesIcons[squadType][index].container.visible) {
      // optimization, avoid loop if first icon is already hidden
      for (let j = 0; j < abilitiesIcons[squadType].length; j++) {
        abilitiesIcons[squadType][index].container.visible = false
      }
    }
  })
}

export default updateAbilitiesButtons
