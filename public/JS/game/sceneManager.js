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

import {
        ObjectArray
} from "./level_design/scene.js"

import {
        Object3D
} from "./level_design/Object3D.js"




const stats = new Stats();
stats.showPanel(0);

document.body.appendChild(stats.dom);

THREE.Object3D.DefaultUp.set(0, 0, 1);

export class Scene {

        constructor() {
                this.loadManager = new THREE.LoadingManager();
                this.textureLoader = new THREE.TextureLoader(this.loadManager);

                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                this.camera.position.set(1000, -1000, 500);
                // this.camera.position.set(0, 0, 0);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));

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
                this.controls.enableZoom = false;

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

                this.raycaster = new THREE.Raycaster();
                this.renderer.domElement.addEventListener('click', event => {
                        this.onMouseClick(event, this);
                });

                this.animate()
        }

        animate() {
                stats.begin();
                requestAnimationFrame(this.animate.bind(this));
                this.render();
                this.controls.update();
                stats.end();
        }


        render() {
                this.renderer.render(this.scene, this.camera);
        }


        onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        createScene() {
                let obj, mesh
                this.selectionables = new THREE.Group();
                ObjectArray.forEach(el => {
                        obj = new Object3D(el)
                        mesh = obj.getMesh()
                        if (!el.ray) {
                                this.scene.add(mesh)
                        } else {
                                this.selectionables.add(mesh);
                        }
                });
                this.scene.add(this.selectionables);
        }

        onMouseClick(event, ctx) {
                var position = new THREE.Vector2();
                // On conserve la position de la souris dans l'espace de coordonnées
                // NDC (Normalized device coordinates).
                var domRect = document.getElementById("myThreeJsCanvas").getBoundingClientRect();
                position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
                position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

                var s = ctx.getSelectionneLePlusProche(position, ctx);
                if (s) {
                        s.scale.set(Config.scaleRay,Config.scaleRay,Config.scaleRay)
                        setTimeout(() => {
                                s.scale.set(1,1,1)
                        }, 90)
                }
        }


        getSelectionneLePlusProche(position, ctx) {
                // Mise à jour de la position du rayon à lancer.
                ctx.raycaster.setFromCamera(position, ctx.camera);
                // Obtenir la liste des intersections
                var selectionnes = ctx.raycaster.intersectObjects(ctx.selectionables.children);
                if (selectionnes.length) {
                        return selectionnes[0].object;
                }
        }

}