// Classe
// Represente le moteur ThreeJS
// Permet d'intéragir avec la vue 3D

import {
        Scene
} from "./sceneManager.js"

import {
        Object3D
} from "./level_design/Object3D.js"

import {
        ObjectArray
} from "./level_design/scene.js"




let sc = new Scene()
let obj, mesh
ObjectArray.forEach(el => {
        if (el.color != "red") {
                obj = new Object3D(el)
                mesh = obj.getMesh()
                sc.scene.add(mesh)
        } else {
                obj = new Object3D(el)
                let cube = obj.getMesh()
                sc.scene.add(cube)
                cube.cursor = 'pointer';
                cube.on('click', function (ev) {
                        console.log(ev)
                });
        }
});