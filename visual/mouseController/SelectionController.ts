import { HALF_UNIT_HEIGHT } from 'Consts'
import { UniverseRepresentation, WasmModule } from '~/initGame'
import Unit from '~/representation/Unit'
import Factory from '~/representation/Factory'
import updateAbilitiesButtons from '~/buttons/abilities'
import { RepresentationId } from '~/buttons/abilities/createIcon'
import StrategicPoint from '~/representation/StrategicPoint'

class SelectionController {
  private startPoint: null | Point
  private selectionRectangle: PIXI.Graphics
  private wasmModule: WasmModule
  private universeRepresentation: UniverseRepresentation
  private selectedUnits: Unit[]
  private selectedSquads: Uint32Array
  private selectedAbilityType: RepresentationId | null

  constructor(wasmModule: WasmModule, universeRepresentation: UniverseRepresentation) {
    this.wasmModule = wasmModule
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

    const selectedEnemyUnitsIdsPoint = this.wasmModule.moveUnits(
      window.getUint32ArrayPointer(this.selectedSquads),
      x,
      y,
    )

    window.useUint32ArrayData(selectedEnemyUnitsIdsPoint, selectedEnemyUnitsIds => {
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
    })
  }

  private selectUnits(x1: number, x2: number, y1: number, y2: number) {
    let unitsIds;

    window.useUint32ArrayData(
      this.wasmModule.getSelectedUnitsIds(x1, x2, y1, y2),
      (result) => {
        if (result.length === 1) {
          // there is only divider "0"
          this.selectedSquads = new Uint32Array()
          return
        }
        const indexOfDivider = result.indexOf(0) // 0 -> divides between squads ids and units ids
        unitsIds = result.subarray(0, indexOfDivider)
        const squadsIds = result.subarray(indexOfDivider + 1)
        this.selectedSquads = squadsIds
      }
    )

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
      this.wasmModule.useAbility(
        window.getUint32ArrayPointer(this.selectedSquads),
        this.selectedAbilityType,
        point.x,
        point.y,
      )
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
      this.wasmModule,
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
