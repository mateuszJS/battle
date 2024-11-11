// import initGame from 'initGame'
import { MAP_HEIGHT, MAP_WIDTH } from './constants'
import getPlatformCoords from 'consts/get-platform-coords'
import getSerializedMapInfo from './get-serialized-map-info'
import mapDetails from './map-details'
import { createMenu, addNewFaction, FactionVisualDetails } from './menu'
import { Universe } from 'Universe'
import Rect from 'Rect'
import { applyTransform } from './css-transform-matrix3d'
import addStyles from './addStyles'
import setupBridgeEnv, { attachPlatformListeners, createPlatformElem, updateBridgePreview } from './setupBridgeEnv'

const platformCoords = getPlatformCoords()
const bridgeWidth = (platformCoords[3].y - platformCoords[2].y) * mapDetails.scale

const startOffset = { x: 0, y: 0 }
let currDragElem: HTMLElement | null = null

function updateDragElem(e: MouseEvent) {
  if (!currDragElem) return

  currDragElem.style.left = e.clientX + startOffset.x + 'px'
  currDragElem.style.top = e.clientY + startOffset.y + 'px'
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

  const mapAreaElem = document.createElement('main')
  mapAreaElem.classList.add('map-area')
  mapAreaElem.style.aspectRatio = `${mapDetails.width / mapDetails.height}`
  viewElem.appendChild(mapAreaElem)

  document.body.appendChild(viewElem)

  setupBridgeEnv(mapAreaElem)

  /** Fill the toolbar */
  const [platformToolElem] = createPlatformElem(toolbarElem)

  function startDrag(elem: HTMLElement, event: MouseEvent) {
    const { x: mapAreaX, y: mapAreaY } = mapAreaElem.getBoundingClientRect() 
    const { x: toolX, y: toolY } = elem.getBoundingClientRect()
    startOffset.x = toolX - event.clientX - mapAreaX
    startOffset.y = toolY - event.clientY - mapAreaY
  
    currDragElem = elem
    updateDragElem(event)
  }

  platformToolElem.addEventListener('mousedown', e => {
    const { x: mapAreaX, y: mapAreaY } = mapAreaElem.getBoundingClientRect() 
    const { x: toolX, y: toolY } = (e.currentTarget as HTMLElement).getBoundingClientRect()
    startOffset.x = toolX - e.clientX - mapAreaX
    startOffset.y = toolY - e.clientY - mapAreaY

    const [newPlatform, dragTrigger] = createPlatformElem(mapAreaElem)
    attachPlatformListeners(newPlatform, mapAreaElem)
    dragTrigger.addEventListener('mousedown', e => {
      startDrag(newPlatform, e)
    })

    currDragElem = newPlatform
    updateDragElem(e)
  })

  // portal, strategic point, platform, bridge

  mapAreaElem.addEventListener('mousemove', (e) => {
    updateDragElem(e)
    updateBridgePreview(e, mapAreaElem)
  })

  window.document.body.addEventListener('mouseup', () => {
    if (currDragElem) {
      currDragElem.classList.remove('active') // for bridge we add active class
      currDragElem = null
    }
  })

  const startGame = (factionVisualDetails: FactionVisualDetails[]) => {
    styleElem.remove()
    viewElem.remove()

    // initGame(
    //   wasmModule,
    //   getSerializedMapInfo(nodes, connections, portals),
    //   MAP_WIDTH,
    //   MAP_HEIGHT,
    //   factionVisualDetails,
    // )
  }
  // createMenu(startGame)
}

