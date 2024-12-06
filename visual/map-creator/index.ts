import { Universe } from 'Universe'
import getinitUniverse from 'getInitUniverse'
import getCoords, { setCoordsOrigin } from './getCoords'
import setupUI from './setupUI'
import creationConfig from './creationConfig'
import { bridges, updateBridges } from './bridge'
import serializeMap from './serializeMap'

interface DragInfo {
  startOffset: Point
  el: HTMLElement
}

let currDragInfo: DragInfo | null = null
let snapPoint: Point | null = null

function updateDragElem(e: MouseEvent, dragInfo: DragInfo) {
  dragInfo.el.style.left = e.clientX + dragInfo.startOffset.x + 'px'
  dragInfo.el.style.top = e.clientY + dragInfo.startOffset.y + 'px'
}

function getConfig(el: HTMLElement) {
  const kind = el.getAttribute('kind')
  /* it might be just event catcher, not the roto of the element */
  if (!kind) throw Error('Element has reproduce attribute but no kind attribute')

  const config = creationConfig[kind as keyof typeof creationConfig]
  if (!config) throw Error(`No config for kind: ${kind}`)

  return config
}

export function startDrag(
  elem: HTMLElement,
  event: MouseEvent,
) {
  const { x, y } = getCoords(elem)
  elem.style.pointerEvents = 'none'
  
  if (currDragInfo) debugger // we have an error where poitner events none is not removed from the element

  currDragInfo = {
    startOffset: {
      x: x - event.clientX,
      y: y - event.clientY,
    },
    el: elem,
  }
  
  updateDragElem(event, currDragInfo)
}

export default function openMapCreator(wasmModule: Universe) {
  const { mapElement, unmount, startBtnClickPromise, viewElem } = setupUI()

  setCoordsOrigin(mapElement)

  mapElement.addEventListener('mousemove', (e) => {
    if (currDragInfo) {
      if (snapPoint) {
          currDragInfo.el.style.left = snapPoint.x + 'px'
          currDragInfo.el.style.top = snapPoint.y + 'px'
      } else {
        updateDragElem(e, currDragInfo)
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

    startDrag(dragEl, e)
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
 
  /* canvas */
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  
  /* clean the DOM and go to the next phase */
  Promise.all([startBtnClickPromise, getinitUniverse()])
    .then(([_, initUniverse]) => {
      const output = serializeMap(mapElement)
      console.log(output.map(v => v === null
        ? null
        : v.getAttribute('data-test')
      ))

      console.log(
        bridges.map(
          b => b.anchorPoints.map(
            p => p.getAttribute('data-test')
          ).join(',')
        )
      )
      // unmount()


      // initUniverse(
      //   wasmModule,
      //   1000, // should be readed from input(or make map resizable!)
      //   1000,
      //   new Float32Array([
      //     // ...colorMatrix,
      //     ...[
      //       0, 1, 0, 0,
      //       0, 0, 1, 0,
      //       1, 0, 0, 0,
      //     ]
      //   ]),
      // //   getSerializedMapInfo(nodes, connections, portals),
      // //   factionVisualDetails,
      // )
    })
}

