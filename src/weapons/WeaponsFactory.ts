import Bullet from './Bullet';
import WeaponTypes from './WeaponTypes';
import Utils from 'Utils';

class WeaponsFactory {
    //at type of "aim" it's mena Unit
    static createBullet(type: string, position: any, aim: any, modifyDamage = 1) {
        const bulletData = {
            ...position,
            ...WeaponTypes[type],
            angle: position.angle + Utils.normalRandomLUT(WeaponTypes[type].scatter),
            damage: WeaponTypes[type].damage * modifyDamage,
            aim
        }
        window.bulletContainer.push(new Bullet(bulletData));
    }

    static getWeapon(type: string): weaponType {
        return WeaponTypes[type];
    }
}

export default WeaponsFactory;