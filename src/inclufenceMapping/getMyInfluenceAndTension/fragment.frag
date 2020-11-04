precision mediump float;

uniform float uInfluence[XX];
uniform vec2 uScale;
uniform sampler2D uAccTexture;
uniform vec2 halfOfTexel;
uniform vec2 uMapSize;
varying vec2 vCoord;
varying vec2 vUvs;

void main() {
  float value = 0.0;
  vec4 acc = texture2D(uAccTexture, vUvs);
  float isSquadHere = 0.0;
  // 0.33 is our
  // 0.66 is enemy
  // 0.99 is our and enemy
  if (acc.b > 0.0) {
    isSquadHere = 0.66;
  }
  for (int i=0; i<XX; i+=4) {
    vec2 position = vec2(uInfluence[i] * uScale.x, uInfluence[i + 1] * uScale.y);
    float dis = distance(vCoord, position);
    float max_range = uInfluence[i + 3] * uScale.x;
    // We are using uScale.x here (influenceMapWidth / mapWidth), but to be more precise we should prob use
    // angle = atan2(vCoord.x - x, vCoord.y - y)
    // uInfluence[i + 3] * (cos(angle) + sin(angle))
    if (dis < max_range) {
      value += ((max_range - dis) / max_range) * uInfluence[i + 2];
      vec2 posDiff = abs(vCoord - position);
      if (posDiff.x < 0.5 && posDiff.y < 0.5) {
        isSquadHere += 0.33;
      }
    }
  }

  gl_FragColor = vec4(value, acc.g + value, isSquadHere, 1.0);
}
