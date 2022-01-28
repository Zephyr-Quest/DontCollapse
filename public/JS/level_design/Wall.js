import { Locatable } from "./Locatable";

export class Wall extends Locatable {
    constructor(x, y, z, length, height) {
        super(x, y, z);
        this.texture = "maTexture";
        this.length = length;
        this.height = height;
    }

    createWall() {
        const wallGeometry = new THREE.PlaneGeometry(this.length, this.height);
        const wallMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF8844,
            map: loader.load(this.texture),
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        
        // Set the rotation
        wall.rotation.setFromVector3(this.getRotationVector());
        
        return wall;
    }

};