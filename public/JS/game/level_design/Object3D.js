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
        }

        getMesh() {
                console.log(this.model)
                if (Models[this.type].model != null) {
                        this.loader.load("../../../models/desk.glb", (glb) => {
                                this.mesh = glb.scene
                                return this.mesh
                        });
                } else {
                        if (this.type == "wall") {
                                this.geometry = new THREE.PlaneGeometry(this.width, this.length);
                                this.material = new THREE.MeshStandardMaterial({
                                        color: this.color,
                                        side: THREE.FrontSide
                                });
                        }
                        if (this.type == "floor") {
                                this.geometry = new THREE.PlaneGeometry(this.width, this.length);
                                this.material = new THREE.MeshStandardMaterial({
                                        color: this.color
                                });
                        }
                        if (this.type == "cube") {
                                this.geometry = new THREE.BoxGeometry(this.length, this.width, this.heigth)
                                this.material = new THREE.MeshStandardMaterial({
                                        side: THREE.FrontSide,
                                        color: this.color,
                                })
                        }
                }
                this.mesh = new THREE.Mesh(this.geometry, this.material);
                this.mesh.rotation.x = this.rotx;
                this.mesh.rotation.y = this.roty;
                this.mesh.rotation.z = this.rotz;
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