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

const TOP_ALPHA_SLOPE = 0.8;
const BOTTOM_ALPHA_SLOPE = 0.13;

@fragment fn fs(in: VertexOutput) -> @location(0) vec4f {
    let unused = textureSample(voronoidTexture, noiseSampler, in.texCoord).r;

  // let len = length(vec2f(in.texCoord.x - 0.5, in.texCoord.y - 0.5));
  // let smooth_len = smoothstep(0.0, 0.99, pow(0.5 - len, 0.5)) * 1.0;
  let blue = get_blue(in);
  let white = get_white(in) * 2.0;
  let higher_alpha_color = blue * 0.5 + white * 1.3;
  // let color = get_magenta(in) * 0.8 + edge_alpha;
  // let smooth_len = 1.0 - smoothstep(0.35, 0.5, abs(in.texCoord.y - 0.5));

  let top_edge_influence = max(0.0, in.texCoord.y - TOP_ALPHA_SLOPE) / (1.0 - TOP_ALPHA_SLOPE);
  let vertical_partition = top_edge_influence
  + max(0.0, (1.0 - in.texCoord.y) - (1.0 - BOTTOM_ALPHA_SLOPE)) / BOTTOM_ALPHA_SLOPE;// sign(in.texCoord.y - 0.35) * 0.65 + sign(1.0 - in.texCoord.y - 0.35) * 0.35;

  let alpha_from_color = smoothstep(0.2, 1.0, 2.0 * max(max(higher_alpha_color.r, higher_alpha_color.g), higher_alpha_color.b));

  let dist_from_center = 1.0 - smoothstep(0.0, 0.1, (0.5 - abs(in.texCoord.x - 0.5) - 0.35));
  let dist_from_center_pow = pow(dist_from_center, 2.0);
  // return vec4f(pow(dist_from_center, 3.0));
  let alpha_factor = pow(1.0 - vertical_partition, 1.5);
  // let alpha_factor = pow(1.0 - vertical_partition, 2.2);
  let alpha = max(alpha_factor * alpha_from_color, alpha_factor);
  let norm_alpha = min(alpha, 1.0);
  // return vec4f(pow(alpha_factor, 1.0));

  let magenta = get_magenta(in);
  let alpha_from_colors = max((magenta.r - 0.5) * 3.0, max(blue.b, white.b) * 2.0) * alpha_factor;
  let together_alpha = max(
    pow(alpha_factor, 2.0),// - 0.09 * max(0.0, sign(top_edge_influence) * dist_from_center),
    alpha_from_colors - max(0.0, sign(top_edge_influence) * dist_from_center_pow)
  );
  return vec4f((blue + white + magenta).rgb * together_alpha, together_alpha);

  let magenta_alpha_trehsold = 0.3;
  let magenta_alpha = smoothstep(0.0, 1.0 - magenta_alpha_trehsold, alpha_factor - magenta_alpha_trehsold);
  let color = magenta * magenta_alpha;
  // return color;
  // return vec4f(vec3f(pow(alpha_factor, 1.5)), 1.0);
  // return vec4f(alpha_factor, alpha_factor, alpha_factor, alpha_factor);
  let b = alpha_from_color * alpha_factor;
  let a = higher_alpha_color.rgb * alpha_factor;
  return color + vec4f(a, b); // GOOD


  return vec4f(color.rgb, alpha_factor);
  // return vec4f(color.rgb * improved_alpha, improved_alpha);
}


fn get_blue(in: VertexOutput) -> vec4f {
  let scale = 2.0;
  let angle = atan2(in.texCoord.y + 0.5, in.texCoord.x + 0.5) + 1.0;

  let rotateCoords = (in.texCoord + vec2f(sin(angle), cos(angle))) / scale;
  let factor = textureSample(noiseTexture, noiseSampler, rotateCoords).r * 0.3;

  let new_coords = rotateCoords + vec2f(
    factor,
    factor + u.time * -0.00005,
  );
  let v = textureSample(voronoidTexture, noiseSampler, new_coords).r;

  let light_magenta = vec3f(0.3, 1.0, 1.0);
  
  let s = light_magenta * smoothstep(0.5, 1.0, v);

  return vec4f(s.rgb, 1.0);
}

fn get_magenta(in: VertexOutput) -> vec4f {
  let scale = 3.0;
  let scaledCoords = in.texCoord / scale;
  let factor = textureSample(noiseTexture, noiseSampler, scaledCoords).r * 0.3;

  let new_coords = scaledCoords + vec2f(
    factor + u.time * 0.00006,
    factor + u.time * -0.00003,
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
    factor + u.time * 0.00004,
    factor + u.time * -0.00008,
  );

  let c = textureSample(noiseTexture, noiseSampler, new_coords).r;
  let s = smoothstep(0.65, 0.9, c);

  return vec4f(s, s, s, 1.0);
}