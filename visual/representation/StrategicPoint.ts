import { USER_FACTION_ID } from 'Consts'
import getMySelection from './getMySelection'

class StrategicPoint {
  private x: number
  private y: number
  private sprite: PIXI.Sprite
  private graphics: PIXI.Graphics
  private selection: PIXI.Sprite

  constructor(x: number, y: number) {
    this.sprite = new PIXI.Sprite()

    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xffffff)
    graphics.drawRect(-15, -50, 30, 50)
    graphics.beginFill(0x00ff00, 0.2)
    graphics.drawCircle(0, 0, 100)
    graphics.tint = 0x888888
    this.x = x
    this.y = y
    this.graphics = graphics
    this.sprite.addChild(graphics)

    const selection = getMySelection(false)
    selection.width = 250
    selection.height = 250

    this.sprite.addChild(selection)
    this.sprite.x = x
    this.sprite.y = y
    window.world.addChild(this.sprite)
    this.selection = selection
  }

  update(progress: number, ownerFactionId: number) {
    this.graphics.rotation = progress * 2 * Math.PI

    if (USER_FACTION_ID == ownerFactionId) {
      this.graphics.tint = 0x0000ff
    } else if (ownerFactionId !== 0) {
      this.graphics.tint = 0xff0000
    }
  }

  select() {
    this.selection.visible = true
  }

  deselect() {
    this.selection.visible = false
  }
}

export default StrategicPoint
