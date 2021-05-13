export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'rri_',
    anchor: { x: 0.642, y: 0.846 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'tbr_',
    anchor: { x: 0.58, y: 0.72 },
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
    length: 30,
    prefix: 'tbf_',
    anchor: { x: 0.64, y: 0.731 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 24,
    prefix: '_s_gu',
    anchor: { x: 0, y: 0 },
  },
] as const
