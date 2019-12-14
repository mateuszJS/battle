import SETTINGS from 'Settings';
import Factory from './factory/Factory';

const addProductionIcons = (playersList: Array<'HUMANS'>, factories: Factory[]) => {

  const getUnitAvatars = () => {
    if (playersList[0] === 'HUMANS') {
      return [
        {
          src: 'assets/soliderLaserAvatar.png',
          unit: 'SOLIDER_LASER'
        },
        {
          src: 'assets/soliderRegularAvatar.png',
          unit: 'SOLIDER_REGULAR'
        }
      ]
    } else {
      return [
        {
          src: 'assets/warriorRegularAvatar.png',
          unit: 'WARRIOR_REGULAR'
        },
        {
          src: 'assets/warriorAssaultAvatar.png',
          unit: 'WARRIOR_ASSAULT'
        }
      ]
    }
  }

  getUnitAvatars().map((avatarInfo, idx) => {
    const avatar = new PIXI.Sprite(window.app.loader.resources[avatarInfo.src].texture);
    avatar.width = SETTINGS.ABILITY_ICON_SIZE;
    avatar.height = SETTINGS.ABILITY_ICON_SIZE;
    avatar.x = factories[0].x;
    avatar.y = factories[0].y - idx * 60;
    avatar.interactive = true;
    avatar.buttonMode = true;
    const onButtonDown = () => {
      if (factories[0].resources >= 1000) {
        factories[0].buySquad(avatarInfo.unit);
      }
    }
    avatar.on('pointerdown', onButtonDown);
    window.app.stage.addChild(avatar);
    window.userIcons.push(avatar);
  });
}

export default addProductionIcons
