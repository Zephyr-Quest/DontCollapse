import WebSocket from "../../WebSocket.js";

const playerList = document.getElementById("display-player");
const username = document.getElementById("username").value;

function refresh() {
    let players = WebSocket.getConnectedPlayers();

    while (playerList.children && playerList.children.length > 0)
        playerList.children[0].remove();
  
    for (const player of players) {
        if (username !== player) {

            const newPl = document.createElement('li');
            newPl.classList.add('clickable')
            newPl.innerText = player;
            playerList.appendChild(newPl);
        }
    }
    initListener()
}

function initListener(){
    for (const player of playerList.children) {
        player.addEventListener('click',showFactory)
    }
}

function showFactory(e){
    let player = e.target.innerText
    // TODO Tiens Rémi affiche player
}

function close(){
    for (const player of playerList.children) {
        player.removeEventListener('click',showFactory)
    }
}

export default {
    refresh,
    close
}