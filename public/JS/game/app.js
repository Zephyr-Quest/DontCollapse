// Classe
// Represente le moteur ThreeJS
// Permet d'intéragir avec la vue 3D

import {
        Scene
} from "./sceneManager.js"


import * as THREE from 'three';

let sc = new Scene(onLoad);

function onLoad() {
        sc.init()
        sc.createScene()
        sc.animate()
}





