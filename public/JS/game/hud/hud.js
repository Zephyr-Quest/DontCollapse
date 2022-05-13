import ProgressBar from './progressBar.js';
import Item from './shop/manageItem.js'
import Parameter from './parameter.js'
import Modal from './modalManager.js'

/* ------------------------------ progress bar ------------------------------ */
// let id = 5;
// let stat = true;

// const update = () => {
//     id += stat ? 5 : -5;
//     let id2 = stat ? 5 : -5;
//     if (id > 100 - Math.abs(id2) || id < 0 + Math.abs(id2)) stat = !stat;

//     ProgressBar.updateSocial(id);
//     // ProgressBar.updateEconomic(id);
//     // ProgressBar.updateEcologic(id);
//     setTimeout(update, 400);
// }
// update();
import ShopItem from './shop/shopItem.js'
import Chrono from './chrono.js'
import Money from './money.js'

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

function closeShopModal() {
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

function setContractCallback(callback) {
    Item.setContractCB(callback);
}

function setPersoCallback(callback) {
    Item.setPersoCB(callback);
}

function setMachineCallback(callback) {
    Item.setMachineCB(callback);
}

function setBuyOccazCallback(callback) {
    Item.setBuyOccazCB(callback);
}

function setSellOccazCallback(callback) {
    Item.setSellOccazCB(callback);
}

function closeAllModals(){
    shop.closeFunction();
    chat.closeFunction();
}

function refreshShop(infos, username){
    console.log(infos.furnishers)
    ShopItem.refreshContract(infos.furnishers);
    ShopItem.refreshMachine(infos.machines);
    ShopItem.refreshOccaz(infos.shop, username);

}

function refreshHud(infos){
    console.log(infos)
    ProgressBar.updateEcologic(Math.round(infos.barres.ecologic));
    ProgressBar.updateEconomic(Math.round(infos.barres.economic));
    ProgressBar.updateSocial(Math.round(infos.barres.social));

    Chrono.startChronoFrom(infos.chrono.min,infos.chrono.sec);
    Money.setMoney(infos.moula);
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
    closeAllModals,
    refreshShop,
    refreshHud,

    updateEcologicBar,
    updateEconomicBar,
    updateSocialBar,

    setContractCallback,
    setPersoCallback,
    setMachineCallback,
    setBuyOccazCallback,
    setSellOccazCallback
}