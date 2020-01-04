import * as PIXI from 'pixi.js'
import EffectsFactory from '~/effects/EffectsFactory'
import Utils, { SIDES } from 'Utils'

function drawAndAddProps() {
  const { x, y, angle, aim } = this
  this.hit = Utils.where(x, y, angle, aim.x, aim.y, aim.radius) === SIDES.FRONT
  let distance = Utils.dis(aim, this)
  distance = this.hit
    ? distance
    : distance + Utils.normalRandomLUT(distance * 0.2)

  const shotX = Math.sin(angle) * distance + x,
    shotY = -Math.cos(angle) * distance + y

  this.totalFrames = 20
  this.currFrame = 0
  this.updateBullet = updateBullet
  this.animate = animate
  this.onDestroy = onDestroy

  const graphics = new PIXI.Graphics()
  graphics
    .lineStyle(3, 0xffffff)
    .moveTo(x, y)
    .lineTo(shotX, shotY)
  window.app.stage.addChild(graphics)
  this.graphics = graphics
  EffectsFactory.createLaserEffect(x, y)
}

function onDestroy() {
  if (this.hit) {
    this.aim.takeDamage(this)
  }
  //add bullet animation
  window.app.stage.removeChild(this.graphics)
  window.bulletContainer.splice(window.bulletContainer.indexOf(this), 1)
}

function animate() {
  this.graphics.alpha = this.currFrame / this.totalFrames
}

function updateBullet() {
  if (++this.currFrame >= this.totalFrames) {
    this.onDestroy()
    return 'DESTROY'
  } else {
    this.animate()
  }
}

export default { drawAndAddProps }
