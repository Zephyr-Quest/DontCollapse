const Game = require("./Game");
// Test
// console.log("On créé notre partie");
// let party = new Game();
// console.log("On ajoute Damien et Xavier, on leur donne 5000€ chacun");
// // console.log(party.players);
// console.log("Xavier vend sa supertondeuse niveau 3 à 1000€");
// party.addSecondhandItem("Xavier", 0,3,1000);
// console.log("Elle est dans le shop, c'est cool");
// console.log(party.shop);
// // console.log(party.searchPlayer("Damien"));
// console.log("Damien achète la machine de Xavier");
// party.buySecondhandItem("Damien", "Xavier");
// console.log("Et la voici dans l'inventaire de Damien !");
// console.log(party.searchPlayer("Damien").machines);
let party = new Game();
party.addPlayer("Damien");
party.addPlayer("Xavier");
party.searchPlayer("Damien").recruteEmployee("engineers",1000);
console.log(party.searchPlayer("Damien").employees)