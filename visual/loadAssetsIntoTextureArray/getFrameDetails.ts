import Rect from "Rect"
import { SpriteSheetEntry } from "./loadAssetsIntoTextureArray"
import { centerPivot } from "AssetsDescriptor"

interface FrameDetails { 
  sourceRect: [number, number, number, number, number, number, number, number]
  destinationRect: Rect
}

export default function getFrameDetails(
  frameJson: SpriteSheetEntry,
  imgBitmap: ImageBitmap,
): FrameDetails {
  const {x, y, w, h} = frameJson.frame

  const texPoints: [number, number, number, number, number, number, number, number] = frameJson.rotated
    ? [
      0,      0,
      0,      0 + w,
      0 + h,  0 + w,
      0 + h,  0,
    ] : [
      0,      0 + h,
      0 + w,  0 + h,
      0 + w,  0,
      0,      0,
    ]
  
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
    sourceRect: texPoints,
    destinationRect: new Rect(
      frameJson.spriteSourceSize.x - centerPivot.x,
      frameJson.spriteSourceSize.y - centerPivot.y,
      frameJson.spriteSourceSize.w,
      frameJson.spriteSourceSize.h
    ),
  }
}