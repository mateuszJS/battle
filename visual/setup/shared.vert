precision mediump float;

attribute vec2 aVertexPosition;
attribute vec2 aUvs;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
uniform vec2 uMapSize;

varying vec2 vTextureCoord;
varying vec2 vMapCoord;

void main() {
    vTextureCoord = aUvs;
    vec2 pos = (projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy;
    vMapCoord = aVertexPosition / uMapSize;
    gl_Position = vec4(pos, 0.0, 1.0);
}
