import SETTINGS from 'Settings'
import Factory from './factory/Factory'
import { UNIT_TYPE } from './consts/consts'

const getUnitAvatars = (
  playersList: Array<'HUMANS'>,
): {
  unit: UNIT_TYPE
  src: string
}[] => {
  if (playersList[0] === 'HUMANS') {
    return [
      {
        src: 'assets/soliderLaserAvatar.png',
        unit: UNIT_TYPE.SOLIDER_LASER,
      },
      {
        src: 'assets/soliderRegularAvatar.png',
        unit: UNIT_TYPE.SOLIDER_REGULAR,
      },
    ]
  } else {
    return [
      {
        src: 'assets/warriorRegularAvatar.png',
        unit: UNIT_TYPE.WARRIOR_REGULAR,
      },
      {
        src: 'assets/warriorAssaultAvatar.png',
        unit: UNIT_TYPE.WARRIOR_ASSAULT,
      },
    ]
  }
}

const addProductionIcons = (
  playersList: Array<'HUMANS'>,
  factories: Factory[],
) => {
  getUnitAvatars(playersList).map((avatarInfo, idx) => {
    const avatar = new PIXI.Sprite(
      window.app.loader.resources[avatarInfo.src].texture,
    )
    avatar.width = SETTINGS.ABILITY_ICON_SIZE
    avatar.height = SETTINGS.ABILITY_ICON_SIZE
    avatar.x = factories[0].x
    avatar.y = factories[0].y - idx * 60
    avatar.interactive = true
    avatar.buttonMode = true
    const onButtonDown = () => {
      if (factories[0].resources >= 1000) {
        factories[0].buySquad(avatarInfo.unit)
      }
    }
    avatar.on('pointerdown', onButtonDown)
    window.app.stage.addChild(avatar)
    window.userIcons.push(avatar)
  })
}

export default addProductionIcons
