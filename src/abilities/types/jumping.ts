import WeaponTypes from '~/weapons/WeaponTypes';
import EffectsFactory from '~/effects/EffectsFactory';
import Utils from 'Utils';
import { STATE } from 'Consts';
import Unit from '~/units/Unit';
import Squad from '~/units/Squad';

export default (type: string, source: any, target: Unit | Point | Squad) => {
    const center = {
        x: (source.x + source.aim.x) / 2,
        y: (source.y + source.aim.y) / 2 + 200, // 200 - height of jump, in WarriorAssault.ts
    }

    const A1 = -(source.x ** 2) + center.x ** 2,
          B1 = -source.x + center.x,
          D1 = -source.y + center.y,
          A2 = -(center.x ** 2) + source.aim.x ** 2,
          B2 = -center.x + source.aim.x,
          D2 = -center.y + source.aim.y,
          Bmulti = -(B2 / B1),
          A3 = Bmulti * A1 + A2,
          D3 = Bmulti * D1 + D2,
          a = D3 / A3,
          b = (D1 - A1 * a) / B1,
          c = source.y - a * (source.x ** 2) - b * source.x;

    source.state = STATE.ABILITY; // TODO: what if state = DIE, GETUP, FLY?
    source.jumpFunction = (x: number) => a * (x ** 2) + b * x + c;
    source.modX *= 2.5;
    source.modY *= 2.5;
}