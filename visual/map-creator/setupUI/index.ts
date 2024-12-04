import { startDrag } from "map-creator"
import getCoords from "map-creator/getCoords"
import { createHQ, createInteractiveHQElem } from "map-creator/headquarters"
import mapDetails from "map-creator/map-details"
import { createPlatform } from "map-creator/platform"
import addStyles from "map-creator/setupUI/addStyles"
import addSchemeSetting from "./schemeColor"

export default function setupUI() {
  /** Add styles and main wrapper, page wrapper, toolbar wrapper and map area wrapper where element are dragable */
  const styleElem = addStyles()
  const viewElem = document.createElement('div')
  viewElem.classList.add('map-creator')

  // css should scale map by itself to the size of the screen, without our input


  const mapElement = document.createElement('main')
  mapElement.classList.add('map-area')
  mapElement.style.aspectRatio = `${mapDetails.width / mapDetails.height}`

  viewElem.appendChild(setupToolbar())

  viewElem.appendChild(mapElement)

  document.body.appendChild(viewElem)

  /* eveyrthing right pane related */
  const rightControlPanel = document.createElement('section')

  const startBtn = document.createElement('button')
  startBtn.textContent = 'START'
  const startBtnClickPromise = new Promise<void>(resolve => {
    startBtn.addEventListener('click', () => resolve())
  })
  rightControlPanel.appendChild(startBtn)

  addSchemeSetting(rightControlPanel)

  viewElem.appendChild(rightControlPanel)

    function unmount() {
      styleElem.remove()
      viewElem.remove()
    }

  return { mapElement, unmount, startBtnClickPromise, viewElem }
}

function attachCreateEvent(
  triggerEl: HTMLElement,
  createCallback: () => HTMLElement
) {
  triggerEl.addEventListener('mousedown', e => {
    const { x, y } = getCoords(triggerEl)
    const newElement = createCallback()
    newElement.style.left = x + 'px'
    newElement.style.top = y + 'px'

    startDrag(newElement, e)
  })
}

function setupToolbar() {
  const toolbarElem = document.createElement('aside')
  toolbarElem.classList.add('toolbar')

  /** Fill the toolbar */
  const platformToolElem = createPlatform()
  platformToolElem.setAttribute('reproduce', '')
  toolbarElem.appendChild(platformToolElem)
  
  // attachCreateEvent(
  //   platformToolElem,
  //   () => createInteractivePlatformElem(mapEl)
  // )
  
  const triggerCreateHQ = createHQ(toolbarElem)
  triggerCreateHQ.setAttribute('reproduce', '')
  toolbarElem.appendChild(triggerCreateHQ)

  // attachCreateEvent(
  //   triggerCreateHQ,
  //   () => createInteractiveHQElem(mapEl)
  // )

  return toolbarElem
}