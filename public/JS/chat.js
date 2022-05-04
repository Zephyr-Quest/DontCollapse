let messages = document.getElementById("messages")
let chatForm = document.getElementById('chatForm');
let inputMessage = document.getElementById('input-chat');

// Gestion de l'envoi d'un message
chatForm.addEventListener('submit', event => {
    event.preventDefault(); //remember
    if (inputMessage.value.trim()) {
        socket.emit('message', inputMessage.value);
        inputMessage.value = '';
    }
});

// Affichage d'un message
socket.on('new-message', msg => {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});