const employees = require("./employees.json");
const furnishers = require("./furnishers.json");
const newMachines = require("./newMachines.json");
const Employee = require("./Employee");
const Machine = require("./Machine");
const SustainableDevelopment = require("./SustainableDevelopment");

const moneyMax = 20000
const moneyMin = -10000
const moneyDepart = 10000
const pcPrice = 800

module.exports = class Player {
    constructor(name) {
        this.name = name;
        this.inGame = true;
        this.money = moneyDepart;
        this.gameContinue = true;

        // Poste à souder, assemb préc, méca, général
        this.machines = [{
            level: 1,
            secondHand: false
        }, {
            level: 1,
            secondHand: false
        }, {
            level: 1,
            secondHand: false
        }, {
            level: 1,
            secondHand: false
        }];

        this.machinesBack = [undefined, undefined, undefined, undefined];

        // Elec eau carton étain
        this.furnishers = [1, 1, 1, 1];
        this.employees = {
            fees: 0,
            number: 0,
            engineers: [],
            maintainers: [],
            cleaners: [],
            supervisors: []
        };

        //! Fichier à revoir !
        //! Infinity ???
        this.sd = new SustainableDevelopment();
        this.manufacturingQuality = Infinity;
        this.expenses = 0;
        this.income = 0;
        this.consumption = {
            "electricity": 0,
            "water": 0,
            "etain": 0
        };
        this.productionRate = Infinity;

        //! Optimal
        this.maintainersNeeded = 0;
        this.engineersNeeded = 0;

        // init
        //! Vérifier l'ordre de tout ça
        this.machineInitialisation();
        this.productivityUpdate();
        this.generateExpenses();
        this.generateIncome();
        this.employeeInit();
        this.employeeOptimal();
        this.sdUpdate();
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

    getInfo() {
        return {
            // name: this.name,
            money: this.money,
            manufacturingQuality: this.manufacturingQuality,
            expenses: this.expenses,
            income: this.income,
            consumption: this.consumption,
            productionRate: this.productionRate,
            employeesNeeded: this.maintainersNeeded + this.engineersNeeded,
            employees: this.employees.number
        }
    }

    /**
     * update SD factor
     */
    //! ça c'est dégueu
    sdUpdate() {
        //! À CHANGER DE FICHIER !!!
        // ÉCOLOGIC
        let ecologic = 0;
        this.machinesBack.forEach(machine => {
            ecologic += 2.5 * machine.level;
            ecologic += machine.secondHand || machine.level == 4 ? 5 : 0;
        });
        //furnisher
        this.furnishers.forEach(furnisher => {
            ecologic += 2.5 * furnisher;
        });

        // ECONOMIC
        let economic = 0;
        if (this.money >= -10000) {
            let first_criteria = (this.money / 200) + 50;
            if (first_criteria > 100) first_criteria = 100
            if (first_criteria < 0) first_criteria = 0
            let second_criteria = this.income / this.expenses;
            economic = first_criteria * second_criteria ^ 3;
        }

        // SOCIAL
        let social = 0;
        this.employeeOptimal();
        let employeesNeeded = this.maintainersNeeded + this.engineersNeeded;
        let employeesNumber = this.employees.engineers.length + this.employees.maintainers.length;
        social = (employeesNumber / employeesNeeded) * ((this.employees.supervisors.length + this.employees.cleaners.length) / 6) * 100

        //! à quoi il sert ? TOTALEMENT DÉBILE 
        this.sd.updateOverall(economic, ecologic, social);

    }

    aroundNumber(number) {
        return Math.floor(number * 100) / 100;
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
        //! Return utile ? 
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
            this.employeeOptimal();

            // ! À supprimer une fois les contrôles effectués
            this.machines[machineType].level = machineLevel;
            this.machines[machineType].secondHand = false;

            return true;

        }
        return false;
    }

    //! Rename function
    employeeOptimal() {
        this.engineersNeeded = 0;
        this.maintainersNeeded = 0;
        this.machinesBack.forEach(machine => {
            this.maintainersNeeded += machine.maintainersRequested;
            this.engineersNeeded += machine.engineersRequested;
        });
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
    /*                              Events functions                              */
    /* -------------------------------------------------------------------------- */

    //! EVENT À REVOIR
    applyEvent(event) {
        if (!event) return undefined;
        event.type.forEach(eventType => {
            switch (eventType) {
                case "ecologic":
                    this.sd.ecologic *= event.factor;
                    break;
                case "economic":
                    this.sd.economic *= event.factor;
                    break;
                case "social":
                    this.sd.social *= event.factor;
                    break;
                case "productivity":
                    this.productionRate += Math.floor(this.productionRate * (event.factor) / 100);
                    break;

                default:
                    break;
            }
        });
        return event;
    }



    /* -------------------------------------------------------------------------- */
    /*                     Furnishers and employees functions                     */
    /* -------------------------------------------------------------------------- */

    employeeInit() {
        //! Name ?
        employees.categories.forEach(employee => {
            this.recruteEmployee(employee);
        });
    }

    furnisherUpgrade(furnisher, level) {
        if (this.asEnoughMoney(furnishers[furnisher].price[level])) {
            this.furnishers[furnisher] = level;
            return true;
        }
        return false;
    }

    recruteEmployee(categorie) {
        //! Name à dégager
        let name = employees["name"][Math.floor(Math.random() * employees["name"].length)];
        let salary = Math.floor(Math.random() * (employees["salaries"][categorie].max - employees["salaries"][categorie].min + 1) + employees["salaries"][categorie].min);
        Math.floor(Math.random() * (employees["salaries"][categorie].max - employees["salaries"][categorie].min + 1) + employees["salaries"][categorie].min);
        this.employees[categorie].push(new Employee(name, salary));
        ++this.employees.number;
        this.employees.fees += salary;
        //! Return useless
        return true;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Update functions                              */
    /* -------------------------------------------------------------------------- */

    //! à revoir les calculs
    productivityUpdate() {
        this.consumption = {
            "electricity": 0,
            "water": 0,
            "etain": 0
        };
        //! ???
        this.productionRate = Infinity;
        this.manufacturingQuality = 0;
        this.machinesBack.forEach(machine => {
            this.productionRate = Math.min(machine.productionRate, this.productionRate);
            this.manufacturingQuality += machine.manufacturingQuality;
            this.consumption.electricity += machine.consumption.electricity;
            this.consumption.water += machine.consumption.water;
            this.consumption.etain += machine.consumption.etain;
        });

        //! Utile ???? Moyenne bizarre
        this.manufacturingQuality /= 4;
    }

    electricityExpenses() {
        return this.consumption.electricity * furnishers[0].price[this.furnishers[0]];
    }

    waterExpenses() {
        return this.consumption.water * furnishers[1].price[this.furnishers[1]];
    }

    boxExpenses() {
        //! On a changé le 2 à droite
        return (this.productionRate) * furnishers[2].price[this.furnishers[2]];
    }

    etainExpenses() {
        return this.consumption.etain * furnishers[3].price[this.furnishers[3]];
    }

    //! À revoir parce que Max dit que ça va pas
    generateIncome() {
        let income = this.productionRate * pcPrice;
        this.income = this.aroundNumber(income);
    }

    //! Pareil (maxime est chonchon)
    generateExpenses() {
        let expenses = 0;
        expenses += this.electricityExpenses() + this.waterExpenses() + this.boxExpenses() + this.etainExpenses();
        expenses += this.employees.fees;
        this.expenses = this.aroundNumber(expenses);
    }

    isFinished() {
        let machineFinished = Infinity;
        this.machinesBack.forEach(machine => {
            machineFinished = Math.min(machine.level, machineFinished);
        });

        return machineFinished === 4 && this.sd.isFinished();
    }

    //! REVOIR LES CONDITIONS DE FIN
    isLost() {
        if (this.money < moneyMin || this.sd.isLost()) {

            this.inGame = false;
            return true;
        }
    }

    //! À check (Maxime dit qu'il fonctionne à moitié => à revoir)
    // On part du contructeur et de cette fonction, on se dit ce qu'on veut et on developpe
    //! PRODUCTION RATE PAS BON
    updateAll(event) {
        this.employeeOptimal();
        this.generateIncome();
        this.generateExpenses();
        // Expenses
        this.applyEvent(event);
        this.money -= this.expenses;
        this.money += this.income;
        this.money = this.aroundNumber(this.money);
        this.sdUpdate();
        return {
            moula: this.money,
            barres: this.sd
        };
    }
};