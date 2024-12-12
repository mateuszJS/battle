export default class EnvironmentRepresentation {
  constructor(
    private platforms: Point[]
  ){
    console.log('platforms', platforms)
  }

  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    indiciesData: number[],
  ) {

    this.platforms.forEach(point => {
      const lastUsedIndex = destinationData.length / 4
      // each point has x and y component so that's why divided by 2
      const nextIndicies = 
      [
        0, 1, 2,
        0, 2, 3
      ].map(i => lastUsedIndex + i)
      indiciesData.push(...nextIndicies)

      textureLayersData.push(...Array(4).fill(0))

      sourceData.push(
        0, 1000,
        1000, 1000,
        1000, 0,
        0, 0
      )

      destinationData.push(
        point.x, 0, point.y - 200, 1,
        point.x + 200, 0, point.y - 200, 1,
        point.x + 200, 0, point.y, 1,
        point.x, 0, point.y, 1,
      )
    })
  }
}