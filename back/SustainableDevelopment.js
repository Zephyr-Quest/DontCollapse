const employees = require("./employees.json");

module.exports = class SustainableDevelopment {
    // Initializes data to zero
    constructor() {
        //! GLOBAL ???? => FONCTION POUR DONNER LA MOYENNE DIRECT, PAS EN THIS
        this.global = 0;
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
    //! Rename en arrondi ou une connerie du genre
    updateOverall(economic, ecologic, social) {
        //! Même chose pour le 0

        this.economic = Math.floor(Math.min(Math.abs(economic), 100));
        this.ecologic = Math.floor(Math.min(Math.abs(ecologic), 100));
        this.social = Math.floor(Math.min(Math.abs(social), 100));

        //! GLOBAL C'EST NON,,
        this.global = (this.ecologic + this.economic + this.social) / 3;
        return this.global;
    }

    //! ÇA VA PAS ! PAS LA MOYENNE !
    isLost() {
        return this.global <= 10;
    }
};