import WeaponsFactory from '~/weapons/WeaponsFactory';
import STATE from '~/modules/consts';
import { draw, goToShootFrame, getRotationFrame, getAngle, getRotationFrameSmall, afterGetup } from './UnitDraw';
import Utils from 'Utils';
import Squad from './Squad';
import Controllers from '~/modules/mouseController';
import SETTINGS from 'Settings';
import { IAbility } from '~/abilities/abilityFactory';
import EffectsFactory from '~/effects/EffectsFactory';
import UnitTypes from './UnitTypes';

abstract class Unit {
  protected angle: number
  private type: string
  private flamer: any // TODO: it should br included in weapon
  // private attackType:  string

  public graphics: any // TODO: rename to "selectRingGraphic"
  public model: any
  public modX: number
  public modY: number
  public state: number
  public speed: number
  public aim?: Point | Unit
  public hp: number
  public weapon: any // TODO: it should comes from squad, because all benefits are applied to whole squad, not single unit
  public x: number
  public y: number
  public selected: boolean
  public radius: number // TODO: radius of what? influence? weapon?
  public squad: Squad
  public faction: number // TODO: not necesssary, included in squad
  public ability: IAbility // TODO: rename to "currUsingAbility"

  private getAngle: (angle: number) => number
  private goToShootFrame: () => void
  // private goToMeleeFrame: () => void
  private getRotationFrame: () => number
  private getRotationFrameSmall: () => number
  private afterGetup: () => void

  public history: any // REMOVE_AFTER_DEVELOPMEN_PROCESS

  public draw: () => void

  constructor(graphics, model, pos: Point, faction: number, type: string, squad: Squad) {//pass only weapons PARAMS, not copy reference to primary weapon object
    this.graphics = graphics.unit;
    this.graphics.addChild(graphics.selection);
    this.graphics.addChild(model.movieClip);

    // model.movieClip.y = model.vertialOffset;
    // model.movieClip.x = this.graphics.width / 2;

    model.movieClip.anchor.set(0.5, 1);
    model.movieClip.y = this.graphics.height * 0.85 + model.movieClip.height * 0.4;
    // model.movieClip.y = this.graphics.height * 0.85;

    const offsetY = this.graphics.height * 0.55;
    this.graphics.pivot.set(0, this.graphics.height * 0.9);
    // model.movieClip.pivot.set(this.graphics.width / 2, this.graphics.height * 0.85);

    graphics.selection.y = this.graphics.height * 0.9;

    model.offsetY = offsetY;

    if (faction > 1) {

      // let colorMatrix = new PIXI.filters.ColorMatrixFilter();
      // model.movieClip.filters = [colorMatrix];
      // colorMatrix.matrix = [
      // 	1, 0, 0, 0, 0,
      // 	0, 1, 0, 0, 0,
      // 	0, 0, 1, 0, 0,
      // 	1, 0, 0, 1, 0]

      // colorMatrix.matrix = [
      // 	//kolumny to wartości, R,G,B,A,
      // 	1, 0, 0, 0, 0,
      // 	0, 1, 0, 0, 0,
      // 	0, 0, 1, 0, 0,
      // 	0, 0, 0, 1, 0]

      // colorMatrix.contrast(2);
      switch (faction) {
        case 2: {
          model.movieClip.tint = 0x00FFFF;
          break;
        }
        case 3: {
          model.movieClip.tint = 0xFF0000;
          break;
        }
        case 4: {
          model.movieClip.tint = 0xFF000FF;
          break;
        }
        case 5: {
          model.movieClip.tint = 0x00FF00;
          break;
        }
        case 6: {
          model.movieClip.tint = 0x0000FF;
          break;
        }
        case 7: {
          model.movieClip.tint = 0xFFFF00;
          break;
        }
        case 8: {
          model.movieClip.tint = 0xFF9911;
          break;
        }
        default: {
          model.movieClip.tint = 0x888888;
        }
      }



    }

    if (type === 'WARRIOR_ASSAULT') {
      this.flamer = EffectsFactory.createFlamerEffect(this);
    }

    this.graphics.parentGroup = graphics.parentGroup;
    this.model = model;

    this.type = type;

    window.app.stage.addChild(this.graphics);

    this.hp = UnitTypes[type].hp;
    this.x = pos.x;
    this.y = pos.y;
    this.angle = 0;
    this.state = STATE.GO; // TODO: fix it in all places STATE.GO because it will add this squad to "squadsWereMoved" array
    this.aim = undefined;
    this.speed = UnitTypes[type].speed;
    this.modX = 0;
    this.modY = 0;
    this.radius = UnitTypes[type].radius;//size of units
    this.faction = faction;
    this.squad = squad;
    this.ability = undefined;

    //change to 0 if more than reloadTime, or something change to < 0
    this.weapon = {
      reload: Math.floor(Utils.randomAbsLUT(80)),
      ...WeaponsFactory.getWeapon(type)
    }

    this.selected = false;//chyba potrzebne, ale to raczej tylko do jednostek gracza, a nie wszystkich
    //chyba że jakoś inteligętnie dla sztucznej inteligęcji to się wykrozysta

    this.draw = draw;
    this.goToShootFrame = goToShootFrame;
    // this.goToMeleeFrame = goToMeleeFrame;
    this.getRotationFrame = getRotationFrame;
    this.getAngle = getAngle;
    this.getRotationFrameSmall = getRotationFrameSmall;
    this.afterGetup = afterGetup;
    // this.draw();
  }

  update() {
    //-----=========SWITCH STATE===========-------//
    switch (this.state) {
      case STATE.GO: { // Update in UnitDraw.js afterGetup() also
        if (Utils.dis(this, this.aim) <= this.speed * SETTINGS.CHANGE_STATE_THROTTLE) {
          this.aim = undefined
          this.searchAimToAttack()
        }
        break;
      }


      case STATE.STAY: { // NOTE: stay, is used to unit without tasks and enemies around
        this.searchAimToAttack();
        break;
      }


      case STATE.SHOOT: {//shoot
        this.searchAimToAttack();
        break;
      }

      case STATE.FLY: {
        //function draw take care of change state to GETUP or DIE
        break;
      }

      case STATE.GETUP: {
        //function draw take care of change state to STAY
        break;
      }

      case STATE.DIE: {
        //you change change this state
        break;
      }

      case STATE.ABILITY: {
        break;
      }

    }

    //-----=========DO STATE===========-------//
    switch (this.state) {//you should perform in this blocks actions which is contiunue in time, like running ,shooting, but not staying
      case STATE.GO: {
        this.calcNewDirection()
        break
      }
      case STATE.STAY: {
        break
      }
      case STATE.SHOOT: {
        this.attack()
        break
      }
      case STATE.FLY: {
        this.flying()
        break
      }
      case STATE.GETUP: {
        break
      }
      case STATE.DIE: {
        break
      }
      case STATE.ABILITY: {
        break
      }
    }
  }

  private searchAimToAttack() {
    if (this.aim && ('hp' in this.aim) && this.aim.hp > 0 && Utils.dis(this, this.aim) < this.weapon.range) {
      if (this.state !== STATE.SHOOT) { // NOTE: optimalziation, to avoid unecessary actions
        this.changeStateToAttack(this.aim)
      }
    } else if (this.squad.aim && this.squad.aim.members.length !== 0) {
      this.aim = undefined
      this.chooseOneOfPriority()
    } else {
      this.aim = undefined
      this.squad.aim = undefined
      this.defaultBehaviour()
    }
  }

  chooseOneOfPriority() {
    const index: number = Utils.getIndexOfTheNearestItem(this.squad.aim.members, this);
    const nearestEnemyUnit: Unit = this.squad.aim.members[index];
    const distance: number = Utils.dis(this, nearestEnemyUnit);
    if (this.weapon.range < SETTINGS.HUNTING_REFRESH_TIME * this.speed) {
      debugger
    }
    if (distance > this.weapon.range) {
      this.changeStateToGo({
        x: nearestEnemyUnit.x,
        y: nearestEnemyUnit.y,
      })
      window.hunters[this.faction].push(this)
    } else {
      this.changeStateToAttack(nearestEnemyUnit)
    }
  }

  defaultBehaviour() { // TODO: handle case when some untis attack on you? I'm not sure
    const objectsToAttack: Unit[] = [];
    const squadsCollection = this.state === STATE.STAY // If unit looking first time for new aims
      ? window.squadsWereMoved // then search only in squads, which were moved
      : window.allSquads // if not search in all squad

    squadsCollection.forEach((faction, idx) => {
      if (idx !== this.faction) { // only other fractions
        faction.forEach(squad => {
          if (Utils.dis(squad.center, this) < this.weapon.range + SETTINGS.MAX_DISTANCE_BETWEEN_SQUAD_MEMBERS) {
            squad.members.forEach(unit => {
              if (Utils.dis(unit, this) < this.weapon.range) {
                objectsToAttack.push(unit);
              }
            })
          }
        })
      }
    });

    //choose aim
    if (objectsToAttack.length > 1) {
      const newAim = this.getTheMostImportantAim(objectsToAttack)
      this.changeStateToAttack(newAim)
    } else if (objectsToAttack.length === 1) {
      this.changeStateToAttack(objectsToAttack[0])
    } else {
      // TODO: wrap in into method "changeStateToStay"
      this.state = STATE.STAY
      this.modX = 0
      this.modY = 0
    }
  }

  private changeStateToGo(newAim: Point) {
    if ('hp' in newAim) {
      debugger;
    }
    this.aim = newAim
    this.state = STATE.GO
    this.angle = Utils.ang(this, this.aim)
    this.modX = Math.sin(this.angle) * this.speed
    this.modY = -Math.cos(this.angle) * this.speed
  }

  flying() {
    this.modX = Math.abs(this.modX) < 0.5 ? 0 : this.modX * 0.85
    this.modY = Math.abs(this.modY) < 0.5 ? 0 : this.modY * 0.85
    if (this.modX === 0 && this.modY === 0) {
      if (this.hp > 0) {
        this.state = STATE.GETUP
      } else {
        this.removeSelf()
        return;
      }
    }

    const newX = this.x + this.modX * SETTINGS.CHANGE_STATE_THROTTLE,
      newY = this.y + this.modY * SETTINGS.CHANGE_STATE_THROTTLE;

    this.history = {};
    this.history.newX = newX;
    this.history.newY = newY;
    this.history.x = this.x;
    this.history.y = this.y;
    this.history.settings = SETTINGS.CHANGE_STATE_THROTTLE;

    if (newX <= 0) {
      this.modX = 1 - this.x / SETTINGS.CHANGE_STATE_THROTTLE; // 1 for safe, we can do it without 1
    } else if (newX >= window.mapWidth) {
      this.modX = (window.mapWidth - this.x) / SETTINGS.CHANGE_STATE_THROTTLE - 1;
    }

    if (newY <= 0) {
      this.modY = 1 - this.y / SETTINGS.CHANGE_STATE_THROTTLE; // 1 for safe, we can do it without 1
    } else if (newY >= window.mapHeight) {
      this.modY = (window.mapHeight - this.y) / SETTINGS.CHANGE_STATE_THROTTLE - 1;
    }
    this.history.modX = this.modX;
    this.history.modY = this.modY;
  }

  protected changeStateToDie() {
    if (this.canPreventCurrentAction()) {
      this.ability = undefined;
      this.state = STATE.DIE;
      this.modX = 0;
      this.modY = 0;
    }
  }

  private calcNewDirection() {
    // if (!('hp' in this.aim)) {
    //   debugger
    //   return
    // }
    // if (!Utils.objStaying(this.aim)) { // TODO: TODO: it doesn't work because this.aim = Point, doesnt have 'state'
    // 	this.angle = Utils.ang(this, this.aim);
    // 	this.modX = Math.sin(this.angle) * this.speed;
    // 	this.modY = -Math.cos(this.angle) * this.speed;
    // }
    if (this.ability && Utils.dis(this, this.ability.target) < this.ability.details.range) {
      this.useAbility()
    }
  }

  public setTargetToGo(targetToGo: Point) { // used only in setDestination to set aim
    // START - PREVENT CURRENT ACTION
    const hunterIndex = window.hunters[this.faction].findIndex((unit) => unit === this);
    if (hunterIndex !== -1) {
      Utils.removeFromArr(window.hunters[this.faction], this)
    }
    this.ability = undefined; // TODO: rename to "aimWhereUseAbility"
    // END - PREVENT CURRENT ACTION
    this.aim = targetToGo
    if (this.canPreventCurrentAction()) {
      this.changeStateToGo(targetToGo);
    }
  }

  public stay() {
    this.aim = undefined
    if (this.canPreventCurrentAction()) {
      this.changeStateToStay()
    }
  }

  private changeStateToStay() {
    this.state = STATE.STAY
    this.searchAimToAttack()
  }

  private changeStateToAttack(aim: Unit) {
    this.state = STATE.SHOOT;
    this.aim = aim;
    this.angle = Utils.ang(this, this.aim);
    this.modX = 0;
    this.modY = 0;
  }

  private attack() {
    // TODO: maybe be should check here, is aim.hp > 0
    if (!('hp' in this.aim)) {
      debugger
      return
    }
    if (!Utils.objStaying(this.aim)) {
      if (Utils.dis(this, this.aim) >= this.weapon.range) {
        this.searchAimToAttack()
        return;
      }
      this.angle = Utils.ang(this, this.aim)
    }

    if (this.flamer) { // TODO: mvoe this whole conditinal to new weapon method "shoot", and pass only unit object
      if (Math.floor(this.weapon.reload) % 3 === 0) {
        this.goToShootFrame();
      }
      if (this.flamer.container.visible === false) {
        this.flamer.start();
        this.weapon.flamerAims = []; // we should add new field here, it's probably breaks a lot of
        this.weapon.reload = 0;
      }
      if (--this.weapon.reload <= 0) {
        this.weapon.reload = this.weapon.reloadTime;
        window.allSquads.map((fact, idx) => {
          if (idx !== this.faction) {
            fact.map(squad => {
              if (Utils.dis(squad.center, this) < this.weapon.range + SETTINGS.MAX_DISTANCE_BETWEEN_SQUAD_MEMBERS) {
                // 500 from sky, for optimalization, first test squad, later each unit
                squad.members.map(unit => {
                  if (Utils.dis(this, unit) < this.weapon.range && Utils.where(this.x, this.y, this.angle, unit.x, unit.y, 40) === 0) { // Is on the front
                    this.weapon.flamerAims.push(unit);
                  }
                })
              }
            })
          }
        });
      }
      this.weapon.flamerAims.forEach(unit => unit.takeDamage(this.weapon));
    } else {
      if (this.weapon.reload++ >= this.weapon.reloadTime) {
        if (Math.floor(Utils.randomAbsLUT(5)) === 0) {//load new bullets
          this.weapon.reload = -Math.floor(Utils.randomAbsLUT(this.weapon.waitReloadingTime) + 1);
        } else {//break between two shoots
          this.weapon.reload = 0;
        }

        this.goToShootFrame();
        const point = this.model.riflePoints[this.getRotationFrame()];
        const position = {
          x: point.x * this.model.scale + this.x,
          y: (point.y + 4) * this.model.scale + this.y,
          angle: this.angle
        }
        WeaponsFactory.createBullet(this.type, position, this.aim);// fourthy option param is modify damage
      }
    }
  }

  takeDamage(bullet) {
    const { damage, explosion } = bullet;
    if (this.state === STATE.ABILITY) { // If unit is flying (for example) then shoudn't get damage
      return
    }
    if (explosion) {
      const invertedNormalDistance = 1 - (Utils.dis(this, bullet) / explosion.range);
      this.hp -= damage * invertedNormalDistance;
      const angle = Utils.ang(bullet, this);
      const strength = invertedNormalDistance * explosion.strength + 2; // 2 => the minimum
      const modX = Math.sin(angle) * strength;
      const modY = -Math.cos(angle) * strength;

      this.angle = angle + Math.PI;
      this.modX = modX;
      this.modY = modY;
      this.state = STATE.FLY;
      this.flying();
    } else {
      this.hp -= damage;
      if (this.hp <= 0) {
        this.changeStateToDie();
      }
    }
    // TODO: unit can also die after explosion, also during fyling!
    // if (this.hp <= 0) {
    // this.changeStateToDie();
    // }
  }

  private canPreventCurrentAction() {
    return ![STATE.FLY, STATE.GETUP, STATE.DIE, STATE.ABILITY].includes(this.state)
  }

  removeSelf() {
    window.app.stage.removeChild(this.graphics)
    this.graphics.destroy()
    this.graphics = undefined
    const hunterIndex = window.hunters[this.faction].findIndex((unit) => unit === this);
    if (hunterIndex !== -1) {
      Utils.removeFromArr(window.hunters[this.faction], this)
    }
    this.weapon = undefined
    this.aim = undefined
    this.squad.removeUnit(this)
    this.squad = undefined
  }

  animate() {
    this.testing()
    // const self = Object.assign({}, this);
    // if(this.x < 0 || this.y < 0 || this.x > window.mapWidth || this.y > window.mapHeight) debugger;
    this.x += this.modX;
    this.y += this.modY;
    this.graphics.x = this.x;
    this.graphics.y = this.y + this.model.offsetY;
    this.draw();
  }

  useAbility() {
    const { details, target } = this.ability
    details.use(this, target)

    const units = details.forFullSquad ? [this] : this.squad.members
    units.forEach(unit => {
      unit.ability = undefined
      unit.aim = undefined
      if (unit.state !== STATE.ABILITY) { // without animation
        unit.defaultBehaviour()
      }
    })

    const usedAbility = this.squad.abilities.find(ability => ability.name === details.name);
    usedAbility.time = usedAbility.rechargeTime;
  }

  getTheMostImportantAim(aims: Unit[]) { // TODO: remove it, it's abstract method
    return aims[0]
  }

  testing() {
    if (this.state === STATE.GO && this.aim && 'hp' in this.aim) {
      debugger
    }

    if (this.state === STATE.STAY && this.aim) {
      debugger
    }

    if (this.state === STATE.SHOOT && !this.aim) {
      debugger
    }
  }
}

export default Unit;