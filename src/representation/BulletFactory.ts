import { UniverseRepresentation } from '~/initGame'
import Unit from './Unit'

const STANDARD_RIFLE = 1.0
const GRENADE = 2.0
const HIT_THE_GROUND = 3.0

const MAP_TYPE_TO_GRAPHIC_CONSTRUCTOR = {
  [STANDARD_RIFLE]: () => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawRect(0, 0, 2, 14)
    graphics.x = -1
    graphics.y = -7
    return graphics
  },
  [GRENADE]: () => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0x00ff00)
    graphics.drawRect(0, 0, 10, 10)
    graphics.x = -5
    graphics.y = -5
    return graphics
  },
  [HIT_THE_GROUND]: () => {
    const graphics = new PIXI.Graphics()
    graphics.beginFill(0xff0000)
    graphics.drawRect(0, 0, 50, 50)
    graphics.x = -25
    graphics.y = -25
    return graphics
  },
} as const

const MAP_TYPE_TO_UPDATE_FUNC = {
  [STANDARD_RIFLE]: (
    bullet: Bullet,
    x: number,
    y: number,
    angle: number,
    speed: number,
    initialLifetime: number,
  ) => () => {
    bullet.sprite.x += bullet.modX
    bullet.sprite.y += bullet.modY
  },
  [GRENADE]: (
    bullet: Bullet,
    x: number,
    y: number,
    angle: number,
    speed: number,
    initialLifetime: number,
  ) => {
    const aimX = Math.sin(angle) * speed * initialLifetime + x,
      aimY = -Math.cos(angle) * speed * initialLifetime + y,
      centerX = (x + aimX) / 2,
      centerY = (y + aimY) / 2 - 100,
      A1 = -(x ** 2) + centerX ** 2,
      B1 = -x + centerX,
      D1 = -y + centerY,
      A2 = -(centerX ** 2) + aimX ** 2,
      B2 = -centerX + aimX,
      D2 = -centerY + aimY,
      Bmulti = -(B2 / B1),
      A3 = Bmulti * A1 + A2,
      D3 = Bmulti * D1 + D2,
      a = D3 / A3,
      b = (D1 - A1 * a) / B1,
      c = y - a * x ** 2 - b * x
    // this.jumpFunction = (x: number) => a * x ** 2 + b * x + c
    return () => {
      bullet.sprite.x += bullet.modX
      bullet.sprite.y = a * bullet.sprite.x ** 2 + b * bullet.sprite.x + c
    }
  },
  [HIT_THE_GROUND]: (
    bullet: Bullet,
    x: number,
    y: number,
    angle: number,
    speed: number,
    initialLifetime: number,
  ) => () => {
    bullet.sprite.scale.set(1 + bullet.lifetime / initialLifetime)
    bullet.sprite.alpha = bullet.lifetime / initialLifetime
    bullet.sprite.rotation = bullet.lifetime * 0.1
  },
}

type bulletType = keyof typeof MAP_TYPE_TO_GRAPHIC_CONSTRUCTOR

class Bullet {
  public sprite: PIXI.Sprite
  public lifetime: number
  public type: number
  public modX: number
  public modY: number
  public update: VoidFunction

  constructor(type: bulletType, x: number, y: number, [angle, speed, lifetime]: number[]) {
    const sprite = new PIXI.Sprite()
    sprite.x = x
    sprite.y = y
    sprite.angle = (angle * 180) / Math.PI
    sprite.addChild(MAP_TYPE_TO_GRAPHIC_CONSTRUCTOR[type]())

    if (type === STANDARD_RIFLE) {
      window.smallPieces.addChild(sprite)
    } else {
      window.world.addChild(sprite)
    }

    this.sprite = sprite
    this.lifetime = lifetime
    this.type = type
    this.modX = Math.sin(angle) * speed
    this.modY = -Math.cos(angle) * speed
    this.update = MAP_TYPE_TO_UPDATE_FUNC[type](this, x, y, angle, speed, lifetime)
  }
}

class BulletFactory {
  private static bullets: Bullet[] = []

  static getBulletPosition(type: number, unit: Unit) {
    switch (type) {
      case STANDARD_RIFLE: {
        const angle = unit.frameUpdaters.getAngleWhenShooting()
        return [unit.graphics.x + Math.sin(angle) * 40, unit.graphics.y - 47 - Math.cos(angle) * 30]
      }
      case GRENADE: {
        return [unit.graphics.x, unit.graphics.y - 30]
      }
      case HIT_THE_GROUND: {
        return [unit.graphics.x, unit.graphics.y]
      }
    }
  }

  static create(bulletsData: number[], universeRepresentation: UniverseRepresentation) {
    for (let i = 0; i < bulletsData.length; i += 5) {
      const type = bulletsData[i] as bulletType
      const unitId = bulletsData[i + 1]

      const [x, y] = this.getBulletPosition(type, universeRepresentation[unitId] as Unit)
      this.bullets.push(new Bullet(type, x, y, bulletsData.slice(i + 2, i + 5)))
      this.createBoom(bulletsData.slice(i, i + 3))
    }
  }

  static update() {
    this.bullets = this.bullets.filter(bullet => {
      if (bullet.lifetime <= 0) {
        // create boom
        bullet.sprite.parent.removeChild(bullet.sprite)
        return false
      } else {
        bullet.lifetime -= 1
        bullet.update()
        return true
      }
    })
  }

  static createBoom([type, x, y]: number[]) {
    // create boom
  }
}

export default BulletFactory
