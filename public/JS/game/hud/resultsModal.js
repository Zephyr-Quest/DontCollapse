import Modal from './hud.js'
import WebSocket from '../../WebSocket.js';

const playerListDiv = document.getElementById("playerListDiv");
const text = document.getElementById("context");

function openResultsModal(msg, displayOtherPlayers, connectedPlayers) {
    if (!Modal.isResultOpen())
        Modal.openResultsModal();

    text.innerText = msg;

    if (displayOtherPlayers) {
        playerListDiv.style.display = "block";

        if (playerListDiv.hasChildNodes()) {
            playerListDiv.forEach(child => {
                playerListDiv.removeChild("p");
            })
        }

        connectedPlayers.forEach(player => {
            if (document.getElementById("username").value !== player) {
                let pPlayer = document.createElement("p");
                pPlayer.innerText = player;
                playerListDiv.appendChild(pPlayer);
            }
        });

        WebSocket.initListenersOtherFactoryEndGameModal();
    }
    else playerListDiv.style.display = "none";
}

function closeModal() {
    Modal.closeResultModal();
}

export default {
    openResultsModal,
    closeModal
}