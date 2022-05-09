const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const sharedsession = require('express-socket.io-session');
const ejs = require('ejs');
const path = require('path');

const DCGame = require("./back/Game.js");

const {
    body,
    validationResult
} = require("express-validator");
const { all } = require('express/lib/application');
const { connected } = require('process');

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
let disconnectingUsers = [];

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
    res.render('index');
});

app.get('/rules', (req, res) => {
    res.render('rules');
});

app.get('/lobby', (req, res) => {
    res.render('lobby');
});

app.get('/game', (req, res) => {
    if (!req.session.username) {
        res.redirect('/lobby');
        return;
    }
    res.render('game', {
        username: req.session.username
    });
});

app.delete("/removeuser/:player", (req, res) => {
    const idRoom = req.session.idRoom;
    const username = req.session.username;
    const player = req.params.player;

    console.log("delete", username, player);
    console.log("host", idRoom, allRooms[idRoom].host);
    if (allRooms[idRoom].host !== username) {
        res.status(401).json({
            message: "You don't have permission."
        });
        return;
    }

    if (!allRooms[idRoom].playersName.includes(player)) {
        res.status(400).json({
            message: "The player doesn't exist."
        });
        return;
    }

    // Disconnect the player
    const players = io.sockets.adapter.rooms.get(idRoom);
    for (const p of players) {
        const pSocket = io.sockets.sockets.get(p);
        const pUsername = pSocket.handshake.session.username;

        if (pUsername === player)
            pSocket.emit("disconnection");
    }

    res.json({
        state: 'deleted'
    })
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

        // Create new room
        let roomPlayers = [];
        roomPlayers.push(userName);
        allRooms[idRoom] = new DCGame(idRoom, userName);
        allRooms[idRoom].addPlayer(userName);

        res.send({
            state: 'host'
        });
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
        allRooms[idRoom].addPlayer(userName);

        res.send({
            state: 'joined'
        });
    })


http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});


/* ----------------------------------- IO ----------------------------------- */

io.on('connection', socket => {
    let username = socket.handshake.session.username;
    let idRoom = socket.handshake.session.idRoom;

    // User connected in a room
    if (username !== undefined && allRooms[idRoom]) {
        console.log(username, " connected in room ", idRoom);
        console.log(allRooms[idRoom], "\n");
        if (idRoom !== undefined) {
            socket.join(idRoom);
            io.to(idRoom).emit("updatePlayerList", allRooms[idRoom].playersName);
        }
    } else console.log('a user connected');

    // Disconnect Room or specific user from host
    if (username !== undefined && idRoom !== undefined && disconnectingUsers.includes(username)) {
        // Delete room
        if (allRooms[idRoom]) {
            // Check the exiting room
            if (allRooms[idRoom].playersName.indexOf(username) === 0) {
                // Delete the room
                console.log("delete room", idRoom);
                allRooms.splice(idRoom, 1);
                io.to(idRoom).emit("disconnection");
            }
            // Host remove an user from the room
            else {
                console.log("remove", username, "from room", idRoom);
                allRooms[idRoom].removePlayer(username);
                io.to(idRoom).emit("updatePlayerList", allRooms[idRoom].playersName);
                socket.emit("disconnection");
            }
        }

        // Disconnect user 
        socket.leave(idRoom);
        console.log("disconnect", username, "from room", idRoom);
        disconnectingUsers.splice(disconnectingUsers.indexOf(username), 1);
        idRoom = username = undefined;
        socket.handshake.session.idRoom = undefined;
        socket.handshake.session.username = undefined;
    }

    // Socket for chat
    socket.on('message', (msg) => {
        io.to(idRoom).emit('new-message', socket.handshake.session.username, msg);
    });

    // Socket to start game
    socket.on('startGame', () => {
        const idRoom = socket.handshake.session.idRoom;
        const username = socket.handshake.session.username;
        if (allRooms[idRoom] && allRooms[idRoom].playersName.length >= 2 && allRooms[idRoom].playersName.length <= 4) {
            allRooms[idRoom].chrono.incrementChrono();
            io.to(idRoom).emit("startAuthorized");
        }
        else console.log("start unauthorized");
    })

    // Socket to display room on lobby
    io.emit("display-rooms", allRooms);

    // Socket to change engine
    socket.on('buyEngine', (idEngine, levelEngine) => {
        allRooms[idRoom].searchPlayer(username).machineUpgrade(idEngine, levelEngine);
    })

    // Socket to sell second-hand engine
    socket.on('sellEngine', (idEngine, levelEngine, price) => {
        allRooms[idRoom].searchPlayer(username).addSecondhandItem(username, idEngine, levelEngine, price);
    })

    // Socket to buy second-hand engine
    socket.on('buySecondHandEngine', (seller) => {
        allRooms[idRoom].searchPlayer(username).buySecondhandItem(username, seller);
    })

    // Socket to change contract
    socket.on('buyContract', (idFournisseur, contractNumber) => {
        allRooms[idRoom].searchPlayer(username).furnisherUpgrade(idFournisseur, contractNumber);
    })

    // Socket actu
    socket.on('actu', () => {
        allRooms[idRoom].updateMonth();
    })

    /* -------------------------------------------------------------------------- */
    /*                                Disconnection                               */
    /* -------------------------------------------------------------------------- */
    socket.on('disconnect', () => {
        const username = socket.handshake.session.username;
        const idRoom = socket.handshake.session.idRoom;
        const referer = socket.handshake.headers.referer.split("/");
        const from = "/" + referer[referer.length - 1];

        console.log("disconnection", from, username, idRoom);
        if (from === '/game' && username !== undefined && !disconnectingUsers.includes(username)) {
            console.log("mark", username, "as disconnecting");
            disconnectingUsers.push(username);
        }
    });
});
