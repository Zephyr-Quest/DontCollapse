const WebSocket = (function () {
    // Socket
    let socket;
    const events = {
        "updatePlayerList": players => {
            console.log(players)
            connectedPlayers = players;
            updatePlayersOnScreen();
        },
        "disconnection": () => {
            window.location.href = "/";
        }
    };

    // HTML elements
    const playerListUl = document.getElementById("player_list");
    
    /* -------------------------------- Variables ------------------------------- */
    let connectedPlayers = [];
    /* -------------------- Variables for functions listeners ------------------- */
    let deleteEvent;
    let startGame;

    function updatePlayersOnScreen() {
        // Remove previous players
        while (playerListUl.children && playerListUl.children.length > 0) {
            playerListUl.children[0].remove();
        }

        // Print new players
        connectedPlayers.forEach(player => {
            const playerLi = document.createElement('li');
            
            const playerName = document.createElement('p');
            playerName.innerText = player;
            playerLi.appendChild(playerName);

            const user = document.getElementById("username").value;
            const posBtnGame = document.getElementById("BtnGame");

            if (user === connectedPlayers[0]){
                if (posBtnGame.style.display !== "block") {
                    console.log(posBtnGame.getAttribute("style"));
                    posBtnGame.style.display = "block";
                    posBtnGame.addEventListener("click", startGame);
                }

                if (player != connectedPlayers[0]){
                const playerDelete = document.createElement('button');
                playerDelete.innerText = "Ta gueule connard";
                playerDelete.addEventListener("click", deleteEvent);
                playerLi.appendChild(playerDelete);
                }
            }
            
            playerListUl.appendChild(playerLi);
        });
    }

    return {
        init(DE, SG) {
            deleteEvent = DE;
            startGame = SG;
        },

        connect() {
            socket = io();
            for (const eventName in events) {
                const event = events[eventName];
                socket.on(eventName, event);
            }
        }
    };
})();