import createNewIconGrenade from '~/sprites/iconGrenadeSprite';
import createNewIconJump from '~/sprites/iconJumpSprite';
import Squad from '~/units/Squad';
import SETTINGS from 'Settings';

export interface IIcon {
	graphics: PIXI.Sprite
	squad: Squad
	width: number
}

interface IIcons {
    icons: any
    init: () => void
    combineIcons: (squad: Squad) => PIXI.Sprite
    removeIcon: (icon: IIcon) => void
    removeAllIcons: () => void
    showIcons: () => void
}

const Icons: IIcons = {
    icons: {},
    init() {
        this.icons['SOLIDER_GRENADE'] = createNewIconGrenade();
        this.icons['ASSAULT_JUMP'] = createNewIconJump();
    },
    combineIcons(squad) {
        const { abilities } = squad;
        const iconsGroup = new PIXI.Sprite();
        abilities.map((ability, index) => {
            const newIcons = this.icons[ability.name]();
            newIcons.x = index * SETTINGS.ABILITY_ICON_SIZE - (abilities.length * SETTINGS.ABILITY_ICON_SIZE) / 2;
            iconsGroup.addChild(newIcons);
        });
        iconsGroup.anchor.set(0.5, 1);
        return iconsGroup;
    },
    removeIcon(icon) {
        window.app.stage.removeChild(icon.graphics);
        const index: number = window.icons.indexOf(icon);
        window.icons.splice(index, 1);	
    },
    removeAllIcons() {
        window.icons.map(icon => window.app.stage.removeChild(icon.graphics));
        window.icons = [];
    },
    showIcons() {
        if(window.allSelectedUnits.length > 0) {
            window.allSquads[0].map(squad => {
                if(squad.isAllSelected) {
                    const squadIcon = window.icons.find(icon => icon.squad === squad);
                    if(squadIcon) {
                        squadIcon.graphics.x = squad.members[0].x;
                        squadIcon.graphics.y = squad.members[0].y - 75;
                        squad.abilities.map(abili => {
                            if(abili.time > 0) {
                                squadIcon.graphics.alpha = (abili.rechargeTime - abili.time) / abili.rechargeTime;
                            }
                        });
                    } else {
                        const newIcon = {
                            graphics: this.combineIcons(squad),
                            squad,
                            width: squad.abilities.length * SETTINGS.ABILITY_ICON_SIZE,
                        }
                        window.icons.push(newIcon);
                        newIcon.graphics.x = squad.members[0].x;
                        newIcon.graphics.y = squad.members[0].y - 75;
                        window.app.stage.addChild(newIcon.graphics);
                    }
                } else {
                    const iconToRemove = window.icons.find(icon => icon.squad === squad);
                    if(iconToRemove) {
                        this.removeIcon(iconToRemove);
                    }
                }
            });
        }
    }
}

export default Icons;