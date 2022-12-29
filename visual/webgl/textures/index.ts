import Texture from "webgl/models/Texture"
import texturesList from './texturesList'

type TextureName = keyof typeof texturesList

export const TEXTURES_CACHE = {} as { [name in TextureName]: Texture }
// override by "as" to provide better suggestions in TEXTURES_CACHE

function loadImage(name: TextureName, url: string, onLoad: VoidFunction) {
  const image = new Image();

  image.onload = () => {
    const tex = new Texture()
    tex.fill(image)
    TEXTURES_CACHE[name] = tex
    onLoad()
  };

  image.src = url;
  // TODO: check if we can we destroy the image after making a texture
}

export default function loadTextures(
  onProgress: (progress: number, done: boolean) => void
) {
  const texturesListArray = Object.entries(texturesList)
  const onLoad = () => {
    const isEverythingLoaded = Object.keys(TEXTURES_CACHE).length === texturesListArray.length
    const progress = Object.keys(TEXTURES_CACHE).length / texturesListArray.length

    onProgress(progress, isEverythingLoaded)
  }
  texturesListArray.forEach(([name, url]) => loadImage(name as TextureName, url, onLoad))
}