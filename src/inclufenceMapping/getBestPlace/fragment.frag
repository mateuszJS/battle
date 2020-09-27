precision mediump float;

uniform sampler2D uMapSample2;
uniform vec2 uCoord;
uniform float uDistanceFactor;
uniform float uScale;

varying vec2 vCoord;
varying vec2 vUvs;


void main() {
  float texValue = texture2D(uMapSample2, vUvs).r;
  float dis = distance(vCoord, uCoord);

  gl_FragColor = vec4(1.0 - dis, 0.0, 0.0, 1.0);
}
