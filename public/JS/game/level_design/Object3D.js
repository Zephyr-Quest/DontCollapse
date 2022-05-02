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
        constructor(x, y, z, length, width, type) {
                super(x, y, z);
                this.length = length;
                this.width = width;
                this.type = type;
                this.loader = new GLTFLoader();
        }

        getMesh() {
                if (Models[this.type].model != null) {
                        loader.load('path/to/model.glb', function (gltf) {
                                return gltf
                        }, undefined, function (error) {
                                console.error(error);
                        });
                } else {
                        this.geometry = new THREE.PlaneGeometry(10, 10);
                        this.material = new THREE.MeshBasicMaterial({
                                color: 0xffff00,
                                side: THREE.DoubleSide
                        });
                        this.mesh = new THREE.Mesh(this.geometry, this.material);
                        return this.mesh;
                }
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