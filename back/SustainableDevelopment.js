const employees = require("./employees.json");

module.exports = class SustainableDevelopment {
    // Initializes data to zero
    constructor() {
        this.global = 0;
        this.economic = 0;
        this.ecologic = 0;
        this.social = 0;
    }

    display() {
        console.log("🌿 Ecologic :", this.ecologic);
        console.log("💸 Economic :", this.economic);
        console.log("🫂 Social", this.social);
    }

    /**
     * update the sustainable development
     * @param {Number} economic factor
     * @param {Number} ecologic factor
     * @param {Number} social factor
     */
    updateOverall(economic, ecologic, social) {
        this.economic = Math.floor(Math.min(Math.abs(economic), 100));
        this.ecologic = Math.floor(Math.min(Math.abs(ecologic), 100));
        this.social = Math.floor(Math.min(Math.abs(social), 100));

        this.global = (this.ecologic + this.economic + this.social) / 3;
        return this.global;
    }

    machineCalculation(level) {
        return Math.min(Math.max((5 * level ^ 4) / 24 - 1.25 * level ^ 3 + (55 * level ^ 2) / 24 + 1.25 * level, 0), 15);
    }

    /**
     * score calculation
     * @param {Number} employeesNumber number
     * @param {Number} maintainers nuber
     * @param {Number} cleaners number
     * @param {Number} supervisors number
     * @param {Number} engineers Number
     * @returns ratio
     */
    socialCalculation(employeesNumber, maintainers, cleaners, supervisors, engineers) {
        let humanRessources = [[maintainers, employees.salaries.maintainers.pourcentage], [cleaners, employees.salaries.cleaners.pourcentage], [supervisors, employees.salaries.supervisors.pourcentage], [engineers, employees.salaries.engineers.pourcentage]];
        let result = 0;
        humanRessources.forEach(categories => {
            result += categories[0] / employeesNumber < categories[1] + 0.10 && categories[0] / employeesNumber > categories[1] - 0.10 ? 25 : 0;
        });
        return result;
    }

    isFinished() {
        return this.global === 100;
    }
    isLost() {
        return this.global <= 10;
    }
};
