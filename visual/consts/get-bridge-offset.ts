// export default (cornerIndex: number, rawOffset: number): Point => {
//   const offset = rawOffset * 0.5

//   switch (cornerIndex) {
//     case 0: return { x: offset, y: -offset }
//     case 1: return { x: -offset, y: -offset }
//     case 2: return { x: offset, y: offset }
//     case 3: return { x: offset, y: -offset }
//     case 4: return { x: -offset, y: offset }
//     case 5: return { x: offset, y: offset }
//     case 6: return { x: -offset, y: -offset }
//     case 7: return { x: -offset, y: offset }
//   }
// }