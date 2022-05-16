import { sc } from "./game/app.js";
import Chrono from "./game/hud/chrono.js";
import HUD from "./game/hud/hud.js";
import Item from './game/hud/shop/manageItem.js'

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
    "startAuthorized": (data) => {
        console.log("start authorized");
        beginingGame(data);
    },
    'new-message': (user, msg) => {
        let index;
        if (user != "Server") index = connectedPlayers.indexOf(user);
        const names = {
            0: "host",
            1: "J1",
            2: "J2",
            3: "J3",
        }

        let item2 = document.createElement('div');
        item2.classList.add(user === username ? "sender" : "receiver");
        item2.classList.add("message");
        item2.innerText = msg;
        messages.appendChild(item2);

        let item = document.createElement('div');
        item.classList.add(user === username ? "sender" : "receiver");
        item.classList.add("username");
        item.classList.add(user === "Server" ? "server" : names[index]);
        item.innerText = user;
        messages.appendChild(item);

        let item3 = document.createElement('div');
        item3.classList.add("message");
        item3.innerHTML = "<p></p>";
        messages.appendChild(item3);
    },
    "sendPlayerInfoShop": (infoPlayer, username) => {
        getAllShop(infoPlayer, username);
    },
    "confirmPurchase": (data) => {
        HUD.updateOnPurchase(data);
    },
    "infoActu": (infoPlayer) => {
        HUD.refreshHud(infoPlayer);
    },
    "finishGame": (msg, displayOtherPlayers) => {
        console.log("finish game front", msg, displayOtherPlayers);
        HUD.openResultsModal(msg, displayOtherPlayers);
    }
};

// HTML elements
const playerList = document.getElementById("player_list");

/* -------------------------------- Variables ------------------------------- */
let connectedPlayers = [];
const username = document.getElementById("username").value;
/* -------------------- Variables for functions listeners ------------------- */
let deleteEvent;
let seeOtherEvent;
let startGame;
let messages;

/* -------------------------------- Function -------------------------------- */
function updatePlayersOnScreen() {
    // Remove previous players
    while (playerList.children && playerList.children.length > 0) {
        playerList.children[0].remove();
    }

    // Print new players
    connectedPlayers.forEach(player => {

        const divPlayerName = document.createElement('div');
        divPlayerName.classList.add("card");

        const playerName = document.createElement('h2');
        playerName.innerText = player;

        divPlayerName.appendChild(playerName);


        const user = document.getElementById("username").value;
        const posBtnGame = document.getElementById("BtnGame");

        if (user === connectedPlayers[0] && connectedPlayers.length >= 2) {
            if (posBtnGame.style.display !== "block") {
                posBtnGame.style.display = "block";
                posBtnGame.addEventListener("click", startGame);
            }

            if (player != connectedPlayers[0]) {
                const playerDelete = document.createElement('button');
                playerDelete.classList.add('removePlayerButton');
                playerDelete.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                playerDelete.addEventListener("click", deleteEvent);
                divPlayerName.appendChild(playerDelete);
            }
        }

        playerList.appendChild(divPlayerName);
    });
}

function beginingGame(data) {
    document.getElementsByClassName("cameraName")[0].style.display = "block";
    document.getElementById("myThreeJsCanvas").style.display = "block"
    const eltsToDelete = document.getElementById("room");
    eltsToDelete.remove();
    const eltsToShow = document.getElementById("game");
    eltsToShow.style.display = "block";
    HUD.refreshHud(data)
}

function getAllShop(infoPlayer, username) {
    HUD.refreshShop(infoPlayer, username);
}

/* --------------------------------- Return --------------------------------- */

// return {
function init(DE, SG, chatMessages, seeOther) {
    deleteEvent = DE;
    startGame = SG;
    messages = chatMessages;
    seeOtherEvent = seeOther;
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

const getConnectedPlayers = () => connectedPlayers;

// See other players EVENT on click
document.getElementById("SortiWrap").addEventListener("mousedown", () => {
    seeOtherEvent();
    sc.goSeeOtherPlayer()
})

export default {
    init,
    connect,
    emit,
    getConnectedPlayers,

    getAllShop,
}