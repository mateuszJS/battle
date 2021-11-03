import createNewIcon, { Ability, RepresentationId, ICON_HEIGHT } from './createIcon'
import { WasmModule } from '~/initGame'
import { AbilityType } from '../../../logic/constants'

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
  wasmModule: WasmModule,
  selectedAbility: RepresentationId,
  selectAbility: (ability: RepresentationId) => void,
) => {
  const abilitiesDataPointer = wasmModule.getAbilitiesCoolDowns(
    window.getUint32ArrayPointer(selectedSquadsIds),
    selectedAbility || 0,
  )

  const abilitiesIndexes = {
    [AbilityType.Grenade]: 0,
    [AbilityType.Jump]: 0,
  }

  window.useFloat32ArrayData(abilitiesDataPointer, (abilitiesData) => {
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
  })

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
