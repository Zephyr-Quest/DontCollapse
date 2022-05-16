const Game = require("./Game");

let party = new Game();

party.addPlayer("Damien");
party.addPlayer("Xavier");

let Damien = party.searchPlayer("Damien");

// Damien.machineDisplay();
Damien.money = 10000000;
Damien.machineUpgrade(0,4);
Damien.machineUpgrade(1,4);
Damien.machineUpgrade(2,4);
Damien.machineUpgrade(3,4);
Damien.updateAll();
Damien.financesDisplay();
