import * as PIXI from 'pixi.js';
import weaponTypes from '../WeaponTypes';
import EffectsFactory from '~/effects/EffectsFactory';
import Utils from 'Utils';

function drawAndAddProps() {
  const { x, y, angle, aim } = this;
  const { speed } = weaponTypes['WARRIOR_REGULAR'];
  this.modX = Math.sin(angle) * speed;
  this.modY = -Math.cos(angle) * speed;
  this.hit = Utils.where(x, y, angle, aim.x, aim.y, aim.radius) === 0;

  const distance = Utils.dis(this, aim);
  this.totalFrames = distance / speed;

  if (!this.hit) {//add or subtract sobe frames if bullet won't hit target
    this.totalFrames += Utils.normalRandomLUT(Math.floor(this.totalFrames * 0.1));
  }
  this.currFrame = 0;
  this.updateBullet = updateBullet;
  this.onDestroy = onDestroy;
  this.animate = animate;

  const graphics = new PIXI.Graphics();
  graphics.beginFill(0xAAFFFF);
  graphics.drawRect(0, 0, 5, 5);
  graphics.x = x;
  graphics.y = y;
  window.app.stage.addChild(graphics);
  this.graphics = graphics;
  EffectsFactory.createFireEffect(x, y);
}

function onDestroy() {
  if (this.hit) {
    this.aim.takeDamage(this);
  }
  //add bullet animation
  window.app.stage.removeChild(this.graphics);
  window.bulletContainer.splice(window.bulletContainer.indexOf(this), 1);
}

function animate() {
  this.x += this.modX;
  this.y += this.modY;
  this.graphics.x = this.x;
  this.graphics.y = this.y;
}

function updateBullet() {
  if (++this.currFrame >= this.totalFrames) {
    this.onDestroy();
    return 'DESTROY';
  } else {
    this.animate();
  }
}

export default { drawAndAddProps };