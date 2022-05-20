module.exports = class SustainableDevelopment {
    // Initializes data to zero
    constructor() {
        this.economic = 0;
        this.ecologic = 0;
        this.social = 0;
    }


    /**
     * update the sustainable development
     * @param {Number} economic factor
     * @param {Number} ecologic factor
     * @param {Number} social factor
     */
    roundODD(economic, ecologic, social) {
        this.economic = Math.floor(Math.min(Math.abs(economic), 100));
        if (this.economic < 0) this.economic = 0
        this.ecologic = Math.floor(Math.min(Math.abs(ecologic), 100));
        if (this.ecologic < 0) this.ecologic = 0
        this.social = Math.floor(Math.min(Math.abs(social), 100));
        if (this.social < 0) this.social = 0
    }

    /**
     * update SD factor
     */
    updateODD(machinesBack, furnishers, money, income, expenses, employees) {
        // ÉCOLOGIC
        let ecologic = 0;
        machinesBack.forEach(machine => {
            ecologic += 2.5 * machine.level;
            ecologic += machine.secondHand || machine.level == 4 ? 5 : 0;
        });
        //furnisher
        furnishers.forEach(el => {
            ecologic += 2.5 * el;
        });

        // ECONOMIC
        let economic = 0;
        if (money >= -10000) {
            let first_criteria = (money / 300) + 10 / 3;
            if (first_criteria > 100) first_criteria = 100
            if (first_criteria < 0) first_criteria = 0
            let second_criteria = income / expenses;
            economic = first_criteria * second_criteria ^ 3;
        }

        // SOCIAL
        let social = 0;
        let maintainers = employees.maintainers.length / employees.number;
        let inge = employees.engineers.length / employees.number;
        let cleaners = employees.cleaners.length / employees.number;
        let supervisors = employees.supervisors.length / employees.number;

        let diff = Math.abs(supervisors - cleaners);
        diff = Math.abs(diff - inge);
        diff = Math.abs(diff - maintainers);

        social = 100 - (diff * 100 * 1.9);

        this.roundODD(economic, ecologic, social);

    }


    isFinished() {
        if (this.economic == 100 && this.social == 100 && this.ecologic == 100) return true;
        return false;

    }

    isLost() {
        if (this.economic == 0 || this.social == 0 || this.ecologic == 0) return true;
        return false;

    }

    moyenne() {
        return (this.ecologic + this.economic + this.social) / 3;
    }
};