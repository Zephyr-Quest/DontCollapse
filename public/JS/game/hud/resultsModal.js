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

disconnection.forEach(button => {
    button.addEventListener('click', () => {
        modal.closeFunction();
        window.location.href = "/lobby";
    }, {
        once: true
    });
})

window.addEventListener('keydown', (e) => {
    if ((e.key === "Escape" || e.key === "Esc") && modal.modal.hasAttribute('open')) {
        modal.closeFunction();
        window.location.href = "/lobby";
    }
}, {
    once: true
});


export default {
    openResultsModal,
    closeModal
}