import { Point } from "./point"

export function getTrack(source: Point, destination: Point): Array<Point> {
  return [source, destination]
}

export const UNITS_OFFSET: StaticArray<StaticArray<Point>> = [
  [{ x: 0, y: 0 }],
  [{ x: -30, y: -30 }, { x: 30, y: 30 }],
  [{ x: -30, y: -35 }, { x: 45, y: -10 }, { x: -5, y: 40 }],
  [{ x: -35, y: -10 }, { x: 20, y: -40 }, { x: 40, y: 20 }, { x: -15, y: -40 }],
  [{ x: -35, y: -5 }, { x: -5, y: -30 }, { x: 40, y: -15 }, { x: 35, y: 25 }, { x: -10, y: 40 }],
  [{ x: -35, y: -5 }, { x: -5, y: -30 }, { x: 40, y: -15 }, { x: 35, y: 25 }, { x: -10, y: 40 }, { x: -10, y: 40 }],
  [{ x: -35, y: -5 }, { x: -5, y: -30 }, { x: 40, y: -15 }, { x: 35, y: 25 }, { x: -10, y: 40 }, { x: -10, y: 40 }, { x: -10, y: 40 }],
]
