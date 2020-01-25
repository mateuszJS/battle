import Unit from '~/units/Unit'

class Bullet {
  private x: number
  private y: number
  private aim: Unit
  private angle: number
  private damage: number
  private graphics: PIXI.Graphics
  private updateBullet: () => any

  constructor(
    x: number,
    y: number,
    angle: number,
    aim: Unit,
    damage: number,
    drawAndAddProps: Function,
  ) {
    this.x = x
    this.y = y
    this.aim = aim
    this.angle = angle
    this.damage = damage
    drawAndAddProps.call(this)
  }

  update() {
    if (this.updateBullet() === 'DESTROY') {
      this.aim = undefined
      this.graphics.destroy()
      this.graphics = undefined
    }
  }
}

export default Bullet
