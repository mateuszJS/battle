import SquadFactory from '~/units/SquadFactory'
import getPortalSprite from './getPortalSprite'
import { UNIT_TYPE } from 'Consts'

interface ProductionItem {
  type: UNIT_TYPE
  progress: number
  totalTime: number
}

class Factory {
  public x: number
  public y: number
  private angle: number
  private faction: number
  private _resources: number
  private productionList: ProductionItem[]
  private productionAnimation: PIXI.AnimatedSprite

  constructor(
    faction: number,
    x: number,
    y: number,
    angle: number,
    sortingLayer: PIXI.display.Group,
  ) {
    this.faction = faction
    this.x = x
    this.y = y
    this.angle = angle - Math.PI / 2
    this._resources = 1000
    this.productionList = []
    this.productionAnimation = getPortalSprite(x, y, this.angle, sortingLayer)
  }

  get resources(): number {
    return this._resources
  }

  buySquad(type: UNIT_TYPE) {
    this._resources -= 1000
    this.productionList.push({ type, progress: 0, totalTime: 100 })
    this.productionAnimation.visible = true
    this.productionAnimation.alpha = 1
    this.productionAnimation.gotoAndPlay(0)
  }

  update() {
    this._resources++
    this.productionList = this.productionList.filter(production => {
      if (++production.progress === production.totalTime) {
        this.addSquadToGame(production.type)
        this.productionAnimation.visible = false
        this.productionAnimation.alpha = 0
        this.productionAnimation.stop()
        return false
      }
      return true
    })
  }

  addSquadToGame(type: UNIT_TYPE) {
    // TODO: put into all arrays, also "wereSquadMoves"
    const newSquad = SquadFactory.createSquad(
      { x: this.x, y: this.y },
      this.angle,
      this.faction,
      type,
    )
    window.allSquads[this.faction].push(newSquad)
  }
}

export default Factory
