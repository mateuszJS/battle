struct Vertex {
  @location(0) position: vec2f,
};

struct Uniforms {
  matrix: mat3x3f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  let clipSpace = (u.matrix * vec3f(vert.position, 1)).xy;

  var out: VertexOutput;
  out.position = vec4f(clipSpace, 0.0, 1.0);
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  return vec4f(1.0, 0.0, 0.0, 1.0);
}