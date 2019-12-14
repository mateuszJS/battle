import SETTINGS from 'Settings';

export default () => {
  return () => {
    const grenade = new PIXI.Sprite(window.app.loader.resources['assets/grenade-icon.png'].texture);
    grenade.width = SETTINGS.ABILITY_ICON_SIZE;
    grenade.height = SETTINGS.ABILITY_ICON_SIZE;
    return grenade;
  }
}