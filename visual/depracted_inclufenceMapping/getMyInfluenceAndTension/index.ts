// import getTexture from '~/getTexture'
// import fragmentShader from './fragment.frag'
// import vertexShader from './vertex.vert'

// const getFactionDataAndRest = (input: Float32Array) => {
//   const factionEndIndex = input.indexOf(-1)

//   if (factionEndIndex === -1) {
//     return {
//       id: input[0],
//       data: input.slice(1),
//       rest: new Float32Array(),
//     }
//   }
//   return {
//     id: input[0],
//     data: input.slice(1, factionEndIndex),
//     rest: input.slice(factionEndIndex + 1),
//   }
// }

// const shaders: { [key: number]: PIXI.Shader } = {}

// const getMyInfluenceAndTension = (
//   input: Float32Array,
//   geometry: PIXI.Geometry,
//   mapWidth: number,
//   mapHeight: number,
//   scale: [number, number],
// ) => {
//   const allFactionsData: Array<{
//     id: number
//     texture: PIXI.RenderTexture
//     data: Float32Array
//   }> = []

//   let restData = input.slice(1) // without first -1
//   let uAccTexture
//   while (restData.length) {
//     const { id, data, rest } = getFactionDataAndRest(restData)
//     restData = rest

//     if (!data.length) continue

//     if (!shaders[data.length]) {
//       shaders[data.length] = PIXI.Shader.from(
//         vertexShader,
//         fragmentShader.replace(/XX/g, data.length.toString()),
//         { uScale: scale, uMapSize: [mapWidth, mapHeight] },
//       )
//     }

//     shaders[data.length].uniforms.uInfluence = data
//     shaders[data.length].uniforms.uAccTexture = uAccTexture
//     const mesh = new PIXI.Mesh(geometry, shaders[data.length] as PIXI.MeshMaterial)
//     uAccTexture = getTexture(mesh, mapWidth, mapHeight)
//     allFactionsData.push({
//       id,
//       texture: uAccTexture,
//       data,
//     })
//   }

//   return allFactionsData
// }

// export default getMyInfluenceAndTension
