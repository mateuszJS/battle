export function compileShader(
  type: WebGLRenderingContext["VERTEX_SHADER" | "FRAGMENT_SHADER"],
  source: string
) {
  const gl = window.gl

  const shader = gl.createShader(type);
  if (!shader) {
    throw Error("gl.createShader returned null! Probably webgl context has been lost")
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.trace(gl.getShaderInfoLog(shader));
  }

  return shader;
}

export function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
  const gl = window.gl
  const program = gl.createProgram();
  if (!program) {
    throw Error("gl.createProgram returned null! Probably webgl context has been lost")
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.trace(gl.getProgramInfoLog(program));
  }

  return program;
}

export function getUniform(program: WebGLProgram, name: string) {
  const gl = window.gl
  const uniformLocation = gl.getUniformLocation(program, name)
  if (!uniformLocation) {
    throw Error("gl.getUniformLocation returned null! It's very likely that WebGL has lost the context")
  }

  return uniformLocation
}