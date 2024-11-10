export {}

declare global {
  interface Window {
    updateClouds: VoidFunction
    universeRepresentation: UniverseRepresentation
    app: PIXI.Application
    startGame: (playersList: string[]) => void
    visibleInfluenceMap: boolean
    debugAiMode: boolean

    convertLogicCoordToVisual: (x: number, y: number) => [number, number]
    convertLogicAngleToVisual: (angle: number) => number
  }

  type ValueOf<T> = T[keyof T]

  interface Math {
    clamp: (value: number, min: number, max: number) => number
  }

  type Point = {
    x: number
    y: number
  }
}

