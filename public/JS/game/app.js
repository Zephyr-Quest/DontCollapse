// Classe
// Represente le moteur ThreeJS
// Permet d'intéragir avec la vue 3D

import {
        Scene
} from "./sceneManager.js"

import {
        Object3D
} from "./level_design/Object3D.js"

let scene = new Scene()
let wall = new Object3D(0,0,0,20,10,"wall")
wall.addToScene(scene)