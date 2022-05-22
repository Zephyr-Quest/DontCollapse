const lobbyGameMusic = new Audio('../../sound/Mii_Lobby.mp3');
const soundFactory = new Audio('../../sound/soundFactory.mp3');
const moulaTune = new Audio('../../sound/moula.mp3');
const soundDoor = new Audio('../../sound/door.ogg');
const soundMessage = new Audio('../../sound/message.oga');

let authorizedEffect = true;
let authorizedMusic = true;
let lobby = true;

function startMusicGame() {
    if (authorizedMusic)
        if (lobby) {
            lobbyGameMusic.play();
            lobbyGameMusic.loop = true;
        }
        else {
            soundFactory.play();
            soundFactory.loop = true
        }
}

function stopMusicGame() {
    if (lobby)
        lobbyGameMusic.pause();
    else
        soundFactory.pause();
}

function startMoula() {
    if (authorizedEffect)
        moulaTune.play();
}

function startDoor() {
    if (authorizedEffect)
        soundDoor.play();
}

function startMessage() {
    if (authorizedEffect)
        soundMessage.play();
}

function toggleAuthrizedDuBrieAshtagJeVeuxDuBrieJaimeLeBrie() {
    authorizedEffect = !authorizedEffect;
}

function toggleLobry() {
    lobby = !lobby;
}

function toggleMusic() {
    authorizedMusic = !authorizedMusic;
}

export default {
    startMusicGame,
    stopMusicGame,
    startMoula,
    startDoor,

    startMessage,
    toggleAuthrizedDuBrieAshtagJeVeuxDuBrieJaimeLeBrie,
    toggleLobry,
    toggleMusic
}