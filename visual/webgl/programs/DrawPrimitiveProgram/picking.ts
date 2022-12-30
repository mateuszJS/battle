import { getUniform } from "../utils";
import shaderFragmentSource from "./picking.frag"
import DrawPrimitiveProgram, { InputData } from ".";
import { identity, projection, projectionFlipY, translate } from "webgl/m3";
import FrameBuffer from "webgl/models/FrameBuffer";

interface InputDataWithId extends InputData {
  id: [number, number, number]
}

const BUFFER_SIZE = 1

export default class DrawPrimitivePickingProgram extends DrawPrimitiveProgram  {
  private idUniform: WebGLUniformLocation
  private matrix: Matrix3
  readonly frameBuffer: FrameBuffer

  constructor() {
    super(shaderFragmentSource)

    this.frameBuffer = new FrameBuffer()
    this.frameBuffer.resize(BUFFER_SIZE, BUFFER_SIZE)
  

    this.idUniform = getUniform(this.program, 'u_id');
    this.matrix = identity() // just any default valid value
  }

  // Before we go anywhere else, firstly we need to optimize out picking strategy with this link
  // https://webglfundamentals.org/webgl/lessons/webgl-picking.html

  updateMatrix(x: number, y: number) {
    const gl = window.gl
    this.matrix = translate(projectionFlipY(gl.drawingBufferWidth, gl.drawingBufferHeight), x, y)
    // this.matrix = translate(projection(BUFFER_SIZE, BUFFER_SIZE), -x, -y)
  }

  setup(inputData: InputDataWithId) {
    super.setup(inputData, this.matrix)
    // super.setup(inputData, translate(this.matrix, inputData.x, inputData.y))
    window.gl.uniform3fv(this.idUniform, inputData.id)
  }
}
