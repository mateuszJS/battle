export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'ehi_',
    scale: 0.25,
    anchor: { x: 0.544, y: 4.363 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'ehr_',
    scale: 0.25,
    anchor: { x: 0.535, y: 2.108 },
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 7,
    prefix: 'ehs_',
    scale: 0.25,
    anchor: { x: 0.496, y: 2.98 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 30,
    prefix: 'ehf_',
    scale: 0.25,
    anchor: { x: 0.5, y: 0.808 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 25,
    prefix: 'ehg_',
    scale: 0.25,
    anchor: { x: 0.476, y: 0.716 },
  }
] as const
