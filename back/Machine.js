const machines = require("./newMachines.json");

module.exports = class Machine {
    /**
     * 
     * @param {Number} type of machine
     * @param {Number} level of machine
     */
    constructor(type, level) {
        this.name = machines[type].name;
        let machine = machines[type][level];
        this.constructor = machine.constructor;
        this.type = type;
        this.level = level;
        this.price = machine.price;
        this.productionRate = machine.productionRate;
        this.consumption = machine.consumption;
        this.manufacturingQuality = machine.manufacturingQuality;
        this.maintainersRequested = machine.maintainersRequested;
        this.engineersRequested = machine.engineersRequested;
    }

    display() {
        console.log("🏭", this.constructor, this.name);
        console.log("Details : type", this.type, "level", this.level);
        console.log("⏰ Production rate : ", this.productionRate);
        console.log("⚡ Consumption :", this.consumption);
        console.log("Maintainers needed :", this.maintainersRequested, ", Engineers needed :", this.engineersRequested);
    }
};