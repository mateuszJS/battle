import Unit from './representation/Unit'
import { Universe } from '../crate/pkg/index'
import { UniverseRepresentation } from './setup'

const MOUSE_LEFT_BUTTON = 0
const MOUSE_RIGHT_BUTTON = 2
const HALF_UNIT_HEIGHT = 20

const initializeMouseController = (
  universe: Universe,
  universeRepresentation: UniverseRepresentation,
) => {
  let selectedUnits = []
  let selectedSquads = []

  let startPoint = null
  const selectionRectangle = new PIXI.Graphics()
  const graph = new PIXI.Graphics()
  window.app.stage.addChild(graph)

  const selectUnits = (x1: number, x2: number, y1: number, y2: number) => {
    const result = universe.get_selected_units_ids(x1, x2, y1, y2, true)

    const indexOfDivider = result.indexOf(0)
    selectedSquads = result.splice(indexOfDivider + 1)
    result.pop()

    result.forEach(id => {
      const unit = universeRepresentation[id] as Unit
      unit.select()
      selectedUnits.push(unit)
    })
  }

  window.app.stage.addChild(selectionRectangle)

  const onMouseDown = (e: MouseEvent) => {
    if (e.button === MOUSE_LEFT_BUTTON) {
      selectedUnits.forEach(unit => unit.deselect())
      selectedUnits = []
      startPoint = {
        x: e.clientX,
        y: e.clientY,
      }
    } else if (e.button === MOUSE_RIGHT_BUTTON) {
      const result = universe.move_units(
        Float32Array.from(selectedSquads),
        e.clientX,
        e.clientY,
      )
      graph.lineStyle(3, 0xffffff)
      graph.moveTo(result[0], result[1])
      for (let i = 2; i < result.length; i += 2) {
        graph.lineTo(result[i], result[i + 1])
      }
      // console.log(result)
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!startPoint) return
    selectedUnits.forEach(unit => unit.deselect())
    selectedUnits = []

    const endX = e.clientX
    const endY = e.clientY

    selectUnits(
      Math.min(startPoint.x, endX),
      Math.max(startPoint.x, endX),
      Math.min(startPoint.y, endY),
      Math.max(startPoint.y, endY),
    )
    selectionRectangle.clear()
    selectionRectangle.lineStyle(2, 0x00ff00, 1)
    selectionRectangle.beginFill(0x00ff00, 0.2)
    selectionRectangle.drawRect(
      startPoint.x,
      startPoint.y,
      endX - startPoint.x,
      endY - startPoint.y,
    )
    selectionRectangle.endFill()
  }

  const onMouseUp = () => {
    selectionRectangle.clear()
    if (selectedUnits.length === 0) {
      selectUnits(
        startPoint.x - 20,
        startPoint.x + 20,
        startPoint.y - 20 + HALF_UNIT_HEIGHT,
        startPoint.y + 20 + HALF_UNIT_HEIGHT,
      )
    }
    startPoint = null
  }

  window.app.view.addEventListener('mousedown', onMouseDown)
  window.app.view.addEventListener('mouseup', onMouseUp)
  window.app.view.addEventListener('mousemove', onMouseMove)
}

export default initializeMouseController
