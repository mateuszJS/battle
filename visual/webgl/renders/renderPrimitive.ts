export default function(pointsNumber: number) {
  const gl = window.gl

  gl.drawArrays(gl.TRIANGLES, 0, pointsNumber);
}
