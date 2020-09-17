precision mediump float;

attribute vec2 aVertexPosition;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;

varying vec2 vCoord;

void main() {
    vCoord = (projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy;
    gl_Position = vec4(vCoord, 0.0, 1.0);
}
