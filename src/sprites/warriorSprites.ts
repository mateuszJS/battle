export default () => {
  const scale = 0.9;
  const humanIdleFrames = [];

  const framesPeriods = {
    STAY: {
      first: 0,
      sides: 12,
      length: 1,
      last: 11,
    },
    SHOOT: {
      first: 12,
      sides: 12,
      length: 6,
      last: 12 * 6 + 12 - 1,
    },
    GO: {
      first: 72 + 12,
      sides: 12,
      length: 16,
      last: 12 * 16 + 72 + 12 - 1,
    },
    FLY: {
      first: 192 + 72 + 12,
      sides: 8,
      length: 31,
      last: 8 * 31 + 192 + 72 + 12 - 1,
    },
    GETUP: {
      first: 248 + 192 + 72 + 12,
      sides: 8,
      length: 24,
      last: 8 * 24 + 248 + 192 + 72 + 12 - 1,
    },
  }



  for (let i = 0; i < framesPeriods.STAY.sides * framesPeriods.STAY.length; i++) {
    const count = i < 10 ? `0${i}` : i;
    const texture = `_00${count}_w_r00${count}.png.png`;
    humanIdleFrames.push(PIXI.Texture.from(texture));
  }

  for (let i = 0; i < framesPeriods.SHOOT.sides * framesPeriods.SHOOT.length; i++) {
    const count = i < 10 ? `0${i}` : i;
    const texture = `_00${count}_w_f00${count}.png.png`;
    humanIdleFrames.push(PIXI.Texture.from(texture));
  }

  for (let i = 0; i < framesPeriods.GO.sides * framesPeriods.GO.length; i++) {
    let count;
    if (i < 10) {
      count = `00${i}`;
    } else if (i < 100) {
      count = `0${i}`;
    } else {
      count = i;
    }
    const texture = `_0${count}_w_g0${count}.png.png`;
    humanIdleFrames.push(PIXI.Texture.from(texture));
  }



  for (let i = 0; i < framesPeriods.FLY.sides * framesPeriods.FLY.length; i++) {
    let count;
    if (i < 10) {
      count = `00${i}`;
    } else if (i < 100) {
      count = `0${i}`;
    } else {
      count = i;
    }
    const texture = `_0${count}_w_h0${count}.png.png`;
    humanIdleFrames.push(PIXI.Texture.from(texture));
  }

  for (let i = 0; i < framesPeriods.GETUP.sides * framesPeriods.GETUP.length; i++) {
    let count;
    if (i < 10) {
      count = `00${i}`;
    } else if (i < 100) {
      count = `0${i}`;
    } else {
      count = i;
    }
    const texture = `_0${count}_w_gu0${count}.png.png`;
    humanIdleFrames.push(PIXI.Texture.from(texture));
  }


  const angles = [14, 45, 75, 115, 138, 172, 195, 225, 256, 285, 315, 345];
  const rifleAngles = [0, 35, 55, 85, 110, 135, 170, 210, 235, 270, 300, 325];

  const calculateRiflePosition = () => {
    return rifleAngles.map((i) => {
      const radius = 48.5,
        angle = (i + 90) * Math.PI / 180;

      let x = -Math.sin(angle) * radius,
        y = -Math.cos(angle) * radius;
      y *= 0.783;

      return { x, y };
    });
  }

  const riflePoints = calculateRiflePosition();

  return () => {
    const movieClip = new PIXI.AnimatedSprite(humanIdleFrames);
    movieClip.animationSpeed = 0.4;
    movieClip.scale.set(scale);
    // movieClip.anchor.set(0.5, 0.1);
    return {
      movieClip,
      riflePoints,
      angles,
      scale,
      vertialOffset: 23,
      framesPeriods
    };
  }
}