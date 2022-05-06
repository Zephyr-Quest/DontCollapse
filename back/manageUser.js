const Game = require('./Game')

const game = new Game;

let manageUser = (function () {
    return {
        connect(username) {
            console.log("back connect", username);
            game.addPlayer(username);
        },

        disconnect(username) {
            console.log("back disconnect", username);
            game.removePlayer(username);
        }
    }
})();

module.exports = manageUser;