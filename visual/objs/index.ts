import ObjFile from 'obj-file-parser'

async function getBuffer(url: URL): Promise<number[]> {
  const portalObjFileContent = await fetch(url)
  const portalObjText = await portalObjFileContent.text()
  const objFile = new ObjFile(portalObjText).parse()

  const outputBuffer: number[] = []

  const allVertexCoords: ObjFile.Vertex[] = []
  const allTextureCoords: ObjFile.VertexTexture[] = []
  const allNomals: ObjFile.Vertex[] = []

  objFile.models.forEach(model => {
    allVertexCoords.push(...model.vertices)
    allTextureCoords.push(...model.textureCoords)
    allNomals.push(...model.vertexNormals)
  })


  objFile.models.forEach(model => {
    model.faces.forEach(face => {
      face.vertices.forEach(vertex => {
        const positionAngle = Math.atan2(-allVertexCoords[vertex.vertexIndex - 1].z, allVertexCoords[vertex.vertexIndex - 1].x)
        const positionDistance = Math.hypot(allVertexCoords[vertex.vertexIndex - 1].x, allVertexCoords[vertex.vertexIndex - 1].z)

        const normalAngle = Math.atan2(-allNomals[vertex.vertexNormalIndex - 1].z, allNomals[vertex.vertexNormalIndex - 1].x)
        const normalDistance = Math.hypot(allNomals[vertex.vertexNormalIndex - 1].x, allNomals[vertex.vertexNormalIndex - 1].z)

        outputBuffer.push(
          positionAngle, // angle
          positionDistance * 100, // distance
          allVertexCoords[vertex.vertexIndex - 1].y * 100, // y
          allTextureCoords[vertex.textureCoordsIndex - 1].u,
          1 - allTextureCoords[vertex.textureCoordsIndex - 1].v,
          11, // texture slice
          0, // color matrix
          normalAngle, // normal angle
          normalDistance, // normal distance
          allNomals[vertex.vertexNormalIndex - 1].y, // y
        )
      })
    })
  })

  return outputBuffer
}

export default async function getObjs() {
  const [standard_portal] = await Promise.all([
    getBuffer(new URL('assets/new_portal_optimized.obj', import.meta.url))
  ])


  return {
    standard_portal
  }
}