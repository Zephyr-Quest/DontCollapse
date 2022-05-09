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
                this.mixers = [];
                this.currentMixerId = 0;
                this.clock = new THREE.Clock();
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
                                // Manage animations
                                if (gltf.animations && gltf.animations.length > 0) {
                                        const mixer = new THREE.AnimationMixer(gltf.scene);
                                        gltf.animations.forEach(anim => mixer.clipAction(anim).play());
                                        this.mixers.push(mixer);
                                }

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
                this.clock = new THREE.Clock();
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
                        logarithmicDepthBuffer: true,
                        powerPreference: "high-performance",
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this.renderer.shadowMapSoft = false;
                this.renderer.setClearColor(0x000000, 0);
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

                let color = 0xffffff;
                let intensity = 0.85;
                this.light = new THREE.PointLight(color, intensity, 5000, 2);
                this.light.position.set(0, 0, 130);
                this.light.castShadow = false;
                this.light.shadow.bias = -0.001
                this.light.shadow.mapSize.width = 2048; // default
                this.light.shadow.mapSize.height = 2048; // default
                this.light.shadow.camera.near = 0.1;
                this.light.shadow.camera.far = 500;
                this.light.shadow.radius = 10
                this.light.decay = 2;
                this.light.penumbra = 1;
                this.scene.add(this.light);


                this.ambiantlight = new THREE.AmbientLight(0x505050);
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

                // Play animations
                const delta = this.clock.getDelta();
                this.mixers.forEach(mixer => mixer.update(delta));

                this.render();
                requestAnimationFrame(this.animate.bind(this));
                this.controls.update();
                this.light.shadow.autoUpdate = false
                stats.end();
        }


        render() {

                this.renderer.render(this.scene, this.camera);
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
        }

        createTitles(ctx, sc, pos, name, title) {
                this.makeTextSprite(ctx, sc, pos, name, title, {
                        "fontsize": 50,
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
                        //! If clicked
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
                if (s) {
                        if (!this.animatedText) {
                                let tempos
                                document.getElementsByTagName("body")[0].style.cursor = "pointer"
                                let prefix = "Mac_"
                                while (!s.name.includes(prefix)) {
                                        s = s.parent
                                }
                                let tempname = s.name
                                tempname = tempname.replace(prefix, "")
                                console.log(s)
                                if (tempname == "Shop" || tempname == "Chat") {
                                        tempos = {
                                                x: s.position.x,
                                                y: s.position.y - 100,
                                                z: s.position.z,
                                        }
                                } else {
                                        tempos = {
                                                x: s.position.x,
                                                y: s.position.y,
                                                z: s.position.z *2,
                                        }

                                }
                                this.createTitles(this, this.scene, tempos, "Sprite" + tempname, tempname)
                                this.scene.add(this.GroupSprite)
                                this.animatedText = true
                        }
                } else {
                        if (this.animatedText) {
                                this.animatedText = false
                                this.scene.remove(this.GroupSprite)
                                this.GroupSprite = new THREE.Group()
                                document.getElementsByTagName("body")[0].style.cursor = "auto"

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
                context.fillStyle = "rgba(" + textColor.r + ", " + textColor.g + ", " + textColor.b + ", 1.0)";
                context.fillText(message, borderThickness, fontsize + borderThickness);
                context.imageSmoothingQuality = "high"
                context.textAlign="center"

                var texture = new THREE.Texture(canvas)
                texture.needsUpdate = true;
                
                var spriteMaterial = new THREE.SpriteMaterial({
                        map: texture,
                        useScreenCoordinates: false,
                        depthWrite:false,
                        depthTest:true
                });
                var sprite = new THREE.Sprite(spriteMaterial);
                sprite.scale.set(0.5 * fontsize+70, 50+0.25 * fontsize,50+ 0.75 * fontsize);

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
                // texteSprite.add(sc.lightTxt)
                texteSprite.visible = true
                texteSprite.name = name
                ctx.GroupSprite.add(texteSprite)
        }

        
}