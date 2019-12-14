import Solider from './Solider';
import Warrior from './Warrior';
import WarriorAssault from './WarriorAssault';
import createSoliderSprite from '~/sprites/soliderSprites';
import createWarriorSprite from '~/sprites/warriorSprites';
import createWarriorAssaultSprite from '~/sprites/warriorAssaultSprites';
import createMySelectionSprite from '~/sprites/mySelectionSprite';
import Squad from './Squad';


const UnitsFactory = {
  inizializationTypes(layerGroup: PIXI.display.Group) {
    const getSoliderSprite = createSoliderSprite(),
      getWarriorSprite = createWarriorSprite(),
      getWarriorAssaultSprite = createWarriorAssaultSprite(),
      getMySelection = createMySelectionSprite();

    this.layerGroup = layerGroup;
    this.types = {
      'WARRIOR_REGULAR': {
        class: Warrior,
        sprites: getWarriorSprite,
        selection: getMySelection
      },
      'SOLIDER_REGULAR': {
        class: Solider,
        sprites: getSoliderSprite,
        selection: getMySelection
      },
      'SOLIDER_LASER': {
        class: Solider,
        sprites: getSoliderSprite,
        selection: getMySelection
      },
      'WARRIOR_ASSAULT': {
        class: WarriorAssault,
        sprites: getWarriorAssaultSprite,
        selection: getMySelection
      },
    }
  },
  createUnit(pos: Point, faction: number, type: string, squad: Squad) {

    const kind = this.types[type];
    return new kind.class(
      {
        parentGroup: this.layerGroup,
        unit: new PIXI.Container(),
        selection: kind.selection(),
      },
      kind.sprites(),
      pos,
      faction,
      type,
      squad
    );
  }
}

export default UnitsFactory;