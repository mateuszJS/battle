import { UniverseRepresentation } from '~/initGame'
import 'pixi-layers/dist/pixi-layers.d.ts'
import 'pixi-projection/dist/pixi-projection.d.ts'

declare global {
  interface Window {
    updateClouds: VoidFunction
    background: PIXI.Container
    world: PIXI.Container
    smallPieces: PIXI.Container
    ui: PIXI.Container
    universeRepresentation: UniverseRepresentation
    app: PIXI.Application
    startGame: (playersList: string[]) => void
    visibleInfluenceMap: boolean
    debugAiMode: boolean

    getUint32ArrayPointer:(array: Uint32Array) => number
    getFloat32ArrayPointer:(array: Float32Array) => number
    useUint32ArrayData: (pointer: number, callback: (arr: Uint32Array) => void) => void
    useFloat32ArrayData: (pointer: number, callback: (arr: Float32Array) => void) => void
    convertLogicCoordToVisual: (x: number, y: number) => [number, number]
  }

  type ValueOf<T> = T[keyof T]

  interface Math {
    clamp: (value: number, min: number, max: number) => number
  }

  type f32 = number
  type f64 = number
  type usize = number
  type u32 = number
  type u8 = number
}
