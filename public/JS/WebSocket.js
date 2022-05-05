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
            console.log("disconnecting");
            window.location.href = "/lobby";
        },
        "startAuthorized": () => {
            console.log("start authorized");
            beginingGame();
        },
        'new-message': (user, index, msg) => {

            let item2 = document.createElement('div');
            item2.classList.add(user === username ? "sender" : "receiver")
            item2.classList.add("message")
            item2.innerText = msg;
            messages.appendChild(item2);
            let item = document.createElement('div');
            item.classList.add(user === username ? "sender" : "receiver")
            item.classList.add("username")

            switch (index) {
                case 0:
                    item.classList.add("host");
                    break;
                case 1:
                    item.classList.add("J1");
                    break;
                case 2:
                    item.classList.add("J2");
                    break;
                case 3:
                    item.classList.add("J3");
                    break;
                default:
                    break;
            }
            item.innerText = user;
            messages.appendChild(item);
        }
    };

    // HTML elements
    const playerListUl = document.getElementById("player_list");

    /* -------------------------------- Variables ------------------------------- */
    let connectedPlayers = [];
    const username = document.getElementById("username").value;
    /* -------------------- Variables for functions listeners ------------------- */
    let deleteEvent;
    let startGame;
    let messages;

    /* -------------------------------- Function -------------------------------- */
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

            if (user === connectedPlayers[0]) {
                if (posBtnGame.style.display !== "block") {
                    console.log(posBtnGame.getAttribute("style"));
                    posBtnGame.style.display = "block";
                    posBtnGame.addEventListener("click", startGame);
                }

                if (player != connectedPlayers[0]) {
                    const playerDelete = document.createElement('button');
                    playerDelete.innerText = "Ta gueule connard";
                    playerDelete.addEventListener("click", deleteEvent);
                    playerLi.appendChild(playerDelete);
                }
            }

            playerListUl.appendChild(playerLi);
        });
    }

    function beginingGame() {
        const eltsToDelete = document.getElementById("room");
        eltsToDelete.remove();
        const eltsToShow = document.getElementById("game");
        eltsToShow.style.display = "block";
    }

    /* --------------------------------- Return --------------------------------- */
    return {
        init(DE, SG, chatMessages) {
            deleteEvent = DE;
            startGame = SG;
            messages = chatMessages;
        },

        connect() {
            socket = io();
            for (const eventName in events) {
                const event = events[eventName];
                socket.on(eventName, event);
            }
        },

        emit(eventName, ...params) {
            socket.emit(eventName, ...params);
        }
    };
})();