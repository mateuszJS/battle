struct Vertex {
  @location(0) position: vec2f,
  @location(1) uv: vec2f,
};

struct Uniforms {
  matrix: mat3x3f,
};

struct VSOutput {
  @builtin(position) position: vec4f,
  @location(0) texcoord: vec2f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var ourSampler: sampler;
@group(0) @binding(2) var ourTexture: texture_2d<f32>;

@vertex fn vs(vert: Vertex) -> VSOutput {
  let clipSpace = (u.matrix * vec3f(vert.position, 1)).xy;

  var vsOut: VSOutput;

  vsOut.position = vec4f(clipSpace, 0.0, 1.0);
  vsOut.texcoord = vec2f(vert.uv.x, 1.0 - vert.uv.y);
  return vsOut;
}

@fragment fn fs(fsInput: VSOutput) -> @location(0) vec4f {
  return textureSample(ourTexture, ourSampler, fsInput.texcoord);
}