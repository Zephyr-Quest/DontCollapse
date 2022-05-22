/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

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
import sound from './sound.js';

/* -------------------------------------------------------------------------- */
/*                              GLOBAL VARIABLES                              */
/* -------------------------------------------------------------------------- */

const stats = new Stats();
stats.showPanel(0);

document.body.appendChild(stats.dom);

THREE.Object3D.DefaultUp.set(0, 0, 1);
/**
 * Class Scene -> Objects 3D
 */
export class Scene {

        /**
         * Constructor of Scene
         *
         * @param   {function}  onLoad  
         *
         */
        constructor(onLoad) {
                this.sh = true
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
                this.sortieOpen = false

        }

        /**
         * Load each 3D models (recursive function)
         * @param {Function} callback Function executed after the loading
         */
        loadModels(callback) {
                let loaded = true;

                for (let modelName in Models) {
                        if (!Models.hasOwnProperty(modelName)) continue;

                        const currentModel = Models[modelName];
                        if (!currentModel.isModel || currentModel.instance !== null) continue;

                        loaded = false;

                        this.modelLoader.load(Config.modelsPath + currentModel.model, gltf => {
                                if (gltf.animations && gltf.animations.length > 0) {
                                        const mixer = new THREE.AnimationMixer(gltf.scene);
                                        gltf.animations.forEach(anim => mixer.clipAction(anim).play());
                                        this.mixers.push(mixer);
                                }

                                currentModel.instance = gltf.scene;
                                this.loadModels(callback);
                        });

                        break;
                }

                if (loaded) callback();
        }

        ChangeSh(s) {
                this.sh = s
                this.light.castShadow = this.sh
        }

        /**
         * Init the scene and elements
         *
         */
        init() {
                this.clock = new THREE.Clock();
                this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                this.camera.position.set(800, -800, 550);
                this.camera.name = "pos1"
                document.getElementsByClassName("cameraName")[0].innerText = "Camera 1";

                this.scene = new THREE.Scene();
                const near = 700;
                const far = 1000;
                const colorFog = 0x383331;
                this.scene.fog = new THREE.Fog(colorFog, near, far);
                this.scene.background = new THREE.Color(colorFog);

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
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.BasicShadowMap;
                this.renderer.shadowMapSoft = true;
                this.renderer.setClearColor(0x000000, 0);
                document.body.appendChild(this.renderer.domElement);

                this.controls = new OrbitControls(this.camera, this.renderer.domElement);
                this.controls.enableZoom = false;
                this.controls.enableDamping = false
                this.controls.screenSpacePanning = false;
                this.controls.minDistance = 100;
                this.controls.maxDistance = 500;
                this.controls.maxPolarAngle = Math.PI / 2;
                this.controls.enabled = false

                let color = 0xffffff;
                let intensity = 0.85;
                this.light = new THREE.PointLight(color, intensity, 5000, 2);
                this.light.position.set(0, 0, 130);
                this.light.castShadow = this.sh;
                this.light.shadow.bias = -0.0001
                this.light.shadow.mapSize.width = 1024; // default
                this.light.shadow.mapSize.height = 1024; // default
                this.light.shadow.camera.near = 0.1;
                this.light.shadow.camera.far = 500;
                this.light.decay = 2;
                this.light.penumbra = 1;
                this.scene.add(this.light);

                this.ambiantlight = new THREE.AmbientLight(0x7b7065);
                this.ambiantlight.position.set(0, 0, 130);
                this.scene.add(this.ambiantlight);

                this.raycaster = new THREE.Raycaster();

                window.addEventListener('resize', this.onWindowResize.bind(this), false);
                window.addEventListener('keydown', (event) => {
                        this.changeCamera(event)
                }, false)
                this.renderer.domElement.addEventListener('mousedown', event => {
                        this.onMouseClick(event, this);
                });
                this.renderer.domElement.addEventListener('mousemove', event => {
                        this.mousePos.clientX = event.clientX
                        this.mousePos.clientY = event.clientY
                });
        }
        /**
         * Three JS Animate
         *
         */
        animate() {
                stats.begin();

                // Play animations
                const delta = this.clock.getDelta();
                this.mixers.forEach(mixer => mixer.update(delta));

                this.render();
                requestAnimationFrame(this.animate.bind(this));
                this.controls.update();

                stats.end();
        }

        /**
         * Render Three JS
         *
         */
        render() {
                this.camera.lookAt(new THREE.Vector3(0, 0, 60));
                this.renderer.render(this.scene, this.camera);
                this.onMouseOver(this.mousePos, this)
        }

        /**
         * When window resizes, resize canva
         *
         */
        onWindowResize() {
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
        }

        /**
         * Create Scene on canva, add Objects to the scene and groups
         *
         */
        createScene() {
                let obj, mesh
                this.selectionables = new THREE.Group();
                this.otherLevels = new THREE.Group();
                this.firstLevels = new THREE.Group()

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
                        // Don't add to scene if it's other level than 1
                        if (el.level && el.level > 1) {
                                mesh.level = el.level
                                this.otherLevels.add(mesh)

                        } else {
                                if (el.ray) {
                                        mesh.level = 1
                                        // if (el.name.includes("Mac_")) this.firstLevels.add(mesh)
                                        // let objAnim = mesh.animation
                                        // let obj=mesh.clone()
                                        // obj.animation=objAnim
                                        this.selectionables.add(mesh);
                                } else {
                                        this.scene.add(mesh)
                                }
                        }
                        this.scene.add(this.selectionables);
                })
        }

        /**
         * Upadte Model level
         *
         * @param   {Object}  itemToChange  Object of item to change : id and level
         *
         */
        updateModel(itemToChange) {
                let name;
                switch (itemToChange.obj) {
                        case 0:
                                name = "Mac_Poste a souder"
                                this.levels.welding = itemToChange.level
                                break;
                        case 1:
                                name = "Mac_Assembleur de Precision"
                                this.levels.precision = itemToChange.level
                                break;
                        case 2:
                                name = "Mac_Assembleur Mecanique"
                                this.levels.mechanic = itemToChange.level
                                break;
                        case 3:
                                name = "Mac_Assembleur General"
                                this.levels.general = itemToChange.level
                                break;
                }
                this.selectionables.children.forEach(el => {
                        if (el.name == name) this.otherLevels.add(el)
                })
                this.otherLevels.children.forEach(el => {
                        if (el.name == name && el.level == itemToChange.level) {
                                this.selectionables.add(el)
                        }
                })
        }

        /**
         * Create title above object
         *
         * @param   {Three.Scene}  ctx    Context (scene)
         * @param   {Three.Scene}  sc     Scene
         * @param   {Three.Vector3}  pos    Position of title
         * @param   {String}  name   Name of title
         * @param   {String}  title  Title to display
         *
         */
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

        /**
         * Create Sprite with text inside
         *
         * @param   {Three.Scene}  ctx         Context(Scene)
         * @param   {Three.Scene}  sc          Scene
         * @param   {Three.Vector3}  pos         Position to display
         * @param   {String}  name        Name of Sprite
         * @param   {String}  message     String to didplay
         * @param   {Object}  parameters  Different parameters
         *
         */
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

        /**
         * Action when clicked on object
         *
         * @param   {Event}  event  
         * @param   {Three.Scene}  ctx    Context
         *
         */
        onMouseClick(event, ctx) {
                var position = new THREE.Vector2();
                var domRect = document.getElementById("myThreeJsCanvas").getBoundingClientRect();
                position.x = ((event.clientX - domRect.left) / domRect.width) * 2 - 1;
                position.y = -((event.clientY - domRect.top) / domRect.height) * 2 + 1;

                // Raytracing
                var s = ctx.getSelectionneLePlusProche(position, ctx);
                if (s) {
                        if (this.staticText) {
                                this.scene.remove(this.copyGroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                        }
                        let tempos
                        let prefix = "Mac_"
                        // Remove prefix
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
                        // If it's a lambda object
                        if (!this.openedMenu && (tempname != "Boutique" && tempname != "Chat" && tempname != "Sortie")) {
                                this.openMenu(tempname)
                        } else if (tempname == "Sortie") {
                                // If sortie
                                this.openMenuSortie(s)
                                // sound.startDoor()
                        } else if (tempname == "Chat") {
                                // If chat
                                HUD.openChatModal()
                                this.scene.remove(this.copyGroupSprite)
                                this.scene.remove(this.GroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                                this.GroupSprite = new THREE.Group()
                                this.closeMenu()
                                this.animatedText = false
                                this.staticText = false

                        } else if (tempname == "Boutique") {
                                // If shop
                                HUD.openShopModal()
                                this.scene.remove(this.copyGroupSprite)
                                this.scene.remove(this.GroupSprite)
                                this.copyGroupSprite = new THREE.Group()
                                this.GroupSprite = new THREE.Group()
                                this.closeMenu()
                                this.animatedText = false
                                this.staticText = false

                        }
                        // if (tempname == "Boutique" || tempname == "Chat" || tempname == "Sortie") {
                        //         this.closeMenu()
                        // }
                } else {
                        if (this.staticText) {
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

        /**
         * Change Camera display
         *
         */
        closeCameraDisplay() {
                document.getElementsByClassName("cameraName")[0].style.display = "none"
        }
        OpenCameraDisplay() {
                document.getElementsByClassName("cameraName")[0].style.display = "block"
        }

        goSeeOtherPlayer(obj, pseudo) {
                let index = 0
                let name
                let lvl
                let bla = 0
                this.groupToDisplayAfter = new THREE.Group()
                let i = this.selectionables.children.length
                while (bla < this.selectionables.children.length) {
                        let el = this.selectionables.children[bla]
                        if (el.name.includes("Mac_")) {
                                if (el.name == "Mac_Poste a souder") {
                                        name = "Mac_Poste a souder"
                                        lvl = obj[0].level
                                } else if (el.name == "Mac_Assembleur de Precision") {
                                        name = "Mac_Assembleur de Precision"
                                        lvl = obj[1].level
                                } else if (el.name == "Mac_Assembleur Mecanique") {
                                        name = "Mac_Assembleur Mecanique"
                                        lvl = obj[2].level
                                } else if (el.name == "Mac_Assembleur General") {
                                        name = "Mac_Assembleur General"
                                        lvl = obj[3].level
                                }
                                if (el.name.includes("Mac_Boutique")) {
                                        this.scene.add(el)
                                        el.same = true
                                }
                                if (el.name.includes("Mac_Sortie")) {
                                        this.scene.add(el)
                                        el.same = true
                                }
                                if (el.name.includes("Mac_Chat")) {
                                        this.scene.add(el.clone())
                                }
                                if (el.name == name && el.hasOwnProperty("level") && lvl == el.level) {
                                        el.same = true
                                        this.scene.add(el)
                                        i--
                                        bla--
                                } else if (el.name == name && el.hasOwnProperty("level") && lvl != el.level) {
                                        this.groupToDisplayAfter.add(el)
                                        i--
                                        bla--
                                        this.otherLevels.children.forEach(els => {
                                                if (els.name == name && els.level == lvl) this.scene.add(els)
                                        })

                                }


                        }
                        bla += 1
                }
                this.OpenCameraDisplay()
                let menu = document.getElementsByClassName("usineDiv")[0]
                menu.style.display = "flex"
                menu.style.left = "0"
                menu.style.marginLeft = "20px";
                menu.style.transform = "translateX(0%)"
                menu.innerHTML = "Usine de " + pseudo + "<br>> Retourner à mon usine <";


                let menu2 = document.getElementById("myMenuSortie")
                if (menu2.style.display == "block") menu2.style.display = "none"
                this.sortieOpen = false;
                // document.getElementById("myThreeJsCanvas").style.pointerEvents = "none"
                this.scene.remove(this.copyGroupSprite)
                this.scene.remove(this.GroupSprite)
                this.copyGroupSprite = new THREE.Group()
                this.GroupSprite = new THREE.Group()
                menu.addEventListener("mousedown", () => {
                        // sound.startDoor()
                        menu.style.display = "none"
                        this.sortieOpen = true;
                        this.comeBackHome()
                })
        }

        comeBackHome() {
                let j = this.scene.children.length
                let jj = 0
                let i = this.groupToDisplayAfter.children.length
                let ii = 0
                log(this.groupToDisplayAfter.children)
                if (i > 0) {
                        while (ii < this.groupToDisplayAfter.children.length) {
                                let el = this.groupToDisplayAfter.children[ii]
                                this.selectionables.add(el)
                                i--
                                this.scene.children.forEach(ets => {
                                        if (el.name == ets.name) this.otherLevels.add(ets)
                                })
                        }
                }
                if (j > 0) {
                        while (jj < this.scene.children.length) {
                                let el = this.scene.children[jj]
                                if (el.hasOwnProperty("same")) {
                                        delete el.same
                                        this.selectionables.add(this.scene.children[jj])
                                        j--
                                        jj--
                                }

                                jj++
                        }
                }
                document.getElementById("myThreeJsCanvas").style.pointerEvents = "auto"
                this.groupToDisplayAfter = new THREE.Group()
                this.closeMenu();
                WebSocket.emit("moumou_la_reine_des_mouettes_comeback", document.getElementById("username").value)
        }

        /**
         * Open me menu of machine
         *
         * @param   {Three.mesh}  s  Mesh to open menu
         *
         */
        openMenu(s) {
                this.closeCameraDisplay()
                let menu = document.getElementById("myMenuShop")
                let lvl
                switch (s) {
                        case "Poste a souder":
                                lvl = this.levels.welding
                                break;
                        case "Assembleur de Precision":
                                lvl = this.levels.precision
                                break;
                        case "Assembleur Mecanique":
                                lvl = this.levels.mechanic
                                break;
                        case "Assembleur General":
                                lvl = this.levels.general
                                break;

                }
                document.getElementById("icon1").title = s
                document.getElementById("icon1").addEventListener("click", () => {
                        HUD.openSpecificMachine(lvl)
                }, {
                        once: true
                })
                document.getElementById("title_menuShop").innerText = "Menu : " + s + " Niveau " + lvl;
                menu.style.display = "block"
                let canClose = true
                this.scene.children.forEach(el => {
                        if (el.hasOwnProperty("same")) canClose = false
                })
                menu = document.getElementById("myMenuSortie")
                // if (canClose && menu.style.display == "block") {
                menu.style.display = "none"
                // }
        }

        /**
         * Open door menu to go see other players
         *
         * @param   {Three.mesh}  s  Door
         *
         */

        openMenuSortie(s) {
                let players = WebSocket.getConnectedPlayers()
                let sortie = document.getElementById("SortiWrap");
                let user = document.getElementById("username").value
                sortie.innerHTML = ""
                this.sortieOpen = true
                this.closeCameraDisplay()
                players.forEach(el => {
                        if (el != user) {
                                let divWrap = document.createElement("div")
                                divWrap.style.cursor = 'pointer'
                                divWrap.classList.add("Sicon1")
                                let ion = "<ion-icon name='person-outline'></ion-icon>"
                                let pe = document.createElement("p")
                                pe.innerText = el
                                divWrap.innerHTML = ion
                                divWrap.appendChild(pe)
                                sortie.appendChild(divWrap)
                        }
                })


                let menu = document.getElementById("myMenuShop")
                if (menu.style.display == "block") menu.style.display = "none"
                menu = document.getElementById("myMenuSortie")
                document.getElementById("title_menuSortie").innerText = "Aller voir le joueur :"
                menu.style.display = "block"
                s.rotation.y = Math.PI
                s.position.x = 10
                s.position.y = 225
                sound.startDoor()
                this.selectionables.remove(s)
                this.scene.add(s)
        }

        /**
         * Close menu of objects
         *
         */
        closeMenu() {
                this.OpenCameraDisplay()
                let menu = document.getElementById("myMenuShop")
                if (menu.style.display == "block") menu.style.display = "none"
                menu = document.getElementById("myMenuSortie")
                if (menu.style.display == "block") menu.style.display = "none"
                this.scene.children.forEach(el => {
                        if (el.name == "Mac_Sortie") {
                                if (this.sortieOpen) {
                                        sound.startDoor()
                                        this.sortieOpen = false
                                        this.scene.remove(el)
                                        this.selectionables.add(el)
                                        el.rotation.y = Math.PI / 2
                                        el.position.x = -15
                                        el.position.y = 250.5
                                }
                        }
                })
        }

        /**
         * Mouse over event
         *
         * @param   {Event}  event  
         * @param   {Three.Scene}  ctx    Context
         *
         */
        onMouseOver(event, ctx) {
                var position = new THREE.Vector2();
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
                                if (tempname == "Chat") {
                                        let unread = WebSocket.getUnreadMessage();
                                        if (unread != 0) {
                                                tempname += " ("
                                                tempname += unread
                                                tempname += " non lu)"
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

        /**
         * Get selection near (raytracing)
         *
         * @param   {Three.Vector3}  position  
         * @param   {Three.scene}  ctx       Context
         *
         * @return  {Three.mesh}            Object cut by ray
         */
        getSelectionneLePlusProche(position, ctx) {
                // Mise à jour de la position du rayon à lancer.
                ctx.raycaster.setFromCamera(position, ctx.camera);
                // Obtenir la liste des intersections
                var selectionnes = ctx.raycaster.intersectObjects(ctx.selectionables.children);
                if (selectionnes.length) {
                        return selectionnes[0].object;
                }
        }

        /**
         * When press 1, 2 or 3 change camera
         *
         * @param   {Event}  event  
         *
         */
        changeCamera(event) {
                let cam = 1
                if (document.activeElement.tagName == "INPUT") cam = 0
                if (cam == 1) {
                        switch (event.keyCode) {
                                case 49:
                                        // 1 pressed
                                        if (this.camera.name != "pos1") {
                                                this.camera.position.set(800, -800, 550);
                                                document.getElementsByClassName("cameraName")[0].innerText = "Camera 1";
                                                this.camera.name = "pos1"
                                        }
                                        break;
                                case 50:
                                        // 2 pressed
                                        if (this.camera.name != "pos2") {
                                                this.camera.position.set(0, -800, 550);
                                                document.getElementsByClassName("cameraName")[0].innerText = "Camera 2";
                                                this.camera.name = "pos2"
                                        }
                                        break;
                                case 51:
                                        // 3 pressed
                                        if (this.camera.name != "pos3") {
                                                this.camera.name = "pos3"
                                                document.getElementsByClassName("cameraName")[0].innerText = "Camera 3";
                                                this.camera.position.set(-800, -800, 550);
                                        }
                                        break;
                        }
                }
        }
}