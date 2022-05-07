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
                this.GroupSprite = new THREE.Group()
                this.loadManager = new THREE.LoadingManager();
                this.textureLoader = new THREE.TextureLoader(this.loadManager);
                this.modelLoader = new GLTFLoader();
                this.loadModels(onLoad);
                this.animatedtextShop = false
                this.animatedTextChat = false
                this.mousePos = {
                        clientX: 0,
                        clientY: 0,
                }
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
                this.camera.position.set(800, -800, 800);
                // this.camera.position.set(0, 0, 0);
                this.camera.lookAt(new THREE.Vector3(0, 0, 0));
                this.camera.name = "pos1"

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
                this.renderer.shadowMapSoft = true;
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

                let color = 0xfff6D3;
                let intensity = 0.1;
                this.light = new THREE.DirectionalLight(color, intensity);
                this.light.position.set(0, 0, 100);
                //! this.light.castShadow = true;
                this.light.shadow.mapSize.width = 2048; // default
                this.light.shadow.mapSize.height = 2048; // default
                this.light.shadow.camera.near = 0.5; // default
                this.light.shadow.camera.far = 1000;
                // this.light.shadow.autoUpdate=false
                this.scene.add(this.light);

                // color = 0xfff6D3;
                intensity = 0.9;
                this.light = new THREE.PointLight(color, intensity, 5000, 2);
                this.light.position.set(0, 0, 130);
                //! this.light.castShadow = true;
                this.light.shadow.bias = -0.001
                // this.light.shadow.autoUpdate=false
                this.light.shadow.mapSize.width = 2048; // default
                this.light.shadow.mapSize.height = 2048; // default
                this.light.shadow.camera.near = 0.1;
                this.light.shadow.camera.far = 500;
                this.light.shadow.radius=10
                this.light.decay = 10;
                this.scene.add(this.light);

                this.helper = new THREE.PointLightHelper(this.light);
                this.scene.add(this.helper);

                this.ambiantlight = new THREE.AmbientLight(0x707070);
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
                this.renderer.domElement.addEventListener('mousemove', event => {
                        this.mousePos.clientX = event.clientX
                        this.mousePos.clientY = event.clientY
                });

                // this.animate()
        }

        animate() {
                stats.begin();
                this.render();
                requestAnimationFrame(this.animate.bind(this));
                this.controls.update();
                stats.end();
        }


        render() {
                this.renderer.render(this.scene, this.camera);
                this.light.shadow.autoUpdate = false
                // this.GroupSprite.shadow.autoUpdate=false
                this.onMouseOver(this.mousePos, this)
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
                        mesh.traverse(n => {
                                if (n.isMesh) {
                                        n.castShadow = true;
                                        n.receiveShadow = true;
                                        if (n.material.map) n.material.map.anisotropy = 16;
                                }
                        });
                        if (el.ray) {
                                this.selectionables.add(mesh);
                        } else {
                                this.scene.add(mesh)
                        }
                });
                this.scene.add(this.selectionables);
                this.createTitles(this, this.scene, {
                        x: 150,
                        y: 130,
                        z: 150 / 2,
                }, "shop", "SHOP")
                this.createTitles(this, this.scene, {
                        x: -150,
                        y: 80,
                        z: 150 / 2,
                }, "chat", "CHAT")
                this.scene.add(this.GroupSprite)

        }
        createTitles(ctx, sc, pos, name, title) {
                this.makeTextSprite(ctx, sc, pos, name, title, {
                        "fontsize": 100,
                        "fontface": 'Koulen',
                        "textColor": {
                                r: 255,
                                g: 255,
                                b: 255,
                                a: 1.0
                        }
                })
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
                        s.scale.set(Config.scaleRay, Config.scaleRay, 1)
                        setTimeout(() => {
                                s.scale.set(1, 1, 1)
                        }, 90)
                }
        }
        onMouseOver(event, ctx) {
                var position = new THREE.Vector2();
                // On conserve la position de la souris dans l'espace de coordonnées
                // NDC (Normalized device coordinates).
                var domRect = document.getElementById("myThreeJsCanvas").getBoundingClientRect();
                position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
                position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

                var s = ctx.getSelectionneLePlusProche(position, ctx);
                // console.log(s)
                if (s) {
                        if (s.name == "Shop" && !this.animatedtextShop) {
                                this.animatedtextShop = true
                                for (const e of this.GroupSprite.children) {
                                        if (e.name == "shop") {
                                                e.visible = true
                                        }
                                }
                        } else if (s.name == "Chat" && !this.animatedtextShop) {
                                this.animatedtextChat = true
                                for (const e of this.GroupSprite.children) {
                                        if (e.name == "chat") {
                                                e.visible = true
                                        }
                                }
                        }
                } else {
                        for (const e of this.GroupSprite.children) {
                                this.animatedtextShop = false
                                this.animatedtextChat = false
                                e.visible = false
                        }
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
                                if (this.camera.name != "pos1") {
                                        this.camera.position.set(800, -800, 800);
                                        this.camera.name = "pos1"
                                }
                                break;
                        case 50:
                                // 2 pressed
                                if (this.camera.name != "pos2") {
                                        this.camera.position.set(0, -800, 800);
                                        this.camera.name = "pos2"
                                }
                                break;
                        case 51:
                                // 3 pressed
                                if (this.camera.name != "pos3") {
                                        this.camera.name = "pos3"
                                        this.camera.position.set(-800, -800, 800);
                                }
                                break;
                }
        }

        makeTextSprite(ctx, sc, pos, name, message, parameters) {
                if (parameters === undefined) parameters = {};
                var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Koulen";
                var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
                var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 10;
                var borderColor = parameters.hasOwnProperty("borderColor") ? parameters["borderColor"] : {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1.0
                };
                var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
                        r: 0,
                        g: 0,
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
                canvas.style.width = "100%"
                canvas.style.height = "100%"
                var context = canvas.getContext('2d');
                context.font = "Bold " + fontsize + "px " + fontface;
                context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
                context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
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
                const color = 0xfff6D3;
                const intensity = 0.2;
                sc.lightTxt = new THREE.PointLight(color, intensity);
                sc.lightTxt.position.set(pos.x, pos.y, pos.z);
                // sc.lightTxt.castShadow = true;
                sc.lightTxt.shadow.mapSize.width = 2048; // default
                sc.lightTxt.shadow.mapSize.height = 2048; // default
                sc.lightTxt.shadow.camera.near = 0.1; // default
                sc.lightTxt.shadow.camera.far = 700;
                sprite.position.x = pos.x
                sprite.position.y = pos.y
                sprite.position.z = pos.z
                let texteSprite = new THREE.Group()
                texteSprite.add(sprite)
                texteSprite.add(sc.lightTxt)
                texteSprite.visible = false
                texteSprite.name = name
                ctx.GroupSprite.add(texteSprite)
        }
}