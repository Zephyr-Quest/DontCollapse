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

import HUD from "../game/hud/hud.js"
import WebSocket from '../WebSocket.js';



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
                this.staticText = false
                this.mousePos = {
                        clientX: 0,
                        clientY: 0,
                }
                this.mixers = [];
                this.currentMixerId = 0;
                this.clock = new THREE.Clock();
                this.openedMenu = false

                this.levels = {
                        precision: 1,
                        general: 1,
                        welding: 1,
                        mechanic: 1
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
                // this.scene.background = new THREE.Color('white');
                const near = 700;
                const far = 1000;
                const colorFog = 'lightblue';
                this.scene.fog = new THREE.Fog(colorFog, near, far);
                this.scene.background = new THREE.Color(colorFog);

                /* ---------------------------------- CANVA --------------------------------- */
                this.renderer = new THREE.WebGLRenderer({
                        canvas: document.getElementById('myThreeJsCanvas'),
                        alpha: true,
                        antialias: true,
                        logarithmicDepthBuffer: false,
                        powerPreference: "high-performance",
                });
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.renderer.shadowMap.enabled = false;
                this.renderer.shadowMap.type = THREE.BasicShadowMap;
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
                this.light.shadow.bias = -0.0001
                this.light.shadow.mapSize.width = 1024; // default
                this.light.shadow.mapSize.height = 1024; // default
                this.light.shadow.camera.near = 0.1;
                this.light.shadow.camera.far = 500;
                // this.light.shadow.radius = 10
                this.light.decay = 2;
                this.light.penumbra = 1;
                this.scene.add(this.light);


                this.ambiantlight = new THREE.AmbientLight(0x7b7065);
                this.ambiantlight.position.set(0, 0, 130);
                this.scene.add(this.ambiantlight);

                //if window resizes
                window.addEventListener('resize', this.onWindowResize.bind(this), false);
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
                // this.light.shadow.autoUpdate = false
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
                        "fontsize": 25,
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
                console.log("S : ", s)
                if (s) {
                        if (this.staticText) {
                                this.scene.remove(this.copyGroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                        }
                        let tempos
                        let prefix = "Mac_"
                        while (!s.name.includes(prefix)) {
                                s = s.parent
                        }
                        let tempname = s.name
                        tempname = tempname.replace(prefix, "")
                        if (tempname == "Boutique" || tempname == "Chat" || tempname == "Sortie") {
                                tempos = {
                                        x: s.position.x,
                                        y: s.position.y - (250 - s.position.y + 45),
                                        z: s.position.z,
                                }
                        } else {
                                tempos = {
                                        x: s.position.x,
                                        y: s.position.y,
                                        z: s.position.z * 2,
                                }

                        }
                        this.createTitles(this, this.scene, tempos, "Sprite" + tempname, tempname)
                        this.copyGroupSprite = this.GroupSprite.clone()
                        this.scene.remove(this.GroupSprite)
                        this.GroupSprite = new THREE.Group()
                        this.scene.add(this.copyGroupSprite)
                        this.staticText = true
                        if (!this.openedMenu && (tempname != "Boutique" && tempname != "Chat" && tempname != "Sortie")) {
                                this.openMenu(tempname)
                        } else if (tempname == "Sortie") {
                                this.openMenuSortie(s)
                        } else if (tempname == "Chat") {
                                HUD.openChatModal()
                                this.scene.remove(this.copyGroupSprite)
                                this.scene.remove(this.GroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                                this.GroupSprite = new THREE.Group()
                                this.closeMenu()
                                this.animatedText = false
                                this.staticText = false

                        } else if (tempname == "Boutique") {
                                HUD.openShopModal()
                                this.scene.remove(this.copyGroupSprite)
                                this.scene.remove(this.GroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                                this.GroupSprite = new THREE.Group()
                                this.closeMenu()
                                this.animatedText = false
                                this.staticText = false
                        } else if (tempname == "Boutique" || tempname == "Chat" || tempname == "Sortie") {
                                this.closeMenu()
                        }
                } else {
                        if (this.staticText) {
                                HUD.closeAllModals()
                                this.closeMenu()
                                this.animatedText = false
                                this.staticText = false
                                this.scene.remove(this.copyGroupSprite)
                                this.scene.remove(this.GroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                                this.GroupSprite = new THREE.Group()
                        }
                }
        }
        openMenu(s) {
                let menu = document.getElementById("myMenuShop")
                document.getElementById("title_menuShop").innerText = "Menu : " + s
                menu.style.display = "block"
                menu = document.getElementById("myMenuSortie")
                if (menu.style.display == "block") menu.style.display = "none"
        }
        openMenuSortie(s) {
                let players = WebSocket.getConnectedPlayers()
                let sortie = document.getElementById("SortiWrap");
                sortie.innerHTML=""
                players.forEach(el => {
                        let divWrap = document.createElement("div")
                        divWrap.classList.add("Sicon1")
                        let ion = "<ion-icon name='person-outline'></ion-icon>"
                        let pe = document.createElement("p")
                        pe.innerText=el    
                        
                        divWrap.innerHTML=ion
                        
                        console.log(pe)
                        divWrap.appendChild(pe)
                        sortie.appendChild(divWrap)
                })


                let menu = document.getElementById("myMenuShop")
                if (menu.style.display == "block") menu.style.display = "none"
                menu = document.getElementById("myMenuSortie")
                document.getElementById("title_menuSortie").innerText = "Aller voir le joueur :"
                menu.style.display = "block"
                s.rotation.y = Math.PI
                s.position.x = 10
                s.position.y = 225
                this.selectionables.remove(s)
                this.scene.add(s)
        }
        closeMenu() {
                let menu = document.getElementById("myMenuShop")
                if (menu.style.display == "block") menu.style.display = "none"
                menu = document.getElementById("myMenuSortie")
                if (menu.style.display == "block") menu.style.display = "none"
                this.scene.children.forEach(el => {
                        if (el.name == "Mac_Sortie") {
                                this.scene.remove(el)
                                this.selectionables.add(el)
                                el.rotation.y = Math.PI / 2
                                el.position.x = -15
                                el.position.y = 250.5
                        }
                })


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
                        let prefix = "Mac_"
                        while (!s.name.includes(prefix)) {
                                s = s.parent
                        }
                        let tempname = s.name
                        tempname = tempname.replace(prefix, "")
                        let tempnameSprite = "Sprite" + tempname
                        if (this.GroupSprite.children.length != 0) {
                                if (tempnameSprite != this.GroupSprite.children[0].name) {
                                        this.scene.remove(this.GroupSprite)
                                        this.GroupSprite = new THREE.Group();
                                        this.animatedText = false
                                }
                        }
                        if (!this.animatedText) {
                                let tempos
                                if (tempname == "Boutique" || tempname == "Chat" || tempname == "Sortie") {
                                        tempos = {
                                                x: s.position.x,
                                                y: s.position.y - (250 - s.position.y + 45),
                                                z: s.position.z,
                                        }
                                } else {
                                        tempos = {
                                                x: s.position.x,
                                                y: s.position.y,
                                                z: s.position.z * 2,
                                        }
                                }
                                if (this.copyGroupSprite != this.GroupSprite) {
                                        this.createTitles(this, this.scene, tempos, "Sprite" + tempname, tempname)
                                        this.scene.add(this.GroupSprite)
                                        this.animatedText = true
                                        document.getElementsByTagName("body")[0].style.cursor = "pointer"

                                }
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
                        b: 255,
                        a: 1.0
                };
                var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters["backgroundColor"] : {
                        r: 255,
                        g: 255,
                        b: 0,
                        a: 1.0
                };
                var textColor = parameters.hasOwnProperty("textColor") ? parameters["textColor"] : {
                        r: 0,
                        g: 0,
                        b: 255,
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
                context.textAlign = "center"

                var texture = new THREE.Texture(canvas)
                texture.needsUpdate = true;
                var spriteMaterial = new THREE.SpriteMaterial({
                        map: texture,
                        // useScreenCoordinates: false,
                        depthWrite: false,
                        depthTest: true,
                });
                var sprite = new THREE.Sprite(spriteMaterial);
                sprite.center.set(0.5 * textWidth * 0.003, 0.65)
                let sca = 120
                sprite.scale.set(0.5 * fontsize + sca + 40, sca + 0.25 * fontsize, sca - 10 + 0.75 * fontsize);
                sprite.position.x = pos.x
                sprite.position.y = pos.y
                sprite.position.z = pos.z
                let texteSprite = new THREE.Group()
                texteSprite.add(sprite)
                texteSprite.visible = true
                texteSprite.name = name
                ctx.GroupSprite.add(texteSprite)
        }


}