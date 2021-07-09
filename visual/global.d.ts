import { UniverseRepresentation } from '~/initGame'
import 'pixi-layers/dist/pixi-layers.d.ts'
import 'pixi-projection/dist/pixi-projection.d.ts'

declare global {
  interface Window {
    world: PIXI.Container
    smallPieces: PIXI.Container
    ui: PIXI.Container
    universeRepresentation: UniverseRepresentation
    app: PIXI.Application
    startGame: (playersList: string[]) => void
    visibleInfluenceMap: boolean
    debugAiMode: boolean
  }

  type ValueOf<T> = T[keyof T]

  interface Math {
    clamp: (value: number, min: number, max: number) => number
  }
}
