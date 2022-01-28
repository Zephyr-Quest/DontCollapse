// import * as THREE from 'https://unpkg.com/three@0.137.0'; 
// import * as THREE from 'https://cdn.skypack.dev/three';
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.137.0/examples/jsm/controls/OrbitControls.js';

import { Config } from './config.js';
import { Textures } from './assets/textures.js';

let scene, renderer, camera, controls;
const loader = new THREE.TextureLoader();

/* ---------------------------------- Debug --------------------------------- */

// Stats
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

/* -------------------------------- Textures -------------------------------- */

// Textures load manager
const loadManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadManager);

// Load all textures
for (let textureName in Textures) {
    if (!Textures.hasOwnProperty(textureName)) continue;
    const currentTexture = Textures[textureName];
    
    // Add the texture to the loader
    currentTexture.texture = textureLoader.load(Config.texturesPath + currentTexture.filename);
    currentTexture.texture.magFilter = THREE.NearestFilter;
}

// Start ThreeJS after loading textures
loadManager.onLoad = init;

/* -------------------------------------------------------------------------- */
/*                           ThreeJS main functions                           */
/* -------------------------------------------------------------------------- */

/**
 * Init function
 */
function init() {
    // Setting up the scene
    scene = new THREE.Scene();

    // Setting up the renderer
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Setting up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(Config.camX, Config.camY, Config.camZ);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    // Setting up the camera controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    // Setting up lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(10, 20, 10);
    // directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight2.position.set(0, -10, 0);
    // directionalLight2.target.position.set(0, 0, 0);
    // scene.add(directionalLight2);

    // Add a floor
    // const planeGeometry = new THREE.PlaneGeometry(Config.floorSize, Config.floorSize);
    // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeee, side: THREE.DoubleSide });
    // const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = 90;
    // console.log(plane);
    // scene.add(plane);

    render();
}

/**
 * Main loop function
 */
function render() {
    // DEBUG : Start calcul frame rate
    stats.begin();

    // DEBUG : Update OrbitControl (camera control)
    controls.update();

    // Rendering the 3D scene
    renderer.render(scene, camera);

    // DEBUG : Stop calcul frame rate
    stats.end();

    // Wait before looping
    requestAnimationFrame(render);
}

window.onkeyup = (e) => {
    if (e.code === 'Space')
        console.log(camera.position);
}