// import { CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD } from 'Constants'
// import getTexture from '~/getTexture'
// import getTilingClouds from "~/draw-environment/draw-clouds";

// let env = new PIXI.Container()
// let mapCoords = null
// let itemsToAdd: Array<PIXI.Sprite | PIXI.Container> = []

// export const addItemToBackground = (item: PIXI.Sprite | PIXI.Container) => {
//   itemsToAdd.push(item)
// }

// export const updateBackground = (): void => {
//   if (itemsToAdd.length === 0) return

//   env.addChild(...itemsToAdd)
//   itemsToAdd = []
//   // to test if all environment is cropped correctly you can decrease CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
//   // up to negative value like CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD = -CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
//   const backgroundTexture = getTexture(
//     env,
//     mapCoords.maxX - mapCoords.minX + 2 * CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
//     mapCoords.maxY - mapCoords.minY + 2 * CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
//     {},
//     mapCoords.minX - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
//     mapCoords.minY - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
//   )
//   window.background.removeChild(env)

//   env = new PIXI.Sprite(backgroundTexture)
//   env.x = mapCoords.minX - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
//   env.y = mapCoords.minY - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
//   window.background.addChild(env) // prob should be included in window.world

//   // background.addChild(sprite)
//   // const rectTexture = getTexture(background, 1, 1)
// }

// const createBackgroundTexture = (mapPoints: Point[]) => {
//   const rect = new PIXI.Graphics()
  
//   // rect.beginFill(0x444, 0)
//   const SQUARE_SIZE = 100
//   // rect.drawRect(0, 0, SQUARE_SIZE, SQUARE_SIZE)
//   rect.beginFill(0xff0000, 1)
//   rect.drawRect(0, 0, 1, SQUARE_SIZE)
//   rect.drawRect(0, SQUARE_SIZE - 1, SQUARE_SIZE, 1)
//   rect.drawRect(SQUARE_SIZE - 1, 0, 1, SQUARE_SIZE)
//   rect.drawRect(0, 0, SQUARE_SIZE, 1)
//   const rectTexture = getTexture(rect, SQUARE_SIZE, SQUARE_SIZE)

//   const map = new (PIXI.projection as { Sprite2d: any }).Sprite2d(rectTexture)
//   map.proj.mapSprite(map, mapPoints)

//   return map
// }

// const setAllLayers = (mapPoints: Point[]): void => {
//   const sortableLayer = new PIXI.display.Group(0, (sprite: PIXI.Sprite & { zOrder: number }) => {
//     sprite.zOrder = sprite.y
//   })

//   const clouds = getTilingClouds(mapPoints)
//   window.background = new PIXI.Container()
//   window.world = new PIXI.display.Layer(sortableLayer)
//   window.smallPieces = new PIXI.Container()
//   window.ui = new PIXI.Container()

//   window.app.stage = new PIXI.display.Stage()
//   addItemToBackground(createBackgroundTexture(mapPoints))

//   mapCoords = {
//     minX: Math.min(...mapPoints.map(point => point.x)),
//     minY: Math.min(...mapPoints.map(point => point.y)),
//     maxX: Math.max(...mapPoints.map(point => point.x)),
//     maxY: Math.max(...mapPoints.map(point => point.y)),
//   }

//   window.app.stage.addChild(clouds)
//   window.app.stage.addChild(window.background)
//   window.app.stage.addChild(window.world)
//   window.app.stage.addChild(window.smallPieces)
//   window.app.stage.addChild(window.ui)
// }

// export default setAllLayers
