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
  float significante = texture2D(uAccTexture, vUvs).a;
  // 0.33 is our
  // 0.66 is enemy
  // 0.99 is our and enemy

  if (acc.b > 0.0) {
    isSquadHere = 0.66; // enemy position
  }
  bool is_there_our_squad = false;

  for (int i=0; i<XX; i+=5) {
    vec2 position = vec2(uInfluence[i] * uScale.x, uInfluence[i + 1] * uScale.y);
    float dis = distance(vCoord, position);

    float max_range = uInfluence[i + 4] * uScale.x; // should be (uScale.x + uScale.y) / 2.0

    if (dis < max_range) {
      value += ((max_range - dis) / max_range) * uInfluence[i + 3];
      vec2 posDiff = abs(vCoord - position);
      if (posDiff.x < 0.5 && posDiff.y < 0.5) {
        // if there is more then once oru squad, then it's 0.66 :OOO at least
        if (significante < uInfluence[i + 2]) {
          significante = uInfluence[i + 2];
        }
        is_there_our_squad = true;
      }
    }
  }
  if (is_there_our_squad) {
    isSquadHere += 0.33; // our position
  }

  gl_FragColor = vec4(value, acc.g + value, isSquadHere, significante);
}
