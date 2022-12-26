import Texture from "~/webgl/models/Texture"

export const TEXTURES_CACHE: { [url: string]: Texture} = {}

function loadImage(gl: WebGL2RenderingContext, url: string, onLoad: VoidFunction) {
  const image = new Image();

  image.onload = () => {
    TEXTURES_CACHE[url] = new Texture(gl, image)
    onLoad()
  };

  image.src = url;
  // TODO: check if we can we destroy the image after making a texture
}

export default function loadTextures(
  gl: WebGL2RenderingContext,
  urls: string[],
  onLoadComplete: VoidFunction
) {
  const onLoad = () => {
    const isEverythingLoaded = Object.keys(TEXTURES_CACHE).length === urls.length

    if (isEverythingLoaded) {
      onLoadComplete()
    }
  }
  urls.forEach(url => loadImage(gl, url, onLoad))
}