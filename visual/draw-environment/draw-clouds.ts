import getTexture from "~/getTexture"
import { addItemToBackground } from "~/set-all-layers"
import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
import { getNodePlatform } from '~/draw-environment/draw-node'

export default function drawClouds(
  mapWidth: number,
  mapHeight: number,
  mapPoints: Point[],
  serializedMapInfo: SerializedMapInfo,
): void {
  const cloudsTextures = Array.from({ length: 5 }, (_, index) => (
    PIXI.Texture.from(`cloud${index + 1}`)
  ))
  const minX = Math.min(...mapPoints.map(point => point.x))
  const minY = Math.min(...mapPoints.map(point => point.y))

  const container = new PIXI.Container()
  let cloudIndex = 0

  for (let x = 0; x < mapWidth - 500; x += 500) {
    for (let y = 0; y < mapHeight - 500; y += 500) {
      const cloud = new PIXI.Sprite(cloudsTextures[cloudIndex])
      cloudIndex = (cloudIndex + 1) % cloudsTextures.length
      cloud.x = x
      cloud.y = y
      cloud.scale.set(0.5)
      container.addChild(cloud)
    }
  }

  const containerTexture = getTexture(container, mapWidth, mapHeight)

  const map = new (PIXI.projection as { Sprite2d: any }).Sprite2d(containerTexture)
  map.proj.mapSprite(map, mapPoints)
  
  const sprite = new PIXI.Sprite(getTexture(map, map.width, map.height, {}, minX, minY))
  serializedMapInfo.nodes.forEach(node => {
    const nodeMask = getNodePlatform(node.x, node.y, undefined, true)
    nodeMask.x -= minX
    nodeMask.y -= minY
    sprite.addChild(nodeMask)
  })

  sprite.x = minX
  sprite.y = minY

  addItemToBackground(sprite)
}