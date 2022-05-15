const Game = require("./Game");

let party = new Game();

party.addPlayer("Damien");
party.addPlayer("Xavier");

let Damien = party.searchPlayer("Damien");

Damien.machineUpgrade(0, 4);
Damien.machineUpgrade(1, 3);
Damien.machineUpgrade(2, 3);
Damien.machineUpgrade(3, 2);

// Damien.machineDisplay();
Damien.updateAll();
Damien.financesDisplay();
