import ProgressBar from './progressBar.js';
import Item from './shop/manageItem.js'
import Parameter from './parameter.js'
import Modal from './modalManager.js'

import * as THREE from 'three';


import ShopItem from './shop/shopItem.js'
import Chrono from './chrono.js'
import Money from './money.js'
import Shop from './shop/topRubric.js'

import {
    Scene
} from '../sceneManager.js'
import {
    sc
} from '../app.js';

/* --------------------------------- Modals --------------------------------- */

Parameter.initListener();

const shop = new Modal('shop-modal', 'shop-button', 'close-shop', true);
const chat = new Modal('chat-modal', 'chat-button', 'close-chat');
// const results = new Modal('results-modal', 'results-button', 'close-results');

function initChatButton() {
    chat.initListener();
}

function initShopButton() {
    shop.initListener();
}

function deleteChatbutton() {
    chat.destroyListener();
}

function openChatModal() {
    chat.openModal();
    sc.closeMenu();
    sc.animatedText = false
    sc.staticText = false
    sc.scene.remove(sc.copyGroupSprite)
    sc.scene.remove(sc.GroupSprite)
    sc.copyGroupSprite = new THREE.Group()
    sc.GroupSprite = new THREE.Group()
}

function openShopModal() {
    shop.openModal();
    sc.closeMenu();
    sc.animatedText = false
    sc.staticText = false
    sc.scene.remove(sc.copyGroupSprite)
    sc.scene.remove(sc.GroupSprite)
    sc.copyGroupSprite = new THREE.Group()
    sc.GroupSprite = new THREE.Group()
}

function closeShopModal() {
    shop.closeFunction()
}

// function openResultsModal(msg, displayOtherPlayers) {
//     results.openModal();
// }

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

function closeAllModals() {
    shop.closeFunction();
    chat.closeFunction();
}

function refreshShop(infos, username) {
    console.log(infos.furnishers)
    ShopItem.refreshContract(infos.furnishers);
    ShopItem.refreshMachine(infos.machines);
    ShopItem.refreshOccaz(infos.shop, username);
    Shop.initShopListeners();
}

function refreshHud(infos) {
    ProgressBar.updateEcologic(Math.round(infos.barres.ecologic));
    ProgressBar.updateEconomic(Math.round(infos.barres.economic));
    ProgressBar.updateSocial(Math.round(infos.barres.social));

    Money.setMoney(infos.moula);
    if (infos.chrono) Chrono.startChronoFrom(infos.chrono.min, infos.chrono.sec);
}

function updateOnPurchase(data) {
    console.log(data)
    Item.confirmation(data.confirmation, data.idEngine, data.levelEngine, data.type)
    if (data.confirmation === true) {
        refreshHud(data)
    }
}

function openSpecificMachine(level) {
    Shop.openSpecificMachine(level);
}

export default {
    initShopButton,
    initChatButton,
    deleteChatbutton,

    openChatModal,
    openShopModal,
    closeShopModal,
    closeAllModals,

    // openResultsModal,
    refreshShop,
    refreshHud,
    updateOnPurchase,
    openSpecificMachine,

    updateEcologicBar,
    updateEconomicBar,
    updateSocialBar,

    setContractCallback,
    setPersoCallback,
    setMachineCallback,
    setBuyOccazCallback,
    setSellOccazCallback
}