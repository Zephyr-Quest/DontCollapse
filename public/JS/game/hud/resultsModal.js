import Modal from './modalManager.js'
import WebSocket from '../../WebSocket.js';

const modal = new Modal('results-modal', undefined, 'close-results');
const playerListDiv = document.getElementById("playerListDiv");
const disconnection = [modal.close, document.getElementById("disconnectionResults")]
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
                playerListDiv.appendChild(player);
            }
        });

        WebSocket.initListenersOtherFactoryEndGameModal();
    }
    else playerListDiv.style.display = "none";

}

disconnection.forEach(button => {
    button.addEventListener('click', () => {
        console.log("disco button")
        modal.closeFunction();
        window.location.href = "/lobby";
    }, {
        once: true
    });
})

window.addEventListener('keydown', (e) => {
    if ((e.key === "Escape" || e.key === "Esc") && modal.modal.hasAttribute('open')) {
        console.log("esc button")
        modal.closeFunction();
        window.location.href = "/lobby";
    }
}, {
    once: true
});


export default {
    openResultsModal
}