import ProgressBar from './progressBar.js';
import Item from './shop/manageItem.js'
import Parameter from './parameter.js'
import Modal from './modalManager.js'

/* ------------------------------ progress bar ------------------------------ */
let id = 1;
let stat = true;

const update = () => {
    id += stat ? 5 : -5;
    if (id > 100 || id < 0) stat = !stat;

    ProgressBar.updateSocial(id);
    ProgressBar.updateEconomic(id);
    ProgressBar.updateEcologic(id);
    setTimeout(update, 400);
}
update();

/* --------------------------------- Modals --------------------------------- */

Parameter.initListener();

let shop = new Modal('shop-modal', 'shop-button', 'close-shop', true);
let chat = new Modal('chat-modal', 'chat-button', 'close-chat');
let player = new Modal('player-modal', 'player-button', 'close-player', false, true);

function initChatButton() {
    chat.initListener();
}

function initShopButton() {
    shop.initListener();
}

function initFacButton() {
    player.initListener();
}

function deleteChatbutton() {
    chat.destroyListener();
}

function openChatModal() {
    chat.openModal();
}

function openShopModal() {
    shop.openModal();
}

function closeShopModal(){
    shop.closeFunction()
}

function openOtherPLayer() {
    player.openModal();
}

function updateEcologicBar(value) {
    ProgressBar.updateEcologic(value);
}

function updateEconomicBar(value) {
    ProgressBar.updateEconomic(value);
}

function updateSocialBar(value) {
    ProgressBar.updateSocial(value);
}

function setPurchaseCallback(callback) {
    Item.setBuyCB(callback);
}

function setDeleteCallback(callback) {
    Item.setDelCB(callback);
}


// function setChatCallback(callback) {

// }

// function addMessage() {

// }



export default {
    initShopButton,
    initFacButton,
    initChatButton,
    deleteChatbutton,
    openChatModal,
    openOtherPLayer,
    openShopModal,
    closeShopModal,

    updateEcologicBar,
    updateEconomicBar,
    updateSocialBar,

    setDeleteCallback,
    setPurchaseCallback,
}