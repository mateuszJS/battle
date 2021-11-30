import { CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD } from 'Constants'
import getTexture from '~/getTexture'
import drawEnvironment from './draw-environment'

const createBackgroundTexture = (mapPoints: Point[]) => {
  const rect = new PIXI.Graphics()
  
  // rect.beginFill(0x444, 0)
  const SQUARE_SIZE = 100
  // rect.drawRect(0, 0, SQUARE_SIZE, SQUARE_SIZE)
  rect.beginFill(0xff0000, 1)
  rect.drawRect(0, 0, 1, SQUARE_SIZE)
  rect.drawRect(0, SQUARE_SIZE - 1, SQUARE_SIZE, 1)
  rect.drawRect(SQUARE_SIZE - 1, 0, 1, SQUARE_SIZE)
  rect.drawRect(0, 0, SQUARE_SIZE, 1)
  const rectTexture = getTexture(rect, SQUARE_SIZE, SQUARE_SIZE)

  const map = new (PIXI.projection as { Sprite2d: any }).Sprite2d(rectTexture)
  map.proj.mapSprite(map, mapPoints)

  return map
}

const setAllLayers = (mapPoints: Point[], environmentContainer: PIXI.Container): void => {
  const sortableLayer = new PIXI.display.Group(0, (sprite: PIXI.Sprite & { zOrder: number }) => {
    sprite.zOrder = sprite.y
  })

  window.world = new PIXI.display.Layer(sortableLayer)
  window.smallPieces = new PIXI.Container()
  window.ui = new PIXI.Container()

  window.app.stage = new PIXI.display.Stage()
  environmentContainer.addChild(createBackgroundTexture(mapPoints))

  const minX = Math.min(...mapPoints.map(point => point.x))
  const minY = Math.min(...mapPoints.map(point => point.y))
  const maxX = Math.max(...mapPoints.map(point => point.x))
  const maxY = Math.max(...mapPoints.map(point => point.y))
  // to test if all environment is cropped correctly you can decrease CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
  // up to negative value like CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD = -CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
  const backgroundTexture = getTexture(
    environmentContainer,
    maxX - minX + 2 * CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
    maxY - minY + 2 * CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
    {},
    minX - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
    minY - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD,
  )
  const env = new PIXI.Sprite(backgroundTexture)
  env.x = minX - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
  env.y = minY - CAMERA_MOVEMENT_DISABLED_AREA_THRESHOLD
  window.app.stage.addChild(env) // prob should be included in window.world


  window.app.stage.addChild(window.world)
  window.app.stage.addChild(window.smallPieces)
  window.app.stage.addChild(window.ui)

  window.updateBackground = (sprite: PIXI.Sprite, isAlreadySkew = false): void => {
    // background.addChild(sprite)
    // const rectTexture = getTexture(background, 1, 1)
  }
}

export default setAllLayers
