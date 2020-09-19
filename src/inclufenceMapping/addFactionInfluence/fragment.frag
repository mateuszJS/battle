precision mediump float;

uniform float uInfluence[XX];
uniform float uScale;
uniform sampler2D uAccTexture;

varying vec2 vCoord;
varying vec2 vCoordNormal;

void main() {
  float value = 0.0;
  for (int i=0; i<XX; i+=4) {
    float dis = distance(vCoord, vec2(uInfluence[i], uInfluence[i + 1])) / uScale;
    float max_range = uInfluence[i + 3] / uScale;
    if (dis < max_range) {
      value += ((max_range - dis) / max_range) * uInfluence[i + 2];
    }
  }

  gl_FragColor = vec4(value, texture2D(uAccTexture, vCoordNormal).g + value, 0.0, 1.0);
}
