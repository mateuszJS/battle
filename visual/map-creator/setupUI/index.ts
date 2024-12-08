import { createHQ } from "map-creator/headquarters"
import { createPlatform } from "map-creator/platform"
import addStyles from "map-creator/setupUI/addStyles"
import addSchemeSetting from "./schemeColor"

const MAP_WIDTH = 3000
const MAP_HEIGHT = 4500

export default function setupUI() {
  /** Add styles and main wrapper, page wrapper, toolbar wrapper and map area wrapper where element are dragable */
  const styleElem = addStyles()
  const viewElem = document.createElement('div')
  viewElem.classList.add('map-creator')

  // css should scale map by itself to the size of the screen, without our input


  const mapElement = document.createElement('main')
  mapElement.classList.add('map-area')
  mapElement.style.aspectRatio = `${MAP_WIDTH / MAP_HEIGHT}`

  const toolBarEl = setupToolbar()
  viewElem.appendChild(toolBarEl)

  viewElem.appendChild(mapElement)

  document.body.appendChild(viewElem)

  /* eveyrthing right pane related */
  const controlPanelEl = document.createElement('section')

  const startBtn = document.createElement('button')
  startBtn.textContent = 'START'
  const startBtnClickPromise = new Promise<void>(resolve => {
    startBtn.addEventListener('click', () => resolve())
  })
  controlPanelEl.appendChild(startBtn)

  addSchemeSetting(controlPanelEl)

  viewElem.appendChild(controlPanelEl)

  function unmount() {
    styleElem.remove()
    viewElem.remove()
  }

  return { mapElement, unmount, startBtnClickPromise, viewElem, toolBarEl, controlPanelEl }
}

function setupToolbar() {
  const toolbarElem = document.createElement('aside')
  toolbarElem.classList.add('toolbar')

  /** Fill the toolbar */
  const platformToolElem = createPlatform()
  platformToolElem.setAttribute('reproduce', '')
  toolbarElem.appendChild(platformToolElem)
  
  const triggerCreateHQ = createHQ(toolbarElem)
  triggerCreateHQ.setAttribute('reproduce', '')
  toolbarElem.appendChild(triggerCreateHQ)

  return toolbarElem
}