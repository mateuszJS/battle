import { AbilityType } from '~/logic-contants'
import createNewIcon, { Ability, RepresentationId, ICON_HEIGHT } from './createIcon'
import { Universe } from 'crate/pkg'

const abilitiesIcons: {
  [key in RepresentationId]: Ability[]
} = {
  [AbilityType.Grenade]: [],
  [AbilityType.Jump]: [],
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
  wasmModule: Universe,
  selectedAbility: RepresentationId,
  selectAbility: (ability: RepresentationId) => void,
) => {
  const abilitiesColdownData = wasmModule.get_abilities_cool_downs(
    new Uint32Array(selectedSquadsIds),
    selectedAbility || 0,
  )

  const abilitiesIndexes = {
    [AbilityType.Grenade]: 0,
    [AbilityType.Jump]: 0,
  }

  for (let i = 0; i < abilitiesColdownData.length; i += 5) {
    const squadType = abilitiesColdownData[i] as RepresentationId
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
      abilitiesColdownData[i + 3],
      abilitiesColdownData[i + 4],
      abilitiesColdownData[i + 2],
      abilitiesColdownData[i + 1] > 0.5,
      !!selectedAbility,
    )
    abilitiesIndexes[squadType]++
  }

  // hide rest of the icons
  ;[AbilityType.Grenade, AbilityType.Jump].forEach(squadType => {
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
