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
    const player = e.target.parentElement.getElementsByTagName("p")[0].innerText;
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

function startGame(e) {
    console.log("start game");
    WebSocket.emit("startGame");
}

WebSocket.init(deleteEvent, startGame, messages);
WebSocket.connect();

// console.log(document.getElementById("username").value);