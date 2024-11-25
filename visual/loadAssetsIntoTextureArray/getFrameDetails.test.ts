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
let bitmap: ImageBitmap

const imgBitmapPromise = window.createImageBitmap(new Blob(), {
  resizeHeight: 2000,
  resizeWidth: 2000
});

beforeAll(() => imgBitmapPromise)

// specify the size of the bitmap

test('extracts correct informations from a single entry of Sprite Sheet Json file', () => {
  const frameOffset = getFrameDetails(spriteSheetSample, bitmap)
  expect(frameOffset).toEqual({
    sourceRect: [],
    destinationRect: new Rect(0, 0, 0, 0)
  })
})
