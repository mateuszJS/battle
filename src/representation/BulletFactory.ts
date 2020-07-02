import { UniverseRepresentation } from '~/setup'
import { framesPeriods } from '~/representation/getSprites'

class Bullet {
  public sprite: PIXI.Sprite
  public lifetime: number
  public type: number
  public modX: number
  public modY: number

  constructor(
    type: number,
    x: number,
    y: number,
    [angle, speed, lifetime]: number[],
  ) {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawRect(0, 0, 2, 14)
    graphics.x = -1
    graphics.y = -7

    const sprite = new PIXI.Sprite()
    sprite.x = x
    sprite.y = y
    sprite.angle = (angle * 180) / Math.PI
    sprite.addChild(graphics)
    window.app.stage.addChild(sprite)

    this.sprite = sprite
    this.lifetime = lifetime
    this.type = type
    this.modX = Math.sin(angle) * speed
    this.modY = -Math.cos(angle) * speed
  }
}

const { first, length, sides } = framesPeriods.SHOOT
const getAngle = (currentFrame: number) => {
  const movieClipAngle =
    (Math.floor((currentFrame - first) / length) / sides) * (2 * Math.PI)
  const angle = 2 * Math.PI - movieClipAngle - 0.5 * Math.PI
  return angle
}

class BulletFactory {
  private static bullets: Bullet[] = []

  static getBulletPosition(unit) {
    const angle = getAngle(unit.movieClip.currentFrame)
    return [
      unit.graphics.x + Math.sin(angle) * 45,
      unit.graphics.y - 30 - Math.cos(angle) * 45,
    ]
  }

  static create(
    bulletsData: number[],
    universeRepresentation: UniverseRepresentation,
  ) {
    for (let i = 0; i < bulletsData.length; i += 5) {
      const type = bulletsData[i]
      const unitId = bulletsData[i + 1]

      const [x, y] = this.getBulletPosition(universeRepresentation[unitId])
      this.bullets.push(new Bullet(type, x, y, bulletsData.slice(i + 2, i + 5)))
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
