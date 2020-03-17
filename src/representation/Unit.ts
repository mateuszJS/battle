type PixiUnitStuff = {
  sortingLayer: PIXI.display.Group
  container: PIXI.Container
  movieClip: PIXI.AnimatedSprite
  frameUpdaters: {
    goToStay(angle: number): void
    goToGo(angle: number): void
    goToShoot(angle: number): void
    goToFly(angle: number): void
    goToGetUp(angle: number): void
  }
}

enum State {
  ABILITY = 8,
  FLY = 7,
  GO = 6,

  SHOOT = 5,
  STAY = 4,
  GETUP = 3,
  DIE = 0,
}

class Unit {
  public graphics: PIXI.Container
  public movieClip: PIXI.AnimatedSprite
  public previousFramesFactors: {
    // has impact of current frame
    state: State
    angle: number
  }
  private frameUpdaters: {
    goToStay(angle: number): void
    goToGo(angle: number): void
    goToShoot(angle: number): void
    goToFly(angle: number): void
    goToGetUp(angle: number): void
  }

  constructor(x: number, y: number, angle: number, pixiStuff: PixiUnitStuff) {
    this.graphics = pixiStuff.container
    this.movieClip = pixiStuff.movieClip
    this.frameUpdaters = pixiStuff.frameUpdaters
    this.graphics.addChild(this.movieClip)

    this.graphics.pivot.set(0, this.graphics.height * 0.9)

    this.graphics.parentGroup = pixiStuff.sortingLayer

    window.app.stage.addChild(this.graphics)
    this.graphics.x = x
    this.graphics.y = y
  }

  goToFrame(frame: number) {
    if (frame !== this.movieClip.currentFrame) {
      this.movieClip.gotoAndStop(frame)
    }
  }

  update(state: State, x: number, y: number, angle: number, isShoot: boolean) {
    this.graphics.x = x
    this.graphics.y = y

    // isShoot won't be stored in this.previousState
    switch (state) {
      case State.STAY: {
        this.frameUpdaters.goToStay(angle)
        break
      }
      case State.SHOOT: {
        this.frameUpdaters.goToShoot(angle)
        break
      }
      case State.GO: {
        this.frameUpdaters.goToGo(angle)
        break
      }
      case State.FLY: {
        this.frameUpdaters.goToFly(angle)
        break
      }
      case State.GETUP: {
        this.frameUpdaters.goToGetUp(angle)
        break
      }
    }

    this.previousFramesFactors = { state, angle }
  }

  remove() {
    window.app.stage.removeChild(this.graphics)
    this.graphics.destroy()
    this.graphics = undefined
  }
}

export default Unit
