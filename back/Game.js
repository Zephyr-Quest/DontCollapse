const Player = require("./Player");
const Chrono = require("./chrono");
const events = require("./events.json");

module.exports = class Game {
    constructor(id, host) {
        this.players = [];
        this.playersName = [];
        this.shop = [{
            player: "",
            machine: undefined,
            level: undefined,
            price: undefined
        }];
        this.idRoom = id;
        this.host = host;

        this.chrono;

        this.runningEvent = undefined;
        this.gameStart = false;

        this.updateMonth = null;
    }

    /* -------------------------------------------------------------------------- */
    /*                               Utils functions                              */
    /* -------------------------------------------------------------------------- */

    /**
     * add a player to the game
     * @param {String} player name
     */
    addPlayer(player) {
        // console.log("--- Player ", player, " join the game");
        if (this.players.length < 4 && player) {
            this.players.push(new Player(player));
            this.playersName.push(player);
            console.log("jhiwsefdiusdkhfgsd");
        }
    }

    /**
     * Check if a player is in the game
     * @param {String} player name
     * @returns player if it's in the game
     */
    searchPlayer(player) {
        let result = false;
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
     * Return money amount from a given player
     * @param {String} playerName name of the player
     * @returns money amount (or undefined)
     */
    getPlayerMoney(playerName) {
        let player = this.searchPlayer(playerName);
        if (player) return player.money;
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
            return false;
        });
    }

    /**
     * 
     * @returns if the game is finished
     */
    isFinished() {
        this.players.forEach(player => {
            if (player.isFinished()) return player;
        });
        return false;
    }

    /* -------------------------------------------------------------------------- */
    /*                               Shop functions                               */
    /* -------------------------------------------------------------------------- */

    checkPlayerItem(player) {
        let result = false;
        this.shop.forEach(item => {
            if (item && item.player == player) result = item;
        });
        return result;
    }

    addSecondhandItem(player, machine, level, price) {
        // console.log("--- Player ", player, " wants to sell", machine, level, price);
        if (this.checkPlayerItem(player)) return false;
        else {
            this.shop.push({
                player: player,
                machine: machine,
                level: level,
                price: price
            });
        }
        return true;
    }

    buySecondhandItem(buyer, seller) {
        // console.log("--- Player ", buyer, " wants to buy", seller);
        let machine = this.checkPlayerItem(seller);
        if (machine != false && this.searchPlayer(buyer) != false) {
            this.searchPlayer(buyer).machineUpgradeSecondhand(parseInt(machine.machine), machine.level, machine.price);
            this.searchPlayer(seller).money += machine.price;
            this.shop.forEach((element, i) => {
                if (element == machine) delete this.shop[i];
            });
            return true;
        }
        return false;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Events functions                              */
    /* -------------------------------------------------------------------------- */

    applyFactor(eventId, factor) {
        switch (eventId) {
        case 0:
            this.players.forEach(player => {
                player.money += factor;
            });
            break;
        case 1:
            this.players.forEach(player => {
                player.sd.ecologic += player.sd.ecologic * (factor / 100);
            });
            break;
        case 2:
            this.players.forEach(player => {
                player.sd.social += player.sd.social * (factor / 100);
            });
            break;
        default:
            break;
        }
    }

    applyEvent() {
        if (this.runningEvent) this.runningEvent = undefined;
        else {
            let random = Math.floor(Math.random() * 100);
            if (random < 20) {
                this.runningEvent = events[random % events.length];
                this.applyFactor(this.runningEvent.type, this.runningEvent.factor);
                return this.runningEvent;
            }
        }
        return false;
    }

    /* -------------------------------------------------------------------------- */
    /*                              Update functions                              */
    /* -------------------------------------------------------------------------- */

    updateMonthWrapper() {
        this.updateMonth(this);
    }

    startChrono() {
        this.chrono = new Chrono(this.updateMonthWrapper.bind(this));
        this.chrono.incrementChrono();
    }

};
