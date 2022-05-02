const hostCard = document.getElementById("new_game");
const joinCards = document.querySelectorAll("#games-display .card");
const pseudoInput = document.getElementById("pseudo_input");

function connect(path) {
    const pseudo = pseudoInput.value;
    http.post(
        path,
        { pseudo },
        () => window.location.href = "/game",
        err => console.error(err)
    );
}

hostCard.addEventListener("click", () => connect('/host'));
for (const card of joinCards)
    card.addEventListener("click", () => connect('/join'));