const hostCard = document.getElementById("new_game");
const joinCards = document.querySelectorAll("#games-display .card");
const pseudoInput = document.getElementById("pseudo_input");

let socket = io();

function connect(path, idRoom = null) {
    const pseudo = pseudoInput.value;
    const data = { pseudo };
    if (idRoom) data.idRoom = Number(idRoom);
    console.log(idRoom);
    http.post(
        path,
        data,
        () => window.location.href = "/game",
        err => console.error(err)
    );
}

hostCard.addEventListener("click", () => connect('/host'));

/* ---------------------- Display the differents rooms ---------------------- */
socket.on("display-rooms", (allRooms) => {
    let htmlScore = "";
    Object.keys(allRooms).forEach(key => {
        if (allRooms[key].playersName.length < 4)
            htmlScore += '<div class="card" title="Click to join ' + allRooms[key].playersName[0] + '\'s game" name="' + key + '"><ion-icon name="log-in"></ion-icon><ul><li class="name">Host : <strong class="green">' + allRooms[key].playersName[0] + '</strong></li><li class="score">Number of players : <strong>' + allRooms[key].playersName.length + '</strong></li></ul></div>'
    });
    document.getElementById("games-display").innerHTML = htmlScore;

    for (const card of document.querySelectorAll("#games-display .card"))
        card.addEventListener("click", () => connect('/join', card.getAttribute('name')));
})