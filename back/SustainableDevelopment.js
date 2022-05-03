export class SustainableDevelopment {
    // Initializes data to zero
    constructor() {
        this.global = 0;
        this.economic = 0;
        this.ecologic = 0;
        this.social = 0;
    };

    /**
     * update the sustainable development
     * @param {Number} economic factor
     * @param {Number} ecologic factor
     * @param {Number} social factor
     */
    updateOverall(economic, ecologic, social) {
        this.economic = Math.min(Math.abs(economic), 100);
        this.ecologic = Math.min(Math.abs(ecologic), 100);
        this.social = Math.min(Math.abs(social), 100);

        this.global = (this.ecologic + this.economic + this.social) / 3;
        return this.global;
    }

    machineCalculation(level) {
        return Math.min(Math.max(ecologic += (5 * level ^ 4) / 24 - 1.25 * level ^ 3 + (55 * level ^ 2) / 24 + 1.25 * level, 0), 15)
    }

    /**
     * score calculation
     * @param {Number} employees number
     * @param {Number} maintainers nuber
     * @param {Number} cleaners number
     * @param {Number} supervisors number
     * @param {Number} engineers Number
     * @returns ratio
     */
    socialCalculation(employees, maintainers, cleaners, supervisors, engineers) {
        return Math.max(Math.min((maintainers / employees + engineers / employees + cleaners / employees + supervisors / employees) * 100, 100), 0)
    }
}
