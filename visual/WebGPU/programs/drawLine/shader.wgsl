struct Vertex {
  @location(0) position: vec4f,
};

struct Uniforms {
  matrix: mat4x4f,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  var out: VertexOutput;
  out.position = u.matrix * vert.position;
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
  return vec4f(1.0, 0.0, 0.0, 1.0);
}