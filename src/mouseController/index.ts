import Utils from 'Utils'
import { MIN_CAMERA_X, MAX_CAMERA_X, MIN_CAMERA_Y, MAX_CAMERA_Y } from 'Consts'

import { Universe } from '../../crate/pkg/index'
import { UniverseRepresentation } from '../setup'
import SelectionController from './SelectionController'
import getCameraPositionModificators from './getCameraPositionModificators'
import { anglesDebug } from '~/debug'

const MOUSE_LEFT_BUTTON = 0
const MOUSE_RIGHT_BUTTON = 2

class MouseController {
  private modX: number
  private modY: number
  private sceneX: number
  private sceneY: number
  private mouseX: number
  private mouseY: number
  private selectionController: SelectionController

  constructor(
    universe: Universe,
    universeRepresentation: UniverseRepresentation,
  ) {
    this.modX = 0
    this.modY = 0
    this.sceneX = 0
    this.sceneY = 0
    this.mouseX = 0
    this.mouseY = 0
    this.selectionController = new SelectionController(
      universe,
      universeRepresentation,
    )

    window.app.view.addEventListener('mousedown', this.onMouseDown)
    window.app.view.addEventListener('mouseup', this.onMouseUp)
    window.app.view.addEventListener('mousemove', this.onMouseMove)
    window.app.view.addEventListener('mouseleave', this.onMouseLeave)

    anglesDebug()
  }

  private onMouseDown = ({ button: mouseButton }: MouseEvent) => {
    if (mouseButton === MOUSE_LEFT_BUTTON) {
      this.selectionController.startSelection(this.absoluteMousePosition)
    } else if (mouseButton === MOUSE_RIGHT_BUTTON) {
      this.selectionController.consumeSelection(this.absoluteMousePosition)
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    this.mouseX = event.clientX
    this.mouseY = event.clientY

    const { modX, modY } = getCameraPositionModificators(
      this.mouseX,
      this.mouseY,
    )
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
    this.sceneX = Utils.clamp(
      MIN_CAMERA_X,
      this.sceneX + this.modX,
      MAX_CAMERA_X,
    )
    this.sceneY = Utils.clamp(
      MIN_CAMERA_Y,
      this.sceneY + this.modY,
      MAX_CAMERA_Y,
    )

    window.app.stage.x = this.sceneX
    window.app.stage.y = this.sceneY

    this.selectionController.updateSelection(this.absoluteMousePosition)
  }
}

export default MouseController
