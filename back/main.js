const Game = require("./Game");

let party = new Game();

party.addPlayer("Damien");
party.addPlayer("Xavier");

let Damien = party.searchPlayer("Damien");

// Damien.machineDisplay();

Damien.updateAll();
Damien.updateAll();
Damien.updateAll();
Damien.updateAll();
// Damien.recruteEmployee("engineers");
// // Damien.recruteEmployee("maintainers");
Damien.machineUpgrade(0,2);
Damien.updateAll();
Damien.financesDisplay();
