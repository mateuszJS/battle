import { UnitState } from "logic-contants"
import { createTexture2dArrayFromSources, createTextureFromImage, loadImageBitmap } from "./getTexture"
import AssetsDescriptor, { AssetId } from "assetsData"
import getFrameDetails from "./getFrameDetails"

const sources = [
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i0.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i0.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i1.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i1.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i2.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i2.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i3.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i3.json', import.meta.url),
  },
] as const


interface SpriteSheetRect {
  x: number,
  y: number,
  w: number,
  h: number
}

interface SpriteSheetJson {
  frames: Record<string, SpriteSheetEntry>
}

export interface SpriteSheetEntry {
  frame: SpriteSheetRect
	rotated: boolean
	trimmed: boolean
	spriteSourceSize: SpriteSheetRect,
	sourceSize: {
    w: number
    h: number
  }
}

export interface FrameDetails {
  sourceRect: number[]
  destinationOffset: Point
  textureIndex: number
}

export interface FrameDetailsWithName extends FrameDetails{
  name: string
}


/*
  unit has elements [standard body, standard rifle, elephant head]
  assets: {
    StandardBody: {
      [STATE.RUN]: Asset[]
      [STATE.SHOOT]: Asset[]
    }
  }
*/

function getFrameNamePrefix(fullName: string) {
  return fullName.slice(0, fullName.length - 8)
}

export default async function getSpriteSheetTexture(device: GPUDevice): Promise<GPUTexture> {
  const sourceBitmapsList: ImageBitmap[] = []

  const spriteSheetPromises = sources.map(({ imgUrl, jsonUrl }) => {
    return Promise.all([
      loadImageBitmap(imgUrl.toString()),
      fetch(jsonUrl.toString()).then(res => res.json() as unknown as SpriteSheetJson)
    ])
  })

  const [...spriteSheets] = await Promise.all(spriteSheetPromises)

  const frames = spriteSheets.flatMap<FrameDetailsWithName[]>(([imgBitmap, spriteSheetJson]) => {
    sourceBitmapsList.push(imgBitmap)

    return Object.entries(spriteSheetJson.frames).map<FrameDetailsWithName>(([key, fd]) => (
      getFrameDetails(fd, imgBitmap, key, sourceBitmapsList.length - 1)
    ))
  }).flat()

  const texture2dArray = createTexture2dArrayFromSources(device, sourceBitmapsList, {flipY: true})

  const framesByPrefix = frames.reduce(
    (acc, frame) => {
      const namePrefix = getFrameNamePrefix(frame.name)
      return {
        ...acc,
        [namePrefix]: [...(acc[namePrefix] || []), frame]
      }
    },
    {} as Record<string, FrameDetailsWithName[]>
  )
  // we might need to sort each frames list

  Object.values(AssetsDescriptor).forEach(descriptor => {
    Object.values(descriptor).forEach(animationDetails => {
      const frames = [...framesByPrefix[animationDetails.prefix]]
      frames.sort((a, b) => a.name > b.name ? 1 : -1) // they are never equal

      animationDetails.frames = frames
    })
  })

  return texture2dArray
}
