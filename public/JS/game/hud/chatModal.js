const chatModal = document.getElementById('chat-modal')
const openChat = document.getElementById('chat-button');
const closeChat = document.getElementById('close-chat')

function closeFunction() {
    chatModal.setAttribute('closing', "");
    chatModal.addEventListener('animationend', () => {
        chatModal.removeAttribute('closing');
        chatModal.close();
    }, {
        once: true
    });

    closeChat.removeEventListener('click', closeFunction); // cross
    chatModal.removeEventListener('click', outsideClose); // outside
    window.removeEventListener('keydown', escapeClose); // Escape
}

function outsideClose(e) {
    if (e.target.nodeName === "DIALOG") {
        closeFunction();
    }
}

function escapeClose(e) {
    if ((e.key === "Escape" || e.key === "Esc") && chatModal.hasAttribute('open')) {
        closeFunction();
    }
}

function initCloseListeners() {
    // When the user click on the cross, close the modal
    closeChat.addEventListener('click', closeFunction);

    // When the user clicks anywhere outside of the modal, close it
    chatModal.addEventListener('click', outsideClose);

    // When the user clicks on Escape, close the modal
    window.addEventListener('keydown', escapeClose);
}

function openModal() {
    initCloseListeners();
    //Shop.initShopListeners();
    chatModal.showModal();
}

function initListener() {
    openChat.addEventListener('click', openModal);
}


export default {
    initListener,
    closeFunction
}