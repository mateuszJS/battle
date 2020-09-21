precision mediump float;

uniform float uInfluence[XX];
uniform float uScale;
uniform sampler2D uAccTexture;

varying vec2 vCoord;
varying vec2 vUvs;

void main() {
  float value = 0.0;
  for (int i=0; i<XX; i+=5) {
    float dis = distance(vCoord, vec2(uInfluence[i + 1], uInfluence[i + 2]) * uScale);
    float max_range = uInfluence[i + 4] * uScale;
    if (dis < max_range) {
      value += ((max_range - dis) / max_range) * uInfluence[i + 3];
    }
  }

  gl_FragColor = vec4(value, texture2D(uAccTexture, vUvs).g + value, 0.0, 1.0);
}
