// Tableau d'objet
// Représente l'ensemble des éléments de la scène au démarrage de la page
const wallColor = "#909090"
const floorColor = "#C4C4C4"
export const ObjectArray = [
        // SOL
        {
                type: "floor",
                x: 0,
                y: 0,
                z: 0,
                length: 500,
                width: 500,
                color: floorColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        {
                type: "floor",
                x: 0,
                y: -70,
                z: 1,
                length: 200,
                width: 330,
                color: "#808080",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 65,
                y: 65,
                z: 1,
                length: 70,
                width: 200,
                color: "#808080",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        // PLAFOND
        {
                type: "wall",
                x: 0,
                y: 0,
                z: 150,
                length: 500,
                width: 500,
                color: wallColor,
                rotx: 0,
                roty: 180,
                rotz: 0,
                ray: false,
        },

        // MUR DEVANT DROITE
        {
                type: "wall",
                x: 250,
                y: 0,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: wallColor,
                rotx: 0,
                roty: -90,
                rotz: 0,
                ray: false,
        },

        // MUR BOUT GAUCHE
        {
                type: "wall",
                x: -250,
                y: 0,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: wallColor,
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
        },

        // MUR BOUT DROIT
        {
                type: "wall",
                x: 0,
                y: 250,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 90,
                ray: false,
        },

        // MUR DEVANT GAUCHE
        {
                type: "wall",
                x: 0,
                y: -250,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: wallColor,
                rotx: -90,
                roty: 0,
                rotz: -90,
                ray: false,
        },
        // CUBE BUREAU
        {
                type: "cube",
                length: 200,
                width: 100,
                heigth: 150,
                x: 250 - 200 / 2,
                y: 250 - 100 / 2,
                z: 150 / 2,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                transparency: 1
        },

        // CUBE
        {
                type: "cube",
                length: 150,
                width: 50,
                heigth: 5,
                x: 65,
                y: 50,
                z: 2.5,
                color: "pink",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        }, // CUBE
        {
                type: "cube",
                length: 40,
                width: 150,
                heigth: 30,
                x: -100,
                y: -80,
                z: 10,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        // BUREAU
        {
                type: "desk",
                length: 100,
                width: 100,
                heigth: 100,
                x: 0,
                y: 0,
                z: 50,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
]