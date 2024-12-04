import { addNewBridge, adjustBirdgeEdgePreview, onPreviewSnap, removeBridgePreview, updateLastBridge } from "./bridge"

interface CreationConfigEntry {
  snap?: boolean
  validHover?: string
  onCreate?: (el: HTMLElement, sourceEl: HTMLElement) => void
  onDrag?: (el: HTMLElement) => void
  onDragEndSuccess?: (el: HTMLElement, validHoverEl: HTMLElement | null) => void
  onDragEndFailure?: (el: HTMLElement) => void
  onSnap?: (el: HTMLElement, snapToEl: HTMLElement) => void
}

/** Maps CSS class name to creation config */
const creationConfig: Record<string, CreationConfigEntry> = {
  'platform': {},
  'bridge-edge': {
    snap: true,
    validHover: 'bridge-edge',
    onCreate: (el, sourceEl) => {
      addNewBridge(el, sourceEl)
    },
    onDrag: (el) => {
      adjustBirdgeEdgePreview(el)
    },
    onDragEndSuccess: (el, validHoverEl) => {
      if (!validHoverEl) throw Error('Bridge edge must have valid hover option to be created')
      updateLastBridge(el, validHoverEl)
      el.remove()
    },
    onDragEndFailure: (el) => {
      removeBridgePreview()
    },
    onSnap: (el, snapToEl) => {
      onPreviewSnap(el, snapToEl)
    }
  }
} as const

export default creationConfig