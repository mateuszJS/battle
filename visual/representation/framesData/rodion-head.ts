export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'rhi_',
    anchor: { x: 0.557, y: 3.55 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'rhr_',
    anchor: { x: 0.5, y: 1.911 },
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 7,
    prefix: 'rhs_',
    anchor: { x: 0.459, y: 2.832 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 30,
    prefix: 'rhf_',
    anchor: { x: 0.5, y: 0.828 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 25,
    prefix: 'rhg_',
    anchor: { x: 0.475, y: 0.695 },
  }
] as const
