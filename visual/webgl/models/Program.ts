import Attribute from "./Attribute"

function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const gl = window.gl
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    console.trace(gl.getProgramInfoLog(program));

  return program;
}

interface Uniforms {
  [uniformName: string]: WebGLUniformLocation
}

function getUniforms(program: WebGLProgram) {
  const gl = window.gl
  const uniforms: Uniforms = {};
  const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

  for (let i = 0; i < uniformCount; i++) {
    const uniformName = gl.getActiveUniform(program, i).name;
    uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
  }

  return uniforms;
}

export default class Program {
  private program: WebGLProgram
  public uniforms: Uniforms
  public attributes: {
    [attributeName: string]: Attribute
  }

  constructor(
    vertexShader: WebGLShader,
    fragmentShader: WebGLShader,
    attributesList: string[]
  ) {
    this.program = createProgram(vertexShader, fragmentShader);
    this.uniforms = getUniforms(this.program);
    this.attributes = attributesList.reduce((acc, name) => ({
      [name]: new Attribute(this.program, name),
      ...acc
    }), {});
  }

  use() {
    window.gl.useProgram(this.program);
  }
}