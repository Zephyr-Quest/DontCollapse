// import * as THREE from 'https://unpkg.com/three@0.137.0'; 
// import * as THREE from 'https://cdn.skypack.dev/three';
import * as THREE from 'three';
import {
    OrbitControls
} from 'https://unpkg.com/three@0.137.0/examples/jsm/controls/OrbitControls.js';

import {
    FBXLoader
} from 'https://unpkg.com/three@0.137.0/examples/jsm/loaders/FBXLoader.js'

import {
    Config
} from './config.js';
import {
    Textures
} from './assets/textures.js';
import {
    Wall
} from './level_design/Wall.js';
import {
    Floor
} from './level_design/Floor.js';
import {
    Opening
} from './level_design/Opening.js';
import {
    MinEquation
} from 'three';

let scene, renderer, camera, controls;

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
loadManager.onLoad = init();

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
    scene.add(camera);

    // Setting up the camera controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 50)
    controls.update();

    // Setting up lights
    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    // scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(50, 50 ,100);
    directionalLight.target.position.set(-50, -50, 0);
    scene.add(directionalLight);
    // const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight2.position.set(0, -10, 0);
    // directionalLight2.target.position.set(0, 0, 0);
    // scene.add(directionalLight2);

    var axesHelper = new THREE.AxesHelper(1000);
    scene.add(axesHelper);

    /* ---------------------------------- TEST ---------------------------------- */

    /* --------------------------------- MACHINE -------------------------------- */
    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        '/JS/assets/3D_models/cheminey.fbx',
        (object) => {
            object.scale.set(.1, .1, .1)
            object.rotation.y = toRad(-90);
            object.position.x = -50;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.x = -50 - (bbox.min.x - bbox.max.x) / 2;
            object.position.y = -(bbox.min.y);
            object.position.z = -(bbox.min.z);
            scene.add(object)
        }
    )

    /* ----------------------------------- ARM ---------------------------------- */
    fbxLoader.load(
        '/JS/assets/3D_models/arm.fbx',
        (object) => {
            object.scale.set(.02, .02, .02)
            object.rotation.y = toRad(-180);
            object.position.x = -13.5;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.y = -(bbox.min.y);
            object.position.z = -(bbox.min.z);
            scene.add(object)
        }
    )

    fbxLoader.load(
        '/JS/assets/3D_models/arm.fbx',
        (object) => {
            object.scale.set(.02, .02, .02)
            object.rotation.y = toRad(-180);
            object.position.x = -13.5;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.y = -(bbox.min.y);
            object.position.z = (bbox.max.z - bbox.min.z) * 2;
            scene.add(object)
        }
    )

    /* --------------------------------- PALETTE -------------------------------- */
    fbxLoader.load(
        '/JS/assets/3D_models/palette.fbx',
        (object) => {
            const loader = new THREE.TextureLoader()
            const material = new THREE.MeshBasicMaterial({
                color: 0xFF8844,
                map: loader.load('/JS/assets/3D_models/textures/palette.png'),
            });
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = material.map; // assign your diffuse texture here
                }
            });
            object.scale.set(.1, .1, .1)
            object.rotation.y = toRad(-170);
            object.position.x = -50;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.x = -47 - (bbox.min.x - bbox.max.x) / 2;
            object.position.y = -(bbox.min.y);
            object.position.z = 100 - bbox.max.z;
            scene.add(object)
        }
    )

    fbxLoader.load(
        '/JS/assets/3D_models/palette.fbx',
        (object) => {
            const loader = new THREE.TextureLoader()
            const material = new THREE.MeshBasicMaterial({
                color: 0xFF8844,
                map: loader.load('/JS/assets/3D_models/textures/palette.png'),
            });
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = material.map; // assign your diffuse texture here
                }
            });
            object.scale.set(.1, .1, .1)
            object.rotation.y = toRad(-180);
            object.position.x = -50;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.x = -50 - (bbox.min.x - bbox.max.x) / 2;
            object.position.y = -(bbox.min.y) * 2;
            object.position.z = 100 - bbox.max.z;
            scene.add(object)
        }
    )
    fbxLoader.load(
        '/JS/assets/3D_models/palette.fbx',
        (object) => {
            const loader = new THREE.TextureLoader()
            const material = new THREE.MeshBasicMaterial({
                color: 0xFF8844,
                map: loader.load('/JS/assets/3D_models/textures/palette.png'),
            });
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = material.map; // assign your diffuse texture here
                }
            });
            object.scale.set(.1, .1, .1)
            object.rotation.y = toRad(-170);
            object.position.x = -50;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.x = -47 - (bbox.min.x - bbox.max.x) / 2;
            object.position.y = -(bbox.min.y) * 3;
            object.position.z = 100 - bbox.max.z;
            scene.add(object)
        }
    )

    fbxLoader.load(
        '/JS/assets/3D_models/scifi_gen.fbx',
        (object) => {
            const loader = new THREE.TextureLoader()
            const material = new THREE.MeshBasicMaterial({
                color: 0xFF8844,
                map: loader.load('/JS/assets/3D_models/SciFi Generator AO.png'),
            });
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.map = material.map; // assign your diffuse texture here
                }
            });
            object.scale.set(.02, .02, .02)
            object.rotation.y = toRad(-90);
            object.position.x = 50;
            let bbox = new THREE.Box3().setFromObject(object);
            object.position.x = 50 + (bbox.min.x - bbox.max.x) / 2;
            // object.position.y = -(bbox.min.y) * 3;
            object.position.z = bbox.max.z;
            scene.add(object)
        }
    )

    let wall1 = new Wall(0, 25, 0, 100, 50, "red");
    wall1 = wall1.create();
    scene.add(wall1);

    let wall2 = new Wall(50, 25, 50, 100, 50, "green");
    wall2 = wall2.create();
    wall2.rotation.y = toRad(-90);
    scene.add(wall2);

    let wall3 = new Wall(-50, 25, 50, 100, 50, "violet");
    wall3 = wall3.create();
    wall3.rotation.y = toRad(90);
    scene.add(wall3);

    let floor = new Floor(0, 0, 50, 100, 100, "blue");
    floor = floor.create();
    scene.add(floor);

    let win = new Opening(0, 0, 0, 20, 10, "window", wall1);
    win = win.create();
    scene.add(win);

    let door = new Opening(0, -50 / 2 + 10, 0, 10, 20, "door", wall2);
    door = door.create();
    scene.add(door);

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

/* -------------------------------------------------------------------------- */
/*                                HELP FUNCTION                               */
/* -------------------------------------------------------------------------- */
window.onkeyup = (e) => {
    if (e.code === 'Space')
        console.log(camera.position);
}

function toRad(val) {
    return val * Math.PI / 180;
}