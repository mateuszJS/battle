import Squad from './units/Squad'
import Unit from './units/Unit'
import { IIcon } from './modules/icons'

declare global {
  interface Window {
    PIXI: typeof PIXI
    app: PIXI.Application
    bulletContainer: any
    squadsWereMoved: Squad[][]
    allSquads: Squad[][]
    hunters: Unit[][]
    hutningTimer: number
    timer: number
    icons: IIcon[]
    allSelectedUnits: Unit[]
    mapWidth: number
    mapHeight: number
    flamesUpdaters: any[]
    smokeContainer: {
      graphics: PIXI.ParticleContainer
      elements: PIXI.Sprite[]
    }
    userIcons: any[]
    map: boolean
    startGame: (playersList: string[]) => void
  }

  interface Point {
    x: number
    y: number
  }

  interface explosion {
    range: number
    strength: number
  }

  interface weaponType {
    reloadTime: number
    range: number
    speed: number
    scatter: number
    damage: number
    waitReloadingTime: number
    drawAndAddProps: () => any
    explosion?: explosion
  }
}
