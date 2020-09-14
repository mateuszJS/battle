import { UniverseRepresentation } from '~/initGame'

declare global {
  interface Window {
    world: PIXI.Container
    ui: PIXI.Container
    universeRepresentation: UniverseRepresentation
    app: PIXI.Application
    mapWidth: number
    mapHeight: number
    startGame: (playersList: string[]) => void
  }

  interface Point {
    x: number
    y: number
  }

  type ValueOf<T> = T[keyof T]
}
