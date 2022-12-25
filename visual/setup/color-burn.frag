precision mediump float;

varying vec2 vTextureCoord;
varying vec2 vMapCoord;

uniform sampler2D uTextureSampler2;
uniform sampler2D uMapSampler2;
uniform vec4 uTint;

float colorBurnSingleColor (float Sca, float Dca, float Sa, float Da) {
  return Sa * Da * (1.0 - min(1.0, (1.0 - Dca/Da) * Sa/Sca)) + Sca * (1.0 - Da) + Dca * (1.0 - Sa);
}

// vec3 colorBurn(vec4 target, vec4 blend){
//   // https://dev.w3.org/SVG/modules/compositing/master/
//   return vec3(
//     colorBurnSingleColor(target.r, blend.r, target.a, blend.a),
//     colorBurnSingleColor(target.g, blend.g, target.a, blend.a),
//     colorBurnSingleColor(target.b, blend.b, target.a, blend.a)
//   );
// }

vec4 brightColor(vec4 target, vec4 blend) {
  vec3 color = 1. - min(vec3(.01), (1. - blend.rgb) / target.rgb);
  return vec4(color, target.a);
}

vec4 colorBurn(vec4 target, vec4 blend){
  // https://dev.w3.org/SVG/modules/compositing/master/
  // vec3 color = 1.0 - min(vec3(1.0), (1. - blend.rgb) / target.rgb);
  // return color * target.a;

  vec3 color = vec3(
    colorBurnSingleColor(target.r, blend.r, target.a, blend.a),
    colorBurnSingleColor(target.g, blend.g, target.a, blend.a),
    colorBurnSingleColor(target.b, blend.b, target.a, blend.a)
  );

  return vec4(color, 1.0);
}

void main() {
  vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
  vec4 mapSample = texture2D(uMapSampler2, vMapCoord);

  gl_FragColor = colorBurn(textureSample * uTint, mapSample);
}
