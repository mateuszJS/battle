import { UniverseRepresentation, WasmModule } from '~/initGame'
import Unit from '~/representation/Unit'
import Factory from '~/representation/Factory'
import updateAbilitiesButtons from '~/buttons/abilities'
import { RepresentationId } from '~/buttons/abilities/createIcon'
import StrategicPoint from '~/representation/StrategicPoint'
import { UINT_DATA_SETS_DIVIDER } from '../../logic/constants'
import { getFrames } from '~/representation/utils'

let debugContainer = null

const SELECTION_THROTTLE = 10

class SelectionController {
  private startPoint: null | Point
  private selectionRectangle: PIXI.Graphics
  private indicatorsContainer: PIXI.Container
  private wasmModule: WasmModule
  private universeRepresentation: UniverseRepresentation
  private selectedUnits: Unit[]
  private selectedSquads: Uint32Array
  private selectedAbilityType: RepresentationId | null
  private selectionTimer: number
  private indicatorPositionFrames: PIXI.Texture[]

  constructor(wasmModule: WasmModule, universeRepresentation: UniverseRepresentation) {
    this.wasmModule = wasmModule
    this.universeRepresentation = universeRepresentation
    this.selectedUnits = []
    this.selectedSquads = new Uint32Array()
    this.startPoint = null
    this.selectionRectangle = new PIXI.Graphics()
    window.ui.addChild(this.selectionRectangle)
    this.indicatorsContainer = new PIXI.Container()
    window.ui.addChild(this.indicatorsContainer)
    this.selectedAbilityType = null
    this.selectionTimer = 0
    this.indicatorPositionFrames = getFrames(7, (id: string) => `fireEffect_${id[3]}.png`)
  }

  public consumeSelection({ x, y }: Point) {
    if (this.selectedAbilityType) {
      this.deselectAbility()
      return
    }

    // const tracks = this.universe.move_units(this.selectedSquads, x, y)
    // tracksDebug(tracks)
    if (this.selectedSquads.length === 0) return

    const moveUnitsResultPoiner = this.wasmModule.moveUnits(
      window.getUint32ArrayPointer(this.selectedSquads),
      x,
      y,
    )
    
    window.useFloat32ArrayData(moveUnitsResultPoiner, moveUnitsResult => {
      const indexOfDivider = moveUnitsResult.indexOf(UINT_DATA_SETS_DIVIDER) // 0 -> divides between squads ids and units ids
      const enemyUnitIds = moveUnitsResult.subarray(0, indexOfDivider)
      const positions = moveUnitsResult.subarray(indexOfDivider + 1)
      // so we should make a copy

      if (enemyUnitIds.length > 0) {
        const selectedEnemyUnits = Array.from(enemyUnitIds).map(id => (
          this.universeRepresentation[id] as Unit | Factory | StrategicPoint
        ))
        selectedEnemyUnits.forEach(unit => {
          unit.select()
        })

        setTimeout(() => {
          selectedEnemyUnits.forEach(unit => {
            if (unit) {
              unit.deselect()
            }
          })
        }, 2000)
      }

      for (let i = 0; i < positions.length; i += 2) {
        this.createIndicator(positions[i], positions[i + 1])
      }
    })
  }

  private selectUnits(x1: number, y1: number, x2: number, y2: number) {
    // window.useFloat32ArrayData(
    //   this.wasmModule.debugSelecting(x1, y1, x2, y2),
    //   (data) => {
    //     if (!debugContainer) {
    //       debugContainer = new PIXI.Graphics()
    //       window.ui.addChild(debugContainer)
    //     }
    //     debugContainer.clear()
    //     debugContainer.beginFill(0xff0000)
    //     // console.log(data)
    //     for (let i = 0; i < data.length; i += 2) {
    //       debugContainer.drawRect(data[i] - 15, data[i + 1] - 15, 30, 30)
    //     }
    //   },
    // )

    window.useUint32ArrayData(
      this.wasmModule.getSelectedUnitsIds(x1, y1, x2, y2),
      (result) => {
        if (result.length === 1) {
          // there is only divider UINT_DATA_SETS_DIVIDER
          this.selectedSquads = new Uint32Array()
          return
        }
        const indexOfDivider = result.indexOf(UINT_DATA_SETS_DIVIDER) // 0 -> divides between squads ids and units ids
        const unitsIds = result.subarray(0, indexOfDivider)
        const squadsIds = result.subarray(indexOfDivider + 1)
        this.selectedSquads = squadsIds.slice() // because wasm memory will be collected by Garbage collector
        // so we should make a copy

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
    )


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
    // updateAbilitiesButtons(
    //   this.selectedSquads,
    //   this.wasmModule,
    //   this.selectedAbilityType,
    //   this.selectAbility,
    // )

    if (!this.startPoint) return
    
    if (++this.selectionTimer < SELECTION_THROTTLE) {
      return
    } else {
      this.clearSelection()
      this.selectUnits(
        this.startPoint.x,
        this.startPoint.y,
        x,
        y,
        // Math.min(this.startPoint.x, x),
        // Math.max(this.startPoint.x, x),
        // Math.min(this.startPoint.y, y),
        // Math.max(this.startPoint.y, y),
      )
      this.selectionTimer = 0
    }

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

  private createIndicator(x: number, y: number) {
    const movieClip = new PIXI.AnimatedSprite(this.indicatorPositionFrames)
    movieClip.animationSpeed = 0.55
    movieClip.x = x
    movieClip.y = y
    movieClip.loop = false
    movieClip.anchor.set(0.5)
    movieClip.scale.set(2)
    movieClip.onComplete = function() {
      this.destroy()
    }
    this.indicatorsContainer.addChild(movieClip)
    movieClip.play()
  }

  public endSelection() {
    if (!this.startPoint) return

    window.ui.interactiveChildren = true
    this.selectionRectangle.clear()
    if (this.selectedUnits.length === 0) {
      // click on unit
      this.selectUnits(
        this.startPoint.x - 30,
        this.startPoint.y - 30,
        this.startPoint.x + 30,
        this.startPoint.y + 30,
      )
    }
    this.startPoint = null
  }
}

export default SelectionController
