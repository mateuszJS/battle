import throttle from 'lodash/throttle'
import UnitsFactory from '../representation/UnitFactory'

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

export default (): {
  node: HTMLLIElement,
  bodyMatrixColorFilter: number[],
  headMatrixColorFilter: number[],
 } => {
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

  const unit =  UnitsFactory.getUnitPreview(bodyMatrixColorFilter, headMatrixColorFilter)
  unit.scale.set(PREVIEW_WIDTH / unit.width)
  unit.x = PREVIEW_WIDTH * 0.45
  unit.y = PREVIEW_HEIGHT * 0.85
  app.stage.addChild(unit)

  return {
    node: listItemNode,
    bodyMatrixColorFilter: bodyMatrixColorFilter.matrix,
    headMatrixColorFilter: headMatrixColorFilter.matrix,
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
