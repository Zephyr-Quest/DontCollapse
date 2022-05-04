// Objet
// Stockage des models (nom + valeur une fois chargée + propriétés...)

export const Models = {
        wall: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                instance: null
        },
        floor: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                instance: null
        },
        cube: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                instance: null
        },
        desk: {
                name: "desk",
                model: "desk.glb",
                scale: 20,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        welding: {
                name: "welding",
                model: "welding1.glb",
                scale: 20,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        }
}