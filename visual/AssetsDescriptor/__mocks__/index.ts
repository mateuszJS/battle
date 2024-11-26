import initPRNG from "initPRNG"
import Rect from "Rect"

const prng = initPRNG(2850771051)

function getFrames(namePrefix: string, length: number) {
  return Array.from({ length }, (_, i) => ({
    name: `${namePrefix}_${i}`,
    sourceRect: Array.from({ length: 8 }, () => prng()),
    destinationRect: new Rect(prng() * -2000, prng() * -2000, prng() * 300 | 0, prng() * 300 | 0),
    textureIndex: prng() * 7 | 0,
  }))
}

export default {
  "2": {
    6: {
      prefix: 'elephant_head_run',
      length: 6,
      angles: 4,
      timePerFrame: 50, // speed in seconds
      frames: getFrames('elephant_head_run', 4 * 6),
    },
    5: {
      prefix: 'elephant_head_shoot',
      length: 4,
      angles: 8,
      timePerFrame: 60,
      frames: getFrames('elephant_head_shoot', 4 * 8),
    },
  },
  "0": {
    6: {
      prefix: 'regular_body_run',
      length: 5,
      angles: 4,
      timePerFrame: 50, // speed in seconds
      frames: getFrames('regular_body_run', 5 * 4),
    },
    5: {
      prefix: 'regular_body_shoot',
      length: 3,
      angles: 8,
      timePerFrame: 60,
      frames: getFrames('regular_body_shoot', 3 * 8),
    },
  }
}
