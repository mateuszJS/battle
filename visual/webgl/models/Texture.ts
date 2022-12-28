type Input = { width: number, height: number } | HTMLImageElement

export default class Texture {
  private width: number
  private height: number
  private texture: WebGLTexture

  constructor(input: Input) {
    const { gl, glExt } = window
    const newTexture = gl.createTexture();
    if (!newTexture) {
      throw Error(
        "gl.createTexture return null! Probably WebGL context is lost"
      );
    }
    this.texture = newTexture

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);


    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

    // glExt.formatRGBA.internalFormat, glExt.formatRGBA.format, gl.HALF_FLOAT


    // return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
    // return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);

    if ('nodeName' in input) { // it's HTMLImageElement
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT, input
        // gl.TEXTURE_2D, 0, glExt.formatRGBA.internalFormat, glExt.formatRGBA.format, gl.HALF_FLOAT, input.image
        // gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, input.image
      );
      this.width = input.width
      this.height = input.height
    } else if(input.width && input.height) {
      gl.texImage2D(gl.TEXTURE_2D, 0, glExt.formatRGBA.internalFormat, input.width, input.height, 0, glExt.formatRGBA.format, gl.HALF_FLOAT, null);
      this.width = input.width
      this.height = input.height
    } else {
      throw Error("Texture was not filled with any data!")
    }
  }
    
  bind(textureUnitIndex: number) {
    const gl = window.gl
    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    // we are returning index, so we can pass it further for example to program's uniform, to attach the texture to the correct sampler
    return textureUnitIndex
  }
}