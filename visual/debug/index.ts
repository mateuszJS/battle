import * as anglesDebug from './angles'
import * as tracksDebug from './tracks'
import * as obstaclesDebug from './obstacles'
import * as gridDebug from './grid'
import * as enemySecondaryAimDebug from './enemySecondaryAim'
import * as getPointsInRectangleDebug from './getPointsInRectangle'
import * as gridLineDebug from './gridLine'
import * as aiDebug from './ai'
import { Universe } from '../../crate/pkg/index'

const debugController = {
  tracks: false,
  angles: false,
  obstacles: true,
  grid: false,
  obstaclesMap: false,
  enemySecondaryAim: false,
  getPointsInRectangle: false,
  gridLine: false,
  ai: false,
  init: () => null,
  anglesDebug,
  tracksDebug,
  obstaclesDebug,
  gridDebug,
  enemySecondaryAimDebug,
  getPointsInRectangleDebug,
  gridLineDebug,
  aiDebug,
  update: (universe: Universe) => {
    Object.keys(debugController).forEach(key => {
      if (
        typeof debugController[key] === 'boolean' &&
        debugController[key] &&
        debugController[`${key}Debug`]
      ) {
        debugController[`${key}Debug`].startDebug(universe)
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
  checkboxNode.checked = debugController[name]
  checkboxNode.addEventListener('change', event => {
    debugController[name] = (event.target as HTMLInputElement).checked
    if (!debugController[name]) {
      debugController[`${name}Debug`].stopDebug()
    }
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
