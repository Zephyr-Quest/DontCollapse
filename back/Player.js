const SustainableDevelopment = require("./SustainableDevelopment");
const machines = require("./config.json");

// const machines = {
//     0: {
//         name: "Poste à souder",
//         price: {
//             1: 1000,
//             2: 2000,
//             3: 3000,
//             4: 4000
//         }
//     },

//     1: {
//         name: "Assembleur de précision",
//         price: {
//             1: 1000,
//             2: 2000,
//             3: 3000,
//             4: 4000
//         }
//     },
//     2: {
//         name: "Assembleur mécanique",
//         price: {
//             1: 1000,
//             2: 2000,
//             3: 3000,
//             4: 4000
//         }
//     },
//     3: {
//         name: "Assembleur général",
//         price: {
//             1: 1000,
//             2: 2000,
//             3: 3000,
//             4: 4000
//         }
//     }
// }

const furnishers = {
    0: {
        name: "Électricité",
        price: {
            1: 1000,
            2: 2000,
            3: 3000,
            4: 4000
        }
    },

    1: {
        name: "Eau",
        price: {
            1: 1000,
            2: 2000,
            3: 3000,
            4: 4000
        }
    },
    2: {
        name: "Carton",
        price: {
            1: 1000,
            2: 2000,
            3: 3000,
            4: 4000
        }
    },
    3: {
        name: "Étain",
        price: {
            1: 1000,
            2: 2000,
            3: 3000,
            4: 4000
        }
    }
};

module.exports = class Player {
    constructor(name) {
        this.name = name;
        this.money = 5000;
        this.sd = new SustainableDevelopment();
        this.machines = [{ level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }]; // machines level
        this.furnishers = [1, 1, 1, 1];
        this.expenses = 0;
        this.employees = {
            number: 0,
            engineers: [],
            maintainers: [],
            cleaners: [],
            supervisors: []
        };

        this.generateExpenses();
    }

    asEnoughMoney(amount) {
        return this.money >= parseInt(amount);
    }


    sdUpdate() {
        // ecologic
        let ecologic = 0;

        // machine
        this.machines.forEach(machine => {
            ecologic += this.sd.machineCalculation(machine.level);
            ecologic += machine.secondHand ? 5 : 0;
        });
        //furnisher
        this.furnishers.forEach(furnisher => {
            ecologic += 2.5 * furnisher;
        });

        // economic
        let economic = Math.max(((this.money - this.expenses) / this.money) * 100, 0);

        // social

        let social = this.sd.socialCalculation(this.employees.number, this.employees.maintainers.length,
            this.employees.cleaners.length, this.employees.supervisors.length,
            this.employees.engineers.length);
        this.sd.updateOverall(economic, ecologic, social);

    }

    updateHistory() {
        return true;
    }

    machineUpgrade(machine, level) {
        if (this.machines[machine].level < level && this.asEnoughMoney(machines[machine].price[level])) {
            this.money -= machines[machine].price[level];
            this.machines[machine].level = level;
            this.machines[machine].secondHand = false;
            this.sdUpdate();
            return true;
        }
        return false;
    }
    machineUpgradeSecondhand(machine, level, price) {
        if (this.machines[machine].level < level && this.asEnoughMoney(price)) {
            this.money -= price;
            this.machines[machine].level = level;
            this.machines[machine].secondHand = true;
            this.sdUpdate();
            return true;
        }
        return false;
    }

    generateExpenses() {
        let expenses = 0;
        this.furnishers.forEach((element, index) => {
            expenses += furnishers[index].price[element];
        });
        this.expenses = expenses;
        return expenses;
    }

    furnisherUpgrade(furnisher, level) {
        if (this.asEnoughMoney(furnishers[furnisher].price[level])) {
            this.furnishers[furnisher] = level;
            // this.sdUpdate();
            // this.generateExpenses(); Waiting for the end of month
            return true;
        }
        return false;
    }

    isFinished () {
        if (this.machines === [4,4,4,4] && this.sd.isFinished()) {
            return true;
        }
        return false;   
    }

    updateAll() {
        this.sdUpdate();
        // Expenses
        this.money -= this.expenses;
        this.generateExpenses();
    }
};


