struct Vertex {
  @location(0) position: vec2f,
  @location(1) uv: vec2f,
  @location(2) layer: u32,
};

struct Uniforms {
  matrix: mat3x3f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) texcoord: vec2f,
  @location(1) @interpolate(flat) layer : u32
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
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  return textureSample(ourTexture, ourSampler, in.texcoord, in.layer);
  // let tex = textureSample(ourTexture, ourSampler, in.texcoord);
  // return vec4f(tex.g, tex.g, tex.g, tex.g);
  // return vec4f(tex.rgb * tex.a, tex.a);
}