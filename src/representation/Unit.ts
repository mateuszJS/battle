type PixiUnitStuff = {
  sortingLayer: PIXI.display.Group
  container: PIXI.Container
  movieClip: PIXI.AnimatedSprite
  frameUpdaters: {
    goToIdle(angle: number): void
    goToRun(angle: number): void
    goToShoot(angle: number): void
    goToFly(angle: number, flyingProgress: number): void
    goToGetUp(angle: number, getUppingProgress: number): void
  }
}

enum State {
  ABILITY = 8,
  FLY = 7,
  RUN = 6,

  SHOOT = 5,
  IDLE = 4,
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
    goToIdle(angle: number): void
    goToRun(angle: number): void
    goToShoot(angle: number): void
    goToFly(angle: number, flyingProgress: number): void
    goToGetUp(angle: number, getUppingProgress: number): void
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
    this.frameUpdaters.goToFly(angle, Number.MAX_SAFE_INTEGER)
  }

  goToFrame(frame: number) {
    if (frame !== this.movieClip.currentFrame) {
      this.movieClip.gotoAndStop(frame)
    }
  }

  update(
    state: State,
    x: number,
    y: number,
    angle: number,
    firstStateParam: number,
  ) {
    this.graphics.x = x
    this.graphics.y = y

    // isShoot won't be stored in this.previousState
    switch (state) {
      case State.IDLE: {
        this.frameUpdaters.goToIdle(angle)
        break
      }
      case State.SHOOT: {
        this.frameUpdaters.goToShoot(angle)
        break
      }
      case State.RUN: {
        this.frameUpdaters.goToRun(angle)
        break
      }
      case State.FLY: {
        this.frameUpdaters.goToFly(angle, firstStateParam)
        break
      }
      case State.GETUP: {
        this.frameUpdaters.goToGetUp(angle, firstStateParam)
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
