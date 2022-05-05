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
const { all } = require('express/lib/application');

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

app.get('/lobby', (req, res) => {
    res.render('lobby');
});

app.get('/game', (req, res) => {
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

    if (!allRooms[idRoom].players.includes(player)) {
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
        roomPlayers.push(userName)
        allRooms.push({ idRoom: idRoom, players: roomPlayers, host: userName });

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
        allRooms[idRoom].players.push(userName);

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

    if (username !== undefined && allRooms[idRoom]) {
        console.log(username, " connected in room ", idRoom);
        console.log(allRooms[idRoom], "\n");
        if (idRoom !== undefined) {
            socket.join(idRoom);
            io.to(idRoom).emit("updatePlayerList", allRooms[idRoom].players);
        }
    } else console.log('a user connected');

    if (username !== undefined && idRoom !== undefined && disconnectingUsers.includes(username)) {
        if (allRooms[idRoom]) {
            // Check the exiting room
            if (allRooms[idRoom].players.indexOf(username) === 0) {
                // Delete the room
                console.log("delete room", idRoom);
                allRooms.splice(idRoom, 1);
                io.to(idRoom).emit("disconnection");
            } else {
                // Remove the user from the room
                console.log("remove", username, "from room", idRoom);
                allRooms[idRoom].players.splice(allRooms[idRoom].players.indexOf(username), 1);
                io.to(idRoom).emit("updatePlayerList", allRooms[idRoom].players);
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

    socket.on('message', (msg) => {
        io.to(idRoom).emit('new-message', socket.handshake.session.username + ' : ' + msg);
    });

    socket.on('startGame', () => {
        const idRoom = socket.handshake.session.idRoom;
        const username = socket.handshake.session.username;
        if (allRooms[idRoom] && allRooms[idRoom].players.length >=2 && allRooms[idRoom].players.length <=4 )
            io.to(idRoom).emit("startAuthorized");
        else console.log("start unauthorized");
    })

    io.emit("display-rooms", allRooms);

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
