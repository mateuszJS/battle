import { getUniform } from "../utils";
import shaderFragmentSource from "./picking.frag"
import DrawPrimitiveProgram, { InputData } from ".";

interface InputDataWithId extends InputData {
  id: [number, number, number]
}

export default class DrawPrimitivePickingProgram extends DrawPrimitiveProgram  {
  private idUniform: WebGLUniformLocation

  constructor() {
    super(shaderFragmentSource)

    this.idUniform = getUniform(this.program, 'u_id');
  }

  setup(inputData: InputDataWithId) {
    super.setup(inputData)
    window.gl.uniform3fv(this.idUniform, inputData.id)
  }
}
