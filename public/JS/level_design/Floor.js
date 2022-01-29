import {
    Locatable
} from "./Locatable.js";
import * as THREE from 'three';


export class Floor extends Locatable {
    constructor(x, y, z, length, width, color) {
        super(x, y, z);
        //TODO ERROR HERE FOR TEXTURE
        this.texture = "./text/wall.jpg";
        this.length = length;
        this.width = width;
        this.color=color;
    }

    create() {
        const loader = new THREE.TextureLoader();

        const wallGeometry = new THREE.PlaneGeometry(this.length, this.width);
        const wallMaterial = new THREE.MeshBasicMaterial({
            color: this.color,
            //TODO ERROR HERE FOR TEXTURE
            // map: loader.load(this.texture),
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);

        // Set the rotation
        wall.rotation.x=-90*Math.PI/180;
        wall.position.set(this.getPositionArray()[0], this.getPositionArray()[1], this.getPositionArray()[2])

        return wall;
    }

};