export default function resizeCanvas(canvas: HTMLCanvasElement) {
  let width = scaleByPixelRatio(canvas.clientWidth);
  let height = scaleByPixelRatio(canvas.clientHeight);
  if (canvas.width != width || canvas.height != height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

function scaleByPixelRatio(input: number) {
  let pixelRatio = window.devicePixelRatio || 1;
  return Math.floor(input * pixelRatio);
}