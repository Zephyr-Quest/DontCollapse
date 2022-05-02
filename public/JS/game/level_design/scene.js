// Tableau d'objet
// Représente l'ensemble des éléments de la scène au démarrage de la page

export const ObjectArray = [
        // SOL
        {
                type: "floor",
                x: 0,
                y: 0,
                z: 0,
                length: 500,
                width: 500,
                color: "yellow",
                rotx: 0,
                roty: 0,
                rotz: 0,
        },

        // PLAFOND
        {
                type: "wall",
                x: 0,
                y: 0,
                z: 150,
                length: 500,
                width: 500,
                color: "pink",
                rotx: 0,
                roty: 180,
                rotz: 0,
        },

        // MUR DEVANT DROITE
        {
                type: "wall",
                x: 250,
                y: 0,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: "blue",
                rotx: 0,
                roty: -90,
                rotz: 0,
        },

        // MUR BOUT GAUCHE
        {
                type: "wall",
                x: -250,
                y: 0,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: "blue",
                rotx: 0,
                roty: 90,
                rotz: 0,
        },

        // MUR BOUT DROIT
        {
                type: "wall",
                x: 0,
                y: 250,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: "blue",
                rotx: 90,
                roty: 0,
                rotz: 90,
        },

        // MUR DEVANT GAUCHE
        {
                type: "wall",
                x: 0,
                y: -250,
                z: 150 / 2,
                length: 500,
                width: 150,
                color: "blue",
                rotx: -90,
                roty: 0,
                rotz: -90,
        },
        // CUBE BUREAU
        {
                type: "cube",
                x: 250 - 150 / 2,
                y: 250 - 150 / 2,
                z: 150 / 2,
                length: 150,
                width: 50,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
        },
]