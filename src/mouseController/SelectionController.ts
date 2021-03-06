import { HALF_UNIT_HEIGHT } from 'Consts'
import { Universe } from '../../crate/pkg/index'
import { UniverseRepresentation } from '~/initGame'
import Unit from '~/representation/Unit'
import Factory from '~/representation/Factory'
import updateAbilitiesButtons from '~/buttons/abilities'
import { RepresentationId } from '~/buttons/abilities/createIcon'
import StrategicPoint from '~/representation/StrategicPoint'

class SelectionController {
  private startPoint: null | Point
  private selectionRectangle: PIXI.Graphics
  private universe: Universe
  private universeRepresentation: UniverseRepresentation
  private selectedUnits: Unit[]
  private selectedSquads: Uint32Array
  private selectedAbilityType: RepresentationId | null

  constructor(universe: Universe, universeRepresentation: UniverseRepresentation) {
    this.universe = universe
    this.universeRepresentation = universeRepresentation
    this.selectedUnits = []
    this.selectedSquads = new Uint32Array()
    this.startPoint = null
    this.selectionRectangle = new PIXI.Graphics()
    window.ui.addChild(this.selectionRectangle)
    this.selectedAbilityType = null
  }

  public consumeSelection({ x, y }: Point) {
    if (this.selectedAbilityType) {
      this.deselectAbility()
      return
    }

    // const tracks = this.universe.move_units(this.selectedSquads, x, y)
    // tracksDebug(tracks)
    if (this.selectedSquads.length === 0) return

    const selectedEnemyUnitsIds = this.universe.move_units(this.selectedSquads, x, y)

    if (selectedEnemyUnitsIds.length === 0) return

    selectedEnemyUnitsIds.forEach(id => {
      const unit = this.universeRepresentation[id] as Unit | Factory | StrategicPoint
      unit.select()
    })

    setTimeout(() => {
      selectedEnemyUnitsIds.forEach(id => {
        const unit = this.universeRepresentation[id] as Unit | Factory | StrategicPoint
        if (unit) {
          unit.deselect()
        }
      })
    }, 2000)
  }

  private selectUnits(x1: number, x2: number, y1: number, y2: number) {
    const result = this.universe.get_selected_units_ids(x1, x2, y1, y2)
    if (result.length === 1) {
      // there is only divider "0"
      this.selectedSquads = new Uint32Array()
      return
    }
    const indexOfDivider = result.indexOf(0) // 0 -> divides between squads ids and units ids
    const unitsIds = result.subarray(0, indexOfDivider)
    const squadsIds = result.subarray(indexOfDivider + 1)
    this.selectedSquads = squadsIds

    const iconsPayload: number[][] = []
    let collectedUnits: number[] = []

    unitsIds.forEach(id => {
      if (id === 1) {
        // 1 -> divider between each squad
        iconsPayload.push(collectedUnits)
        collectedUnits = []
        return
      }
      const unit = this.universeRepresentation[id] as Unit
      if (unit) {
        // update wasn't called yet, with new unit
        unit.select()
      }
      this.selectedUnits.push(unit)
      collectedUnits.push(id)
    })
  }

  private deselectAbility() {
    window.app.stage.cursor = 'default'
    this.selectedAbilityType = null
  }

  private selectAbility = (abilityType: RepresentationId) => {
    window.app.stage.cursor = "url('assets/aim_icon.png') 15 15,crosshair"
    this.selectedAbilityType = abilityType
  }

  public startSelection(point: Point) {
    if (this.selectedAbilityType) {
      this.universe.use_ability(this.selectedSquads, this.selectedAbilityType, point.x, point.y)
      this.deselectAbility()
      return
    }
    this.startPoint = point
    this.clearSelection()
  }

  private clearSelection() {
    this.selectedUnits.forEach(unit => unit && unit.deselect())
    this.selectedUnits = []
    this.selectedSquads = new Uint32Array()
  }

  public updateSelection({ x, y }: Point) {
    updateAbilitiesButtons(
      this.selectedSquads,
      this.universe,
      this.selectedAbilityType,
      this.selectAbility,
    )

    if (!this.startPoint) return

    this.clearSelection()

    this.selectUnits(
      Math.min(this.startPoint.x, x),
      Math.max(this.startPoint.x, x),
      Math.min(this.startPoint.y, y),
      Math.max(this.startPoint.y, y),
    )
    window.ui.interactiveChildren = false
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
    if (!this.startPoint) return

    window.ui.interactiveChildren = true
    this.selectionRectangle.clear()
    if (this.selectedUnits.length === 0) {
      this.selectUnits(
        this.startPoint.x - 30,
        this.startPoint.x + 30,
        this.startPoint.y - 30 + HALF_UNIT_HEIGHT,
        this.startPoint.y + 30 + HALF_UNIT_HEIGHT,
      )
    }
    this.startPoint = null
  }
}

export default SelectionController
