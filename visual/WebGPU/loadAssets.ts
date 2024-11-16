import elephantHeadFlyJson from 'assets/units/elephant-head/elephant-head-fly.json'
import elephantHeadFlyPng from 'assets/units/elephant-head/elephant-head-fly.png'
import aimIconPng from 'assets/aim_icon.png'
import { createTextureFromImage } from './getTexture'

interface SpriteSheetRect {
  x: number,
  y: number,
  w: number,
  h: number
}

interface SpriteSheetJson {
  frames: Record<string, SpriteSheetEntry>
}

interface SpriteSheetEntry {
  frame: SpriteSheetRect
	rotated: boolean
	trimmed: boolean
	spriteSourceSize: SpriteSheetRect,
	sourceSize: {
    w: number
    h: number
  }
}

interface Asset {
  texture: GPUTexture
  json: SpriteSheetJson | null
}

const assets = [
  ['elephant-head', elephantHeadFlyPng, elephantHeadFlyJson],
  ['aim-icon', aimIconPng]
] as const

type assetName = typeof assets[number][0]
type AssetsDictionary = Record<assetName, Asset>

export default async function loadAssets(
  device: GPUDevice,
  progressCallback: (progress: number) => void
): Promise<AssetsDictionary> {

  let numOfLoadedAssets = 0
  progressCallback(0)

  const promises = assets.map<Promise<[assetName, Asset]>>(([assetName, imgUrl, jsonUrl]) => {
    const assetPromises = [
        createTextureFromImage(device, imgUrl, {}),
        jsonUrl ? fetch(jsonUrl).then(res => res.json() as unknown as SpriteSheetJson) : null
      ] as const


    return Promise.all(assetPromises).then(async ([texture, json]) => {
      numOfLoadedAssets++
      progressCallback(numOfLoadedAssets / assets.length)

      return [
        assetName,
        {
          texture,
          json
        }
      ]
    })
  })

  return Promise.all(promises).then(([...assets]) => assets.reduce((acc, [name, asset]) => ({
    ...acc,
    [name]: asset
  }), {} as AssetsDictionary))
}