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

let allPlayers = [];
let allRooms = [];

// const Employee = require("./back/js/employee");
// const Factory = require("./back/js/factory");
// const Product = require("./back/js/product");
// const Machine = require("./back/js/machine");
// const Ressources = require("./back/js/ressources");
// const Company = require("./back/js/company");


/* ----------------------------------- APP ---------------------------------- */

app.get('/', (req, res) => {
    res.render('lobby');
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
        // Add userName to users connected
        req.session.username = userName;
        allPlayers.push(userName);

        // Create new room
        let roomPlayers = [];
        roomPlayers.push(userName)
        allRooms.push({ idRoom: allRooms.length, players: roomPlayers });

        console.log(req.session.username, " connected in room ", allRooms.length - 1);
        res.send('host');
    })

app.post("/join",
    body("pseudo").isLength({ min: 3 }).trim().escape(),
    (req, res) => {

        const userName = req.body.pseudo;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error(errors);
            res.status(400).json({
                errors: errors.array(),
            });
            return;
        }

        console.log("--- JOIN ---");
        // Add userName to users connected
        req.session.username = userName;
        allPlayers.push(userName);

        // Add player in room
        const idRoom = req.body.idRoom;
        req.session.idRoom = idRoom;
        allRooms[idRoom].players.push(userName);
        console.log(req.session.username, " connected in room ", idRoom);

        res.send("joined")
    })

app.get("/game", (req, res) => {

})


http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});


/* ----------------------------------- IO ----------------------------------- */

io.on('connection', (socket) => {
    console.log('a user connected');

    /* ------------------------- Display room on /lobby ------------------------- */
    socket.on("host-room", (idRoom) => {
        // Display new room
    })

    socket.on("join-room", (idRoom) => {
        // Check if room full
        if (allRooms[idRoom].size() === 4) {
            // Enlever room
        }
        io.emit("hide-card", idRoom);
    })


    /* -------------------------------------------------------------------------- */
    /*                                Disconnection                               */
    /* -------------------------------------------------------------------------- */
    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});