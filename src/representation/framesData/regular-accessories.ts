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
    length: 5,
    prefix: 'ras_',
    anchor: { x: 0.474, y: 1.346 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 30,
    prefix: 'rrf_',
    anchor: { x: 0.51, y: 0.772 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 25,
    prefix: 'rag_',
    anchor: { x: 0.512, y: 0.693 },
  },
] as const
