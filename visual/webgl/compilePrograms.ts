import compileAllShaders from "./compileAllShaders"
import Program from '~/webgl/models/Program'

export const PROGRAMS_CACHE: {
  [programName: string]: Program
} = {

}

export default function compilePrograms(gl: WebGL2RenderingContext) {
  const shaders = compileAllShaders(gl)

  PROGRAMS_CACHE['drawTexture'] = new Program(shaders.baseVertexShader, shaders.copyFragmentShader, ['a_position'])
}
