precision mediump float;

attribute vec2 aVertexPosition;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
uniform vec2 uMapSize;

varying vec2 vCoord;
varying vec2 vUvs;

void main() {
  vCoord = aVertexPosition;
  vUvs = aVertexPosition / uMapSize;
  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
}
