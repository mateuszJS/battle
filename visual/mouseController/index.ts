// import { UniverseRepresentation, WasmModule } from '~/initGame'
import { translateWorldView } from 'webgl/constants'
// import SelectionController from './SelectionController'
import getCameraPositionModificators from './get-camera-position-modificators'
import { clamp, convertLogicToVisual, convertVisualToLogic } from 'utils'

const getCalcYFunc = (
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
) => {
  const a = (y2 - y1) / (x2 - x1)
  const b = y1 - a * x1
  return (x: number) => a * x + b
}

let modX = 0
let modY = 0
let sceneX = 0
let sceneY = 0
// let mouseX = 0
// let mouseY = 0
// this.selectionController = new SelectionController(wasmModule, universeRepresentation)
let mapPoints: Point[] = []

// private selectionController: SelectionController
// private getTopBoundary: (x: number) => number
// private getBottomBoundary: (x: number) => number
// let rightBoundary: number
// let leftBoundary: number

let mapWidth = 0
let mapHeight = 0

export function initMouseController(
  // wasmModule: WasmModule,
  // universeRepresentation: UniverseRepresentation,
  _mapPoints: Point[],
  _mapWidth: number,
  _mapHeight: number,
) {
  window.addEventListener("mousemove", onMouseMove)
  mapWidth = _mapWidth
  mapHeight = _mapHeight
  mapPoints = _mapPoints;

  [sceneX, sceneY] = convertLogicToVisual(mapWidth / 2, mapHeight / 2)
  translateWorldView(-sceneX + window.innerWidth / 2, -sceneY + window.innerHeight / 2)
  // canvas.addEventListener('mousemove', (e: MouseEventInit) => {
  //   const rect = canvas.getBoundingClientRect();
  //   mouseX = (e.clientX as number) - rect.left;
  //   mouseY = (e.clientY as number) - rect.top;
}


  // private onMouseDown = () => {
  //   this.selectionController.startSelection(this.absoluteMousePosition)
  // }

  // private onMouseRightBtnDown = () => {
  //   this.selectionController.consumeSelection(this.absoluteMousePosition)
  // }

function onMouseMove(event: MouseEventInit) {
  const mod = getCameraPositionModificators((event.clientX as number), (event.clientY as number))
  modX = mod.modX
  modY = mod.modY
  // this.selectionController.updateSelection(this.absoluteMousePosition)
}

  // private onMouseUp = () => {
  //   this.selectionController.endSelection()
  // }

  // private onMouseLeave = () => {
  //   this.modX = 0
  //   this.modY = 0
  // }

  // private get absoluteMousePosition() {
  //   return {
  //     x: this.mouseX - this.sceneX - window.innerWidth / 2,
  //     y: this.mouseY - this.sceneY - window.innerHeight / 2,
  //   }
  // }

export function updateScenePosition() {
  if (modX === 0 && modY === 0) return

  const [cameraLogicX, cameraLogicY] = convertVisualToLogic(sceneX - modX, sceneY - modY)

  // TODO: limit camera movement, so you cannot go so far that edge of the map is in the middle of the screen

  const safeCameraLogicX = clamp(cameraLogicX, 0, mapWidth)
  const safeCameraLogicY = clamp(cameraLogicY, 0, mapHeight);

  [sceneX, sceneY] = convertLogicToVisual(safeCameraLogicX, safeCameraLogicY)

  translateWorldView(-sceneX + window.innerWidth / 2, -sceneY + window.innerHeight / 2)
}
