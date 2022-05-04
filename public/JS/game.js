let socket = io();

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

function startGame(e){
    console.log("start game");
    socket.emit("startGame");
}

WebSocket.init(deleteEvent, startGame);
WebSocket.connect();

// console.log(document.getElementById("username").value);