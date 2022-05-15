const furnishers = require("./furnishers.json");
// const machines = require("./machines.json");
const newMachines = require("./newMachines.json");
const employees = require("./employees.json");

const SustainableDevelopment = require("./SustainableDevelopment");
const Machine = require("./Machine");
const Employee = require("./Employee");

module.exports = class Player {
    constructor(name) {
        // generals
        this.name = name;
        this.money = 50000;

        // machines
        this.machines = [{ level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }]; // machines level
        this.machinesBack = [undefined, undefined, undefined, undefined];

        // furnishers and employees
        this.furnishers = [1, 1, 1, 1];
        this.employees = {
            fees: 0,
            number: 0,
            engineers: [],
            maintainers: [],
            cleaners: [],
            supervisors: []
        };

        // details
        this.sd = new SustainableDevelopment();
        this.manufacturingQuality = Infinity;
        this.expenses = 0;
        this.income = 0;
        this.consumption = 0;
        this.productionRate = Infinity;
        this.maintainersNeeded = 0;
        this.engineersNeeded = 0;

        // init
        this.machineInitialisation();
        this.productivityUpdate();
        this.generateExpenses();
    }

    /* -------------------------------------------------------------------------- */
    /*                               Utils functions                              */
    /* -------------------------------------------------------------------------- */

    /**
     * Check if the player can buy something
     * @param {Number} amount to pay
     * @returns if the player has enough money
     */
    asEnoughMoney(amount) {
        return this.money >= amount;
    }

    /**
     * update SD factor
     */
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

    /**
     * ! Deprecated
     * @returns nothing
     */
    updateHistory() {
        return true;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Display functions                             */
    /* -------------------------------------------------------------------------- */

    /**
     * Display in a nice way, all machines owned by player
     */
    machineDisplay() {
        console.log(this.name + "'s machines");
        this.machinesBack.forEach(machine => {
            machine.display();
            console.log("");
        });
    }

    // ! financesDisplay
    financesDisplay() {
        console.log(this.name + "'s financial report");
        console.log("✨ Production quality :", this.manufacturingQuality);
        console.log("⏰ Production speed :", this.productionRate);
        console.log("⚡ Consumption :", this.consumption);
        console.log("💰 Expenses : ", this.expenses);
        console.log("📈 Income :", this.income);
    }

    /* -------------------------------------------------------------------------- */
    /*                         Machines related functions                         */
    /* -------------------------------------------------------------------------- */

    /**
     * Initialize machines
     * @returns nothing
     */
    machineInitialisation() {
        for (let type = 0; type < 4; type++) this.machinesBack[type] = new Machine(type, 1);
        this.productivityUpdate();
        return true;
    }

    /**
     * 
     * @param {Number} machineType 
     * @param {Number} machineLevel
     * @returns true if the transaction has been made 
     */
    machineUpgrade(machineType, machineLevel) {
        if (machineType == undefined || !machineLevel) return false; // Check that the arguments are correct
        if (this.machinesBack[machineType].level < machineLevel && this.asEnoughMoney(newMachines[machineType][machineLevel].price)) {
            delete this.machinesBack[machineType]; // We delete the old instance of the machine
            this.machinesBack[machineType] = new Machine(machineType, machineLevel); // Creating the new machine
            this.money -= this.machinesBack[machineType].price;
            this.sdUpdate();
            this.productivityUpdate();

            // ! À supprimer une fois les contrôles effectués
            this.machines[machineType].level = machineLevel;
            this.machines[machineType].secondHand = false;

            return true;

        }
        return false;
    }

    machineUpgradeSecondhand(machineType, machineLevel, price) {
        if (machineType == undefined || !machineLevel) return false; // Check that the arguments are correct
        if (this.machinesBack[machineType].level < machineLevel && this.asEnoughMoney(newMachines[machineType][machineLevel].price)) {
            delete this.machinesBack[machineType]; // We delete the old instance of the machine
            this.machinesBack[machineType] = new Machine(machineType, machineLevel); // Creating the new machine
            this.money -= price;
            this.sdUpdate();

            // ! À supprimer une fois les contrôles effectués
            this.machines[machineType].level = machineLevel;
            this.machines[machineType].secondHand = true;

            return true;

        }
        return false;
    }



    /* -------------------------------------------------------------------------- */
    /*                     Furnishers and employees functions                     */
    /* -------------------------------------------------------------------------- */

    furnisherUpgrade(furnisher, level) {
        // console.log("--- Player ", this.name, " wants to change Orange to SFR",furnisher, level);
        if (this.asEnoughMoney(furnishers[furnisher].price[level])) {
            this.furnishers[furnisher] = level;
            // this.sdUpdate();
            // this.generateExpenses(); Waiting for the end of month
            return true;
        }
        return false;
    }

    recruteEmployee(categorie) {
        // console.log("--- Player ", this.name, " wants to recrute", categorie);
        let name = employees["name"][Math.floor(Math.random() * employees["name"].length)];
        let salary = employees["salaries"][categorie].min + employees["salaries"][categorie].max;
        this.employees[categorie].push(new Employee(name, salary));
        ++this.employees.number;
        this.employees.fees += salary;

        console.log(this.employees);
    }

    /* -------------------------------------------------------------------------- */
    /*                              Update functions                              */
    /* -------------------------------------------------------------------------- */

    productivityUpdate() {
        this.consumption = 0;
        this.productionRate = Infinity;
        this.manufacturingQuality = Infinity;
        this.machinesBack.forEach(machine => {
            this.productionRate = Math.min(machine.productionRate, this.productionRate);
            this.manufacturingQuality = Math.min(machine.manufacturingQuality, this.manufacturingQuality);
            this.consumption += machine.consumption;
        });
    }

    electricityExpenses() {
        return this.consumption * furnishers[0].price[this.furnishers[0]];
    }

    waterExpenses() {
        return (this.productionRate * this.manufacturingQuality) * furnishers[1].price[this.furnishers[1]];
    }

    generateIncome() {
        return 800 * this.manufacturingQuality * this.productionRate;
    }

    generateExpenses() {
        let expenses = 0;
        expenses += this.electricityExpenses();
        expenses += this.waterExpenses();
        expenses += this.employees.fees;
        // this.furnishers.forEach((element, index) => {
        //     expenses += furnishers[index].price[element];
        // });
        this.expenses = expenses;
        return expenses;
    }

    isFinished() {
        // return this.machines === [4, 4, 4, 4] && this.sd.isFinished();
        let machineFinished = Infinity;
        this.machinesBack.forEach(machine => {
            machineFinished = Math.min(machine.level, machineFinished);
        });

        return machineFinished === 4 && this.sd.isFinished();
    }

    updateAll() {
        this.sdUpdate();
        // Expenses
        this.money -= this.expenses;
        this.generateExpenses();
        this.income = this.generateIncome();
        return { moula: this.money, barres: this.sd };
    }
};
