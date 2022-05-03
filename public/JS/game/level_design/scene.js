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
                ray:false,
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
                ray:false,
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
                ray:false,
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
                ray:false,
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
                ray:true,
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
                ray:false,
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
                ray:true,
        },
]