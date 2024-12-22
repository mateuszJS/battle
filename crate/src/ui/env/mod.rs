pub struct EnvUI {
  priv textureLayersData: Vec<f32>,
  priv destinationData: Vec<f32>,
  priv sourceData: Vec<f32>,
  priv indiciesData: Vec<f32>,
  priv colorMatrixIdx: Vec<f32>,
  priv normalsData: Vec<f32>,
}

impl EnvUI {
  pub fn new(
    platforms: Vec<f32>,
    bridges: Vec<f32>,
  ) -> EnvUI {
    vec![]

    Faction {
      id,
      factory,
      resources: 0,
      squads: vec![],
      portal_squad,
      squads_during_creation: vec![],
      ai,
      hunters_aims: HashMap::new(),
    }
  }
}

pub fn EnvRepresentation {
  private textureLayersData: number[] = []
  private destinationData: number[] = []
  private sourceData: number[] = []
  private indiciesData: number[] = []
  private colorMatrixIdx: number[] = []
  private normalsData: number[] = []

  constructor(envVisuals: EnvVisuals){
    /* ============platforms============ */
    envVisuals.platforms.forEach((points => {
      attachPlatformVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.colorMatrixIdx,
        this.normalsData,
        this.indiciesData,
        points,
        envVisuals.bridges,
      ) 
    }))

    /* ============birdges============ */
    envVisuals.bridges.forEach((points => {
      attachBridgeVertex(
        this.textureLayersData,
        this.destinationData,
        this.sourceData,
        this.colorMatrixIdx,
        this.normalsData,
        this.indiciesData,
        points,
      ) 
    }))
  }

  public addBufferData(
    textureLayersData: number[],
    destinationData: number[],
    sourceData: number[],
    colorMatrixIdx: number[],
    normalsData: number[],
    indiciesData: number[],
  ) {
    textureLayersData.push(...this.textureLayersData)
    destinationData.push(...this.destinationData)
    sourceData.push(...this.sourceData)
    colorMatrixIdx.push(...this.colorMatrixIdx)
    normalsData.push(...this.normalsData)
    indiciesData.push(...this.indiciesData.map(i => i + indiciesData.length))
  }
}