// Objet
// Stockage des models (nom + valeur une fois chargée + propriétés...)

export const Models = {
        wall: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                isClonable: true,
                instance: null
        },
        floor: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                isClonable: true,
                instance: null
        },
        cube: {
                name: "",
                model: null,
                scale: 1,
                isModel: false,
                isClonable: true,
                instance: null
        },
        desk: {
                name: "desk",
                model: "desk.glb",
                scale: 20,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        welding: {
                name: "welding",
                model: "welding1.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        welding2: {
                name: "welding2",
                model: "welding2.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        welding3: {
                name: "welding3",
                model: "welding3.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        welding4: {
                name: "welding4",
                model: "welding4.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        pallet: {
                name: "pallet",
                model: "pallet1.glb",
                scale: 15,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        opened_box: {
                name: "opened_box",
                model: "box.glb",
                scale: 9,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        closed_box: {
                name: "closed_box",
                model: "box_closed.glb",
                scale: 9,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        bins: {
                name: "bins",
                model: "bins.glb",
                scale: 9,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        bin: {
                name: "bin",
                model: "bin.glb",
                scale: 9,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        barrel: {
                name: "barrel",
                model: "barrel.glb",
                scale: 2.4,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [0, 0, 0]
        },
        mechanic: {
                name: "mechanic",
                model: "mechanic1.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        mechanic2: {
                name: "mechanic2",
                model: "mechanic2.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        mechanic3: {
                name: "mechanic3",
                model: "mechanic3.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        
        precision: {
                name: "precision",
                model: "accuracy1.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        precision2: {
                name: "precision2",
                model: "accuracy2.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        precision3: {
                name: "precision3",
                model: "accuracy3.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        precision4: {
                name: "precision4",
                model: "accuracy4.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        general: {
                name: "general",
                model: "general1.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        general2: {
                name: "general2",
                model: "general2.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        general3: {
                name: "general3",
                model: "general3.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        belt: {
                name: "belt",
                model: "belt_3_to_4.glb",
                scale: 20,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        new_door: {
                name: "new_door",
                model: "new_door.glb",
                scale: 25,
                isModel: true,
                isClonable: false,
                instance: null,
                rotation: [90, 0, 0]
        },
        shelf: {
                name: "shelf",
                model: "shelf2.glb",
                scale: 60,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        metallocker: {
                name: "metallocker",
                model: "metallocker.glb",
                scale: 11,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        ladder: {
                name: "ladder",
                model: "ladder.glb",
                scale: .25,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        office: {
                name: "office",
                model: "office.gltf",
                scale: .3,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        window: {
                name: "window",
                model: "window.gltf",
                scale: 50,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 180, 0]
        },
        cork: {
                name: "cork",
                model: "cork.gltf",
                scale: 8,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 0, 0]
        },
        door: {
                name: "door",
                model: "door.glb",
                scale: 1.3,
                isModel: true,
                isClonable: true,
                instance: null,
                rotation: [90, 180, 0]
        },
        pillar: {
                name: "pillar",
                model: null,
                scale: 1,
                isModel: false,
                isClonable: true,
                instance: null,
                rotation: [0, 0, 0]
        }
}