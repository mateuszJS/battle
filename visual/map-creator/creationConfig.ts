import { DragInfo } from "map-creator"
import { addNewBridge, adjustBirdgeEdgePreview, onPreviewSnap, removeBridgePreview, updateLastBridge } from "./bridge"
import getCoords from "./getCoords"

interface CreationConfigEntry {
  snap?: boolean
  validHover?: string
  onCreate?: (el: HTMLElement, sourceEl: HTMLElement) => void
  onDrag: (pointer: Point, dragInfo: DragInfo) => void
  onDragEndSuccess?: (el: HTMLElement, validHoverEl: HTMLElement | null) => void
  onDragEndFailure?: (el: HTMLElement) => void
  onSnap?: (el: HTMLElement, snapToEl: HTMLElement) => void
  onMove?: (el: HTMLElement, snapToEl: HTMLElement) => void
}

function defaultOnDrag(pointer: Point, dragInfo: DragInfo) {
  dragInfo.el.style.left = pointer.x + dragInfo.startOffset.x + 'px'
  dragInfo.el.style.top = pointer.y + dragInfo.startOffset.y + 'px'
}

/** Maps CSS class name to creation config */
const creationConfig: Record<string, CreationConfigEntry> = {
  'platform': { onDrag: defaultOnDrag },
  'bridge-edge': {
    snap: true,
    validHover: 'bridge-edge',
    onCreate(el, sourceEl) {
      addNewBridge(el, sourceEl)
    },
    onDrag(pointer, dragInfo) {
      defaultOnDrag(pointer, dragInfo)
      adjustBirdgeEdgePreview(dragInfo.el)
    },
    onDragEndSuccess(el, validHoverEl) {
      if (!validHoverEl) throw Error('Bridge edge must have valid hover option to be created')
      updateLastBridge(el, validHoverEl)
      el.remove()
    },
    onDragEndFailure(el) {
      removeBridgePreview()
    },
    onSnap(el, snapToEl) {
      onPreviewSnap(el, snapToEl)
    }
  },
  'factory': { onDrag: defaultOnDrag },
  'factory-arrow': {
    onDrag(pointer, dragInfo) {
      const factoryCenter = getCoords(dragInfo.el)

      const angle = Math.atan2(pointer.y - factoryCenter.y, pointer.x - factoryCenter.x)

      dragInfo.el.style.rotate = angle * (180 / Math.PI) + 'deg'
    }
  }
} as const

export default creationConfig