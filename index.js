// const express = require('express')
// app = express;

// const machData = require('./js/data/machine.json');

// app.get('/persos', (req, res) => {
//     res.json(machData);
// });

fetch('http://localhost:4200/perso')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    })