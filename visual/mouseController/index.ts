import { UniverseRepresentation, WasmModule } from '~/initGame'
import SelectionController from './SelectionController'
import getCameraPositionModificators from './getCameraPositionModificators'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

const getCalcYFunc = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
) => {
  const a = (y2 - y1) / (x2 - x1)
  const b = y1 - a * x1
  return (x: number) => a * x + b
}

class MouseController {
  private modX: number
  private modY: number
  private sceneX: number
  private sceneY: number
  private mouseX: number
  private mouseY: number
  private selectionController: SelectionController
  private getTopBoundary: (x: number) => number
  private getBottomBoundary: (x: number) => number
  private rightBoundary: number
  private leftBoundary: number

  constructor(wasmModule: WasmModule, universeRepresentation: UniverseRepresentation) {
    this.modX = 0
    this.modY = 0
    this.sceneX = 0
    this.sceneY = 0
    this.mouseX = 0
    this.mouseY = 0
    this.selectionController = new SelectionController(wasmModule, universeRepresentation)
    
    window.app.stage.interactive = true
    window.app.stage.on('mousedown', this.onMouseDown)
    window.app.stage.on('rightdown', this.onMouseRightBtnDown)
    window.app.stage.on('mouseup', this.onMouseUp)
    window.app.view.addEventListener('mousemove', this.onMouseMove)
    window.app.view.addEventListener('mouseleave', this.onMouseLeave)
    window.addEventListener('resize', this.updateCameraBoundaries)

    const leftTopCorner = window.convertLogicCoordToVisual(0, 0)
    const rightTopCorner = window.convertLogicCoordToVisual(MAP_WIDTH, 0)
    const rightBottomCorner = window.convertLogicCoordToVisual(MAP_WIDTH, MAP_HEIGHT)
    const leftBottomCorner = window.convertLogicCoordToVisual(0, MAP_HEIGHT)


    const getRightBottomY = getCalcYFunc([-leftTopCorner[0], -leftTopCorner[1]], [-leftBottomCorner[0], -leftBottomCorner[1]])
    const getLeftBottomY = getCalcYFunc([-rightBottomCorner[0], -rightBottomCorner[1]], [-leftBottomCorner[0], -leftBottomCorner[1]])
    const getRightTopY = getCalcYFunc([-leftTopCorner[0], -leftTopCorner[1]], [-rightTopCorner[0], -rightTopCorner[1]])
    const getLeftTopY = getCalcYFunc([-rightBottomCorner[0], -rightBottomCorner[1]], [-rightTopCorner[0], -rightTopCorner[1]])


    this.getTopBoundary = (x: number) => {
      if (x < -rightTopCorner[0]) {
        return getLeftTopY(x)
      }
      return getRightTopY(x)
    }

    this.getBottomBoundary = (x: number) => { // working correctly
      if (x < leftBottomCorner[0]) {
        return getLeftBottomY(x)
      }
      return getRightBottomY(x)
    }
    this.rightBoundary = -rightBottomCorner[0]
    this.leftBoundary = -leftTopCorner[0]
    this.updateCameraBoundaries()
  }

  private updateCameraBoundaries = () => {
    this.updateScenePosition()
    window.app.renderer.resize(window.innerWidth, window.innerHeight)
  }

  private onMouseDown = () => {
    this.selectionController.startSelection(this.absoluteMousePosition)
  }

  private onMouseRightBtnDown = () => {
    this.selectionController.consumeSelection(this.absoluteMousePosition)
  }

  private onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX
    this.mouseY = event.clientY

    const { modX, modY } = getCameraPositionModificators(this.mouseX, this.mouseY)
    this.modX = modX
    this.modY = modY
    this.selectionController.updateSelection(this.absoluteMousePosition)
  }

  private onMouseUp = () => {
    this.selectionController.endSelection()
  }

  private onMouseLeave = () => {
    this.modX = 0
    this.modY = 0
  }

  private get absoluteMousePosition() {
    return {
      x: this.mouseX - this.sceneX,
      y: this.mouseY - this.sceneY,
    }
  }

  public updateScenePosition() {
    const minusSpaceX = 0 // window.innerWidth / 2 - 100
    const minusSpaceY = 0 // window.innerHeight / 2 - 100
    const x = Math.clamp(
      this.sceneX + this.modX,
      this.rightBoundary + minusSpaceX,
      this.leftBoundary - minusSpaceY,
    )

    this.sceneX = x
    this.sceneY = Math.clamp(
      this.sceneY + this.modY,
      this.getBottomBoundary(x) + minusSpaceY,
      this.getTopBoundary(x) - minusSpaceY,
    )

    window.app.stage.x = this.sceneX + window.innerWidth / 2
    window.app.stage.y = this.sceneY + window.innerHeight / 2

    this.selectionController.updateSelection(this.absoluteMousePosition)
  }
}

export default MouseController
