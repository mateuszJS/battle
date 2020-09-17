export enum SIDES {
  FRONT = 0,
  LEFT = 1,
  RIGHT = 2,
}

class Utils {
  static where(
    Ax: number,
    Ay: number,
    Aa: number,
    Bx: number,
    By: number,
    threshold: number,
  ) {
    const ctg: number = -1 / Math.tan(Aa),
      Cx: number = Math.sin(Aa) + Ax,
      Cy: number = -Math.cos(Aa) + Ay

    if (
      Math.abs(ctg * Bx - By + Cy - Cx * ctg) / Math.sqrt(ctg * ctg + 1) <
      threshold
    )
      return SIDES.FRONT
    if ((Cy - By) * (Ax - Bx) + (-Cx + Bx) * (Ay - By) < 0) return SIDES.LEFT
    return SIDES.RIGHT
  }

  static clamp = (min: number, value: number, max: number) =>
    Math.min(Math.max(value, min), max)
}

export default Utils
