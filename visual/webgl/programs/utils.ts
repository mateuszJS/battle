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

export function splitFloatIntoVec3(value: number): [number, number, number] {
  return [
    ((value >>  0) & 0xFF) / 0xFF,
    ((value >>  8) & 0xFF) / 0xFF,
    ((value >> 16) & 0xFF) / 0xFF,
    // ((value >> 24) & 0xFF) / 0xFF,
  ]
}

export function getIdFromLastRender(x: number, y: number) {
  const gl = window.gl
  const canvas = gl.canvas as HTMLCanvasElement

  const pixelX = x * canvas.width / canvas.clientWidth;
  const pixelY = gl.canvas.height - y * canvas.height / canvas.clientHeight - 1;
  const data = new Uint8Array(4);
  gl.readPixels(
      pixelX,            // x
      pixelY,            // y
      1,                 // width
      1,                 // height
      gl.RGBA,           // format
      gl.UNSIGNED_BYTE,  // type
      data);             // typed array to hold result
  // const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
  const id = data[0] + (data[1] << 8) + (data[2] << 16);
  console.log(id)
}