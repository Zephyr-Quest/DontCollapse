const Game = require("./Game");
const event = require("./events.json");

let party = new Game();

party.addPlayer("Damien");
party.addPlayer("Xavier");

let Damien = party.searchPlayer("Damien");

// Damien.machineDisplay();
// Damien.money = -10000000;
// Damien.machineUpgrade(0, 4);
// Damien.machineUpgrade(1, 4);
// Damien.machineUpgrade(2, 4);
// Damien.machineUpgrade(3, 4);
// Damien.furnisherUpgrade(0,4);
// Damien.furnisherUpgrade(1,4);
// Damien.furnisherUpgrade(2,4);
// Damien.furnisherUpgrade(3,4);
// Damien.recruteEmployee("engineers");
// Damien.machineDisplay();
// console.log(Damien.waterExpenses())
Damien.updateAll();
Damien.updateAll();
Damien.updateAll();
Damien.updateAll();
Damien.income = 20000;
Damien.expenses = 16000;
Damien.sdUpdate();
Damien.financesDisplay();
console.log(Damien.sd)
// Damien.financesDisplay();
// Damien.machineDisplay();

// console.log(party.isFinished());
// console.log(Damien.getInfo());
// Damien.sdDisplay();
