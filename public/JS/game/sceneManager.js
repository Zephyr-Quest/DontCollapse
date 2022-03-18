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
        Vector3
} from 'three';

export class Scene {
        constructor() {
                /* ---------------------------------- Stats --------------------------------- */
                this.stats = new Stats();
                this.stats.showPanel(0);
                document.body.appendChild(this.stats.dom);
                
                /* -------------------------- Textures load manager ------------------------- */
                this.loadManager = new THREE.LoadingManager();
                this.textureLoader = new THREE.TextureLoader(this.loadManager);
                
                /* -------------------------- Setting up the scene -------------------------- */
                this.scene = new THREE.Scene();
                
                /* ------------------------- Setting up the renderer ------------------------ */
                this.renderer = new THREE.WebGLRenderer({
                        antialias: true,
                        alpha: true
                });
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                document.body.appendChild(this.renderer.domElement);

                /* -------------------------- Setting up the camera ------------------------- */
                this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
                this.camera.position.set(Config.camX, Config.camY, Config.camZ);
                this.camera.lookAt(-new Vector3(Config.canX, Config.camY, Config.camZ))
                this.scene.add(this.camera);
                
                /* --------------------- Setting up the camera controls --------------------- */
                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.listenToKeyEvents(window); // optional
                
                this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
                this.controls.dampingFactor = 0.05;

                this.controls.screenSpacePanning = false;
                
                this.controls.minDistance = 100;
                this.controls.maxDistance = 500;
                
                this.controls.maxPolarAngle = Math.PI / 2;
                
                /* ---------------------------- Setting up lights --------------------------- */
                this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
                this.directionalLight.position.set(50, 50, 100);
                this.directionalLight.target.position.set(-50, -50, 0);
                this.scene.add(this.directionalLight);

                this.axesHelper = new THREE.AxesHelper(1000);
                this.scene.add(this.axesHelper);
                
                this.render()
        }
        
        render() {
                // DEBUG : Start calcul frame rate
                // this.stats.begin();

                // Wait before looping
                requestAnimationFrame(this.render);

                // DEBUG : Update OrbitControl (camera control)
                this.controls.update();

                // Rendering the 3D scene
                this.renderer.render(this.scene, this.camera);

                // DEBUG : Stop calcul frame rate
                // this.stats.end();

        }
}