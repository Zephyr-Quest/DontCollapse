const employees = require("./employees.json");
const furnishers = require("./furnishers.json");
const newMachines = require("./newMachines.json");
const Employee = require("./Employee");
const Machine = require("./Machine");
const SustainableDevelopment = require("./SustainableDevelopment");

const moneyMax = 20000
const moneyMin = -10000
const moneyDepart = 10000
const pcPrice = 899.99

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
        this.employeesNeeded = 0;

        // init
        //! Vérifier l'ordre de tout ça
        this.machineInitialisation();
        this.employeeInit();
        this.employeeOptimal();
        this.productivityUpdate();
        this.generateExpenses();
        this.generateIncome();
        console.log("Expenses :" + this.expenses)
        console.log("Income :" + this.income)
        this.sd.updateODD(this.machinesBack, this.furnishers, this.money, this.income, this.expenses, this.employees)
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
        this.employeeOptimal();
        this.productivityUpdate()
        this.generateIncome();
        this.generateExpenses();
        this.sd.updateODD(this.machinesBack, this.furnishers, this.money, this.income, this.expenses, this.employees)
        return {
            barres:this.sd,
            money: this.money,
            manufacturingQuality: this.manufacturingQuality,
            expenses: this.expenses,
            income: this.income,
            consumption: this.consumption,
            productionRate: this.productionRate,
            employeesNeeded: this.employeesNeeded,
            employees: this.employees.number
        }
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
            this.sd.updateODD(this.machinesBack, this.furnishers, this.money, this.income, this.expenses, this.employees);
            this.productivityUpdate();
            this.employeeOptimal();

            // ! À supprimer une fois les contrôles effectués
            this.machines[machineType].level = machineLevel;
            this.machines[machineType].secondHand = false;

            return true;
        }
        return false;
    }

    employeeOptimal() {
        this.employeesNeeded = 0;
        this.machinesBack.forEach(machine => {
            this.employeesNeeded += machine.employeesNeeded;
        });
    }

    machineUpgradeSecondhand(machineType, machineLevel, price) {
        if (machineType == undefined || !machineLevel) return false; // Check that the arguments are correct

        if (this.machinesBack[machineType].level < machineLevel && this.asEnoughMoney(newMachines[machineType][machineLevel].price)) {
            delete this.machinesBack[machineType]; // We delete the old instance of the machine
            this.machinesBack[machineType] = new Machine(machineType, machineLevel); // Creating the new machine
            this.money -= price;
            this.sd.updateODD(this.machinesBack, this.furnishers, this.money, this.income, this.expenses, this.employees);

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
        let salary = Math.floor(Math.random() * (employees["salaries"][categorie].max - employees["salaries"][categorie].min + 1) + employees["salaries"][categorie].min);
        Math.floor(Math.random() * (employees["salaries"][categorie].max - employees["salaries"][categorie].min + 1) + employees["salaries"][categorie].min);
        this.employees[categorie].push(new Employee(salary));
        ++this.employees.number;
        this.employees.fees += salary;
        return true;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Update functions                              */
    /* -------------------------------------------------------------------------- */

    productivityUpdate() {
        this.consumption = {
            "electricity": 0,
            "water": 0,
            "etain": 0
        };


        this.productionRate = Infinity;
        // this.manufacturingQuality = 0;
        this.machinesBack.forEach(machine => {
            this.productionRate = Math.min(machine.productionRate, this.productionRate);


            // this.manufacturingQuality += machine.manufacturingQuality;
            this.consumption.electricity += machine.consumption.electricity;
            this.consumption.water += machine.consumption.water;
            this.consumption.etain += machine.consumption.etain;
        });

        let ratioEmployee = (this.employees.number) / (this.employeesNeeded)
        if (ratioEmployee > 1) ratioEmployee = 1
        if (ratioEmployee < 0) ratioEmployee = 0
        this.productionRate *= ratioEmployee;
        this.productionRate = Math.floor(this.productionRate)

        // this.manufacturingQuality /= 4;
    }

    electricityExpenses() {
        return this.consumption.electricity * furnishers[0].price[this.furnishers[0]];
    }

    waterExpenses() {
        return this.consumption.water * furnishers[1].price[this.furnishers[1]];
    }

    boxExpenses() {
        return (this.productionRate) * furnishers[2].price[this.furnishers[2]];
    }

    etainExpenses() {
        return this.consumption.etain * furnishers[3].price[this.furnishers[3]];
    }

    generateIncome() {
        let income = this.productionRate * pcPrice;
        this.income = this.aroundNumber(income);
    }

    generateExpenses() {
        let expenses = 0;
        expenses += this.electricityExpenses() + this.waterExpenses() + this.boxExpenses() + this.etainExpenses();
        expenses += this.employees.fees;
        this.expenses = this.aroundNumber(expenses);
        console.log("pmazoduchbcaepid" + this.expenses)

    }

    isFinished() {
        this.machinesBack.forEach(machine => {
            if (machine.level != 4) return false
        });

        return this.money >= 0 && this.sd.isFinished();
    }

    isLost() {
        if (this.money < moneyMin || this.sd.isLost()) {
            this.inGame = false;
            return true;
        }
    }

    updateAll(event) {
        // Vérifier contrats
        // Employees
        // Productivité
        // Income expenses
        // Money
        // ODD

        // EVENT ?

        this.employeeOptimal();
        this.productivityUpdate()
        this.generateIncome();
        this.generateExpenses();
        this.applyEvent(event);
        this.money += this.income - this.expenses;
        this.money = this.aroundNumber(this.money);
        this.sd.updateODD(this.machinesBack, this.furnishers, this.money, this.income, this.expenses, this.employees)
        return {
            moula: this.money,
            barres: this.sd
        };
    }
};