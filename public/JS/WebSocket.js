const WebSocket = (function () {
    // Socket
    let socket;
    const events = {
        "updatePlayerList": players => {
            console.log(players)
            connectedPlayers = players;
            updatePlayersOnScreen();
        }
    };

    // HTML elements
    const playerListUl = document.getElementById("player_list");
    
    // Data stored
    let connectedPlayers = [];

    function updatePlayersOnScreen() {
        // Remove previous players
        while (playerListUl.children && playerListUl.children.length > 0) {
            playerListUl.children[0].remove();
        }

        // Print new players
        connectedPlayers.forEach(player => {
            const playerLi = document.createElement('li');
            playerLi.innerText = player;
            playerListUl.appendChild(playerLi);
        });
    }

    return {
        connect() {
            socket = io();
            for (const eventName in events) {
                const event = events[eventName];
                socket.on(eventName, event);
            }
        }
    };
})();