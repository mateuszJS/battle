precision mediump float;

varying vec2 vTextureCoord;
varying vec2 vMapCoord;

uniform sampler2D uTextureSampler2;
uniform sampler2D uMapSampler2;
uniform bool uColorBurn;

float colorBurnSingleColor (float Sca, float Dca, float Sa, float Da) {
  return Sa * Da * (1.0 - min(1.0, (1.0 - Dca/Da) * Sa/Sca)) + Sca * (1.0 - Da) + Dca * (1.0 - Sa);
}

vec3 colorBurn(vec4 target, vec4 blend){
  // https://dev.w3.org/SVG/modules/compositing/master/
  return vec3(
    colorBurnSingleColor(target.r, blend.r, target.a, blend.a),
    colorBurnSingleColor(target.g, blend.g, target.a, blend.a),
    colorBurnSingleColor(target.b, blend.b, target.a, blend.a)
  );
}

float overlaySingleColor (float Sc, float Dc) {
  if (2.0 * Dc <= 1.0) {
    return 2.0 * Sc * Dc;
  }
  return 1.0 - 2.0 * (1.0 - Dc) * (1.0 - Sc);
}

vec3 overlay(vec4 target, vec4 blend) {
  return vec3(
    overlaySingleColor(target.r, blend.r) * target.a,
    overlaySingleColor(target.g, blend.g) * target.a,
    overlaySingleColor(target.b, blend.b) * target.a
  );
}

void main() {
  vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
  vec4 mapSample = texture2D(uMapSampler2, vMapCoord);

  if (uColorBurn) {
    gl_FragColor = vec4(colorBurn(textureSample, mapSample), 1.0);
  } else {
    gl_FragColor = vec4(overlay(textureSample, mapSample), textureSample.a);
  }
}
