import Rect from "Rect"
import getFrameDetails from "./getFrameDetails"
import { SpriteSheetEntry } from "./loadAssetsIntoTextureArray"

const spriteSheetSample: SpriteSheetEntry = {
	"frame": {"x":1313,"y":708,"w":135,"h":230},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":416,"y":378,"w":135,"h":230},
	"sourceSize": {"w":135,"h":230}
}

const bitmap = {
  height: 2048,
  width: 2048
} as ImageBitmap
// Bitmaps are currently not supproted by jsdom
// https://github.com/Automattic/node-canvas/issues/876

// specify the size of the bitmap

test('extracts correct informations from a single entry of Sprite Sheet Json file', () => {
  const frameOffset = getFrameDetails(spriteSheetSample, bitmap)
  expect(frameOffset).toEqual({
    sourceRect: [
      0.64111328125,
      0.345703125,
      0.70703125,
      0.345703125,
      0.70703125,
      0.4580078125,
      0.64111328125,
      0.4580078125,
    ],
    destinationRect: new Rect(-579.7482, -777.8067000000001, 135, 230)
  })
})
