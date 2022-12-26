
export default class FrameBuffer {
  public texture: WebGLTexture
  public texelSizeX: number
  public texelSizeY: number
  public fbo: WebGLFramebuffer

  constructor (private gl: WebGL2RenderingContext, public width: number, public height: number, internalFormat: GLenum, format: GLenum, type: GLenum) {
    gl.activeTexture(gl.TEXTURE0); // specify which texture unit should be active now
    // to affect all texture related changes
    // activeTexture sets whole active texture unit(so whole sets of texture)

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture); // type of texture "gl.TEXTURE_2D" cannot be changed for particular texture, never
    // here you are binding texture to an active texture unit ("gl.TEXTURE0" is this case, because we called "gl.activeTexture(gl.TEXTURE0);" above)

    // in shaders Sampler uniform is int value, representing index of texture unit
    // also type of Sampler corresponds to the texture target(Sampler2D for GL_TEXTURE_2D, and so on...)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, format, type, null);
    // the only way to change state of texture is gl.texParameter() or gl.texImage() and their variations (glCompressedTexImage, glCopyTexImage, the recent glTexStorage)

    this.fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      this.texture,
      0 // level, used to mipmaps, you can supply smaller levels or generate it with gl.generateMipmap
    );
    gl.viewport(0, 0, width, height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.texelSizeX = 1.0 / width
    this.texelSizeY = 1.0 / height
  }


  attach(textureUnitIndex: number) {
    const gl = this.gl
    // purpose is to attached texture of the frame buffer to currently active program
    gl.activeTexture(gl.TEXTURE0 + textureUnitIndex); // I didn't get it put "pros" say that we should bind this way, TEXTURE0 plus index
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }
}
