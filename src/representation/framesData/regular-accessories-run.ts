export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'rai_',
    anchor: { x: 0.453, y: 1.225 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'srr_',
    anchor: { x: 0.492, y: 1.378 },
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 6,
    prefix: '_s_f',
    anchor: { x: 0, y: 0 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 31,
    prefix: '_s_h',
    anchor: { x: 0, y: 0 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 24,
    prefix: '_s_gu',
    anchor: { x: 0, y: 0 },
  },
] as const
