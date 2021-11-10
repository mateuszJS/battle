import { RepresentationId } from '../../logic/constants'
import Unit from './Unit'
import getMovieClipCreator from './get-movie-clip-creator'
import getMySelection from './getMySelection'
import troopBodyFramesData from './framesData/troop-body';
import regularAccessoriesFramesData from './framesData/regular-accessories';
import rodionHeadFramesData from './framesData/rodion-head';

const MAX_JUMP_HEIGHT = 1200
// the same constant exists in rust

export interface FrameUpdaters {
  goToIdle(angle: number): void,
  goToRun(angle: number): void,
  goToChasing(angle: number): void,
  goToShoot(angle: number, shootProgress: number): void,
  goToFly(angle: number, flyingProgress: number): void,
  goToGetUp(angle: number, getUppingProgress: number): void,
  goToDie(angle: number, id: number): void
  getAngleWhenShooting(): number
}

export type UpdateAbilityCallback = (
  x: number,
  y: number,
  angle: number,
  firstStateParam: number,
) => void

const MAP_UPDATE_ABILITY = {
  [RepresentationId.Solider]: function(
    x: number,
    y: number,
    angle: number,
    firstStateParam: number,
  ) {
    this.frameUpdaters.goToIdle(angle)
  },
  [RepresentationId.Raptor]: function(
    x: number,
    y: number,
    angle: number,
    firstStateParam: number,
  ) {
    this.graphics.y = y - firstStateParam * MAX_JUMP_HEIGHT
    this.graphics.scale.set(1 + firstStateParam * 1.5)
    this.frameUpdaters.goToIdle(angle)
  },
}

class UnitsFactory {
  private static getTroopBodySprite: ReturnType<typeof getMovieClipCreator>
  private static getRegularAccessoriesSprite: ReturnType<typeof getMovieClipCreator>
  private static getRodionHeadSprite: ReturnType<typeof getMovieClipCreator>

  static initializationTypes() {
    this.getTroopBodySprite = getMovieClipCreator(troopBodyFramesData)
    this.getRegularAccessoriesSprite = getMovieClipCreator(regularAccessoriesFramesData)
    this.getRodionHeadSprite = getMovieClipCreator(rodionHeadFramesData)
  }

  static createUnit(
    id: number,
    x: number,
    y: number,
    angle: number,
    isAllianceUnit: boolean,
    state: number,
    type: typeof RepresentationId.Solider | typeof RepresentationId.Raptor,
  ) {
    const { movieClip: troopBodyMovieClip, ...troopBodyFrameUpdaters } = this.getTroopBodySprite()
    const { movieClip: regularAccessoriesMovieClip, ...regularAccessoriesFrameUpdaters } = this.getRegularAccessoriesSprite()
    const { movieClip: rodionHeadMovieClip, ...rodionHeadFrameUpdaters } = this.getRodionHeadSprite()


    const frameUpdaters = {
      goToIdle(angle: number) {
        troopBodyFrameUpdaters.goToIdle(angle)
        regularAccessoriesFrameUpdaters.goToIdle(angle)
        rodionHeadFrameUpdaters.goToIdle(angle)
      },
      goToRun(angle: number) {
        troopBodyFrameUpdaters.goToRun(angle)
        regularAccessoriesFrameUpdaters.goToRun(angle)
        rodionHeadFrameUpdaters.goToRun(angle)
      },
      goToChasing(angle: number) {
        troopBodyFrameUpdaters.goToRun(angle)
        regularAccessoriesFrameUpdaters.goToChasing(angle, troopBodyFrameUpdaters.getRunFrameOffset)
        rodionHeadFrameUpdaters.goToRun(angle)
      },
      goToShoot(angle: number, shootProgress: number) {
        troopBodyFrameUpdaters.goToShoot(angle, shootProgress)
        regularAccessoriesFrameUpdaters.goToShoot(angle, shootProgress)
        rodionHeadFrameUpdaters.goToShoot(angle, shootProgress)
      },
      goToFly(angle: number, flyingProgress: number) {
        troopBodyFrameUpdaters.goToFly(angle, flyingProgress)
        regularAccessoriesFrameUpdaters.goToFly(angle, flyingProgress)
        rodionHeadFrameUpdaters.goToFly(angle, flyingProgress)
      },
      goToGetUp(angle: number, getUppingProgress: number) {
        troopBodyFrameUpdaters.goToGetUp(angle, getUppingProgress)
        regularAccessoriesFrameUpdaters.goToGetUp(angle, getUppingProgress)
        rodionHeadFrameUpdaters.goToGetUp(angle, getUppingProgress)
      },
      goToDie(angle: number, id: number) {
        regularAccessoriesFrameUpdaters.goToDie(angle, () => {})
        troopBodyFrameUpdaters.goToDie(angle, () => {
          setTimeout(() => {
            window.world.removeChild(container)
            window.universeRepresentation[id] = undefined
          }, 5000)
          // TODO: replace setTimeout with dying animation
        })
        rodionHeadFrameUpdaters.goToDie(angle, () => {})
      },
      getAngleWhenShooting: troopBodyFrameUpdaters.getAngleWhenShooting,
    }

    const container = new PIXI.Container()
    const selectionSprite = getMySelection(isAllianceUnit)

    container.addChild(selectionSprite)
    container.addChild(troopBodyMovieClip)
    container.addChild(regularAccessoriesMovieClip)
    container.addChild(rodionHeadMovieClip)

    const graphicParams = {
      container,
      frameUpdaters,
      selectionSprite,
    }

    // if (type === REPRESENTATION_IDS.RAPTOR) {
    //   graphicParams.movieClip.tint = 0xffff00
    // }

    return new Unit(id, x, y, angle, graphicParams, type, MAP_UPDATE_ABILITY[type])
  }
}

export default UnitsFactory
