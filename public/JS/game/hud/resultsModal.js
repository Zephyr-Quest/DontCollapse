import Modal from './modalManager.js'
import WebSocket from '../../WebSocket.js';

const modal = new Modal('results-modal', undefined, undefined, false, true);
const playerListDiv = document.getElementById("playerListDiv");
const disconnection = [document.getElementById("disconnectionResults")]
const text = document.getElementById("context");

function openResultsModal(msg, displayOtherPlayers, connectedPlayers) {
    if (!modal.isOpen())
        modal.openModal();

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
    modal.closeFunction();
}

export default {
    openResultsModal,
    closeModal
}