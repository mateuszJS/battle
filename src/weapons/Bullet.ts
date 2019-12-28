class Bullet {
  private x: number
  private y: number
  private aim: any
  private angle: number
  private damage: number
  private graphics: any
  private updateBullet: () => any

  constructor({ x, y, angle, aim, speed, damage, drawAndAddProps }) {
    this.x = x
    this.y = y
    this.aim = aim
    this.angle = angle
    this.damage = damage
    drawAndAddProps.call(this)
  }

  update() {
    if (this.updateBullet() === 'DESTROY') {
      //to allow for Gabarge Collector to remove this objects
      this.aim = undefined
      this.graphics.destroy()
      this.graphics = undefined
    }
  }
}

export default Bullet
