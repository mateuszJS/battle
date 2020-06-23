class Bullet {
  public sprite: PIXI.Sprite
  public lifetime: number
  public type: number
  public modX: number
  public modY: number

  // bullet.representation_id,
  // bullet.x,
  // bullet.y,
  // bullet.angle,
  // bullet.speed,
  // bullet.lifetime,

  constructor([type, x, y, angle, speed, lifetime]: number[]) {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawRect(0, 0, 10, 10)
    graphics.x = -5
    graphics.y = -5

    const sprite = new PIXI.Sprite()
    sprite.x = x
    sprite.y = y
    sprite.angle = angle
    sprite.addChild(graphics)
    window.app.stage.addChild(sprite)

    this.sprite = sprite
    this.lifetime = lifetime
    this.type = type
    this.modX = Math.sin(angle) * speed
    this.modY = -Math.cos(angle) * speed
  }
}

class BulletFactory {
  private static bullets: Bullet[] = []

  static create(bulletsData: number[]) {
    for (let i = 0; i < bulletsData.length; i += 6) {
      this.bullets.push(new Bullet(bulletsData.slice(i, i + 6)))
      this.createBoom(bulletsData.slice(i, i + 3))
    }
  }

  static update() {
    this.bullets = this.bullets.filter(bullet => {
      if (bullet.lifetime <= 0) {
        // create boom
        window.app.stage.removeChild(bullet.sprite)
        return false
      } else {
        bullet.lifetime -= 1
        bullet.sprite.x += bullet.modX
        bullet.sprite.y += bullet.modY
        return true
      }
    })
  }

  static createBoom([type, x, y]: number[]) {
    // create boom
  }
}

export default BulletFactory
