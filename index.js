const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Employee = require("./back/js/employee");
const Factory = require("./back/js/factory");
const Product = require("./back/js/product");
const Machine = require("./back/js/machine");
const Ressources = require("./back/js/ressources");
const Company = require("./back/js/company");

const employee = new Employee();

app.use(express.static(__dirname + '/back/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/back/html/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(employee);

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});

http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});