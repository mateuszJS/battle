import { ModelDetails } from '~/sprites/types'

class Unit {
  public graphics: PIXI.Graphics
  public model: ModelDetails & { offsetY: number }
  public selected: boolean

  constructor(x: number, y: number, angle: number, graphics, model) {
    this.graphics = graphics.unit
    this.graphics.addChild(graphics.selection)
    this.graphics.addChild(model.movieClip)

    model.movieClip.anchor.set(0.5, 1)
    model.movieClip.y =
      this.graphics.height * 0.85 + model.movieClip.height * 0.4

    const offsetY = this.graphics.height * 0.55
    this.graphics.pivot.set(0, this.graphics.height * 0.9)

    graphics.selection.y = this.graphics.height * 0.9

    model.offsetY = offsetY

    this.graphics.parentGroup = graphics.parentGroup
    this.model = model

    window.app.stage.addChild(this.graphics)

    this.selected = false
  }

  remove() {
    window.app.stage.removeChild(this.graphics)
    this.graphics.destroy()
    this.graphics = undefined
  }
}

export default Unit
