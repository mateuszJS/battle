import DebugRepresentation from "debug/DebugRepresentation"
import EnvironmentRepresentation from "EnvRepresentation"
import UnitRepresentation from "UnitRepresentation/UnitRepresentation"
import getPlaneMatrix from "worldMatrix/planeMatrix"

export class VertexData {
  private destinationRect: number[]
  private sourceRect: number[]
  private textureLayers: number[]
  private indices: number[]
  private colorMatrixIdx: number[]
  private normals: number[]

  constructor(
    {
      destinationRect,
      sourceRect,
      textureLayers,
      indices,
      colorMatrixIdx,
      normals,
    }: {
      destinationRect: number[]
      sourceRect: number[]
      textureLayers: number[]
      indices: number[]
      colorMatrixIdx: number[]
      normals: number[]
    },
  ) {
    this.destinationRect = destinationRect
    this.sourceRect = sourceRect
    this.textureLayers = textureLayers
    this.indices = indices
    this.colorMatrixIdx = colorMatrixIdx
    this.normals = normals
  }

  getBakedData() {

    const numVertices = this.indices.length;
    const stride =
      4/*destination position*/ +
      2/*source rect*/ +
      1/*texture array layer*/ +
      1/*color matrix index*/ +
      3/*normals*/;
    const float32View = new Float32Array(numVertices * stride)
    const uint32View = new Uint32Array(float32View.buffer);

    /*
    indices = [
      0, 1, 2,
      2, 3, 0
    ]
    */

   
    for (let i = 0; i < this.indices.length; i++) {

      let offset = 0

      const targetSize = 4 /* number of digits in a single vertex */
      const targetNdx = this.indices[i] * targetSize;
      const target = this.destinationRect.slice(targetNdx, targetNdx + targetSize);
      float32View.set(target, i * stride);
      offset += targetSize

      const sourceSize = 2
      const sourceNdx = this.indices[i] * sourceSize;
      const source = this.sourceRect.slice(sourceNdx, sourceNdx + sourceSize);
      float32View.set(source, i * stride + offset);
      offset += sourceSize
   
      const texSliceIndexSize = 1
      const texSliceIndexNdx = this.indices[i] * texSliceIndexSize;
      const texSliceIndex = this.textureLayers.slice(texSliceIndexNdx, texSliceIndexNdx + texSliceIndexSize)
      uint32View.set(texSliceIndex, i * stride + offset)
      offset += texSliceIndexSize

      const colorMatrixIndexSize = 1
      const colorMatrixIndexNdx = this.indices[i] * colorMatrixIndexSize;
      const colorMatrixIndex = this.colorMatrixIdx.slice(colorMatrixIndexNdx, colorMatrixIndexNdx + colorMatrixIndexSize)
      uint32View.set(colorMatrixIndex, i * stride + offset)
      offset += colorMatrixIndexSize

      const normalsSize = 3
      const normalsNdx = ((i / 3) | 0) * normalsSize;
      // const normalsNdx = (i / stride | 0) * normalsSize;
      const normals = this.normals.slice(normalsNdx, normalsNdx + normalsSize)


      // const quadNdx = (i / stride | 0) * 3;
      // const normal = normals.slice(quadNdx, quadNdx + 3);



      float32View.set(normals, i * stride + offset)
      offset += normalsSize
    }

    return {
      verticiesData: float32View,
      numVertices: this.indices.length,
    }
  }
}

export function getVertexData(
  units: UnitRepresentation[],
  envRepresentation: EnvironmentRepresentation,
  debugRepresentation: DebugRepresentation,
  fullLightAngle: number[],
): VertexData {
  const textureLayersData: number[] = []
  const destinationData: number[] = []
  const sourceData: number[] = []
  const indiciesData: number[] = []
  const colorMatrixIdxData: number[] = []
  const normalsData: number[] = []

  const planeMatrix = getPlaneMatrix()

  // envRepresentation.addBufferData(
  //   textureLayersData,
  //   destinationData,
  //   sourceData,
  //   colorMatrixIdxData,
  //   normalsData,
  //   indiciesData,
  // )

  
  // units.forEach((unit) => {
  //   unit.addBufferData(
  //     textureLayersData,
  //     destinationData,
  //     sourceData,
  //     colorMatrixIdxData,
  //     normalsData,
  //     indiciesData,
  //     planeMatrix,
  //     fullLightAngle,
  //   )
  // })

  // debugRepresentation.addBufferData(
  //   textureLayersData,
  //   destinationData,
  //   sourceData,
  //   colorMatrixIdxData,
  //   normalsData,
  //   indiciesData,
  //   fullLightAngle,
  // )


  return new VertexData({
    destinationRect: destinationData,
    sourceRect: sourceData,
    textureLayers: textureLayersData,
    indices: indiciesData,
    colorMatrixIdx: colorMatrixIdxData,
    normals: normalsData,
  })
}