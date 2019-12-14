import Utils from 'Utils';
import Unit from './Unit';
import Icons, { IIcon } from '~/modules/icons';
import SquadTypes from './SquadTypes';
import WeaponTypes from '~/weapons/WeaponTypes';
import SETTINGS from '~/modules/gameSettings';

interface SquadAbility {
    name: string
    time: number
    rechargeTime: number
}

class Squad {
  private allSelected: boolean

  public faction: number
  public center: Point;
  public members: Unit[]
  public abilities: SquadAbility[]
  public isStaying: boolean
  public fluentValue: number
  public weaponRange: number
  public oneUnitFluent: number
  public aim: Squad

  constructor(faction: number, abilities: SquadAbility[], type: string) {
    // TODO: "abilities" shouldn't became from "SquadTypes[type]"?
    this.faction = faction;
    this.members = [];
    this.abilities = abilities;
    this.oneUnitFluent = SquadTypes[type].fluent;
    this.weaponRange = WeaponTypes[type].range;
    this.isStaying = true; // TODO: it's not falseo n start? soldiers are coming from portal
    this.fluentValue = 0;
    this.aim = undefined
  }

  get isAllSelected(): boolean { // why it's getter instead of simply boolean?
    return this.allSelected;
  }

  removeUnit(unit: Unit): void {
    this.members = this.members.filter(member => member !== unit);
    if(this.members.length === 0) {
      Utils.removeFromArr(window.allSquads[this.faction], this);
      window.squadsWereMoved[this.faction] = window.squadsWereMoved[this.faction].filter(squad => squad !== this)
      const icon: IIcon = window.icons.find( icon => icon.squad === this); // TODO: consieder, maybe squad shoudl have icons, not icons has reference to squad?
      if(icon) {
        Icons.removeIcon(icon);
      }
    }
  }

  selectAll() {
      this.allSelected = true;
      this.members.forEach(member => member.selected = true);
  }

  deselectAll() {
      this.allSelected = false;
      this.members.forEach(member => member.selected = false);
  }

  updateProps() {
    const hp = this.members.reduce((prev, member) => prev + member.hp, 0);   
    this.fluentValue = hp * this.oneUnitFluent;
    this.center = Utils.calculateCenterPoint(this.members) 
    if (this.center.x < 0) { // TODO: it never should happend!
      this.center.x = 0;
    } else if (this.center.x >= window.mapWidth) { // TODO: it never should happend!
      this.center.x = window.mapWidth - 1;
    }

    if (this.center.y < 0) {
      this.center.y = 0; // TODO: it never should happend!
    } else if (this.center.y >= window.mapHeight) { // TODO: it never should happend!
      this.center.y = window.mapHeight - 1;
    }
  }

  updateStayingStatus() {
    const squadsIsMoving = this.members.reduce((result, unit) => 
      result ? result : !Utils.objStaying(unit), false);
    // this.isStaying = this.members.every(unit => Utils.objStaying(unit));
    this.isStaying = !squadsIsMoving;
  }

  update() {
    this.members.forEach(member => member.update())
  }

  animate() {
    this.members.forEach(member => member.animate())
  }

  regroupMembers() {
    const tooFarUnits = this.members.filter(unit =>
      Utils.dis(this.center, unit) > SETTINGS.MAX_DISTANCE_BETWEEN_SQUAD_MEMBERS)

    tooFarUnits.forEach(unit => {
      if (!unit.aim || 'hp' in unit.aim) {
        const angle = Utils.ang(unit, this.center)
        const distance = Utils.dis(unit, this.center) - 150 // 150 for good looking
        unit.setTargetToGo({
          x: Math.sin(angle) * distance + unit.x,
          y: -Math.cos(angle) * distance + unit.y,
        })
      }
    })
  }

  // updateAim() {
  //   if (!this.aim.isStaying) {
  //     if (Utils.dis(this.members[2].aim, this.aim.center) > 400) { // Aim moves more than a few of pixels
  //       const squadsWIthTheSameAim = window.allSquads[this.faction].filter(
  //         squad => squad.aim === this.aim
  //       )

  //       squadsWIthTheSameAim.forEach(squad => {

  //       })
  //     }
  //   }
  // }
}

export default Squad;