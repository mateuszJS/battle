export default class Texture {
  private width: number
  private height: number
  private texture: WebGLTexture

    constructor(private gl: WebGL2RenderingContext, image: HTMLImageElement) {
    this.texture = gl.createTexture();

    if (!this.texture) {
      throw Error("gl.createTexture returned null. Probably WebGL has lost the context.")
    }

    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    gl.texImage2D(
      gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image
    );

    this.width = image.width
    this.height = image.height
  }
    
  bind(textureUnitIndex: number) {
    const gl = this.gl
    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    return textureUnitIndex
  }
}