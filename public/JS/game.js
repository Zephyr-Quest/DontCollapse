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

WebSocket.init(deleteEvent);
WebSocket.connect();

console.log(document.getElementById("username").value);