export default [
  {
    name: 'IDLE',
    sides: 12,
    length: 1,
    prefix: 'rai_',
    anchor: { x: 0.534, y: 1.247 },
  },
  {
    name: 'RUN',
    sides: 12,
    length: 16,
    prefix: 'rar_',
    anchor: { x: 0.513, y: 1.302 },
  },
  {
    name: 'SHOOT',
    sides: 12,
    length: 7,
    prefix: 'ras_',
    anchor: { x: 0.492, y: 1.366 },
  },
  {
    name: 'FLY',
    sides: 8,
    length: 30,
    prefix: 'raf_',
    anchor: { x: 0.487, y: 0.786 },
  },
  {
    name: 'GETUP',
    sides: 8,
    length: 25,
    prefix: 'rag_',
    anchor: { x: 0.48, y: 0.586 },
  },
  {
    name: 'CHASING',
    sides: 12,
    length: 16,
    prefix: 'rac_',
    anchor: { x: 0.513, y: 1.17 },
  },
] as const