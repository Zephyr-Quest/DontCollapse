import * as THREE from 'three';
import {
        OrbitControls
} from 'https://unpkg.com/three@0.137.0/examples/jsm/controls/OrbitControls.js';

import {
        GLTFLoader
} from 'https://unpkg.com/three@0.137.0/examples/jsm/loaders/GLTFLoader.js';
import {
        Config
} from './config/config.js';
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
import {
        Models
} from "./config/models.js";




const stats = new Stats();
stats.showPanel(0);

document.body.appendChild(stats.dom);

THREE.Object3D.DefaultUp.set(0, 0, 1);

export class Scene {

        constructor(onLoad) {
                this.loadManager = new THREE.LoadingManager();
                this.textureLoader = new THREE.TextureLoader(this.loadManager);
                this.modelLoader = new GLTFLoader();
                this.loadModels(onLoad);
        }

        /**
         * Load each 3D models (recursive function)
         * @param {Function} callback Function executed after the loading
         */
        loadModels(callback) {
                let loaded = true;

                // Try to find an unloaded model in 'Model3D'
                for (let modelName in Models) {
                        if (!Models.hasOwnProperty(modelName)) continue;

                        const currentModel = Models[modelName];
                        if (!currentModel.isModel || currentModel.instance !== null) continue;

                        // The model is not loaded yet
                        loaded = false;

                        // Add the model to the load manager
                        this.modelLoader.load(Config.modelsPath + currentModel.model, gltf => {
                                currentModel.instance = gltf.scene;

                                // Load the other models
                                this.loadModels(callback);
                        });

                        break;
                }

                // Start ThreeJS when it's done
                if (loaded) callback();
        }

        init() {

                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                this.camera.position.set(1000, -1000, 500);
                // this.camera.position.set(0, 0, 0);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));

                this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color('black');


                /* ---------------------------------- CANVA --------------------------------- */
                this.renderer = new THREE.WebGLRenderer({
                        canvas: document.getElementById('myThreeJsCanvas'),
                        alpha: true,
                        antialias: true,
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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

                const color = 0xfff6D3;
                const intensity = 0.6;
                this.light = new THREE.PointLight(color, intensity);
                this.light.position.set(0, 0, 130);
                this.light.castShadow = true;
                this.light.shadow.mapSize.width = 512; // default
                this.light.shadow.mapSize.height = 512; // default
                this.light.shadow.camera.near = 0.5; // default
                this.light.shadow.camera.far = 500;
                this.scene.add(this.light);

                this.helper = new THREE.PointLightHelper(this.light);
                this.scene.add(this.helper);

                this.ambiantlight = new THREE.AmbientLight(0x303030);
                this.ambiantlight.position.set(0, 0, 130);
                this.scene.add(this.ambiantlight);

                //if window resizes
                window.addEventListener('resize', this.onWindowResize, false);
                window.addEventListener('keydown', (event) => {
                        this.changeCamera(event)
                }, false)

                this.axesHelper = new THREE.AxesHelper(1000);
                this.scene.add(this.axesHelper);

                this.raycaster = new THREE.Raycaster();
                this.renderer.domElement.addEventListener('mousedown', event => {
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
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        if (el.ray) {
                                this.selectionables.add(mesh);
                        } else {
                                this.scene.add(mesh)
                        }
                });
                this.scene.add(this.selectionables);
                // this.createTitles(this.scene)
        }
        createTitles(sc) {
                let txt = makeTextSprite("BAAAAAA", {
                        "fontsize": 100
                })
                sc.add(txt);
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
                        s.scale.set(Config.scaleRay, Config.scaleRay, Config.scaleRay)
                        setTimeout(() => {
                                s.scale.set(1, 1, 1)
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
        changeCamera(event) {
                switch (event.keyCode) {
                        case 49:
                                // 1 pressed
                                this.camera.position.set(1000, -1000, 500);
                                break;
                        case 50:
                                // 2 pressed
                                this.camera.position.set(0, -1000, 500);
                                break;
                        case 51:
                                // 3 pressed
                                this.camera.position.set(-1000, -1000, 500);
                                break;
                }
        }

}

function makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Arial";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
                r: 0,
                g: 0,
                b: 0,
                a: 1.0
        };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
                r: 255,
                g: 255,
                b: 255,
                a: 1.0
        };
        var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {
                r: 0,
                g: 0,
                b: 0,
                a: 1.0
        };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText(message);
        var textWidth = metrics.width;

        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        // roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8);

        context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
        context.fillText(message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                useScreenCoordinates: false
        });
        var sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;
}