import { UnitState } from "logic-contants"
import { createTextureFromImage } from "./getTexture"
import Rect from "Rect"

const frameByState: Record<UnitState, {
  jsonUrl: URL,
  imgUrl: URL,
  textureIndex: number
  length: number
  first: number // not sure if it's needed in this case
  angles: number
  timePerFrame: number
  /* also matrix for position, cropping */
}> = {
  [UnitState.RUN]: {
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-run.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-run.png', import.meta.url),
    textureIndex: 0,
    length: 16,
    first: 0,
    angles: 12,
    timePerFrame: 50 // speed in seconds
  },
  [UnitState.SHOOT]: {
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-shoot.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-shoot.png', import.meta.url),
    textureIndex: 1,
    length: 7,
    first: 0,
    angles: 12,
    timePerFrame: 60
  },
  [UnitState.ABILITY]: {
    // TODO: not sure what to do here, we do not have this state animation
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-idle.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-idle.png', import.meta.url),
    textureIndex: 7,
    length: 1,
    first: 0,
    angles: 12,
    timePerFrame: Infinity
  },
  [UnitState.CHASING]: {
    // TODO: not sure what to do here, we do not have this state animation
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-idle.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-idle.png', import.meta.url),
    textureIndex: 7,
    length: 1,
    first: 0,
    angles: 12,
    timePerFrame: Infinity
  },
  [UnitState.DIE]: {
    // TODO: not sure what to do here, we do not have this state animation
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-idle.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-idle.png', import.meta.url),
    textureIndex: 7,
    length: 1,
    first: 0,
    angles: 12,
    timePerFrame: Infinity
  },
  [UnitState.FLY]: {
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-fly.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-fly.png', import.meta.url),
    textureIndex: 5,
    length: 20,
    first: 0,
    angles: 12,
    timePerFrame: 50
  },
  [UnitState.GETUP]: {
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-getup.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-getup.png', import.meta.url),
    textureIndex: 6,
    length: 25,
    first: 0,
    angles: 8,
    timePerFrame: 50
  },
  [UnitState.IDLE]: {
    jsonUrl: new URL('assets/units/elephant-head/elephant-head-idle.json', import.meta.url),
    imgUrl:  new URL('assets/units/elephant-head/elephant-head-idle.png', import.meta.url),
    textureIndex: 7,
    length: 1,
    first: 0,
    angles: 12,
    timePerFrame: Infinity
  }
}

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

export interface Asset {
  texture: GPUTexture
  json: SpriteSheetJson
  texUVs: Float32Array[]
  texOffsets: Point[]
  textureIndex: number
}

// type assetName = typeof assets[number][0]
// type AssetsDictionary = Record<assetName, Asset>

export async function getAssets(device: GPUDevice): Promise<Asset[]> {
  const promises = Object.entries(frameByState)
    .map<Promise<Asset>>(([state, assetDetail]) => {
      const assetPromises = [
          state,
          assetDetail.textureIndex,
          createTextureFromImage(device, assetDetail.imgUrl.toString(), {flipY: true}),
          fetch(assetDetail.jsonUrl.toString()).then(res => res.json() as unknown as SpriteSheetJson)
        ] as const

      return Promise.all(assetPromises).then(([state, textureIndex, texture, json]) => {
        // numOfLoadedAssets++
        // progressCallback(numOfLoadedAssets / assets.length)
        const texUVs = Object.values(json.frames).map(fd => {
          const {x, y, w, h} = fd.frame
          const frameWidth = fd.rotated ? h : w
          const frameHeight = fd.rotated ? w : h

          const texPoints = [
            0,               0,
            0 + frameWidth,  0,
            0 + frameWidth,  0 + frameHeight,
            0,               0 + frameHeight
          ]
        
          if (fd.rotated) {
            texPoints.push(...texPoints.splice(0, 2))
          }
          
          texPoints[0] += x
          texPoints[1] += y
          texPoints[2] += x
          texPoints[3] += y
          texPoints[4] += x
          texPoints[5] += y
          texPoints[6] += x
          texPoints[7] += y
        
          texPoints[0] /= texture.width
          texPoints[1] /= texture.height
          texPoints[2] /= texture.width
          texPoints[3] /= texture.height
          texPoints[4] /= texture.width
          texPoints[5] /= texture.height
          texPoints[6] /= texture.width
          texPoints[7] /= texture.height


          return new Float32Array(texPoints)
        })

        const texOffsets = Object.values(json.frames).map<Point>(fd => ({
          x: fd.spriteSourceSize.x / texture.width,
          y: fd.spriteSourceSize.y / texture.height,
       }))

        const rotated = Object.values(json.frames).map<boolean>(fd => fd.rotated)

        return {
          texture,
          json,
          texUVs,
          texOffsets,
          textureIndex,
        }
      })
    })

  return Promise.all(promises).then(([...assets]) => {
    const orderedAssets: Asset[] = []
    assets.forEach(asset => {
      orderedAssets[asset.textureIndex] = asset
    })
    return orderedAssets
  })
}

export default frameByState