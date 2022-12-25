interface Texture {
  texture: WebGLTexture
  width: number
  height: number
  bind: (textureUnitIndex: number) => void
}

export const TEXTURES_CACHE: { [url: string]: Texture} = {}

function loadImage(gl: WebGL2RenderingContext, url: string, onLoad: VoidFunction) {
  const image = new Image();

  image.onload = () => {
    const texture = gl.createTexture();

    if (!texture) {
      throw Error("gl.createTexture returned null. Probably WebGL has lost the context.")
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image
    );

    TEXTURES_CACHE[url] = {
      texture,
      width: 1,
      height: 1,
      bind(textureUnitIndex: number) {
        gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
        gl.bindTexture(gl.TEXTURE_2D, texture);
      },
    }

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