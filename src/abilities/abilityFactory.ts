import Squad from '~/units/Squad';
import Unit from '~/units/Unit';
import createGrenade from './types/grenade';
import jumping from './types/jumping';

interface IAbilityDetails {
  forFullSquad: boolean
  name: string
  use: (source: Unit, target: Point | Unit | Squad) => void
  range?: number
}

export interface IAbility {
  target: Point
  details: IAbilityDetails
}

export const abilityFactory = {
  get(type): IAbilityDetails {
    if (type === 'SOLIDER_GRENADE') {
      return {
        name: 'SOLIDER_GRENADE',
        use: (source, target) => {
          createGrenade('SOLIDER_GRENADE', source, target);
        },
        range: 300,
        forFullSquad: false
      }
    } else if (type === 'ASSAULT_JUMP') {
      return {
        name: 'ASSAULT_JUMP',
        use: (source, target) => {
          jumping('ASSAULT_JUMP', source, target);
        },
        range: 700,
        forFullSquad: true
      }
    }
  }
}