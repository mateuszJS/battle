import { compileShader, createProgram, getUniform } from "../utils";
import shaderVertexSource from "./index.vert"
import shaderFragmentSource from "./index.frag"
import { createAttribute, createAttrIndex } from "../createAttribute";

export default class DrawSpritesProgram {
  private program: WebGLProgram
  private setPositionAttr: ReturnType<typeof createAttribute>
  private setAttrIndex: ReturnType<typeof createAttrIndex>
  private texUniform: WebGLUniformLocation

  constructor() {
    const gl = window.gl
    const vertexShader: WebGLShader = compileShader(gl.VERTEX_SHADER, shaderVertexSource)
    const fragmentShader: WebGLShader = compileShader(gl.FRAGMENT_SHADER, shaderFragmentSource)

    this.program = createProgram(vertexShader, fragmentShader);

    // speed up setting attribute with bindVertexArrayOES https://webglfundamentals.org/webgl/lessons/webgl-attributes.html
    this.setPositionAttr = createAttribute(this.program, 'a_position')
    this.setAttrIndex = createAttrIndex()

    this.texUniform = getUniform(this.program, 'u_texture');
  }

  attachTexture(texUnitIndex: number) {
    window.gl.uniform1i(this.texUniform, texUnitIndex);
  }

  setPosition() {
    this.setPositionAttr(new Float32Array([
      -1, -1,
      -1,  1,
       1,  1,
       1, -1
    ]));
    this.setAttrIndex(new Uint16Array([0, 1, 2, 0, 2, 3]));
  }

  use() {
    window.gl.useProgram(this.program);
  }
}
