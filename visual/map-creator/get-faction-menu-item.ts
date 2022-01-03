import throttle from 'lodash/throttle'
import UnitsFactory, { Species } from '../representation/UnitFactory'
import { FactionVisualDetails } from './menu'

const channels = ['red', 'green', 'blue'] as const
const MAP_CHANNEL_TO_INIT_HEX = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
  head: '#00ff00',
} as const
const MAP_CHANNEL_TO_DISPLAY_TEXT = {
  red: 'Primary',
  green: 'Secondary',
  blue: 'Details',
  head: 'Head',
} as const

const PREVIEW_WIDTH = 80
const PREVIEW_HEIGHT = 80

interface MenuItemDetails {
  node: HTMLLIElement,
  getFactionDetails: () => FactionVisualDetails
}

export default (): MenuItemDetails => {
  const listItemNode = document.createElement('li')
  const divNode = document.createElement('div')
  const app = new PIXI.Application({ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT });
  listItemNode.appendChild(app.view);
  
  listItemNode.appendChild(divNode)
  const getNewInput = (id: string, className: string) => `
    <label>
      <input data-channel="${id}" type="color" value="${MAP_CHANNEL_TO_INIT_HEX[id]}" class="${className}">
      ${MAP_CHANNEL_TO_DISPLAY_TEXT[id]}
    </label>
  `
/*===========ADD HTML STRUCTURE==============*/
  channels.forEach(channel => {
    divNode.innerHTML += getNewInput(channel, 'change-body-color')
  })
  divNode.innerHTML += `
    <label>
      Species:
      <select class="change-species">
        <option value="${Species.Rodion}">Rodion</option>
        <option value="${Species.Elephant}">Elephant</option>
      </select>
    </label>
  `
  divNode.innerHTML += getNewInput('head', 'change-head-color')

  /*===========ADD LISTENERS TO CHANGE BODY COLORS==============*/
  
  const bodyMatrixColorFilter = new PIXI.filters.ColorMatrixFilter()
  const rgbChannels = ['red', 'green', 'blue']

  function onChangeBodyColor(this: HTMLInputElement) {
    const channelIndex = rgbChannels.indexOf(this.getAttribute('data-channel'))
    const { r, g, b } = hexToRgb(this.value.slice(1))

    bodyMatrixColorFilter.matrix[channelIndex  + 0 * 5] = r / 255
    bodyMatrixColorFilter.matrix[channelIndex + 1 * 5] = g / 255
    bodyMatrixColorFilter.matrix[channelIndex + 2 * 5] = b / 255
  }
  const onChangeBodyColorThrottle = throttle(
    onChangeBodyColor,
    300,
    { trailing: true },
  ) as typeof onChangeBodyColor

  Array.from(listItemNode.querySelectorAll('.change-body-color')).forEach(input => {
    console.log(input)
    input.addEventListener('input', onChangeBodyColorThrottle)
  })

  /*===========ADD LISTENERS TO CHANGE HEAD COLORS==============*/
  const headMatrixColorFilter = new PIXI.filters.ColorMatrixFilter()

  function onChangeHeadColor(this: HTMLInputElement) {
    const { r, g, b } = hexToRgb(this.value.slice(1))
    const channelIndex = rgbChannels.indexOf('green')
    headMatrixColorFilter.matrix[channelIndex  + 0 * 5] = r / 255
    headMatrixColorFilter.matrix[channelIndex + 1 * 5] = g / 255
    headMatrixColorFilter.matrix[channelIndex + 2 * 5] = b / 255
  }

  const onChangeHeadColorThrottle = throttle(
    onChangeHeadColor,
    300,
    { trailing: true },
  ) as typeof onChangeHeadColor

  listItemNode.querySelector('.change-head-color')
    .addEventListener('input', onChangeHeadColorThrottle)

  let unit: PIXI.Container = null
  let selectedSpecies: Species = Species.Rodion
  
  function updateUnit() {
    if (unit) {
      app.stage.removeChild(unit)
    }
    unit =  UnitsFactory.getUnitPreview(
      bodyMatrixColorFilter,
      headMatrixColorFilter,
      selectedSpecies,
    )
    unit.scale.set(PREVIEW_WIDTH / unit.width)
    unit.x = PREVIEW_WIDTH * 0.45
    unit.y = PREVIEW_HEIGHT * 0.85
    app.stage.addChild(unit)
  }

  function onChangeSpecies(this: HTMLSelectElement) {
    selectedSpecies = this.value as unknown as Species
    updateUnit()
  }

  listItemNode.querySelector('.change-species')
    .addEventListener('input', onChangeSpecies)

  updateUnit()

  const getFactionDetails = (): FactionVisualDetails => ({
    bodyMatrixColorFilter: bodyMatrixColorFilter.matrix,
    headMatrixColorFilter: headMatrixColorFilter.matrix,
    species: selectedSpecies,
  })

  return {
    node: listItemNode,
    getFactionDetails,
  }
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}
