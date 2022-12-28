precision mediump float;

varying vec2 vTextureCoord;
varying vec2 vMapCoord;

uniform sampler2D uTextureSampler2;
uniform sampler2D uMapSampler2;
uniform bool uColorBurn;

float overlaySingleColor (float Sc, float Dc) {
  if (2.0 * Dc <= 1.0) {
    return 2.0 * Sc * Dc;
  }
  return 1.0 - 2.0 * (1.0 - Dc) * (1.0 - Sc);
}

void main() {
  vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
  vec4 mapSample = texture2D(uMapSampler2, vMapCoord);

  // gl_FragColor = vec4(overlay(textureSample, mapSample), textureSample.a);
  gl_FragColor = vec4(
    overlaySingleColor(textureSample.r, mapSample.r) * textureSample.a,
    overlaySingleColor(textureSample.g, mapSample.g) * textureSample.a,
    overlaySingleColor(textureSample.b, mapSample.b) * textureSample.a,
    textureSample.a
  );
}
