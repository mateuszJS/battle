import Texture from "./Texture";

export default class FrameBuffer {
  public texture: Texture
  public texelSizeX: number
  public texelSizeY: number
  public frameBufferLocation: WebGLFramebuffer
  // we should use better names for internalFormat, format and type
  constructor (public width: number, public height: number) {
    const gl = window.gl
    // not sure if texture should be here, or should it be passed from arguments
    // also most of this constructor should be actually in render or attach
    this.texture = new Texture({
      width,
      height
    })

    const newFrameBuffer = gl.createFramebuffer();
    if (!newFrameBuffer) {
      throw Error(
        "gl.createFramebuffer return null! Probably WebGL context is lost"
      );
    }
    this.frameBufferLocation = newFrameBuffer
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferLocation);
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
    // purpose is to attached texture of the frame buffer to currently active program
    this.texture.bind(textureUnitIndex)
  }
}
