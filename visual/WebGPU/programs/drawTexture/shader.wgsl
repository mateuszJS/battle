struct Vertex {
  @location(0) position: vec2f,
  @location(1) uv: vec2f,
  @location(2) layer: u32,
};

struct Uniforms {
  matrix: mat3x3f,
  colorMatricies: array<mat3x3f, 1>, /* 1 - factions number limit */
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) texcoord: vec2f,
  @location(1) @interpolate(flat) layer : u32,
  @location(2) @interpolate(flat) colorMatrixIndex : u32
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d_array<f32>;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  let clipSpace = (u.matrix * vec3f(vert.position, 1)).xy;

  var out: VertexOutput;
  out.position = vec4f(clipSpace, 0.0, 1.0);
  out.texcoord = vec2f(vert.uv.x, 1.0 - vert.uv.y);
  out.layer = vert.layer;
  out.colorMatrixIndex = 0;
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  let colorMatrix = u.colorMatricies[in.colorMatrixIndex];
  // let colorMatrix = mat3x3f(
  //   0, 1, 0,
  //   0, 0, 1,
  //   1, 0, 0
  // );
  let texel = textureSample(ourTexture, ourSampler, in.texcoord, in.layer);

  return vec4f(
    texel.rgb * colorMatrix,
    texel.a
  );
}