// import { UnitState } from "logic-contants"
// import AssetsDescriptor from "AssetsDescriptor"
// import mapAngleToIndex from "./mapAngleToIndex"
// import AssetId from "AssetsDescriptor/AssetId"
// import AnimatedSprite from "../WebGPU/AnimatedSprite/AnimatedSprite"
// import { getCameraAngle } from "worldMatrix"
// import mat4 from "utils/mat4"

mod consts;

use super::assets_descriptor::AssetId;
use super::AnimatedSprite;
pub use consts::UnitState;

// struct UnitVertex {
//   a_sprites: Vec<AnimatedSprite>,
//   state: UnitState,
//   angle: f32,
//   position: (f32, f32),
//   assets: Vec<AssetId>,
// }

// impl UnitVertex {
//   pub fn new(
//     state: UnitState,
//     angle: f32,
//     position: (f32, f32),
//     assets: Vec<AssetId>,
//     now: f32
//   ) -> UnitVertex {
//     let a_sprites = assets.iter().map(|_assetId| AnimatedSprite::new()).collect();

//     let unitVertex = UnitVertex {
//       state,
//       angle,
//       position,
//       assets,
//       a_sprites,
//     };
//     // unitVertex.update_sprites_config(now);

//     // unitVertex
//   }
//   // <0, 2 * Math.PI> -> <0, angles>

//   /*
//   WebGPU needs to receive:
//     - fraction color matrix
//     - index of frames for head
//     - index of frames for arms & weapon & backpack
//     - index of frames for body
//     - position for head, maybe rotation flag
//     - position for body, maybe rotation flag
//     - position for arms & weapon & backpack, maybe rotation flag
//   */
//   update_sprites_config(&mut self, now: f32) {
//     self.a_sprites.iter().enumerate().for_each(|index, sprite| {

//       /*
//         if current unit state is RUN, then do normal animation
//         if it's FLY, GETUP, then make animation depend on progress!
//         UnitState.SHOOT should be also determien by progres <0, 1>!!!
//       */
//       let asset = self.assets[index];
//       let { timePerFrame, animationLength, angles } = AssetsDescriptor[asset][this.state];
//       let firstFrame = mapAngleToIndex(this.angle, angles) * animationLength

//       sprite.updateConfig(
//         {
//           firstFrame,
//           animationLength,
//           timePerFrame,
//         },
//       )
//     })
//   }

//   public update(angle: number, state: UnitState, now: DOMHighResTimeStamp) {
//     if (this.angle === angle && this.state === state) {
//       this.aSprites.forEach(aSprite => {
//         // check if frames made circle, if yes, then go backward
//         aSprite.tick(now)
//       })
//     } else {
//       this.angle = angle
//       this.state = state
//       this.updateSpritesConfig(now)
//     }
//   }

//   /**
//    * @param textureLayers each asset adds it's own texture index
//    * @param destinationRect each asset adds it's own position where should land on the durign render
//    * @param sourcRect each asset adds it's source position from texture indicated by textureLayers
//    */
//   public addBufferData(
//     textureLayersData: number[],
//     destinationData: number[],
//     sourceData: number[],
//     colorMatrixIdxData: number[],
//     normalsData: number[],
//     indiciesData: number[],
//     planeMatrix: Float32Array,
//     fullLightAngle: number[],
//   ) {
//     this.aSprites.forEach((aSprite, index) => {
//       const lastUsedIndex = destinationData.length / 4
//       // each point has x and y component so that's why divided by 2
//       const nextIndicies =
//       [
//         0, 1, 2,
//         0, 2, 3
//       ].map(i => lastUsedIndex + i)
//       indiciesData.push(...nextIndicies)

//       normalsData.push(
//         ...fullLightAngle,
//         ...fullLightAngle,
//       )

//       const assetId = this.assets[index]
//       const { frames } = AssetsDescriptor[assetId][this.state] // what if state is different for each asset??
//       const frame = frames[aSprite.frameIndex]

//       textureLayersData.push(...Array(4).fill(frame.textureIndex))

//       sourceData.push(...frame.sourceRect)

//       const { x, y, width, height } = frame.destinationRect

//       const SCALE = 0.5
//       ;[
//         { x,            y: y + height },
//         { x: x + width, y: y + height },
//         { x: x + width, y },
//         { x,            y },
//       ]
//       .map(p => ({ x: p.x * SCALE, y: p.y * SCALE}))
//       .map(p => {
//         const outputVec = mat4.vectorTimesMatrix([
//           p.x,
//           index * 1.5, // this is only to mitigate z fighting
//           // remember it's further divided by W component, so thats why is so big here
//           // value is selected purely base on visual testing
//           p.y,
//           1
//         ], planeMatrix)
//         return {
//           x: outputVec[0] / outputVec[3],
//           y: outputVec[1] / outputVec[3],
//           z: outputVec[2] / outputVec[3],
//         }
//       })
//       .map(p3d => ({
//         x: p3d.x + this.position.x,
//         y: p3d.y,
//         z: p3d.z + this.position.y,
//       }))
//       .forEach(p3d => {
//         destinationData.push(p3d.x, p3d.y, p3d.z, 1)
//       })

//       colorMatrixIdxData.push(...Array(4).fill(1))
//     })
//   }
// }
