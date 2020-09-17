// import * as PIXI from 'pixi.js'
// import Squad from '~/units/Squad'

// const blockSize = 50
// const minHealthToCalc = 20
// const propagationFactor = 0.8

// export interface mapUnit {
//   squads: Squad[]
//   value: number
// }

// interface ICell {
//   row: number
//   col: number
// }

// interface IinfluenceController {
//   blockSize: number
//   rows: number
//   cols: number
//   init: (widthMap: number, heightMap: number) => void
//   propagation(
//     index: number,
//     value: number,
//     distnace: number,
//     result: mapUnit[],
//   ): void
//   calcMapsValues: (resPoints: any[]) => mapUnit[][]
//   deepCopyMap: (map: mapUnit[]) => mapUnit[]
//   createOneDimensionArr: () => mapUnit[]
//   drawMap: (map: mapUnit[]) => void
//   getCell: (squad: Squad) => ICell
//   getCellIndex: (point: Point) => number
//   katrezianToIndex: (y: number, x: number) => number
//   indexToKartezian: (idx: number) => Point
//   getCellPos: (index: number) => Point
// }

// const influenceController: IinfluenceController = {
//   rows: 0,
//   cols: 0,
//   blockSize: blockSize,

//   init(widthMap, heightMap) {
//     this.rows = Math.floor(heightMap / blockSize)
//     this.cols = Math.floor(widthMap / blockSize)
//     this.graphics = new PIXI.Graphics()
//     this.graphics.alpha = 0.6
//     window.app.stage.addChild(this.graphics)
//   },

//   propagation(index, value, distance, result) {
//     //MAYBE INSTEAD OF THIS CALCULATION WE SHOULD PREPARE TEMPLATES
//     //IN WHICH VALUES WILL BE CALCULATED
//     //WITH NORMALIZED VALUE AND MULTILY LATER BY FACTOR
//     //OR tempalte with filled values

//     const range = distance / blockSize
//     const indexColumn = index % this.cols
//     const indexRow = Math.floor(index / this.cols)
//     const doubleRange = 2 * range

//     let start = index - range * this.cols - range
//     if (start < 0) {
//       if (start % this.cols >= -range) {
//         start = 0
//       } else {
//         start = this.cols - (-start % this.cols)
//       }
//     }

//     if (start % this.cols > this.cols - range - 1) {
//       start = (Math.floor(start / this.cols) + 1) * this.cols
//     }

//     let max = range * 2
//     if (indexColumn <= range) {
//       max -= range - indexColumn
//     } else if (indexColumn >= this.cols - range) {
//       max -= range - (this.cols - indexColumn) + 1
//     }

//     let end = index + range * this.cols + range
//     if (end >= result.length) {
//       end = result.length - 1
//     }

//     const nextLineAddress = this.cols - max - 1
//     for (let i = start, mod = 0; i <= end; i++) {
//       // const propagationAxisX = (range - Math.abs( (i % this.cols) - (indexColumn) ) ) / range;
//       // const propagationAxisY = (range - Math.abs( Math.floor(i / this.cols) - indexRow )) / range;
//       // result[i].value = propagationAxisX * 0.5 + propagationAxisY * 0.5;

//       // const propagationAxisX = 1 - (Math.abs((i % this.cols) - indexColumn) / range);
//       // const propagationAxisY = 1 - (Math.abs( Math.floor(i / this.cols) - indexRow ) / range);
//       // result[i].value = propagationAxisX * 0.5 + propagationAxisY * 0.5;

//       const propagationAxisX = Math.abs((i % this.cols) - indexColumn)
//       const propagationAxisY = Math.abs(Math.floor(i / this.cols) - indexRow)
//       result[i].value +=
//         (1 - (propagationAxisX + propagationAxisY) / doubleRange) * value

//       if (mod++ === max) {
//         mod = 0
//         i += nextLineAddress
//       }
//     }
//   },

//   katrezianToIndex(y, x): number {
//     return y * this.rows + x
//   },

//   indexToKartezian(idx): Point {
//     return {
//       x: idx % this.cols,
//       y: Math.floor(idx / this.cols),
//     }
//   },

//   createOneDimensionArr(): mapUnit[] {
//     const result: mapUnit[] = []
//     for (let i = 0; i < this.rows * this.cols; i++) {
//       result.push({ squads: [], value: 0 })
//     }
//     return result
//   },

//   getCell(squad) {
//     return {
//       row: Math.floor(squad.center.x / blockSize),
//       col: Math.floor(squad.center.y / blockSize),
//     }
//   },

//   getCellIndex(point: Point): number {
//     return (
//       Math.floor(point.y / blockSize) * this.cols +
//       Math.floor(point.x / blockSize)
//     )
//   },

//   getCellPos(index: number): Point {
//     return {
//       x: (index % this.cols) * blockSize + blockSize / 2,
//       y: Math.floor(index / this.cols) * blockSize + blockSize / 2,
//     }
//   },

//   calcMapsValues(resPoints) {
//     this.graphics.clear()
//     const maps = window.allSquads.map(() => this.createOneDimensionArr())
//     window.allSquads.map((faction, index) => {
//       faction.map(squad => {
//         const cellIdx = this.getCellIndex(squad.center)
//         this.propagation(
//           cellIdx,
//           squad.fluentValue,
//           squad.weaponRange,
//           maps[index],
//         )
//         if (!maps[index][cellIdx]) debugger
//         maps[index][cellIdx].squads.push(squad)
//       })
//     })

//     resPoints.map(point => {
//       if (point.owner !== -1) {
//         const pointIdx = this.getCellIndex(point)
//         this.propagation(pointIdx, 500, 100, maps[point.owner])
//       }
//     })

//     // this.drawMap(maps[0]);

//     // return maps;

//     // let max = 1;

//     // for(let i = 0; i < this.rows; i++) {
//     //     for(let j = 0; j < this.cols; j++) {
//     //         if(max < Math.abs(ourInfluent[i][j])) {//but it can be bigger number after sum
//     //             max = Math.abs(ourInfluent[i][j]);
//     //         }

//     //         if(max < Math.abs(enemyInfluent[i][j])) {//but it can be bigger number after sum
//     //             max = Math.abs(enemyInfluent[i][j]);
//     //         }
//     //     }
//     // }

//     // SUMMARY and NORMALIZATION
//     // for(let f = 0; f < maps.length; f++) {
//     //     const map = maps[f];
//     //     for(let i = 0; i < this.rows; i++) {
//     //         for(let j = 0; j < this.cols; j++) {
//     //             // this.map[i][j] = (ourInfluent[i][j] - enemyInfluent[i][j])/ max;
//     //             const value: number = map[i][j].value/1000;
//     //             const color: number = f === 0 ? 0xFF0000 : f === 1 ? 0x00FF00 : 0x0000FF;
//     //             this.graphics.beginFill(color, Math.abs(value) * 0.7);
//     //             this.graphics.drawRect(i * blockSize, j * blockSize, blockSize, blockSize);
//     //         }
//     //     }
//     // }
//     return maps
//   },

//   drawMap(map: mapUnit[]) {
//     for (let i = 0; i < map.length; i++) {
//       const value: number = map[i].value
//       const color: number = value > 0 ? 0x00ff00 : 0xff0000
//       const point = this.indexToKartezian(i)
//       this.graphics.beginFill(color, (Math.abs(value) / 600) * 0.5)
//       this.graphics.drawRect(
//         point.x * blockSize,
//         point.y * blockSize,
//         blockSize,
//         blockSize,
//       )
//     }
//   },

//   deepCopyMap(map: mapUnit[]): mapUnit[] {
//     //maybe better create a few big maps, hat all the tiem creating and destroying arrays
//     return this.createOneDimensionArr().map((cell, index) => ({
//       squads: [...map[index].squads], //we need copy? maybe simple reference?
//       value: map[index].value,
//     }))
//   },
// }

// export default influenceController
