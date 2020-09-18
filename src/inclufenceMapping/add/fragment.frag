precision mediump float;

uniform float influence[X];
uniform vec2 uMapSize;
varying vec2 vCoord;

void main() {
  float value = 0.0;
  for (int i=0; i<X; i+=4) {
    float dis = distance(vCoord, vec2(influence[i], influence[i + 1]) / uMapSize);
    if (dis < 0.1) { // instead of 0.1 we can use influence[1 + 3]
      value += (0.1 - dis) * 2.0;
    }
  }
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * (1.0 - distance(vec2(0.0), vCoord)) * 1.0;
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * value;
}
