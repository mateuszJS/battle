function compileShader(
  gl: WebGL2RenderingContext,
  type: typeof gl.VERTEX_SHADER | typeof gl.FRAGMENT_SHADER,
  source: string
) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    console.trace(gl.getShaderInfoLog(shader));

  return shader;
}

export default function compileAllShaders(gl: WebGL2RenderingContext) {
  const baseVertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    `
      precision highp float;
  
      attribute vec2 a_position;
      // attribute vec2 a_texCoord;

      varying vec2 v_texCoord;

      // uniform vec2 u_texelSize;
  
      void main () {
          // vUv = a_position * 0.5 + 0.5; // just convert < -1, 1> to <0, 1>
          v_texCoord = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
      }
  `
  );

  const copyFragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    `
      precision mediump float;
      precision mediump sampler2D;
  
      varying highp vec2 v_texCoord;

      uniform sampler2D u_texture;
  
      void main () {
          gl_FragColor = texture2D(u_texture, v_texCoord);
      }
  `
  );

  return {
    baseVertexShader,
    copyFragmentShader,
  }
}