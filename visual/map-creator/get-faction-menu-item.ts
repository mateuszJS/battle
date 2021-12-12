import throttle from 'lodash/throttle'
import UnitsFactory from '../representation/UnitFactory'

const channels = ['red', 'green', 'blue'] as const
const MAP_CHANNEL_TO_HEX = {
  red: '#ff0000',
  green: '#00ff00',
  blue: '#0000ff',
} as const
const MAP_CHANNEL_TO_DISPLAY_TEXT = {
  red: 'Primary',
  green: 'Secondary',
  blue: 'Details',
} as const

const PREVIEW_WIDTH = 80
const PREVIEW_HEIGHT = 80

export default (): {
  node: HTMLLIElement,
  filterMatrix: number[],
 } => {
  const listItemNode = document.createElement('li')
  const divNode = document.createElement('div')
  const app = new PIXI.Application({ width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT });
  listItemNode.appendChild(app.view);
  
  listItemNode.appendChild(divNode)
  const getNewInput = (id: string) => `
    <label>
      <input id="${id}" type="color" value="${MAP_CHANNEL_TO_HEX[id]}">
      ${MAP_CHANNEL_TO_DISPLAY_TEXT[id]}
    </label>
  `

  channels.forEach(channel => {
    divNode.innerHTML += getNewInput(channel)
  })

  const filter = new PIXI.filters.ColorMatrixFilter()
  const unit =  UnitsFactory.getUnitPreview(filter)
  unit.scale.set(PREVIEW_WIDTH / unit.width)
  unit.x = PREVIEW_WIDTH * 0.45
  unit.y = PREVIEW_HEIGHT * 0.85
  app.stage.addChild(unit)

  const rgbChannels = ['red', 'green', 'blue']

  const onChange = (event) => {
    const channelIndex = rgbChannels.indexOf(event.target.id)
    const { r, g, b } = hexToRgb(event.target.value.slice(1))

    filter.matrix[channelIndex  + 0 * 5] = r / 255
    filter.matrix[channelIndex + 1 * 5] = g / 255
    filter.matrix[channelIndex + 2 * 5] = b / 255
  }
  const inputCallback = throttle(onChange, 300, { trailing: true }) as ((event: InputEvent) => void)

  Array.from(listItemNode.querySelectorAll('input')).forEach(input => {
    input.addEventListener('input', inputCallback)
  })

  return {
    node: listItemNode,
    filterMatrix: filter.matrix,
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
