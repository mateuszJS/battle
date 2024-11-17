import Rect from "Rect"
import { FrameDetailsWithName, SpriteSheetEntry } from "./getSpriteSheetTexture"
import { centerPivot } from "assetsData"

export default function getFrameDetails(
  fd: SpriteSheetEntry,
  imgBitmap: ImageBitmap,
  name: string,
  textureIndex: number
): FrameDetailsWithName {
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

  texPoints[0] /= imgBitmap.width
  texPoints[1] /= imgBitmap.height
  texPoints[2] /= imgBitmap.width
  texPoints[3] /= imgBitmap.height
  texPoints[4] /= imgBitmap.width
  texPoints[5] /= imgBitmap.height
  texPoints[6] /= imgBitmap.width
  texPoints[7] /= imgBitmap.height

  

  return {
    name,
    sourceRect: texPoints,
    destinationRect: new Rect(
      fd.spriteSourceSize.x - centerPivot.x,
      fd.spriteSourceSize.y - centerPivot.y,
      fd.spriteSourceSize.w,
      fd.spriteSourceSize.h
    ),
    textureIndex,
  }
}