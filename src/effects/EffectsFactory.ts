// import Utils from 'Utils'
// import { STATE } from 'Consts'
// import createTexturesList from './createTexturesList'

// class EffectsFactory {
//   static fireEffectFrames = []
//   static laserEffectFrames = []
//   static portalEffectFrames = []

//   static initialize() {
//     EffectsFactory.fireEffectFrames = createTexturesList(
//       i => `fireEffect_${i}.png`,
//       7,
//     )
//     EffectsFactory.laserEffectFrames = createTexturesList(
//       i => `laserEffect_${i}.png`,
//       7,
//     )
//     EffectsFactory.portalEffectFrames = createTexturesList(i => {
//       const index = i < 10 ? `0${i}` : i
//       return `Gate_FX_000${index}.png`
//     }, 97)
//   }

//   static createBoomEffect(x, y) {
//     const movieclip = new PIXI.AnimatedSprite(EffectsFactory.fireEffectFrames)
//     movieclip.animationSpeed = 0.3
//     movieclip.anchor.set(0.5)
//     movieclip.x = x
//     movieclip.y = y
//     movieclip.loop = false
//     movieclip.scale.set(10)
//     movieclip.onComplete = function() {
//       this.destroy()
//     }
//     window.app.stage.addChild(movieclip)
//     movieclip.play()
//   }

//   static createFireEffect(x, y) {
//     const movieclip = new PIXI.AnimatedSprite(EffectsFactory.fireEffectFrames)
//     movieclip.animationSpeed = 0.4
//     movieclip.anchor.set(0.5)
//     movieclip.x = x
//     movieclip.y = y
//     movieclip.loop = false
//     movieclip.onComplete = function() {
//       this.destroy()
//     }
//     movieclip.scale.set(1.2)
//     window.app.stage.addChild(movieclip)
//     movieclip.play()
//   }

//   static createLaserEffect(x, y) {
//     const movieclip = new PIXI.AnimatedSprite(EffectsFactory.laserEffectFrames)
//     movieclip.animationSpeed = 0.4
//     movieclip.anchor.set(0.5)
//     movieclip.x = x
//     movieclip.y = y
//     movieclip.loop = false
//     movieclip.onComplete = function() {
//       this.destroy()
//     }
//     movieclip.scale.set(1.2)
//     window.app.stage.addChild(movieclip)
//     movieclip.play()
//   }

//   static createFlamerEffect(unit) {
//     const flamesCount = 10
//     const sprites = new PIXI.Container()
//     const originFlames = []
//     let activeFlames = []

//     sprites.visible = false
//     const createFlame = () => {
//       const sprite = PIXI.Sprite.from('assets/Fire.png')
//       sprite.anchor.set(0.5, 1)
//       sprite.alpha = 0
//       sprite.blendMode = PIXI.BLEND_MODES.ADD
//       return sprite
//     }

//     for (let i = 0; i < flamesCount; i++) {
//       const flame = createFlame()
//       sprites.addChild(flame)
//       originFlames.push(flame)
//     }

//     const start = () => {
//       originFlames.map((sprite, index) => {
//         if (sprite.alpha < 0.05) {
//           const point = unit.model.riflePoints[unit.getRotationFrame()]

//           // const positionOffset = angle + Utils.randomLUT(0.2);
//           // const positionOffset = angle + Math.sin(index / flamesCount) / 8;
//           const positionOffset =
//             unit.angle + Math.sin((index / flamesCount) * Math.PI * 2) / 8
//           sprite.rotation = positionOffset // Utils.randomLUT(Math.PI * 2);
//           sprite.alpha = index / flamesCount
//           // zmien to na minus, jesli do razu flamesy bedą widoczne
//           sprite.x = point.x * unit.model.scale + unit.x
//           sprite.y = (point.y + 4) * unit.model.scale + unit.y
//           sprite.scale.set(0.03, 0.05)
//           window.app.stage.addChild(sprites)
//           activeFlames.push(sprite)
//         }
//       })
//       if (sprites.visible === false) {
//         window.flamesUpdaters.push(updateFlames)
//         sprites.visible = true
//         window.app.stage.addChild(sprites)
//       }
//     }

//     const finish = () => {
//       sprites.visible = false
//       window.app.stage.removeChild(sprites)
//       window.flamesUpdaters = window.flamesUpdaters.filter(
//         updater => updater !== updateFlames,
//       )
//     }

//     const update = (sprite, index) => {
//       if (sprite.alpha < 0.05) {
//         if (unit.state !== STATE.SHOOT) {
//           activeFlames = activeFlames.filter(_sprite => _sprite !== sprite)
//           if (activeFlames.length === 0) {
//             finish()
//           }
//         } else {
//           const point = unit.model.riflePoints[unit.getRotationFrame()]
//           const positionOffset =
//             unit.angle + Math.sin((index / flamesCount) * Math.PI * 2) / 8
//           sprite.rotation = positionOffset // Utils.randomLUT(Math.PI * 2);
//           sprite.x = point.x * unit.model.scale + unit.x
//           sprite.y = (point.y + 4) * unit.model.scale + unit.y
//           sprite.alpha = 1
//           sprite.scale.set(0.03, 0.05)
//         }
//       }
//       sprite.scale.set(sprite.scale.x * 1.02, sprite.scale.y * 1.04)
//       sprite.alpha -= 0.015
//     }

//     const updateFlames = () => {
//       activeFlames.map(update)
//     }

//     const destroy = () => {
//       // Destroy Effect, ro change unit
//     }

//     return {
//       container: sprites, // Unit test, container.visible
//       start, // Unit start is container isn't visible
//       destroy,
//     }
//   }

//   static createPortalEffect(x, y) {
//     const movieclip = new PIXI.AnimatedSprite(EffectsFactory.portalEffectFrames)
//     movieclip.animationSpeed = 0.4
//     movieclip.anchor.set(0.5, 1)
//     movieclip.x = x
//     movieclip.y = y
//     movieclip.loop = false

//     movieclip.onFrameChange = function() {
//       if (this.currentFrame > 65) {
//         this.alpha = (this.totalFrames - this.currentFrame) / 30
//       }
//     }
//     return movieclip
//   }

//   static addSmoke(x, y, scale) {
//     const sprite = PIXI.Sprite.from('assets/smoke.png')
//     sprite.anchor.set(0.5, 0.5)
//     sprite.x = x
//     sprite.y = y
//     sprite.scale.set(scale / 5)
//     sprite.rotation = Utils.randomLUT(Math.PI * 2)
//     // sprite.blendMode = PIXI.BLEND_MODES.ADD;
//     window.smokeContainer.graphics.addChild(sprite)
//     window.smokeContainer.elements.push(sprite)
//   }

//   static updateSmoke(sprite, index) {
//     sprite.alpha -= 0.03
//     sprite.scale.set(sprite.scale.x + 0.05)
//     if (sprite.alpha <= 0) {
//       window.smokeContainer.elements.splice(index, 1)
//       window.smokeContainer.graphics.removeChild(sprite)
//     }
//   }
// }

// export default EffectsFactory
