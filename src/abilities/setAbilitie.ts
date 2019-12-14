import Squad from '~/units/Squad';
import { abilityFactory } from './abilityFactory';
import setDestinationPoint from '~/modules/setDestination';
import Utils from 'Utils';
import STATE from '~/modules/consts';
import Unit from '~/units/Unit';

const setAbility = (squads: Squad[], target: Point, type: string): void => {
  if (type === 'SOLIDER_GRENADE') {
      squads.forEach((squad: Squad) => {
        setDestinationPoint(target, squad.members, false, false, false);
        const ability = {
          target,
          details: abilityFactory.get(type)
        }
        squad.members.forEach(unit => unit.ability = ability)
      });
  } else if (type === 'ASSAULT_JUMP') {
    const allUnits: Unit[] = [];
    squads.forEach(squad =>
      squad.members.forEach(unit =>
        allUnits.push(unit)
      ) 
    );
    setDestinationPoint(target, allUnits, false, false, false);
    const ability = {
      target,
      details: abilityFactory.get(type)
    }
    allUnits.forEach(unit => unit.ability = ability);
  }
}

export default setAbility;