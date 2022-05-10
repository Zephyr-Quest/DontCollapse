import Chrono from "./game/hud/chrono.js";

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
    'new-message': (user, msg) => {
        const index = connectedPlayers.indexOf(user);
        const names = {
            0: "host",
            1: "J1",
            2: "J2",
            3: "j3"
        }

        let item2 = document.createElement('div');
        item2.classList.add(user === username ? "sender" : "receiver")
        item2.classList.add("message")
        item2.innerText = msg;
        messages.appendChild(item2);

        let item = document.createElement('div');
        item.classList.add(user === username ? "sender" : "receiver")
        item.classList.add("username")

        let name = names[index]
        item.classList.add(name)

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

        const divPlayerName = document.createElement('div');
        divPlayerName.classList.add("card");

        const playerName = document.createElement('h2');
        playerName.innerText = player;

        divPlayerName.appendChild(playerName);

        playerLi.appendChild(divPlayerName);

        const user = document.getElementById("username").value;
        const posBtnGame = document.getElementById("BtnGame");

        if (user === connectedPlayers[0] && connectedPlayers.length >=2) {
            if (posBtnGame.style.display !== "block") {
                posBtnGame.style.display = "block";
                posBtnGame.addEventListener("click", startGame);
            }

            if (player != connectedPlayers[0]) {
                const playerDelete = document.createElement('button');
                playerDelete.classList.add('removePlayerButton');
                playerDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
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
    Chrono.startChronoFrom(10, 0);
}

/* --------------------------------- Return --------------------------------- */

// return {
function init(DE, SG, chatMessages) {
    deleteEvent = DE;
    startGame = SG;
    messages = chatMessages;
}

function connect() {
    socket = io();
    for (const eventName in events) {
        const event = events[eventName];
        socket.on(eventName, event);
    }
}

function emit(eventName, ...params) {
    socket.emit(eventName, ...params);
}

export default{
    init,
    connect,
    emit
}