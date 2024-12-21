import { FrameDetails, initializeAssetsDescriptor } from "AssetsDescriptor"
import getFrameDetails from "./getFrameDetails"
import { createTexture2dArrayFromSources, loadImageBitmap, TextureSlice } from "WebGPU/getTexture"

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
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i4.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i4.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i5.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i5.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i6.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i6.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i7.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i7.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i8.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i8.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/sprites_i9.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/sprites_i9.json', import.meta.url),
  },
  {
    imgUrl:  new URL('assets/sprite_sheets/bridge.png', import.meta.url),
    jsonUrl: new URL('assets/sprite_sheets/bridge.json', import.meta.url),
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

export default async function loadAssetsIntoTextureArray(device: GPUDevice): Promise<GPUTexture> {
  const sourceBitmapsList: TextureSlice[] = []

  const spriteSheetPromises = sources.map<Promise<[ImageBitmap, SpriteSheetJson]>>(({ imgUrl, jsonUrl }) => {
    return Promise.all([
      loadImageBitmap(imgUrl.toString()),
      fetch(jsonUrl.toString()).then(res => res.json() as unknown as SpriteSheetJson)
    ])
  })

  const [...spriteSheets] = await Promise.all(spriteSheetPromises)

  const frames = spriteSheets.flatMap<FrameDetails[]>(([imgBitmap, spriteSheetJson], index) => {
    sourceBitmapsList.push({
      img: imgBitmap,
      fakeMipmaps: false, //index === 10, // pass true to test mipmaps
    })

    return Object.entries(spriteSheetJson.frames).map<FrameDetails>(([key, frameJson]) => ({
      name: key,
      textureIndex: sourceBitmapsList.length - 1,
      ...getFrameDetails(frameJson, imgBitmap)
    }))
  }).flat()

  initializeAssetsDescriptor(frames)

  return createTexture2dArrayFromSources(device, sourceBitmapsList, {flipY: true})
}
