import { MAP_HEIGHT, MAP_WIDTH } from './constants'
import getPlatformCoords from 'consts/get-platform-coords'
import getSerializedMapInfo from './get-serialized-map-info'
import mapDetails from './map-details'
import { createMenu, addNewFaction, FactionVisualDetails } from './menu'
import { Universe } from 'Universe'
import Rect from 'Rect'
import addStyles from './addStyles'
import setupBridgeEnv, { attachPlatformListeners, createPlatformElem, updateBridgePreview, updateBriges } from './setupBridgeEnv'
import getinitUniverse from 'getInitUniverse'
import hexToRGB from './hexToRgb'

const platformCoords = getPlatformCoords()
const bridgeWidth = (platformCoords[3].y - platformCoords[2].y) * mapDetails.scale

const startOffset = { x: 0, y: 0 }
let currDragElem: HTMLElement | null = null

function updateDragElem(e: MouseEvent, currDragElem: HTMLElement) {
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

  const rightControlPanel = document.createElement('section')

  const startBtn = document.createElement('button')
  startBtn.textContent = 'START'
  const startBtnClickPromise = new Promise<void>(resolve => {
    startBtn.addEventListener('click', () => resolve())
  })
  rightControlPanel.appendChild(startBtn)

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
    updateDragElem(event, elem)
  }

  platformToolElem.addEventListener('mousedown', e => {
    const { x: mapAreaX, y: mapAreaY } = mapAreaElem.getBoundingClientRect() 
    const { x: toolX, y: toolY } = (e.currentTarget as HTMLElement).getBoundingClientRect()
    startOffset.x = toolX - e.clientX - mapAreaX
    startOffset.y = toolY - e.clientY - mapAreaY

    const [newPlatform, dragTrigger] = createPlatformElem(mapAreaElem)
    attachPlatformListeners(newPlatform)
    dragTrigger.addEventListener('mousedown', e => {
      startDrag(newPlatform, e)
      updateBriges(newPlatform)
    })

    currDragElem = newPlatform
    updateDragElem(e, newPlatform)
  })

  // portal, strategic point, platform, bridge

  mapAreaElem.addEventListener('mousemove', (e) => {
    if (currDragElem) {
      updateDragElem(e, currDragElem)
      updateBriges(currDragElem)
    } else {
      updateBridgePreview(e)
    }
  })

  window.document.body.addEventListener('mouseup', () => {
    if (currDragElem) {
      currDragElem.classList.remove('active') // for bridge we add active class
      currDragElem = null
    }
  })

  const colorMatrix = Array(12).fill(0) // it's matrix3x3 but because of the webgpu memory layout...
  const colorInputs = ['#ff0000', '#00ff00', '#0000ff'].map((initialColor, i) => {
    const node = document.createElement('input')
    node.type = 'color'
    node.value = initialColor

    const { r, g, b } = hexToRGB(initialColor)
    colorMatrix[0 + i] = r
    colorMatrix[4 + i] = g
    colorMatrix[8 + i] = b

    rightControlPanel.appendChild(node)
    node.addEventListener('input', () => {
      // console.log(e.target!.value)
      // index = 1
      const { r, g, b } = hexToRGB(node.value)
      colorMatrix[0 + i] = r
      colorMatrix[4 + i] = g
      colorMatrix[8 + i] = b

      // let colorMatrix = mat3x3f(
      //   // r, g, b
      //   0, 1, 0, //
      //   0, 0, 1, //
      //   1, 0, 0 //
      // );

      // let colorMatrix = mat3x3f(
      //   1, 0, 0, // 
      //   0, 1, 0, // 
      //   0, 0, 1 // 
      // );



      console.log(node.value)
    })
    // no
    // <input type="color" id="body" name="body" value="#ff0000" />
    // <label for="body">Body</label>
  })
  viewElem.appendChild(rightControlPanel)

  // <div>
  //   <input type="color" id="body" name="body" value="#f6b73c" />
  //   <label for="body">Body</label>
  // </div>


  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  Promise.all([startBtnClickPromise, getinitUniverse()])
    .then(([_, initUniverse]) => {
      styleElem.remove()
      viewElem.remove()

      initUniverse(
        wasmModule,
        MAP_WIDTH,
        MAP_HEIGHT,
        new Float32Array([
          ...colorMatrix,
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

