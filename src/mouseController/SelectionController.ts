import { HALF_UNIT_HEIGHT } from 'Consts'
import { Universe } from '../../crate/pkg/index'
import { UniverseRepresentation } from '../setup'
import { tracksDebug } from './debug'
import Unit from '~/representation/Unit'

class SelectionController {
  private startPoint: null | Point
  private selectionRectangle: PIXI.Graphics
  private universe: Universe
  private universeRepresentation: UniverseRepresentation
  private selectedUnits: Unit[]
  private selectedSquads: Float32Array

  constructor(
    universe: Universe,
    universeRepresentation: UniverseRepresentation,
  ) {
    this.universe = universe
    this.universeRepresentation = universeRepresentation
    this.selectedUnits = []
    this.selectedSquads = new Float32Array()
    this.startPoint = null
    this.selectionRectangle = new PIXI.Graphics()
    window.app.stage.addChild(this.selectionRectangle)
  }

  public consumeSelection({ x, y }: Point) {
    const tracks = this.universe.move_units(this.selectedSquads, x, y)
    tracksDebug(tracks)
  }

  private selectUnits(x1: number, x2: number, y1: number, y2: number) {
    const result = this.universe.get_selected_units_ids(x1, x2, y1, y2, true)
    if (result.length === 1) {
      this.selectedSquads = new Float32Array()
      return
    } // it's only divider "0"
    const indexOfDivider = result.indexOf(0)
    const unitsIds = result.subarray(0, indexOfDivider)
    const squadsIds = result.subarray(indexOfDivider + 1)
    this.selectedSquads = squadsIds

    unitsIds.forEach(id => {
      const unit = this.universeRepresentation[id] as Unit
      unit.select()
      this.selectedUnits.push(unit)
    })
  }

  public startSelection(point: Point) {
    this.startPoint = point
    this.selectedUnits.forEach(unit => unit.deselect())
    this.selectedUnits = []
  }
  public updateSelection({ x, y }: Point) {
    if (!this.startPoint) return

    this.selectedUnits.forEach(unit => unit.deselect())
    this.selectedUnits = []

    this.selectUnits(
      Math.min(this.startPoint.x, x),
      Math.max(this.startPoint.x, x),
      Math.min(this.startPoint.y, y),
      Math.max(this.startPoint.y, y),
    )
    this.selectionRectangle.clear()
    this.selectionRectangle.lineStyle(2, 0x00ff00, 1)
    this.selectionRectangle.beginFill(0x00ff00, 0.2)
    this.selectionRectangle.drawRect(
      this.startPoint.x,
      this.startPoint.y,
      x - this.startPoint.x,
      y - this.startPoint.y,
    )
    this.selectionRectangle.endFill()
  }

  public endSelection() {
    this.selectionRectangle.clear()
    if (this.selectedUnits.length === 0) {
      this.selectUnits(
        this.startPoint.x - 20,
        this.startPoint.x + 20,
        this.startPoint.y - 20 + HALF_UNIT_HEIGHT,
        this.startPoint.y + 20 + HALF_UNIT_HEIGHT,
      )
    }
    this.startPoint = null
  }
}

export default SelectionController
