precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uTextureSampler2;
uniform float factor; // <0, 1>


// vec4 brightColor(vec4 target, vec4 blend) {
//   vec3 color = 1. - min(vec3(.01), (1. - blend.rgb) / target.rgb);
//   return vec4(color, target.a);
// }


void main() {
  vec4 textureSample = texture2D(uTextureSampler2, vTextureCoord);
  // gl_FragColor = textureSample;
  if ((1.0 - factor) < textureSample.r) {
    // vec3 color = vec3(1.0) * (0.5 + textureSample.r);
    vec3 color = vec3(0.9);
    // vec3 color = vec3(0.8, 0.4, 0.4);
    gl_FragColor = vec4(color, 1.0) * textureSample.a;
  } else {
    gl_FragColor = vec4(0.0);
  }
}
