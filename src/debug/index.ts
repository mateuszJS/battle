import anglesDebug from './angles'
import tracksDebug from './tracks'
import obstaclesDebug from './obstacles'
import gridDebug from './grid'
import obstaclesMapDebug from './obstaclesMap'
import { Universe } from '../../crate/pkg/index'

const debugController = {
  tracks: false,
  angles: false,
  obstacles: false,
  grid: false,
  obstaclesMap: false,
  init: () => null,
  anglesDebug,
  tracksDebug,
  obstaclesDebug,
  gridDebug,
  obstaclesMapDebug,
  update: (universe: Universe) => {
    Object.keys(debugController).forEach(key => {
      if (
        typeof debugController[key] === 'boolean' &&
        debugController[key] &&
        debugController[`${key}Debug`]
      ) {
        debugController[`${key}Debug`](universe)
      }
    })
  },
}

const createCheckbox = (name: string) => {
  const debugPanelNode = document.querySelector('#debug-panel') as HTMLDivElement
  const labelNode = document.createElement('label')
  const checkboxNode = document.createElement('input')
  const spanNode = document.createElement('span')
  spanNode.innerText = name
  checkboxNode.type = 'checkbox'
  checkboxNode.name = name
  checkboxNode.addEventListener('change', event => {
    debugController[name] = (event.target as HTMLInputElement).checked
  })

  labelNode.appendChild(checkboxNode)
  labelNode.appendChild(spanNode)
  debugPanelNode.appendChild(labelNode)
}

debugController.init = () => {
  Object.keys(debugController).forEach(key => {
    if (typeof debugController[key] === 'boolean' && debugController[`${key}Debug`]) {
      createCheckbox(key)
    }
  })
}

export default debugController
