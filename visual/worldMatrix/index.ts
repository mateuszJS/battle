import mat4 from "utils/mat4";
import GUI from "./GUI";

const degToRad = (d: number) => d * Math.PI / 180;
export const cameraSettings = {
  fieldOfView: degToRad(18),
  zNear: 1,
  zFar: 4000,
  radius: 3008.11,
  cameraAngle: [degToRad(-27), degToRad(-11), degToRad(0)],
  scale: [1, 1, 1],
  scaleFactor: 1,
  light: [.31, .46, -.16]
  // light: [-0.5, -0.7, -1]
}; // to add more perspective, increase fieldofView and decrease translation.z
const radToDegOptions = { min: -360, max: 360, step: 1, converters: GUI.converters.radToDeg };

let gui: GUI | undefined;

export default function getWorldMatrix(canvas: HTMLElement, targetPoints: Point) {

  if (!gui) {
    gui = new GUI();
    gui.add(cameraSettings, 'fieldOfView', {min: 1, max: 179, converters: GUI.converters.radToDeg});
    gui.add(cameraSettings, 'zNear', 1, 2000).name('zNear');
    gui.add(cameraSettings, 'zFar', 1, 4000).name('zFar');
    gui.add(cameraSettings, 'radius', 0, 10000).name('distance from target');
    gui.add(cameraSettings.cameraAngle, '0', radToDegOptions).name('rotation.x');
    gui.add(cameraSettings.cameraAngle, '1', radToDegOptions).name('rotation.y');
    gui.add(cameraSettings.cameraAngle, '2', radToDegOptions).name('rotation.z(no impact)');
    // gui.add(cameraSettings.rotation, '0', radToDegOptions).name('rotation.x');
    // gui.add(cameraSettings.rotation, '1', radToDegOptions).name('rotation.y');
    // gui.add(cameraSettings.rotation, '2', radToDegOptions).name('rotation.z');
    // gui.add(cameraSettings.scale, '0', -5, 5).name('scale.x');
    // gui.add(cameraSettings.scale, '1', -5, 5).name('scale.y');
    // gui.add(cameraSettings.scale, '2', -5, 5).name('scale.z');
    gui.add(cameraSettings, 'scaleFactor', -5, 5).name('scaleFactor');
    gui.add(cameraSettings.light, '0', -Math.PI, Math.PI).name('light.x');
    gui.add(cameraSettings.light, '1', -Math.PI, Math.PI).name('light.y');
    gui.add(cameraSettings.light, '2', -Math.PI, Math.PI).name('light.z');
  }

  const aspect = canvas.clientWidth / canvas.clientHeight;
  const projection = mat4.perspective(
      cameraSettings.fieldOfView,
      aspect,
      cameraSettings.zNear,      // zNear
      cameraSettings.zFar,   // zFar
  );

  const target = [targetPoints.x, 0, targetPoints.y];

  const cameraPos = [
    mat4.rotationX(cameraSettings.cameraAngle[0]),
    mat4.rotationY(cameraSettings.cameraAngle[1]),// 2. the nrotate!
    // we dont need Z, it's later calculated base on const up = [0, 1, 0]; and other axis, so it wont impact
    mat4.translation([0, 0, cameraSettings.radius]) /* 1. Move away on z axis */
  ].reduce(
    (matrix, rotationMatrix) => mat4.multiply(matrix, rotationMatrix),
    mat4.translation(target) // put camera at exact same palce as objwct to follow
  )

  // Get the camera's position from the matrix we computed
  const eye = cameraPos.slice(12, 15);

  const up = [0, 1, 0];

  const viewMatrix = mat4.lookAt(eye, target, up);

  const viewProjectionMatrix = mat4.multiply(projection, viewMatrix);

  const world = mat4.identity();

  // Combine the viewProjection and world matrices
  const worldViewProjection = mat4.multiply(viewProjectionMatrix, world);

  return worldViewProjection
}