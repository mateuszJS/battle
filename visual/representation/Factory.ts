// import EffectsFactory from '~/representation/EffectFactory'
// import {
//   addItemToProductionLine,
//   removeItemFromProductionLine,
//   updateItemInProductionLine,
// } from '~/buttons/factory'
// import getMySelection from './getMySelection'
// import { addItemToBackground } from '~/set-all-layers'

// function onFrameChange() {
//   if (this.currentFrame > 70) {
//     this.gotoAndPlay(25)
//   }
// }

// type ProductionItem = {
//   id: number
//   node: HTMLButtonElement | null
// }

// const addPortalPart = (
//   name: string,
//   anchorX: number,
//   anchorY: number | ((sprite: PIXI.Sprite) => number),
//   x: number | ((sprite: PIXI.Sprite) => number),
//   y: number | ((sprite: PIXI.Sprite) => number),
// ): PIXI.Sprite => {
//   const sprite = new PIXI.Sprite(PIXI.Texture.from(name))
//   sprite.anchor.set(anchorX, typeof anchorY === 'number' ? anchorY : anchorY(sprite))
//   sprite.x = typeof x === 'number' ? x : x(sprite)
//   sprite.y = typeof y === 'number' ? y : y(sprite)

//   const graphics = new PIXI.Graphics()
//   graphics.beginFill(0xff0000)
//   graphics.drawCircle(0, 0, 15)
//   sprite.addChild(graphics)
//   return sprite
// }

// class Factory {
//   private x: number
//   private y: number
//   private portalFX: PIXI.AnimatedSprite
//   private productionLine: ProductionItem[]
//   private selection: PIXI.Sprite

//   constructor(
//     // factionId: number,
//     x: number,
//     y: number,
//     angle: number,
//   ) {

  
//     const factor = 20 / (2 * Math.PI)
//     const safeAngle = Math.round(
//       (
//         (angle + 2 * Math.PI) % (2 * Math.PI)
//       ) * factor + 0.49 // 0.49 instead of 0.5, to don't round up to 21
//     )
//     const framesIndex = (1 + ((safeAngle + 10) % 20)).toString().padStart(4, '0')
  
//     const bottomBase = addPortalPart(
//       `fpb_${framesIndex}`,
//       0.5,
//       0,
//       x,
//       (sprite) => y - sprite.height / 2
//     )
//     addItemToBackground(bottomBase)
    
//     const topBase = addPortalPart(
//       `fpt_${framesIndex}`,
//       0.5,
//       0.5,
//       x,
//       (sprite) => y - sprite.height * 0.165
//     )
//     window.world.addChild(topBase)

//     const topBaseSurfaceOffsetY = topBase.height * 0.167
//     const centerVerticalTopBaseSurface = topBase.y - topBaseSurfaceOffsetY
//     const radiusX = topBase.width * 0.277
//     // const radiusX = topBase.width * 0.281
//     const radiusY = topBase.height * 0.211
//     // const radiusY = topBase.height * 0.213
    
//     const roundedAngle = safeAngle / factor
//     const wingsAngleOffset = Math.PI * 0.73
//     const firstWingAngle = roundedAngle - wingsAngleOffset
//     const secondWingAngle = roundedAngle + wingsAngleOffset

//     const firstWingStatic = addPortalPart(
//       `fps_${framesIndex}`,
//       0.5,
//       (sprite) => 0.99 + (topBaseSurfaceOffsetY + Math.cos(firstWingAngle) * radiusY) / sprite.height,
//       topBase.x + Math.sin(firstWingAngle) * radiusX,
//       topBase.y + 1.1 + Math.cos(firstWingAngle - Math.PI / 2) / 100, // to just show it above, or below the other objects
//     )
//     window.world.addChild(firstWingStatic)

//     const oppositeFrame = ((safeAngle % 20) + 1).toString().padStart(4, '0')
//     const secondWingStatic = addPortalPart(
//       `fps_${oppositeFrame}`,
//       0.5,
//       (sprite) => 0.99 + (topBaseSurfaceOffsetY + Math.cos(secondWingAngle) * radiusY) / sprite.height,
//       topBase.x + Math.sin(secondWingAngle) * radiusX,
//       topBase.y + 1.1 + Math.cos(secondWingAngle + Math.PI / 2) / 100, // to just show it above, or below the other objects
//     )
//     window.world.addChild(secondWingStatic)

//     const dynamicWingRadiusMod = 1.12

//     const firstWingDynamic = addPortalPart(
//       `fpd_${framesIndex}`,
//       0.5,
//       (sprite) => 0.99 + (topBaseSurfaceOffsetY + Math.cos(firstWingAngle) * radiusY) / sprite.height,
//       topBase.x + Math.sin(firstWingAngle) * radiusX * dynamicWingRadiusMod,
//       topBase.y + 1.1 + Math.cos(firstWingAngle - Math.PI / 2) / 10, // to just show it above, or below the other objects
//     )
//     window.world.addChild(firstWingDynamic)
//     const firstWingLights = new PIXI.Sprite(PIXI.Texture.from(`fpl_${framesIndex}`,))
//     firstWingLights.anchor.copyFrom(firstWingDynamic.anchor)
//     firstWingDynamic.addChild(firstWingLights)

//     const secondWingDynamic = addPortalPart(
//       `fpd_${oppositeFrame}`,
//       0.5,
//       (sprite) => 0.99 + (topBaseSurfaceOffsetY + Math.cos(secondWingAngle) * radiusY) / sprite.height,
//       topBase.x + Math.sin(secondWingAngle) * radiusX * dynamicWingRadiusMod,
//       topBase.y + 1.1 + Math.cos(secondWingAngle + Math.PI / 2) / 10, // to just show it above, or below the other objects
//     )
//     window.world.addChild(secondWingDynamic)
//     const secondWingLights = new PIXI.Sprite(PIXI.Texture.from(`fpl_${oppositeFrame}`,))
//     secondWingLights.anchor.copyFrom(secondWingDynamic.anchor)
//     secondWingDynamic.addChild(secondWingLights)
//     // const props = portalProperties[index]

//     // gateTop.x = props.gateTop.x
//     // gateTop.y = props.gateTop.y
//     // gateBottom.x = props.gateBottom.x
//     // gateBottom.y = props.gateBottom.y

//     // const portalFX = EffectsFactory.createPortalEffect(props.portalEffect.x, props.portalEffect.y)

//     // portalFX.height = props.portalEffect.height
//     // portalFX.width = props.portalEffect.width
//     // portalFX.skew.set(0, props.portalEffect.skewY)

//     // gateTop.anchor.set(0.5, props.gateTop.anchorY)
//     // gateBottom.anchor.set(0.5, props.gateBottom.anchorY)

//     // window.world.addChild(gateBottom)
//     // window.world.addChild(portalFX)
//     // window.world.addChild(gateTop)

//     // const sprites = [gateBottom, portalFX, gateTop]
//     // sprites.forEach(child => {
//     //   child.x += x
//     //   child.y += y
//     // })
//     // portalFX.alpha = 0.9
//     // portalFX.visible = false

//     // this.portalFX = portalFX
//     // portalFX.onFrameChange = onFrameChange

//     // this.x = x
//     // this.y = y

//     const selection = getMySelection(false)
//     selection.x = x
//     selection.y = y
//     selection.width = 200
//     selection.height = 200
//     window.world.addChild(selection)
//     this.selection = selection
//   }

//   turnOnProduction() {
//     // if (!this.portalFX.visible) {
//     //   this.portalFX.visible = true
//     //   this.portalFX.alpha = 1
//     //   this.portalFX.gotoAndPlay(0)
//     // }
//   }
//   turnOffProduction() {
//     // it depends on animation but maybe we will need to add some internal status
//     // like "isProduction", and then isProduction is false, then do not repeat
//     // animation in "onFrameChange"

//     // if (this.portalFX.visible) {
//     //   this.portalFX.visible = false
//     //   this.portalFX.alpha = 0
//     //   this.portalFX.stop()
//     // }
//   }

//   updateProductionLine(progress: number, data: Float32Array) {
//     for (let i = 0; i < data.length; i++) {
//       if (data[i]) {
//         addItemToProductionLine(i, data[i])
//       } else {
//         removeItemFromProductionLine(i)
//       }
//     }
//     if (progress !== 0) {
//       updateItemInProductionLine(progress)
//     }
//   }

//   select() {
//     // this.selection.visible = true
//   }

//   deselect() {
//     // this.selection.visible = false
//   }
// }

// export default Factory
