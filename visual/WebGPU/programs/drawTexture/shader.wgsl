struct Vertex {
  @location(0) position: vec4f,
  @location(1) uv: vec2f,
  @location(2) texLayerIndex: u32,
  @location(3) colorMatrixIndex: u32,
};

struct Uniforms {
  matrix: mat4x4f,
  colorMatricies: array<mat3x3f, 2>, /* 1 - factions number limit */
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) texCoord: vec2f,
  @location(1) @interpolate(flat) texLayerIndex : u32,
  @location(2) @interpolate(flat) colorMatrixIndex : u32
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d_array<f32>;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  var out: VertexOutput;
  // maybe we should pass offsets from the position instead of... position?
  out.position = u.matrix * vert.position;
  out.texCoord = vert.uv;
  out.texLayerIndex = vert.texLayerIndex;
  out.colorMatrixIndex = vert.colorMatrixIndex;
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  let colorMatrix = u.colorMatricies[in.colorMatrixIndex];
  let texel = textureSample(ourTexture, ourSampler, in.texCoord, in.texLayerIndex);

  return vec4f(
    (texel.rgb * colorMatrix).rg, 1.0,
    1.0
  );
}