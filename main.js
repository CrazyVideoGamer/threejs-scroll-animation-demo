import "./style.css"

import * as THREE from 'three';

//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const positions = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 )); // [x, y, z]

  star.position.set(...positions);
  scene.add(star);
}

Array(200).fill().forEach(() => addStar()); // Populate sky with stars


const spaceTexture = new THREE.TextureLoader().load("dogesky.jpg");
scene.background = spaceTexture;

// Avatar
const gameControllerTexture = new THREE.TextureLoader().load("pfp.png");

const gameControllerCube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial( { map: gameControllerTexture } )
)

scene.add(gameControllerCube);

const dogeMoonTexture = new THREE.TextureLoader().load("dogemoon.png");
const normalMapTexture = new THREE.TextureLoader().load("normalMap.jpg");

const dogeMoonSphere = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: dogeMoonTexture,
    normalMap: normalMapTexture
  } )
)

dogeMoonSphere.position.z = 30;
dogeMoonSphere.position.x = -10;

scene.add(dogeMoonSphere);


function moveCamera() {
  const top = document.body.getBoundingClientRect().top;

  dogeMoonSphere.rotation.x += 0.05;
  dogeMoonSphere.rotation.y += 0.075;
  dogeMoonSphere.rotation.z += 0.05;

  gameControllerCube.rotation.y += 0.01;
  gameControllerCube.rotation.z += 0.01;

  camera.position.z = top * -0.01;
  // camera.position.y = top * -0.0002;
  // camera.position.x = top * -0.0002;
}
moveCamera(); // Run move camera so the camera adjusts immeadiately, without scroll

document.body.onscroll = moveCamera;



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update();

  renderer.render( scene, camera );
}

animate();
