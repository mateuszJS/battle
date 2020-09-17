precision mediump float;

varying vec2 vTextureCoord;
varying vec2 vCoord;

void main() {
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * (1.0 - distance(vec2(0.0), vCoord)) * 1.0;
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * (1.0 - distance(vec2(0.0), vCoord)) * 1.0;
}
