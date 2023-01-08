import { compileShader, createProgram, getUniform } from "../utils";
import shaderVertexSource from "./index.vert"
import shaderFragmentSource from "./index.frag"
import { createAttribute, createAttrIndex } from "../createAttribute";
import { canvasMatrix } from "webgl/constants";

const texCoordDefault = new Float32Array([
  0, 0,
  0, 1,
  1, 1,
  1, 0
])

// function getPosition(input: InputData['position']) {
//   const gl = window.gl
//   const [x, y, width, height] = input || [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]

//   return new Float32Array([
//     x, y,
//     x, y + height,
//     x + width, y + height,
//     x + width, y
//   ])
// }

function getDefaultPosition() {
  const gl = window.gl

  return new Float32Array([
    0, 0,
    0, gl.drawingBufferHeight,
    gl.drawingBufferWidth, gl.drawingBufferHeight,
    gl.drawingBufferWidth, 0
  ])
}

const indexes = new Uint16Array([0, 1, 2, 0, 2, 3])

interface InputData {
  // if any of value is not presented, then we assume we are rendering whole texture to a canvas
  texUnitIndex: number
  texCoord?: [number, number, number, number, number, number, number, number]
  position?: Float32Array
}

export default class DrawSpritesProgram {
  private program: WebGLProgram
  private setPositionAttr: ReturnType<typeof createAttribute>
  private setTexCoordAttr: ReturnType<typeof createAttribute>
  private setAttrIndex: ReturnType<typeof createAttrIndex>
  private texUniform: WebGLUniformLocation
  private matrixUniform: WebGLUniformLocation

  constructor() {
    const gl = window.gl
    const vertexShader: WebGLShader = compileShader(gl.VERTEX_SHADER, shaderVertexSource)
    const fragmentShader: WebGLShader = compileShader(gl.FRAGMENT_SHADER, shaderFragmentSource)

    this.program = createProgram(vertexShader, fragmentShader);

    // speed up setting attribute with bindVertexArrayOES https://webglfundamentals.org/webgl/lessons/webgl-attributes.html
    this.setPositionAttr = createAttribute(this.program, 'a_position')
    this.setTexCoordAttr = createAttribute(this.program, 'a_texCoord')

    this.setAttrIndex = createAttrIndex()

    this.texUniform = getUniform(this.program, 'u_texture');
    this.matrixUniform = getUniform(this.program, 'u_matrix');
  }

  setup(inputData: InputData) {
    const gl = window.gl
    gl.useProgram(this.program);
    gl.uniform1i(this.texUniform, inputData.texUnitIndex);
    gl.uniformMatrix3fv(this.matrixUniform, false, canvasMatrix);
    this.setPositionAttr(inputData.position || getDefaultPosition());
    this.setTexCoordAttr(inputData.texCoord ? new Float32Array(inputData.texCoord) : texCoordDefault);
    this.setAttrIndex(indexes);
  }
}
