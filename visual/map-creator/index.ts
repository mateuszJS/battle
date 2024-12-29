import { Universe } from 'Universe'
import getInitUniverse from 'getStartUniverse'
import getCoords, { setCoordsOrigin } from './getCoords'
import setupUI from './setupUI'
import creationConfig from './creationConfig'
import { getStoreBridges, restoreBridges, updateBridges } from './bridge'
import serializeMap from './serializeMap'
import { createPlatform } from './platform'
import mat4 from 'utils/mat4'
import startTransition from './transition'
import getMatricies, { getCameraAngle } from "worldMatrix";

const storedMap = '{"platforms":[{"x":95,"y":145},{"x":292,"y":145},{"x":91,"y":331},{"x":288,"y":508},{"x":292,"y":328}],"bridges":[[{"platformIndex":4,"bridgeEdgeIndex":2},{"platformIndex":3,"bridgeEdgeIndex":0}],[{"platformIndex":2,"bridgeEdgeIndex":1},{"platformIndex":4,"bridgeEdgeIndex":3}],[{"platformIndex":0,"bridgeEdgeIndex":2},{"platformIndex":2,"bridgeEdgeIndex":0}],[{"platformIndex":1,"bridgeEdgeIndex":3},{"platformIndex":0,"bridgeEdgeIndex":1}],[{"platformIndex":1,"bridgeEdgeIndex":2},{"platformIndex":4,"bridgeEdgeIndex":0}]]}'

function getStoreMap(mapEl: HTMLElement) {
  const platformEls = Array.from(mapEl.querySelectorAll<HTMLElement>('[kind="platform"]'))

  const platforms = platformEls.map(el => getCoords(el))
  const bridges = getStoreBridges(mapEl)

  return {
    platforms,
    bridges
  }
}

function retoreMap(mapEl: HTMLElement, data: {
  platforms: Point[],
  bridges: Array<Array<{ platformIndex: number, bridgeEdgeIndex: number }>>
}) {
  const platformEls = data.platforms.map(platformCoord => {
    const el = createPlatform()
    mapEl.appendChild(el)
    const dragInfo: DragInfo = {
      el,
      startOffset: { x: 0, y: 0 }
    }
    updateDragElem(platformCoord, dragInfo)

    return el
  })

  restoreBridges(platformEls, data.bridges)
}

interface DragInfo {
  startOffset: Point
  el: HTMLElement
}

let currDragInfo: DragInfo | null = null
let snapPoint: Point | null = null

function updateDragElem(pointer: Point, dragInfo: DragInfo) {
  dragInfo.el.style.left = pointer.x + dragInfo.startOffset.x + 'px'
  dragInfo.el.style.top = pointer.y + dragInfo.startOffset.y + 'px'
}

function getConfig(el: HTMLElement) {
  const kind = el.getAttribute('kind')
  /* it might be just event catcher, not the roto of the element */
  if (!kind) throw Error('Element has reproduce attribute but no kind attribute')

  const config = creationConfig[kind as keyof typeof creationConfig]
  if (!config) throw Error(`No config for kind: ${kind}`)

  return config
}

function startDrag(
  elem: HTMLElement,
  pointer: Point,
) {
  const { x, y } = getCoords(elem)
  elem.style.pointerEvents = 'none'
  
  if (currDragInfo) debugger // we have an error where poitner events none is not removed from the element

  currDragInfo = {
    startOffset: {
      x: x - pointer.x,
      y: y - pointer.y,
    },
    el: elem,
  }
  
  updateDragElem(pointer, currDragInfo)
}

export default function openMapCreator(wasmModule: Universe) {
  /* canvas - not needed for now, but to make correct order of HTML elements we do it here */
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)

  const { mapElement, unmount, startBtnClickPromise, viewElem, toolBarEl, controlPanelEl } = setupUI()

  setCoordsOrigin(mapElement)

  mapElement.addEventListener('mousemove', (e) => {
    if (currDragInfo) {
      if (snapPoint) {
          currDragInfo.el.style.left = snapPoint.x + 'px'
          currDragInfo.el.style.top = snapPoint.y + 'px'
      } else {
        const pointer = {
          x: e.clientX,
          y: e.clientY,
        }
        updateDragElem(pointer, currDragInfo)
        const config = getConfig(currDragInfo.el)
        config.onDrag?.(currDragInfo.el)
      }

      updateBridges()
    }
  })

  viewElem.addEventListener('mousedown', (e) => {
    // we assume that each element has it's event catcher, and the element root is one above that
    const elEventCatcherMaybe = (e.target as HTMLElement)

    if (!elEventCatcherMaybe.hasAttribute('event-catcher')) return

    const rootEl = (e.target as HTMLElement).parentElement!

    let dragEl: HTMLElement
    if (rootEl.hasAttribute('reproduce')) {
      dragEl = rootEl.cloneNode(true) as HTMLElement

      /* this is only for geenrating HTML for tests
        testId.value exists in import { testId } from './platform'
      */
      // Array.from(rootEl.querySelectorAll('[data-test]')).forEach(el => {
      //   el.setAttribute('data-test', `${testId.value++}`)
      // })

      dragEl.removeAttribute('reproduce')
      mapElement.appendChild(dragEl)
  
      const { x, y } = getCoords(rootEl)
      dragEl.style.top = y + 'px'
      dragEl.style.left = x + 'px'

      const config = getConfig(dragEl)
      config.onCreate?.(dragEl, rootEl)
    } else {
      dragEl = rootEl
    }

    const pointer = {
      x: e.clientX,
      y: e.clientY,
    }
    startDrag(dragEl, pointer)
  })

  let prevHoverEl = mapElement
  viewElem.addEventListener('mouseover', (e) => {
    snapPoint = null
    if (!currDragInfo) return

    prevHoverEl.classList.remove('valid-option')
    const hoverEventCatcherEl = e.target as HTMLElement
    const hoverRootEl = hoverEventCatcherEl.parentElement!

    const config = getConfig(currDragInfo.el)

    if (
      config.validHover &&
      hoverRootEl.getAttribute('kind') !== config.validHover
    ) return
    hoverRootEl.classList.add('valid-option')
    prevHoverEl = hoverRootEl

    if (config.snap) {
      snapPoint = getCoords(hoverRootEl)
      config.onSnap?.(currDragInfo.el, hoverRootEl)
    }
  })

  viewElem.addEventListener('mouseup', () => {
    if (currDragInfo) {
      const config = getConfig(currDragInfo.el)
      const validOptionEl = mapElement.querySelector<HTMLElement>('.valid-option')

      const isValid = 
        config.validHover ? validOptionEl : true

      if (!isValid) {
        currDragInfo.el.remove()
        config.onDragEndFailure?.(currDragInfo.el)
      } else {
        config.onDragEndSuccess?.(currDragInfo.el, validOptionEl)
      }

      validOptionEl?.classList.remove('valid-option')

      currDragInfo.el.style.pointerEvents = 'auto'
      currDragInfo = null
    }
  })

  retoreMap(mapElement, JSON.parse(storedMap) as ReturnType<typeof getStoreMap>)
 

  
  /* clean the DOM and go to the next phase */
  Promise.all([startBtnClickPromise, getInitUniverse()])
    .then(([_, initUniverse]) => {
      const scale = 3
      const serializedMap = serializeMap(mapElement, scale)

      console.log(JSON.stringify(getStoreMap(mapElement)))



      // to print bridges data then to use them in tests
      // console.log(output.map(v => v === null
      //   ? null
      //   : v.getAttribute('data-test')
      // ))
      // console.log(
      //   bridges.map(
      //     b => b.anchorPoints.map(
      //       p => p.getAttribute('data-test')
      //     ).join(',')
      //   )
      // )
      const {lightDirection} = getMatricies(canvas, serializedMap.cameraTarget, 0)
      const universe = Universe.new(
        new Float32Array(),
        new Float32Array(serializedMap.obstacles),
        new Float32Array(serializedMap.envVisuals.platforms),
        new Float32Array(serializedMap.envVisuals.bridges),
        new Float32Array(),
        -getCameraAngle()[1],
        new Float32Array([-lightDirection[0], -lightDirection[1], -lightDirection[2]]),
      )

      initUniverse(
        universe,
        serializedMap,
        new Float32Array([
          ...[
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
          ],
          // ...colorMatrix,
          ...[
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 0, 0, 0,
            // 0, 0, 0, 1 once we use alpha, we might uncomment it, and probably we need to use 1 in whole row(mathematic column)
          ]
        ]),
      //   getSerializedMapInfo(nodes, connections, portals),
      //   factionVisualDetails,
      )

      // viewElem.style.opacity = '.3'
      startTransition(canvas, mapElement, toolBarEl, controlPanelEl,serializedMap.cameraTarget, unmount, scale)
    })
}

