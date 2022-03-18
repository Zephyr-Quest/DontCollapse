// Classe, hérite de "Locatable"
// Représente un objet 3D de la scène
// Permet d'intéragir avec ses paramètres

import {
        Locatable
} from "./Locatable.js";

import {
        Models
} from "../config/models.js";

import * as THREE from 'three';


export class Object3D extends Locatable {
        constructor(x, y, z, length, width, type) {
                super(x, y, z);
                this.length = length;
                this.width = width;
                this.type = type;
        }

        addToScene(scene) {
                if (this.type == "wall") {
                        this.geometry = new THREE.PlaneGeometry(1, 1);
                        this.material = new THREE.MeshBasicMaterial({
                                color: 0xffff00,
                                side: THREE.DoubleSide
                        });
                        this.mesh = new THREE.Mesh(this.geometry, this.material);
                } else {
                        this.mesh = Models[this.type].model.scene.clone();
                }
                scene.add(this.mesh);
        }
        log() {
                console.log(this)
        }

        removeFromScene(scene) {
                scene.remove(this.mesh);
        }

        updateMesh() {
                let a = 1;
                console.log(a);
        }
}