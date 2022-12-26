import { SerializedMapInfo } from "~/map-creator/get-serialized-map-info";
import getNodePlatformCoords from '~/consts/get-platform-coords'
import Texture from "~/webgl/models/Texture"
import { TEXTURES_CACHE } from "~/webgl/loadTextures";
import Framebuffer from "~/webgl/models/FrameBuffer";
import render from "~/webgl/render"
import { PROGRAMS_CACHE } from '~/webgl/compilePrograms'

const platformCoords = getNodePlatformCoords()

export function initBackground(serializedMapInfo: SerializedMapInfo): WebGLTexture {
  const { gl, glExt } = window

  // serializedMapInfo.nodes
  
  

  const frameBuffer = new Framebuffer(gl, gl.canvas.width, gl.canvas.height, glExt.formatRGBA.internalFormat, glExt.formatRGBA.format, gl.HALF_FLOAT)

  PROGRAMS_CACHE.drawTexture.use()


  gl.bindBuffer(gl.ARRAY_BUFFER, PROGRAMS_CACHE.drawTexture.attributes.a_position.bufferAddress);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW
  );
  gl.vertexAttribPointer(PROGRAMS_CACHE.drawTexture.attributes.a_position.location, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(PROGRAMS_CACHE.drawTexture.attributes.a_position.location);




  // PROGRAMS_CACHE.drawTexture.attributes.a_position.set(new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.ARRAY_BUFFER)
  // PROGRAMS_CACHE.drawTexture.attributes.a_position.set([-1, -1, -1, 1, 1, 1, 1, -1], gl.ARRAY_BUFFER)
  // PROGRAMS_CACHE.drawTexture.attributes.a_texCoord.set([])
  gl.uniform1i(PROGRAMS_CACHE.drawTexture.uniforms.u_texture, TEXTURES_CACHE['assets/node-platform-shaded.png'].bind(0));
  render(null)
  // render(frameBuffer)

  return frameBuffer.texture
}

export function updateBackground() {

}