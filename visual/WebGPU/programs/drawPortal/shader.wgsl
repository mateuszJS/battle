struct Vertex {
  @location(0) position: vec4f,
  @location(1) uv: vec2f,
};

struct Uniforms {
  worldViewProjection: mat4x4f,
  time: f32,
};

struct VertexOutput {
  @builtin(position) position: vec4f,
  @location(0) texCoord: vec2f,
};

@group(0) @binding(0) var<uniform> u: Uniforms;
@group(0) @binding(1) var noiseSampler: sampler;
@group(0) @binding(2) var noiseTexture: texture_2d<f32>;
@group(0) @binding(3) var voronoidTexture: texture_2d<f32>;

@vertex fn vs(vert: Vertex) -> VertexOutput {
  var out: VertexOutput;
  // maybe we should pass offsets from the position instead of... position?
  out.position = u.worldViewProjection * vert.position;
  out.texCoord = vert.uv;
  
  return out;
}

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
    let unused = textureSample(voronoidTexture, noiseSampler, in.texCoord).r;

  // let len = length(vec2f(in.texCoord.x - 0.5, in.texCoord.y - 0.5));
  // let smooth_len = smoothstep(0.0, 0.99, pow(0.5 - len, 0.5)) * 1.0;
  let smooth_len = 1.0 - smoothstep(0.35, 0.5, abs(in.texCoord.y - 0.5));

  // let color = get_magenta(in) * 1.0 + get_white(in) * 1.2;
  let color = get_blue(in) + get_magenta(in) * 0.8 + get_white(in) * 1.8;
  
  return vec4f(color.rgb * smooth_len, smooth_len);
}


fn get_blue(in: VertexOutput) -> vec4f {
  let scale = 2.0;
  let angle = atan2(in.texCoord.y + 0.5, in.texCoord.x + 0.5) + 1.0;

  let rotateCoords = (in.texCoord + vec2f(sin(angle), cos(angle))) / scale;
  let factor = textureSample(noiseTexture, noiseSampler, rotateCoords).r * 0.3;

  let new_coords = rotateCoords + vec2f(
    factor,
    factor + u.time * 0.00005,
  );
  let v = textureSample(voronoidTexture, noiseSampler, new_coords).r;

  let light_magenta = vec3f(0.3, 1.0, 1.0);
  
  let s = light_magenta * smoothstep(0.6, 1.0, v);

  return vec4f(s.rgb, 1.0);
}

fn get_magenta(in: VertexOutput) -> vec4f {
  let scale = 3.0;
  let scaledCoords = in.texCoord / scale;
  let factor = textureSample(noiseTexture, noiseSampler, scaledCoords).r * 0.3;

  let new_coords = scaledCoords + vec2f(
    factor + u.time * 0.00006,
    factor + u.time * 0.00003,
  );

  let dark_magenta = vec3f(0.463, 0.255, 0.921);
  let light_magenta = vec3f(1.0, 0.357, 0.98);
  

  let c = textureSample(noiseTexture, noiseSampler, new_coords).r;
  let s = smoothstep(0.4, 1.0, c) * 2.0;
  let m = mix(dark_magenta, light_magenta, s);

  return vec4f(m.rgb, 1.0);
}


fn get_white(in: VertexOutput) -> vec4f {
  let scale = 1.5;

  let scaledCoords = in.texCoord / scale;
  let factor = textureSample(noiseTexture, noiseSampler, scaledCoords).r * 0.3;

  let new_coords = scaledCoords + vec2f(
    factor + u.time * 0.00008,
    factor + u.time * 0.00004,
  );

  let c = textureSample(noiseTexture, noiseSampler, new_coords).r;
  let s = smoothstep(0.65, 0.9, c);

  return vec4f(s, s, s, 1.0);
}