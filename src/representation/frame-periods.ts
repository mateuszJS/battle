export interface FrameDataEntry {
  name: keyof FramePeriods
  sides: number
  length: number
  prefix: string
  anchor: Point
}

export type FramePeriods = {
  [key in 'IDLE' | 'SHOOT' | 'RUN' | 'FLY' | 'GETUP' | 'DIE' | 'CHASING']?: {
    first: number
    sides: number
    length: number
    last: number
    anchor: Point
    getName: (id: string) => string
  }
}

export const getFramePeriods = (frameData: readonly FrameDataEntry[]): FramePeriods =>
  frameData.reduce((result, item, index, array): FramePeriods => {
    const first = index === 0 ? 0 : result[array[index - 1].name].last + 1
    return {
      ...result,
      [item.name]: {
        first,
        sides: item.sides,
        length: item.length,
        last: first + item.sides * item.length - 1,
        anchor: item.anchor,
        getName: (id: string) => `${item.prefix}${id}`,
      },
    }
  }, {})
