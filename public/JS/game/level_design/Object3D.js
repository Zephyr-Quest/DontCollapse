// Classe, hérite de "Locatable"
// Représente un objet 3D de la scène
// Permet d'intéragir avec ses paramètres

import {
        Locatable
} from "./Locatable.js";

import {
        Models
} from "../config/models.js";

import {
        GLTFLoader
} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";



import * as THREE from 'three';


export class Object3D extends Locatable {
        constructor(el) {
                super(el.x, el.y, el.z);
                this.length = el.length;
                this.width = el.width;
                this.heigth = el.heigth;
                this.type = el.type;
                this.loader = new GLTFLoader();
                this.color = el.color;
                this.rotx = el.rotx * Math.PI / 180
                this.roty = el.roty * Math.PI / 180
                this.rotz = el.rotz * Math.PI / 180
                this.model = Models[this.type].model
                this.loaded = el.loaded
                this.transp = el.transparency
                this.scale = Models[this.type].scale
                this.name = el.name

        }

        getMesh() {
                if (this.transp == undefined) {
                        this.transp = 1
                }
                if (Models[this.type].isModel) {
                        this.mesh = Models[this.type].instance;
                        if (Models[this.type].isClonable) this.mesh = this.mesh.clone();
                        if (Models[this.type].name == "barrel") {
                                this.mesh.children[0].material = new THREE.MeshStandardMaterial({
                                        color: this.color,
                                        side: THREE.DoubleSide,
                                        opacity: this.transp,
                                        metalness: 0.3,
                                        roughness: .6

                                });
                        }
                        if (Models[this.type].name == "ladder") {
                                this.mesh.children[0].material = new THREE.MeshStandardMaterial({
                                        color: this.color,
                                        side: THREE.DoubleSide,
                                        opacity: this.transp,
                                        metalness: 0.3,
                                        roughness: .6

                                });
                        }

                        this.mesh.scale.set(this.scale, this.scale, this.scale)
                        this.mesh.rotation.x = Models[this.type].rotation[0] * Math.PI / 180;
                        this.mesh.rotation.y = Models[this.type].rotation[1] * Math.PI / 180;
                        this.mesh.rotation.z = Models[this.type].rotation[2] * Math.PI / 180;
                } else {
                        if (this.type == "wall") {
                                this.geometry = new THREE.PlaneGeometry(this.width, this.length);
                                this.material = new THREE.MeshStandardMaterial({
                                        color: this.color,
                                        side: THREE.FrontSide,
                                        opacity: this.transp,
                                        transparent: true


                                });
                        }
                        if (this.type == "floor") {
                                this.geometry = new THREE.PlaneGeometry(this.width, this.length);
                                this.material = new THREE.MeshStandardMaterial({
                                        color: this.color,
                                        transparent: true,
                                        opacity: this.transp,
                                        side: THREE.DoubleSide,

                                });
                        }
                        if (this.type == "cube") {
                                this.geometry = new THREE.BoxGeometry(this.length, this.width, this.heigth)
                                this.material = new THREE.MeshStandardMaterial({
                                        side: THREE.DoubleSide,
                                        color: this.color,
                                        transparent: true,
                                        opacity: this.transp,
                                })
                        }
                        if (this.type == "pillar") {
                                this.geometry = new THREE.BoxGeometry(this.length, this.width, this.heigth)
                                this.material = new THREE.MeshStandardMaterial({
                                        side: THREE.DoubleSide,
                                        color: this.color,
                                        opacity: this.transp,
                                        metalness: 0.3,
                                        roughness: 0.5
                                })
                        }
                        this.mesh = new THREE.Mesh(this.geometry, this.material);
                }
                if (this.name == "Assembleur") {
                        this.mesh.visible = true;
                        console.log(this.mesh)
                }

                this.mesh.receiveShadow = true;
                this.mesh.name = this.name
                this.mesh.rotation.x += this.rotx;
                this.mesh.rotation.y += this.roty;
                this.mesh.rotation.z += this.rotz;
                this.mesh.position.x = this.getPositionArray()[0]
                this.mesh.position.y = this.getPositionArray()[1]
                this.mesh.position.z = this.getPositionArray()[2]
                return this.mesh;
        }


        log() {
                console.log(this)
        }

        removeFromScene(sc) {
                sc.remove(this.mesh);
        }

        updateMesh() {
                let a = 1;
                console.log(a);
        }
}