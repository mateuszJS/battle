export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'tbi_',
    anchor: { x: 0.53, y: 0.851 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'tbr_',
    anchor: { x: 0.515, y: 0.72 },
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 7,
    prefix: 'tbs_',
    anchor: { x: 0.494, y: 0.814 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 30,
    prefix: 'tbf_',
    anchor: { x: 0.5, y: 0.765 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 25,
    prefix: 'tbg_',
    anchor: { x: 0.483, y: 0.669 },
  },
] as const
