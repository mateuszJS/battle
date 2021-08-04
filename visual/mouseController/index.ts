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
  private boundaries: {
    maxCameraX: number
    maxCameraY: number
    minCameraX: number
    minCameraY: number
  }
  private getMinY: (x: number) => number
  private getMaxY: (x: number) => number
  private minX: number
  private maxX: number

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

    const getLeftBottomY = getCalcYFunc(leftTopCorner, leftBottomCorner)
    const getRightBottomY = getCalcYFunc(rightBottomCorner, leftBottomCorner)
    const getLeftTopY = getCalcYFunc(leftTopCorner, rightTopCorner)
    const getRightTopY = getCalcYFunc(rightBottomCorner, rightTopCorner)

    this.getMinY = (x: number) => {
      if (x < rightTopCorner[0]) {
        return getLeftTopY(x)
      }
      return getRightTopY(x)
    }

    this.getMaxY = (x: number) => {
      if (x < leftBottomCorner[0]) {
        return getLeftBottomY(x)
      }
      return getRightBottomY(x)
    }
    this.minX = leftTopCorner[0]
    this.maxX = rightBottomCorner[0]

    this.updateCameraBoundaries()
  }

  private updateCameraBoundaries = () => {
    this.boundaries = {
      maxCameraX: 0,
      maxCameraY: 0,
      minCameraX: -(MAP_WIDTH - window.innerWidth),
      minCameraY: -(MAP_HEIGHT - window.innerHeight),
    }
    // console.log('updateCameraBoundaries')
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
    const x = Math.clamp(
      this.sceneX + this.modX,
      this.minX,
      this.maxX,
    )

    this.sceneX = x
    this.sceneY = Math.clamp(
      x,
      this.getMinY(x),
      this.getMaxY(x),
    )
    // this.sceneY = Math.clamp(
    //   this.sceneY + this.modY,
    //   this.boundaries.minCameraY,
    //   this.boundaries.maxCameraY,
    // )

    window.app.stage.x = this.sceneX
    window.app.stage.y = this.sceneY

    this.selectionController.updateSelection(this.absoluteMousePosition)
  }
}

export default MouseController
