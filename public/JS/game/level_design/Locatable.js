import { Vector3 } from "three";

/* -------------------------------------------------------------------------- */
/*                        Represent a locatable object                        */
/* -------------------------------------------------------------------------- */
export class Locatable {
    constructor(x, y, z) {
        // Positions
        this.x = x;
        this.y = y;
        this.z = z; 

        // Rotations
        this.rotX = this.rotY = this.rotZ = 0;
    }

    /**
     * Convert the position to an array
     * @returns The position array
     */
    getPositionArray() {
        return [this.x, this.y, this.z];
    }

    /**
     * Convert the position to an 3D vector
     * @returns The position vector
     */
    getPositionVector() {
        let vec=new Vector3(this.x, this.y, this.z)
        return vec;
    }

    /**
     * Convert the rotation to an array
     * @returns The rotation array
     */
     getRotationArray() {
        return [this.rotX, this.rotY, this.rotZ];
    }

    /**
     * Convert the rotation to an 3D vector
     * @returns The rotation vector
     */
    getRotationVector() {
        let vec=new Vector3(this.rotX, this.rotY, this.rotZ);
        return vec;;
    }
}