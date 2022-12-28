  precision highp float;

  attribute vec2 a_position;
  // attribute vec2 a_texCoord;

  varying vec2 v_texCoord;

  // uniform vec2 u_texelSize;

  void main () {
    // vUv = a_position * 0.5 + 0.5; // just convert < -1, 1> to <0, 1>
    v_texCoord = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }