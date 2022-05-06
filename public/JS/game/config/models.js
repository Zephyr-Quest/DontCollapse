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
        },
        pallet: {
                name: "pallet",
                model: "pallet.glb",
                scale: 7,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        opened_box: {
                name: "opened_box",
                model: "box.glb",
                scale: 9,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        closed_box: {
                name: "closed_box",
                model: "box_closed.glb",
                scale: 9,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        bins: {
                name: "bins",
                model: "bins.glb",
                scale: 9,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        barrel: {
                name: "barrel",
                model: "barrel.glb",
                scale: 2.4,
                isModel: true,
                instance: null,
                rotation: [0, 0, 0]
        },
        precision: {
                name: "precision",
                model: "accuracy1.glb",
                scale:20,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        shelf: {
                name: "shelf",
                model: "shelf.glb",
                scale:.6,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        metallocker: {
                name: "metallocker",
                model: "metallocker.glb",
                scale:11,
                isModel: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        pillar: {
                name: "pillar",
                model: null,
                scale: 1,
                isModel: false,
                instance: null,
                rotation: [0, 0, 0]
        }
}