import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'
import getTexture from '~/getTexture'

const createBackgroundTexture = () => {
  const map = new PIXI.Container()
  const getRotate = (i: number): number => {
    switch (i) {
      case 0:
        return 8
      case 1:
        return 4
      case 2:
        return 0
      case 3:
        return 12
    }
  }
  for (let i = 0; i < 4; i++) {
    const rotatedTexture = new PIXI.Texture(
      window.app.loader.resources['assets/quarted_of_map.jpg'].texture.baseTexture,
      undefined,
      undefined,
      undefined,
      getRotate(i),
    )
    const mapQuarted = new PIXI.Sprite(rotatedTexture)
    mapQuarted.width = MAP_WIDTH / 2
    mapQuarted.height = MAP_HEIGHT / 2
    mapQuarted.x = (i % 2) * (MAP_WIDTH / 2)
    mapQuarted.y = Math.floor(i / 2) * (MAP_HEIGHT / 2)
    map.addChild(mapQuarted)
  }
  const center = new PIXI.Sprite(window.app.loader.resources['assets/map_center.png'].texture)
  center.anchor.set(0.5)
  center.width = MAP_WIDTH / 3
  center.height = MAP_HEIGHT / 3
  center.x = MAP_WIDTH / 2
  center.y = MAP_HEIGHT / 2
  map.addChild(center)

  /*Transform parts of map, to one texture */
  const renderTexture = getTexture(map, MAP_WIDTH, MAP_HEIGHT)
  const mapSprite = new PIXI.Sprite(renderTexture)
  mapSprite.width = MAP_WIDTH
  mapSprite.height = MAP_HEIGHT

  window.toggleBackground = () => {
    mapSprite.visible = !mapSprite.visible
  }

  return mapSprite
}

export default createBackgroundTexture
