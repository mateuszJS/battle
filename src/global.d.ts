import { UniverseRepresentation } from '~/initGame'

declare global {
  interface Window {
    world: PIXI.Container
    ui: PIXI.Container
    universeRepresentation: UniverseRepresentation
    app: PIXI.Application
    startGame: (playersList: string[]) => void
    visibleInfluenceMap: boolean
    mode: number
  }

  interface Point {
    x: number
    y: number
  }

  type ValueOf<T> = T[keyof T]
}
