import mat4 from "utils/mat4";
import GUI from "./GUI";

const startAngle = [-89, 0, 0]
// const endAngle = [-89, 0, 0]
const endAngle = [-27, -11, 0]

function easeInOut(t: number){
  return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
}

const animationLength = 3000
const animationDelay = 500

const degToRad = (d: number) => d * Math.PI / 180;
export const cameraSettings = {
  fieldOfView: degToRad(18),
  zNear: 1,
  zFar: 4000,
  radius: 3008.11,
  cameraAngle: [degToRad(endAngle[0]), degToRad(endAngle[1]), degToRad(endAngle[2])],
  scale: [1, 1, 1],
  scaleFactor: 1,
  light: [.31, .46, -.16]
  // light: [-0.5, -0.7, -1]
}; // to add more perspective, increase fieldofView and decrease translation.z
const radToDegOptions = { min: -360, max: 360, step: 1, converters: GUI.converters.radToDeg };

let gui: GUI | undefined;

let time = 0

export default function getWorldMatrix(canvas: HTMLElement, targetPoints: Point, dt: number) {
  time += dt

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

  const matricies = [
     /* 1. Move away on z axis */
  ]
  const relativeProgress = Math.max(0, time - animationDelay) / (animationLength - animationDelay)
  if (time >= animationLength) {
    // ORDER MATTERS
    matricies.push(mat4.rotationY(cameraSettings.cameraAngle[1]))// 2. the nrotate!
    matricies.push(mat4.rotationX(cameraSettings.cameraAngle[0])) // 1.
    // we dont need Z, it's later calculated base on const up = [0, 1, 0]; and other axis, so it wont impact
  } else {
    const easeProgress = easeInOut(relativeProgress)
    matricies.push(mat4.rotationY(
      degToRad(startAngle[1] * (1 - easeProgress) + endAngle[1] * easeProgress)
    ))// 2. the nrotate!
    matricies.push(mat4.rotationX(
      degToRad(startAngle[0] * (1 - easeProgress) + endAngle[0] * easeProgress)
    )) // 1.



    // [degToRad(startAngle[0]), degToRad(startAngle[1]), degToRad(startAngle[2])],
  }

  matricies.push(
    mat4.translation([0, 0, cameraSettings.radius])
  )

  const cameraPos = matricies.reduce(
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