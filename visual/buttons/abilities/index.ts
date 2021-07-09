import { REPRESENTATION_SOLIDER, REPRESENTATION_RAPTOR } from '../../../logic/constants'
import { Universe } from 'crate/pkg'
import createNewIcon, { Ability, RepresentationId, ICON_HEIGHT } from './createIcon'

const abilitiesIcons: {
  [key in RepresentationId]: Ability[]
} = {
  [REPRESENTATION_SOLIDER]: [],
  [REPRESENTATION_RAPTOR]: [],
}

const updateAbilityIcon = (
  ability: Ability,
  x: number,
  y: number,
  progress: number,
  isAvailable: boolean,
  isSelected: boolean,
) => {
  if (!isAvailable) {
    if (ability.state !== 'disabled') {
      ability.disable()
    }
    ability.mask.scale.set(1, progress)
    ability.progressBar.y = (1 - progress) * ICON_HEIGHT
  } else if (isSelected) {
    if (ability.state !== 'selected') {
      ability.select()
    }
  } else {
    if (ability.state !== 'ready') {
      ability.ready()
    }
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
    [REPRESENTATION_SOLIDER]: 0,
    [REPRESENTATION_RAPTOR]: 0,
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
  ;[REPRESENTATION_SOLIDER, REPRESENTATION_RAPTOR].forEach(squadType => {
    const index = abilitiesIndexes[squadType]
    if (abilitiesIcons[squadType][index] && abilitiesIcons[squadType][index].container.visible) {
      // optimization, avoid loop if first icon is already hidden
      for (let j = index; j < abilitiesIcons[squadType].length; j++) {
        abilitiesIcons[squadType][j].container.visible = false
      }
    }
  })
}

export default updateAbilitiesButtons
