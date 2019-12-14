import soliderRegular from './weaponTypes/soliderRegular';
import warriorRegular from './weaponTypes/warriorRegular';
import soliderLaser from './weaponTypes/soliderLaser';
import SETTING from 'Settings';

const factor = SETTING.CHANGE_STATE_THROTTLE;

const modifier = 1;
const weaponTypes = {
    'WARRIOR_REGULAR': {
        reloadTime: 10 / factor,
        range: 500,
        speed: 10,
        scatter: 0.2,
        damage: 5 * modifier,
        waitReloadingTime: 50 / factor,
        drawAndAddProps: warriorRegular.drawAndAddProps
    },
    'SOLIDER_REGULAR': {
        reloadTime: 10 / factor,
        range: 400,
        speed: 10,
        scatter: 0.2,
        damage: 5 * modifier,
        waitReloadingTime: 50 / factor,
        drawAndAddProps: soliderRegular.drawAndAddProps
    },
    'SOLIDER_LASER': {
        reloadTime: 10 / factor,
        range: 400,
        speed: NaN,
        scatter: 0.2,
        damage: 5 * modifier,
        waitReloadingTime: 60 / factor,
        drawAndAddProps: soliderLaser.drawAndAddProps
    },
    'SOLIDER_GRENADE': {
        speed: 3,
        damage: 30 * modifier,
        explosion: {
            range: 100,
            strength: 6
        }
    },
    'WARRIOR_ASSAULT': {
        reloadTime: 120 / factor,
        range: 300,
        speed: 0,
        scatter: 0,
        damage: 0.3 * modifier,
        waitReloadingTime: NaN,
    },
    'ASSAULT_JUMP': {
        range: 100,
        damage: 5 * modifier,
        explosion: {
            range: 100,
            strength: 6
        }  
    },
}

export default weaponTypes;