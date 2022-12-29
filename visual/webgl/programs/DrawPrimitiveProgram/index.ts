import { compileShader, createProgram, getUniform } from "../utils";
import shaderVertexSource from "./index.vert"
import shaderFragmentSource from "./index.frag"
import { createAttribute } from "../createAttribute";
import { projection, projectionFlipY } from "webgl/m3"

const defaultColor = [1, 1, 1, 1]

export interface InputData {
  outputWidth?: number
  outputHeight?: number
  noFlipY?: boolean
  color?: [number, number, number, number],
}

export default class DrawPrimitiveProgram {
  protected program: WebGLProgram
  private setPositionAttr: ReturnType<typeof createAttribute>
  private colorUniform?: WebGLUniformLocation
  private matrixUniform: WebGLUniformLocation

  constructor(pickingFragShader?: string) {
    const gl = window.gl
    const vertexShader: WebGLShader = compileShader(gl.VERTEX_SHADER, shaderVertexSource)
    const fragmentShader: WebGLShader = compileShader(gl.FRAGMENT_SHADER, pickingFragShader || shaderFragmentSource)

    this.program = createProgram(vertexShader, fragmentShader);

    // speed up setting attribute with bindVertexArrayOES https://webglfundamentals.org/webgl/lessons/webgl-attributes.html
    this.setPositionAttr = createAttribute(this.program, 'a_position')

    this.matrixUniform = getUniform(this.program, 'u_matrix');

    if (!pickingFragShader) {
      this.colorUniform = getUniform(this.program, 'u_color');
    }
  }

  setupRect(
    x: number, y: number,
    width: number, height: number,
  ) {
    this.setPositionAttr(new Float32Array([
      x, y,
      x, y + height,
      x + width, y,
      x + width, y + height,
      x, y + height,
      x + width, y,
    ]))

    // returns number of vertices, useful to pass to render function
    return 6
  }

  setup4CornerShape(
    x1: number, y1: number,
    x2: number, y2: number,
    x3: number, y3: number,
    x4: number, y4: number,
  ) {
    this.setPositionAttr(new Float32Array([
      x1, y1,
      x2, y2,
      x3, y3,
      x2, y2,
      x3, y3,
      x4, y4
    ]))

    // returns number of vertices, useful to pass to render function
    return 6
  }

  setupOctagon(x: number, y: number, radius: number) {
    // always call it after setup()
    const vertices = []
    for (let i = 0; i < 8; i++) {
      vertices.push(x)
      vertices.push(y)
      vertices.push(x + Math.sin(2 * Math.PI * i) * radius)
      vertices.push(y - Math.cos(2 * Math.PI * i) * radius)
      vertices.push(x + Math.sin(2 * Math.PI * (i + 1)) * radius)
      vertices.push(y - Math.cos(2 * Math.PI * (i + 1)) * radius)
    }
  
    this.setPositionAttr(new Float32Array(vertices))

    // returns number of vertices, useful to pass to render function
    return 24
  }

  setup(inputData: InputData) {
    const gl = window.gl
    gl.useProgram(this.program);
    const projectionFunction = inputData.noFlipY ? projection : projectionFlipY
    gl.uniformMatrix3fv(this.matrixUniform, false, projectionFunction(
      inputData.outputWidth || gl.drawingBufferWidth,
      inputData.outputHeight || gl.drawingBufferHeight
    ));
    if (this.colorUniform) {
      gl.uniform4fv(this.colorUniform, inputData.color || defaultColor)
    }
  }
}
