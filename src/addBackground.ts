import { MAP_WIDTH, MAP_HEIGHT } from 'Consts'
import getTexture from '~/getTexture'

const addBackground = () => {
  window.mapWidth = Math.floor(window.innerWidth / 50) * 50 * 3
  window.mapHeight = Math.floor(window.innerHeight / 50) * 50 * 3
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
    mapQuarted.width = window.mapWidth / 2
    mapQuarted.height = window.mapHeight / 2
    mapQuarted.x = (i % 2) * (window.mapWidth / 2)
    mapQuarted.y = Math.floor(i / 2) * (window.mapHeight / 2)
    map.addChild(mapQuarted)
  }
  const center = new PIXI.Sprite(window.app.loader.resources['assets/map_center.png'].texture)
  center.anchor.set(0.5)
  center.width = window.mapWidth / 3
  center.height = window.mapHeight / 3
  center.x = window.mapWidth / 2
  center.y = window.mapHeight / 2
  map.addChild(center)

  /*Transform parts of map, to one texture */
  const renderTexture = getTexture(map, window.mapWidth, window.mapHeight)
  const mapSprite = new PIXI.Sprite(renderTexture)
  mapSprite.width = MAP_WIDTH
  mapSprite.height = MAP_HEIGHT

  return mapSprite
}

export default addBackground
