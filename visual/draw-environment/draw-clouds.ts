// import { MAP_SKEW_ANGLE, MAP_VERTICAL_MOD } from '../../logic/constants'

// export default function drawClouds(mapPoints: Point[]): PIXI.Container {
//   const container = new PIXI.Container()

//   const minX = Math.min(...mapPoints.map(point => point.x))
//   const minY = Math.min(...mapPoints.map(point => point.y))
//   const maxX = Math.max(...mapPoints.map(point => point.x))
//   const maxY = Math.max(...mapPoints.map(point => point.y))

//   const tilingSprite = new PIXI.TilingSprite(
//     PIXI.Texture.from('assets/cloud-tail-2-cropped.png'),
//     maxX - minX,
//     maxY - minY,
//   );
//   tilingSprite.x = minX
//   tilingSprite.y = minY
//   tilingSprite.alpha = 0.65
//   container.addChild(tilingSprite)

//   const tilingSprite2 = new PIXI.TilingSprite(
//     new PIXI.Texture(PIXI.Texture.from('assets/cloud-tail-2-cropped.png').baseTexture, undefined, undefined, undefined, 4),
//     maxX - minX,
//     maxY - minY,
//   );
//   tilingSprite2.x = minX
//   tilingSprite2.y = minY
//   tilingSprite2.alpha = 0.5
//   container.addChild(tilingSprite2)

//   const tilingCloudsMovementX = Math.sin(Math.PI / 2 + MAP_SKEW_ANGLE) * 1
//   const tilingCloudsMovementY = -Math.cos(Math.PI / 2 + MAP_SKEW_ANGLE) * 1 * MAP_VERTICAL_MOD
  

//   window.updateClouds = () => {
//     tilingSprite.tilePosition.x += tilingCloudsMovementX
//     tilingSprite.tilePosition.y += tilingCloudsMovementY
//     tilingSprite2.tilePosition.x += tilingCloudsMovementX * 0.35
//     tilingSprite2.tilePosition.y += tilingCloudsMovementY * 0.8
//   }

//   return container
// }