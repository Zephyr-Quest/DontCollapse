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

    addPlayer(player) {
        console.log("--- Player ", player, " join the game")
        if (this.players.length < 4 && player) {
            this.players.push(new Player(player));
            this.playersName.push(player);
            console.log("jhiwsefdiusdkhfgsd")
        }
    }

    searchPlayer(player) {
        let result = false;
        this.players.forEach(p => {
            if (p && p.name === player) result = p;
        });
        return result;
    }

    checkPlayerItem(player) {
        let result = false;
        this.shop.forEach(item => {
            if (item && item.player == player) result = item;
        });
        return result;
    }

    getInfo(playerName) {
        let player = this.searchPlayer(playerName);
        if (player) {
            return {
                machines: player.machines,
                furnishers: player.furnishers,
                shop: this.shop
            }
        }
        return undefined;
    }

    getPlayerMoney(player) {
        return this.searchPlayer(player).money;
    }

    addSecondhandItem(player, machine, level, price) {
        console.log("--- Player ", player, " wants to sell", machine, level, price);
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

    buySecondhandItem(buyer, seller) {
        console.log("--- Player ", buyer, " wants to buy", seller);
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

    isFinished() {
        this.players.forEach(player => {
            if (player.isFinished()) return player;
        });
        return false;
    }

    updateMonthWrapper() {
        this.updateMonth(this);
    }

    startChrono() {
        this.chrono = new Chrono(this.updateMonthWrapper.bind(this));
        this.chrono.incrementChrono();
    }

};
