import HUD from "./game/hud/hud.js"
import WebSocket from "./WebSocket.js";


const messages = document.getElementById("messages")
const chatForm = document.getElementById('chatForm');
const inputMessage = document.getElementById('input-chat');

// Gestion de l'envoi d'un message
chatForm.addEventListener('submit', event => {
    event.preventDefault(); //remember
    if (inputMessage.value.trim()) {
        WebSocket.emit('message', inputMessage.value);
        inputMessage.value = '';
    }
});

function deleteEvent(e) {
    const player = e.target.parentElement.getElementsByTagName("h2")[0].innerText;
    console.log("removing", player);

    // Delete the current player
    http.delete(
        `/removeuser/${player}`,
        () => {
            console.log("success");
        },
        err => console.error(err)
    );
}

function startGame() {
    WebSocket.emit("startGame");
}



WebSocket.init(deleteEvent, startGame, messages);
WebSocket.connect();

HUD.initChatButton();


HUD.setContractCallback((id, level) => {
    WebSocket.emit("buyContract", id, level);
});

HUD.setPersoCallback((id/* , level */) => {
    WebSocket.emit("buyEmployee", id/* , level */);
});

HUD.setMachineCallback((id, level) => {
    WebSocket.emit("buyEngine", id, level);
});

HUD.setBuyOccazCallback((username,itemId) => {
    WebSocket.emit("buySecondHandEngine", username, itemId);
});

HUD.setSellOccazCallback((id, level, price) => {
    WebSocket.emit("sellEngine", id, level, price);
});

