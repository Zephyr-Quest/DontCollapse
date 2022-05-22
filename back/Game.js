const Player = require("./Player");
const Chrono = require("./chrono");
const events = require("./events.json");
const machines = require("./newMachines.json");
const furnishers = require("./furnishers.json");
const employees = require("./employees.json");

module.exports = class Game {
    constructor(id, host) {
        this.players = [];
        this.playersName = [];
        this.shop = [];
        this.idRoom = id;
        this.host = host;

        this.chrono;

        this.runningEvent = undefined;
        this.gameStart = false;

        this.updateMonth = null;
        this.endGame = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                               Utils functions                              */
    /* -------------------------------------------------------------------------- */

    /**
     * sent to front shop details
     * @returns {Object} shop details
     */
    shopInfo() {
        return {
            machines,
            furnishers,
            employees
        };
    }

    /**
     * add a player to the game
     * @param {String} player name
     */
    addPlayer(player) {
        if (this.players.length < 4 && player) {
            this.players.push(new Player(player));
            this.playersName.push(player);
        }
    }

    /**
     * Check if a player is in the game
     * @param {String} player name
     * @returns player if it's in the game
     */
    searchPlayer(player) {
        let result;
        this.players.forEach(p => {
            if (p && p.name === player) result = p;
        });
        return result;
    }

    /**
     * Check principal info about a player
     * @param {String} playerName name
     * @returns machines, furnishers and shop from player
     */
    getInfo(playerName) {
        let player = this.searchPlayer(playerName);
        if (player) {
            return {
                machines: player.machines,
                furnishers: player.furnishers,
                shop: this.shop
            };
        }
        return undefined;
    }

    /**
     * remove a player from the game
     * @param {String} player name
     */
    removePlayer(player) {
        this.players.forEach((element, i) => {
            if (element.name === player) {
                delete this.players[i]; // Replace by undefined
                this.players.splice(this.players.indexOf(undefined), 1);
                this.playersName.splice(this.playersName.indexOf(player), 1);
                return true;
            }
            return false;   //! Should be undefined
        });
    }

    /**
     * 
     * @returns if the game is finished
     */
    isFinished() {
        let playersInGame = [];
        this.players.forEach(player => {
            if (player) {
                player.isLost();
                if (player.inGame) playersInGame.push(player);
                if (player.isFinished()) return player.name;
            }
        });
        if (playersInGame.length === 1) return playersInGame[0].name;
        return false;   //! Should be undefined
    }

    /**
     * generate the leaderboard
     * @returns {String} winner name
     */
    finishGame() {
        let winner = { name: "", score: 0 }
        this.players.forEach(player => {
            let score = player.sd.ecologic + player.sd.economic + player.sd.social + player.money; // Moyenne ODD + Argent
            player.machinesBack.forEach(machine => {
                score += machine.level * 6.25 // Pour avoir 25 points par machine 4*25 = 100;
            });
            if (score > winner.score) {
                winner.name = player.name;
                winner.score = player.score;
            }
            if (score == winner.score) {
                if (this.searchPlayer(winner.name).money < player.money) {
                    winner.name = player.name;
                    winner.score = player.score;
                }
            }
        });
        return winner.name;
    }

    /* -------------------------------------------------------------------------- */
    /*                               Shop functions                               */
    /* -------------------------------------------------------------------------- */

    /**
     * check if a player sells an item
     * @param {String} player name
     * @returns {Object} item
     */
    checkPlayerItem(player) {
        let result = undefined;
        this.shop.forEach(item => {
            if (item && item.player == player) result = item;
        });
        return result;
    }

    /**
     * sell second hand item
     * @param {String} player name
     * @param {Number} machine type
     * @param {Number} level machine
     * @param {Number} price 
     * @returns {Boolean} true if item is added
     */
    addSecondhandItem(player, machine, level, price) {
        let slot = this.checkPlayerItem(player);
        if (slot) {
            slot.machine = machine;
            slot.level = level;
            slot.price = price;
        } else {
            this.shop.push({
                player: player,
                machine: machine,
                level: level,
                price: price
            });
        }
        return true;
    }

    /**
     * Purchase of a second-hand machine
     * @param {String} buyerName 
     * @param {String} sellerName 
     * @returns if the transaction was made
     */
    buySecondhandItem(buyerName, sellerName) {
        let buyer = this.searchPlayer(buyerName);
        let seller = this.searchPlayer(sellerName);
        let machine = this.checkPlayerItem(seller.name);
        if (machine && buyer && seller) {
            let good = buyer.machineUpgradeSecondhand(machine.machine, machine.level, machine.price);
            if (good) {
                seller.money += machine.price;
                this.shop.forEach((element, i) => {
                    if (element == machine) delete this.shop[i];
                });
                return true;
            }
        }
        return false;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Events functions                              */
    /* -------------------------------------------------------------------------- */
    //! Event à refaire
    applyEvent() {
        if (this.runningEvent) { // Si un évènement est déjà existant
            this.runningEvent.duration--; // On réduit son temps restant
            if (this.runningEvent.duration <= 0) this.runningEvent = undefined; // Dès qu'il reste 0 mois, on le supprime
        } else {
            let random = Math.floor(Math.random() * 100); // 20% de chance d'avoir un évènement aléatoire.
            if (random < 20) {
                this.runningEvent = events[random % events.length]; // On choisit un évènement et sa durée aléatoirement
                this.runningEvent.duration = (random % this.runningEvent.durationMax) + this.runningEvent.durationMin;
                return this.runningEvent; // et on applique cet évènement
            }
        }
        return undefined;
    }

    /* -------------------------------------------------------------------------- */
    /*                          Update & chrono functions                         */
    /* -------------------------------------------------------------------------- */

    updateMonthWrapper() {
        this.updateMonth(this);
    }

    endGameWrapper() {
        this.endGame(this);
    }

    startChrono() {
        this.chrono = new Chrono(this.updateMonthWrapper.bind(this), this.endGameWrapper.bind(this));
        this.chrono.incrementChrono();
    }
};
