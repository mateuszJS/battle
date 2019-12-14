import Unit from './Unit';
import WeaponsFactory from '~/weapons/WeaponsFactory';
import Utils from '../utils/Utils';
import Squad from './Squad';

class Warrior extends Unit {
    constructor(graphics:any, model:any, pos: Point, faction:number, type:string, squad:Squad) {//pass only weapons PARAMS, not copy reference to primary weapon object
        super(graphics, model, pos, faction, type, squad);
	}

	getTheMostImportantAim(aims: Unit[]) {
		const index = Utils.getIndexOfTheNearestItem(aims, this);
		return aims[index];
	}
}

export default Warrior;
