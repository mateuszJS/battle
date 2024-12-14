import mat4 from "utils/mat4";
import ModuleGUI from "./GUI";

const GUI = ModuleGUI.default
const degToRad = (d: number) => d * Math.PI / 180;

const radius = 200;
const settings = {
  fieldOfView: degToRad(100),
  cameraAngle: 0,
};

const radToDegOptions = { min: -360, max: 360, step: 1, converters: GUI.converters.radToDeg };

const gui = new GUI();
gui.add(settings, 'fieldOfView', {min: 1, max: 179, converters: GUI.converters.radToDeg});
gui.add(settings, 'cameraAngle', radToDegOptions);
export default function getWorldMatrix(canvas: HTMLElement, targetPoints: Point, dt: number) {
 
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const projection = mat4.perspective(
      settings.fieldOfView,
      aspect,
      1,      // zNear
      2000,   // zFar
  );

  // Compute the position of the first F
  const fPosition = [0, 0, 0];

  // Use matrix math to compute a position on a circle where
  // the camera is
  const tempMatrix = mat4.rotationY(settings.cameraAngle);
  mat4.translate(tempMatrix, [0, 0, radius * 1.5], tempMatrix);

  // Get the camera's position from the matrix we computed
  const eye = tempMatrix.slice(12, 15);

  const up = [0, 1, 0];

  // Compute a view matrix
  const viewMatrix = mat4.lookAt(eye, fPosition, up);

  // combine the view and projection matrixes
  const viewProjectionMatrix = mat4.multiply(projection, viewMatrix);
  return viewProjectionMatrix
}

export function getCameraAngle(): number[] {
  return [0, 0, 0]//cameraSettings.cameraAngle
}