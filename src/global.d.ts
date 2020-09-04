import Squad from './units/Squad'
import Unit from './units/Unit'
import { IIcon } from './modules/icons'
import { WeaponName } from './weapons/WeaponTypes'
import Factory from '~/representation/Factory'

declare global {
  interface Window {
    sceneX: number
    sceneY: number
    PIXI: typeof PIXI
    app: PIXI.Application
    bulletContainer: any
    squadsWereMoved: Squad[][]
    allSquads: Squad[][]
    hunters: Unit[][]
    hutningTimer: number
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

  interface WeaponType {
    reloadTime: number
    range: number
    speed: number
    scatter: number
    damage: number
    waitReloadingTime: number
    drawAndAddProps: () => void
    type: WeaponName
    explosion?: {
      range: number
      strength: number
    }
  }

  type ValueOf<T> = T[keyof T]
}
