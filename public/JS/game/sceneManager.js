import * as THREE from 'three';
import {
        OrbitControls
} from 'https://unpkg.com/three@0.137.0/examples/jsm/controls/OrbitControls.js';

import {
        FBXLoader
} from 'https://unpkg.com/three@0.137.0/examples/jsm/loaders/FBXLoader.js'
import {
        Config
} from '../game/config/config.js';
import {
        LoopOnce,
        Vector3
} from 'three';

const stats = new Stats();
stats.showPanel(0);

document.body.appendChild(stats.dom);


export class Scene {

        constructor() {
                this.loadManager = new THREE.LoadingManager();
                this.textureLoader = new THREE.TextureLoader(this.loadManager);

                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                this.camera.position.x =Config.camX;
                this.camera.position.y =Config.camY;
                this.camera.position.z =Config.camZ;

                this.scene = new THREE.Scene();

                /* ---------------------------------- CANVA --------------------------------- */
                this.renderer = new THREE.WebGLRenderer({
                        canvas: document.getElementById('myThreeJsCanvas'),
                        alpha: true,
                        antialias: true,
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(this.renderer.domElement);

                /* --------------------- Setting up the camera controls --------------------- */
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.listenToKeyEvents(window); // optional

                this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                this.controls.dampingFactor = 0.05;

                this.controls.screenSpacePanning = false;

                this.controls.minDistance = 100;
                this.controls.maxDistance = 500;

                this.controls.maxPolarAngle = Math.PI / 2;

                //ambient light which is for the whole scene
                let ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
                ambientLight.castShadow = false;
                this.scene.add(ambientLight);

                //spot light which is illuminating the chart directly
                let spotLight = new THREE.SpotLight(0xffffff, 0.55);
                spotLight.castShadow = true;
                spotLight.position.set(0, 40, 10);
                this.scene.add(spotLight);


                //if window resizes
                window.addEventListener('resize', this.onWindowResize, false);

                this.axesHelper = new THREE.AxesHelper(1000);
                this.scene.add(this.axesHelper);

                this.animate()
        }

        animate() {
                requestAnimationFrame(this.animate.bind(this));
                this.render();
                this.controls.update();
        }


        render() {
                this.renderer.render(this.scene, this.camera);
        }


        onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
}