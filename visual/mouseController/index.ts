import { UniverseRepresentation, WasmModule } from '~/initGame'
import SelectionController from './SelectionController'
import getCameraPositionModificators from './getCameraPositionModificators'
import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'

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

  constructor(wasmModule: WasmModule, universeRepresentation: UniverseRepresentation) {
    this.modX = 0
    this.modY = 0
    this.sceneX = 0
    this.sceneY = 0
    this.mouseX = 0
    this.mouseY = 0
    this.selectionController = new SelectionController(wasmModule, universeRepresentation)
    this.updateCameraBoundaries()
    window.app.stage.interactive = true
    window.app.stage.on('mousedown', this.onMouseDown)
    window.app.stage.on('rightdown', this.onMouseRightBtnDown)
    window.app.stage.on('mouseup', this.onMouseUp)
    window.app.view.addEventListener('mousemove', this.onMouseMove)
    window.app.view.addEventListener('mouseleave', this.onMouseLeave)
    window.addEventListener('resize', this.updateCameraBoundaries)
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
    this.sceneX = Math.clamp(
      this.sceneX + this.modX,
      this.boundaries.minCameraX,
      this.boundaries.maxCameraX,
    )
    this.sceneY = Math.clamp(
      this.sceneY + this.modY,
      this.boundaries.minCameraY,
      this.boundaries.maxCameraY,
    )

    window.app.stage.x = this.sceneX
    window.app.stage.y = this.sceneY

    this.selectionController.updateSelection(this.absoluteMousePosition)
  }
}

export default MouseController
