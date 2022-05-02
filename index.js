const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const sharedsession = require('express-socket.io-session');
const ejs = require('ejs');
const path = require('path');

const {
    body,
    validationResult
} = require("express-validator");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const session = require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false,
    },
});

const jsonParse = bodyParser.json();

app.use(jsonParse);
app.use(session);
// app.use("/static", express.static('./static/'));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


if (app.get("env") === "production") {
    app.set("trust proxy", 1);
    session.cookie.secure = true;
}

io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));


/* -------------------------------- Variables ------------------------------- */

let allRooms = [];

// const Employee = require("./back/js/employee");
// const Factory = require("./back/js/factory");
// const Product = require("./back/js/product");
// const Machine = require("./back/js/machine");
// const Ressources = require("./back/js/ressources");
// const Company = require("./back/js/company");

/* -------------------------------- Functions ------------------------------- */

/**
 * Obtain the higher id of an object
 * @param {Object} obj 
 * @return {String} max id
 */
 function getMaxKey(obj) {
    let result = -1;

    Object.keys(obj).forEach(key => {
        if (key > result) result = key;
    });
    return result;
}

/* ----------------------------------- APP ---------------------------------- */

app.get('/', (req, res) => {
    res.render('lobby');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.post("/host",
    body("pseudo").isLength({ min: 3 }).trim().escape(),
    (req, res) => {
        const userName = req.body.pseudo;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
            console.log(errors);
            return;
        }

        console.log("--- HOST ---");
        req.session.username = userName;

        let idRoom = Number(getMaxKey(allRooms)) + 1;

        req.session.idRoom = idRoom;
        // req.session.idRoom = allRooms.length;

        // Create new room
        let roomPlayers = [];
        roomPlayers.push(userName)
        allRooms.push({ idRoom: allRooms.length, players: roomPlayers });

        // console.log(req.session.username, " connected in room ", req.session.idRoom);
        res.send({
            state: 'host'
        });

        io.emit("host-room", "");
    })

app.post("/join",
    body("pseudo").isLength({ min: 3 }).trim().escape(),
    body("idRoom"),
    (req, res) => {

        const userName = req.body.pseudo;
        const idRoom = req.body.idRoom;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
            return;
        }

        if (allRooms.includes(userName)) {
            res.status(400).json({
                errors: "Pseudo already exists in this room",
            });
            return;
        }

        console.log("--- JOIN ---");
        req.session.username = userName;
        req.session.idRoom = idRoom;

        // Add player in room
        allRooms[idRoom].players.push(userName);
        // console.log(req.session.username, " connected in room ", idRoom);

        res.send({
            state: 'joined'
        });

        io.to(idRoom).emit("join-room", idRoom);
    })


http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});


/* ----------------------------------- IO ----------------------------------- */

io.on('connection', (socket) => {
    const username = socket.handshake.session.username;
    const idRoom = socket.handshake.session.idRoom;
    
    if (username) {
        console.log(username, " connected in room ", idRoom);
        console.log(allRooms[idRoom], "\n");
        socket.join(idRoom);
        io.to(idRoom).emit("updatePlayerList", allRooms[idRoom].players);
    }
    else console.log('a user connected');

    io.emit("display-rooms", allRooms);

    socket.on("host-room", () => {
        // Display rooms
        io.emit("display-rooms", allRooms);
    })

    socket.on("join-room", (idRoom) => {
        // Display rooms
        io.emit("display-rooms", allRooms);

        // Check if room full
        if (allRooms[idRoom].size() === 4) {
            // Enlever room
            io.emit("hide-card", idRoom);
        }
    })

    /* -------------------------------------------------------------------------- */
    /*                                Disconnection                               */
    /* -------------------------------------------------------------------------- */
    socket.on('disconnect', () => {
        const username = socket.handshake.session.username;
        if (username) console.log(username, " disconnected");
        else console.log('a user disconnected');
    });
});