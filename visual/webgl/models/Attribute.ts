export default class Attribute {
  public location: number;
  public bufferAddress: WebGLBuffer;

  constructor(
    program: WebGLProgram,
    name: string
  ) {
    const gl = window.gl

    // webgl after linking program decides in which location attribute should be assigned
    this.location = gl.getAttribLocation(program, name);
    if (this.location < 0) {
      throw Error(`Failed to get the storage location of attribute: ${name}`);
    }

    const bufferAddress = gl.createBuffer();
    if (!bufferAddress) {
      throw Error(
        "gl.getUniformLocation return null! Probably WebGL context is lost!"
      );
    }

    this.bufferAddress = bufferAddress;
  }

  set(
    data: Float32Array | Uint16Array,
    dataType: typeof window.gl.ARRAY_BUFFER | typeof window.gl.ELEMENT_ARRAY_BUFFER = window.gl.ARRAY_BUFFER
  ) {
    const gl = window.gl
    // speed up setting attribute with bindVertexArrayOES
    // https://webglfundamentals.org/webgl/lessons/webgl-attributes.html
    gl.bindBuffer(dataType, this.bufferAddress);

    gl.bufferData(
      dataType,
      data,
      gl.STATIC_DRAW
    );

    // gl.vertexAttrib3f What is that?
    gl.vertexAttribPointer(
      this.location,
      2, // size, 2 components per iteration
      gl.FLOAT, // type, the data is 32bit floats
      false, // normalize, don't normalize the data
      0, // stride, 0 = move forward size * sizeof(type) each iteration to get the next position
      0 // offset, start at the beginning of the buffer
    );

    gl.enableVertexAttribArray(this.location);
  }
}
