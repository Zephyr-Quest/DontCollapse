class Factory {
    constructor(playerName) {
        this.name = playerName;
        this.money = 10000;
        this.employees = [];
        this.machines = [];
        this.ressources = [];
    }
}

module.exports = Factory;