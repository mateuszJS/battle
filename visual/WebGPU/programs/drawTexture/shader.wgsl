struct Vertex {
  @location(0) position: vec4f,
  @location(1) uv: vec2f,
  @location(2) texLayerIndex: u32,
  @location(3) colorMatrixIndex: u32,
  @location(4) normal: vec3f,
};

struct Uniforms {
  worldViewProjection: mat4x4f,
  colorMatricies: array<mat3x3f, NUM_OF_MATRICIES>, /* 1 - factions number limit */
  // normalMatrix: mat3x3f,
  lightDirection: vec3f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) texCoord: vec2f,
  @location(1) @interpolate(flat) texLayerIndex : u32,
  @location(2) @interpolate(flat) colorMatrixIndex : u32,
  @location(3) normal : vec3f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d_array<f32>;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  var out: VertexOutput;
  // maybe we should pass offsets from the position instead of... position?
  out.position = u.worldViewProjection * vert.position;
  out.texCoord = vert.uv;
  out.texLayerIndex = vert.texLayerIndex;
  out.colorMatrixIndex = vert.colorMatrixIndex;
  // out.normal = u.normalMatrix * vert.normal;
  out.normal = vert.normal;
  
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  let colorMatrix = u.colorMatricies[in.colorMatrixIndex];
  let texel = textureSample(ourTexture, ourSampler, in.texCoord, 10);//in.texLayerIndex);





  // Because vsOut.normal is an inter-stage variable 
  // it's interpolated so it will not be a unit vector.
  // Normalizing it will make it a unit vector again
  let normal = normalize(in.normal);

  // Compute the light by taking the dot product
  // of the normal to the light's reverse direction
  let light = dot(normal, -u.lightDirection);

  // Lets multiply just the color portion (not the alpha)
  // by the light


  return vec4f(
    (texel.rgb * colorMatrix).rgb * light, texel.a
  );
  // return vec4f(
  //   (texel.rgb * colorMatrix).rg, 1.0,
  //   1.0
  // );
}