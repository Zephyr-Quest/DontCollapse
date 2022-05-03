import { SustainableDevelopment } from "./SustainableDevelopment.js";

export class Player {
    constructor(name) {
        this.name = name;
        this.money = 0;
        this.sd = new SustainableDevelopment;
        this.machines = [{ level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }, { level: 1, secondHand: false }] // machines level
        this.furnishers = [1, 1, 1, 1];
        this.expenses = 0;
        this.employees = {
            number: 0,
            engineers: [],
            maintainers: [],
            cleaners: [],
            supervisors: []
        };
    }

    sdUpdate() {
        // ecologic
        let ecologic = 0

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
        let economic = Math.max(((this.money - this.expenses) / this.money) * 100, 0)

        // social

        let social = this.sd.socialCalculation(this.employees.number, this.employees.maintainers.length,
            this.employees.cleaners.length, this.employees.supervisors.length,
            this.employees.engineers.length)

        this.sd.updateOverall(economic,ecologic,social);

    }

    updateHistory()

    machineUpgrade(machine, level)
}