struct Uniforms {
   position: vec4f,
   matrix: mat4x4f
};

// NOTE!: vec3u is padded to by 4 bytes
@group(0) @binding(0) var<storage, read_write> result: array<vec4f>;
@group(0) @binding(1) var<uniform> u: Uniforms;

@compute @workgroup_size(HARDCODED_WORKING_GROUP_SIZE) fn getMatrixData() {
  result[0] = u.matrix * u.position;
}