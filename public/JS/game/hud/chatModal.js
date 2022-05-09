const chatModal = document.getElementById('chat-modal')
const openChat = document.getElementById('chat-button');
const closeChat = document.getElementById('close-chat')

/**
 * close the modal and remove all event listeners
 */
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

/**
 * close modal if  player click outside the modal
 * @param {EventTarget} e 
 */
function outsideClose(e) {
    if (e.target.nodeName === "DIALOG") {
        closeFunction();
    }
}

/**
 * close modal if player clik on escape button
 * @param {EventTarget} e 
 */
function escapeClose(e) {
    if ((e.key === "Escape" || e.key === "Esc") && chatModal.hasAttribute('open')) {
        closeFunction();
    }
}

/**
 * init the listeners to close the modals
 */
function initCloseListeners() {
    // When the user click on the cross, close the modal
    closeChat.addEventListener('click', closeFunction);

    // When the user clicks anywhere outside of the modal, close it
    chatModal.addEventListener('click', outsideClose);

    // When the user clicks on Escape, close the modal
    window.addEventListener('keydown', escapeClose);
}

/**
 * open the chat modal
 */
function openModal() {
    initCloseListeners();
    chatModal.showModal();
}

/**
 * init the listener to open the modal
 */
function initListener() {
    openChat.addEventListener('click', openModal);
}

export default {
    initListener,
    closeFunction
}