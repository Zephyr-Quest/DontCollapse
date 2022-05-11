// Tableau d'objet
// Représente l'ensemble des éléments de la scène au démarrage de la page
const wallColor = "#7a7886"
const floorColor = "#BBBBBB"
const floorDark = "#787878"
const pillarColor = "grey"
export const ObjectArray = [
        /* ---------------------------------- FLOOR --------------------------------- */
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
                z: .2,
                length: 200,
                width: 330,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 65,
                y: 65,
                z: .2,
                length: 70,
                width: 200,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 0,
                y: -70,
                z: 0.1,
                length: 210,
                width: 340,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 65,
                y: 65,
                z: 0.1,
                length: 80,
                width: 210,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -250 + 85,
                y: 250 - 85,
                z: 0.2,
                length: 170,
                width: 170,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -250 + 88,
                y: 250 - 88,
                z: 0.1,
                length: 175,
                width: 175,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 250 - 15,
                y: 50,
                z: 0.2,
                length: 200,
                width: 30,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 250 - 17.5,
                y: 50 - 3,
                z: 0.1,
                length: 205,
                width: 35,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 200,
                y: -175,
                z: 0.3,
                length: 150,
                width: 100,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: 197,
                y: -172,
                z: 0.1,
                length: 155,
                width: 105,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -200,
                y: -235,
                z: 0.2,
                length: 30,
                width: 100,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -197,
                y: -232.5,
                z: 0.1,
                length: 35,
                width: 105,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -230,
                y: -150,
                z: 0.2,
                length: 150,
                width: 40,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -227.5,
                y: -150,
                z: 0.1,
                length: 160,
                width: 45,
                color: "white",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* ---------------------------------- WALL ---------------------------------- */
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
        {
                type: "wall",
                x: -145,
                y: 250,
                z: 150 / 2,
                length: 210,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 90,
                ray: false,
        },
        {
                type: "wall",
                x: 130,
                y: 250,
                z: 150 / 2,
                length: 240,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 90,
                ray: false,
        },
        {
                type: "wall",
                x: -15,
                y: 250,
                z: 126.5,
                length: 50,
                width: 47,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 90,
                ray: false,
        },
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
        /* ------------------------------- CUBE BUREAU ------------------------------ */
        {
                type: "cube",
                length: 200,
                width: 100,
                heigth: 150,
                x: 250 - 200 / 2,
                y: 250 - 100 / 2,
                z: 150 / 2,
                color: floorDark,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                transparency: 1,
                name: "Mac_Boutique"
        },
        /* ---------------------------------- CUBE ---------------------------------- */


        {
                type: "cube",
                length: 150,
                width: 150,
                heigth: 30,
                x: -175 - .1,
                y: 175 + .1,
                z: 135 + .1,
                color: wallColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                transparency: 1,
                name: "Mac_Chat"
        },
        {
                type: "cube",
                length: 150,
                width: 150,
                heigth: 150,
                x: -175,
                y: 175,
                z: 75,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                name: "Mac_Chat",
                transparency: 0
        },

        /* --------------------------------- BUREAU --------------------------------- */
        {
                type: "desk",
                length: 100,
                width: 100,
                heigth: 100,
                x: 130,
                y: -140,
                z: 0.3,
                color: wallColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        
        {
                type: "desk",
                length: 100,
                width: 100,
                heigth: 100,
                x: -35,
                y: -230,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "desk",
                length: 100,
                width: 100,
                heigth: 100,
                x: -35 - 50,
                y: -230,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        /* ----------------------------- POSTE À SOUDER ----------------------------- */
        {
                type: "welding",
                length: 100,
                width: 100,
                heigth: 100,
                x: -65,
                y: 0,
                z: 13,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                name: "Mac_Poste a souder"
        },
        /* -------------------------------- PALETTES -------------------------------- */
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 0,
                y: 65,
                z: 11,
                color: "red",
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
        },
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 0,
                y: 65,
                z: 24,
                color: "red",
                rotx: 0,
                roty: 95,
                rotz: 0,
                ray: false,
        },
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 0,
                y: 65,
                z: 12 * 3,
                color: "red",
                rotx: 0,
                roty: 85,
                rotz: 0,
                ray: false,
        },
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 0,
                y: 65,
                z: 12 * 4,
                color: "red",
                rotx: 0,
                roty: 92,
                rotz: 0,
                ray: false,
        },
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 65,
                y: 65,
                z: 11* 1,
                color: "red",
                rotx: 0,
                roty: 88,
                rotz: 0,
                ray: false,
        },
         {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 135,
                y: 65,
                z: 11 * 1,
                color: "red",
                rotx: 0,
                roty: 93,
                rotz: 0,
                ray: false,
        }, 
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 130,
                y: 65,
                z: 12 * 2,
                color: "red",
                rotx: 0,
                roty: 85,
                rotz: 0,
                ray: false,
        }, 
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 125,
                y: 65,
                z: 12 * 3,
                color: "red",
                rotx: 0,
                roty: 95,
                rotz: 0,
                ray: false,
        }, 
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 210,
                y: -210,
                z: 11* 1,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        }, 
        {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 210,
                y: -210,
                z: 12 * 2,
                color: "red",
                rotx: 0,
                roty: 5,
                rotz: 0,
                ray: false,
        }, {
                type: "pallet",
                length: 100,
                width: 100,
                heigth: 100,
                x: 210,
                y: -210,
                z: 12 * 3,
                color: "red",
                rotx: 0,
                roty: -10,
                rotz: 0,
                ray: false,
        },
        /* ------------------------------- BOX CLOSED ------------------------------- */
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: -25,
                y: 0,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 98,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 50,
                y: 75,
                z: 12,
                color: "red",
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 75,
                y: 75,
                z: 12,
                color: "red",
                rotx: 0,
                roty: 110,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 230,
                y: -160,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 200,
                y: -160,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 10,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 235,
                y: -140,
                z: .3,
                color: "red",
                rotx: 0,
                roty: 5,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 205,
                y: -135,
                z: .3,
                color: "red",
                rotx: 0,
                roty: -15,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 143,
                y: -140,
                z: .3,
                color: "red",
                rotx: 0,
                roty: -95,
                rotz: 0,
                ray: false,
        },
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 120,
                y: -140,
                z: .3,
                color: "red",
                rotx: 0,
                roty: -89,
                rotz: 0,
                ray: false,
        },
        
        {
                type: "closed_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: -25,
                y: -230,
                z: .3,
                color: "red",
                rotx: 0,
                roty: -85,
                rotz: 0,
                ray: false,
        },
        /* ------------------------------- OPENED BOX ------------------------------- */
        {
                type: "opened_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 70,
                y: 45,
                z: 12,
                color: "red",
                rotx: 0,
                roty: -15,
                rotz: 0,
                ray: false,
        },
        {
                type: "opened_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 225,
                y: -145,
                z: 18,
                color: "red",
                rotx: 0,
                roty: -15,
                rotz: 0,
                ray: false,
        },
        {
                type: "opened_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 140,
                y: -145,
                z: 27.7,
                color: "red",
                rotx: 0,
                roty: -75,
                rotz: 0,
                ray: false,
        },
        {
                type: "opened_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: -25,
                y: -230,
                z: 27.7,
                color: "red",
                rotx: 0,
                roty: -5,
                rotz: 0,
                ray: false,
        },
        {
                type: "opened_box",
                length: 100,
                width: 100,
                heigth: 100,
                x: 125,
                y: -65,
                z:0.3,
                color: "red",
                rotx: 0,
                roty: -90,
                rotz: 0,
                ray: false,
        },

        /* --------------------------------- POTEAU --------------------------------- */

        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: -245,
                y: 0,
                z: 75,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 12,
                width: 14,
                heigth: 4,
                x: -244,
                y: 0,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: -245,
                y: -245,
                z: 75,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 12,
                width: 12,
                heigth: 4,
                x: -244,
                y: -244,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: 0,
                y: -245,
                z: 75,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 14,
                width: 12,
                heigth: 4,
                x: 0,
                y: -244,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: 245,
                y: -245,
                z: 75,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 12,
                width: 12,
                heigth: 4,
                x: 244,
                y: -244,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: 245,
                y: 0,
                z: 75,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 12,
                width: 14,
                heigth: 4,
                x: 244,
                y: 0,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: 50,
                y: 150,
                z: 75.1,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 14,
                width: 14,
                heigth: 4,
                x: 50,
                y: 150,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 10,
                width: 10,
                heigth: 150,
                x: -100,
                y: 100,
                z: 75.1,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "pillar",
                length: 14,
                width: 14,
                heigth: 4,
                x: -100,
                y: 100,
                z: 2,
                color: pillarColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* -------------------------------- POUBELLES ------------------------------- */
        {
                type: "bins",
                length: 100,
                width: 100,
                heigth: 100,
                x: -195,
                y: -230,
                z: 7.8,
                color: pillarColor,
                rotx: 0,
                roty: 180,
                rotz: 0,
                ray: false,
        },
        {
                type: "bin",
                length: 100,
                width: 100,
                heigth: 100,
                x: -90,
                y: 240,
                z: 10,
                color: pillarColor,
                rotx: 0,
                roty: 180,
                rotz: 0,
                ray: false,
        },

        /* -------------------------------- BARREL ------------------------------- */
        {
                type: "barrel",
                length: 100,
                width: 100,
                heigth: 100,
                x: 250,
                y: 145,
                z: 27,
                color: "#AD3C25",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "barrel",
                length: 100,
                width: 100,
                heigth: 100,
                x: 255,
                y: 135,
                z: 68,
                color: "#AD3C25",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "barrel",
                length: 100,
                width: 100,
                heigth: 100,
                x: 263,
                y: 115,
                z: 27,
                color: "#AD3C25",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "barrel",
                length: 100,
                width: 100,
                heigth: 100,
                x: 260,
                y: 75,
                z: 27,
                color: "#AD3C25",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* ------------------------- ASSEMBLEUR DE PRÉCISION ------------------------ */
        {
                type: "precision",
                length: 100,
                width: 100,
                heigth: 100,
                x: -130,
                y: -55,
                z: 22,
                color: "#AD3C25",
                rotx: 0,
                roty: -90,
                rotz: 0,
                ray: true,
                name: "Mac_Assembleur de Precision"
        },

       
        /* ---------------------------------- SHELF --------------------------------- */

        {
                type: "shelf",
                length: 100,
                width: 100,
                heigth: 100,
                x: -225,
                y: -185,
                z: .3,
                color: "#AD3C25",
                rotx: 0,
                roty: -90,
                rotz: 0,
                ray: false,
        },
        {
                type: "shelf",
                length: 100,
                width: 100,
                heigth: 100,
                x: -225,
                y: -115,
                z: .3,
                color: "#AD3C25",
                rotx: 0,
                roty: -90,
                rotz: 0,
                ray: false,
        },
        /* --------------------------------- LADDER --------------------------------- */
        {
                type: "ladder",
                length: 100,
                width: 100,
                heigth: 100,
                x: 29,
                y: -232,
                z: .1,
                color: "#DFDFDF",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        /* --------------------------------- OFFICE --------------------------------- */
        {
                type: "office",
                length: 150,
                width: 150,
                heigth: 150,
                x: -175,
                y: 175,
                z: .2,
                color: "#DFDFDF",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* --------------------------------- WINDOW --------------------------------- */
        {
                type: "window",
                length: 150,
                width: 150,
                heigth: 150,
                x: -210,
                y: 100,
                z: 35,
                color: "#DFDFDF",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "window",
                length: 150,
                width: 150,
                heigth: 150,
                x: -140,
                y: 100,
                z: 35,
                color: "#DFDFDF",
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* ---------------------------------- DOOR ---------------------------------- */

        {
                type: "door",
                length: 150,
                width: 150,
                heigth: 150,
                x: -100,
                y: 133,
                z: 0,
                color: "#DFDFDF",
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
        },

        /* ------------------------------- MURS BUREAU ------------------------------ */

        {
                type: "floor",
                x: -99.5,
                y: 204,
                z: 150 / 2,
                length: 92,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 90,
                rotz: 90,
                ray: false,
        },
        {
                type: "floor",
                x: -99.5,
                y: 128,
                z: 130,
                length: 60,
                width: 40,
                color: wallColor,
                rotx: 90,
                roty: 90,
                rotz: 90,
                ray: false,
        },
        {
                type: "floor",
                x: -175,
                y: 99.9,
                z: 127.5,
                length: 45,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -175,
                y: 99.9,
                z: 18,
                length: 34,
                width: 150,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -110,
                y: 99.9,
                z: 70,
                length: 70,
                width: 10,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -175,
                y: 99.9,
                z: 70,
                length: 70,
                width: 20,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 0,
                ray: false,
        },
        {
                type: "floor",
                x: -242,
                y: 99.9,
                z: 70,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 90,
                roty: 0,
                rotz: 0,
                ray: false,
        },

        /* ---------------------------------- CORK ---------------------------------- */
        {
                type: "cork",
                x: -99.8,
                y: 205,
                z: 70,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
                name: "Chat"
        },

        /* -------------------------------- MECHANIC -------------------------------- */
        {
                type: "mechanic",
                x: -65,
                y: -155,
                z: 22,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                name: "Mac_Assembleur Mecanique"
        },

        /* ---------------------------------- BELT ---------------------------------- */
        {
                type: "belt",
                x: 37,
                y: -125,
                z: 22,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: false,
                name: "Tapis"
        },

        /* -------------------------------- NEW DOOR -------------------------------- */
        {
                type: "new_door",
                x: -15,
                y: 250.5,
                z: 52,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 0,
                roty: 90,
                rotz: 0,
                ray: true,
                name: "Mac_Sortie"
        },

        /* --------------------------------- GENERAL -------------------------------- */
        {
                type: "general",
                x: 70,
                y: -65,
                z: 22,
                length: 70,
                width: 15,
                color: wallColor,
                rotx: 0,
                roty: 0,
                rotz: 0,
                ray: true,
                name: "Mac_Assembleur General"
        },
]