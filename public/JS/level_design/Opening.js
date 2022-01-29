import {
    Locatable
} from "./Locatable.js";
import * as THREE from 'three';


export class Opening extends Locatable {
    constructor(decayX, decayY, decayZ, length, height, type, wall) {
        super(wall.position.x + decayX, wall.position.y + decayY, wall.position.z + decayZ);
        //TODO ERROR HERE FOR TEXTURE
        this.texture = "./text/wall.jpg";
        this.length = length;
        this.height = height;
        this.type = type;
        this.pro = 5;
        this.wall = wall;
    }

    create() {
        const loader = new THREE.TextureLoader();

        const openingGeometry = new THREE.BoxGeometry(this.length, this.height, this.pro);
        switch (this.type) {
            case "window":
                this.color = "orange";
                break;
            case "door":
                this.color = "Cyan";
                break;
        }
        const openingMaterial = new THREE.MeshBasicMaterial({
            color: this.color,
            //TODO ERROR HERE FOR TEXTURE
            // map: loader.load(this.texture),
        });
        const opening = new THREE.Mesh(openingGeometry, openingMaterial);

        // Set the rotation
        opening.rotation.x = this.wall.rotation.x;
        opening.rotation.y = this.wall.rotation.y;
        opening.rotation.z = this.wall.rotation.z;
        opening.position.set(this.getPositionArray()[0],this.getPositionArray()[1],this.getPositionArray()[2])

        return opening;
    }

};