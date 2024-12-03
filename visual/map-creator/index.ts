import { MAP_HEIGHT, MAP_WIDTH } from './constants'
import getPlatformCoords from 'consts/get-platform-coords'
import getSerializedMapInfo from './get-serialized-map-info'
import mapDetails from './map-details'
import { createMenu, addNewFaction, FactionVisualDetails } from './menu'
import { Universe } from 'Universe'
import Rect from 'Rect'
import addStyles from './addStyles'
import setupBridgeEnv, { attachPlatformListeners, updateBridgePreview, updateBriges } from './setupBridgeEnv'
import { createInteractivePlatformElem, createStaticPlatformElem } from './platform'
import getinitUniverse from 'getInitUniverse'
import hexToRGB from './hexToRgb'
import { createHQ, createInteractiveHQElem } from './headquarters'
import { setCoordsOrigin } from './getCoords'

const platformCoords = getPlatformCoords()
const bridgeWidth = (platformCoords[3].y - platformCoords[2].y) * mapDetails.scale
let mapAreaX = 0
let mapAreaY = 0

const startOffset = { x: 0, y: 0 }
let currDragElem: HTMLElement | null = null

function updateDragElem(e: MouseEvent, currDragElem: HTMLElement) {
  currDragElem.style.left = e.clientX + startOffset.x + 'px'
  currDragElem.style.top = e.clientY + startOffset.y + 'px'
}

function attachCreateEvent(node: HTMLElement, createCallback: () => HTMLElement) {
  node.addEventListener('mousedown', e => {
    const { x: toolX, y: toolY } = (e.currentTarget as HTMLElement).getBoundingClientRect()
    startOffset.x = toolX - e.clientX - mapAreaX
    startOffset.y = toolY - e.clientY - mapAreaY

    const newElement = createCallback()

    currDragElem = newElement
    updateDragElem(e, newElement)
  })
}

function startDrag(elem: HTMLElement, event: MouseEvent) {
  const { x: toolX, y: toolY } = elem.getBoundingClientRect()
  console.log(toolX, toolY)
  startOffset.x = toolX - event.clientX - mapAreaX
  startOffset.y = toolY - event.clientY - mapAreaY

  currDragElem = elem
  updateDragElem(event, elem)
}

export default function openMapCreator(wasmModule: Universe) {
  /** Add styles and main wrapper, page wrapper, toolbar wrapper and map area wrapper where element are dragable */
  const styleElem = addStyles()
  const viewElem = document.createElement('div')
  viewElem.classList.add('map-creator')
  
  // css should scale map by itself to the size of the screen, without our input
  const toolbarElem = document.createElement('aside')
  toolbarElem.classList.add('toolbar')
  viewElem.appendChild(toolbarElem)

  const mapElement = document.createElement('main')
  mapElement.classList.add('map-area')
  mapElement.style.aspectRatio = `${mapDetails.width / mapDetails.height}`
  viewElem.appendChild(mapElement)

  document.body.appendChild(viewElem)
  setCoordsOrigin(mapElement)


  const mapElementRect = mapElement.getBoundingClientRect() 
  mapAreaX = mapElementRect.x
  mapAreaY = mapElementRect.y

  setupBridgeEnv(mapElement)

  /** Fill the toolbar */
  const [platformToolElem] = createStaticPlatformElem(toolbarElem)
  attachCreateEvent(platformToolElem, () => createInteractivePlatformElem(mapElement, startDrag, mapElement))
  
  const triggerCreateHQ = createHQ(toolbarElem)
  attachCreateEvent(triggerCreateHQ, () => createInteractiveHQElem(mapElement, startDrag))

  mapElement.addEventListener('mousemove', (e) => {
    if (currDragElem) {
      updateDragElem(e, currDragElem)
      updateBridgePreview(e)
      // updateBriges(currDragElem)
    }
  })

  window.document.body.addEventListener('mouseup', () => {
    if (currDragElem) {
      currDragElem.classList.remove('active') // for bridge we add active class
      currDragElem = null
    }
  })
 
  /* eveyrthing right pane related */
  const rightControlPanel = document.createElement('section')

  const startBtn = document.createElement('button')
  startBtn.textContent = 'START'
  const startBtnClickPromise = new Promise<void>(resolve => {
    startBtn.addEventListener('click', () => resolve())
  })
  rightControlPanel.appendChild(startBtn)


  viewElem.appendChild(rightControlPanel)

  /* canvas */
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  
  /* clean the DOM and go to the next phase */
  Promise.all([startBtnClickPromise, getinitUniverse()])
    .then(([_, initUniverse]) => {
      styleElem.remove()
      viewElem.remove()

      initUniverse(
        wasmModule,
        MAP_WIDTH,
        MAP_HEIGHT,
        new Float32Array([
          // ...colorMatrix,
          ...[
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 0, 0, 0,
          ]
        ]),
      //   getSerializedMapInfo(nodes, connections, portals),
      //   factionVisualDetails,
      )
    })
}

