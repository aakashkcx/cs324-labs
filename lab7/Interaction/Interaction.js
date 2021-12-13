import * as THREE from "../Common/build/three.module.js";
import { TrackballControls } from "../Common/examples/jsm/controls/TrackballControls.js";

let camera, controls, scene, renderer, canvas;

function init() {
  canvas = document.getElementById("gl-canvas");

  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;

  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = -10;

  // world
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.receiveShadow = true;
  scene.add(plane);

  const coneGeometry = new THREE.ConeGeometry(1, 2);
  const coneMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const cone = new THREE.Mesh(coneGeometry, coneMaterial);
  cone.position.y = 1;
  cone.position.x = 2;
  scene.add(cone);

  const sphereGeometry = new THREE.SphereGeometry(1);
  const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.y = 1;
  scene.add(sphere);

  const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.y = 0.75;
  cube.position.x = -2;
  scene.add(cube);

  // const boxWidth = 1;
  // const boxHeight = 1;
  // const boxDepth = 1;
  // const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // function makeInstance(geometry, color, x) {
  //   const material = new THREE.MeshPhongMaterial({ color });

  //   const cube = new THREE.Mesh(geometry, material);
  //   scene.add(cube);

  //   cube.position.x = x;

  //   return cube;
  // }

  // const cubes = [
  //   makeInstance(geometry, 0x44abc8, 0),
  //   makeInstance(geometry, 0x8244aa, -2),
  //   makeInstance(geometry, 0xfff00, 2),
  // ];

  // lights
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
  dirLight.position.set(0, 10, -5);
  scene.add(dirLight);

  const ambientLight = new THREE.AmbientLight(0x222200, 2.0);
  scene.add(ambientLight);

  // renderer
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", onWindowResize);

  createControls(camera);
  controls.update();
}

function createControls(camera) {
  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 5;
  controls.panSpeed = 0.8;

  // This array holds keycodes for controlling interactions.
  // When the first defined key is pressed, all mouse interactions (left, middle, right) performs orbiting.
  // When the second defined key is pressed, all mouse interactions (left, middle, right) performs zooming.
  // When the third defined key is pressed, all mouse interactions (left, middle, right) performs panning.
  // Default is KeyA, KeyS, KeyD which represents A, S, D.
  controls.keys = ["KeyA", "KeyS", "KeyD"];
}

function onWindowResize() {
  const aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.handleResize();
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);
}

init();
animate();
