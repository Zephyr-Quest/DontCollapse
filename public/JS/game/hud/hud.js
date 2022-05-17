import ProgressBar from './progressBar.js';
import Item from './shop/manageItem.js'
import Parameter from './parameter.js'
import Modal from './modalManager.js'
import HTTP from '../../http_module.js';

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

function initShop() {
    const itemId = {
        "Électricité": "elec",
        "Eau": "eau",
        "Carton": "cartons",
        "Étain": "etain",

        "engineers": "inge",
        "maintainers": "maint",
        "cleaners": "menage",
        "supervisors": "super",

        "Manix2": "manix",
        "Droit Ô But": "droit",
        "Braz'Air'Eau": "braz",
        "Teslassemblage": "tesla"

    }
    HTTP.get(
        "/shopinfo",
        data => {
            console.log(data);
            let furnishers = data.furnishers;
            let employees = data.employees;
            let machine = data.machines

            /* ------------------------------- furnishers ------------------------------- */
            for (let i = 0; i < 4; i++) {
                let descri = document.querySelectorAll("." + itemId[furnishers[i].name] + " .item-description");
                for (let j = 0; j < 4; j++) {
                    switch (i) {
                        case 0:
                            descri[j].children[0].innerText = "Prix au kWh : " + furnishers[i].price[j + 1] + "€"
                            break;
                        case 1:
                            descri[j].children[0].innerText = "Prix au dm/3 : " + furnishers[i].price[j + 1] + "€"
                            break;
                        case 2:
                            descri[j].children[0].innerText = furnishers[i].price[j + 1] + "€ par carton"
                            break;
                        case 3:
                            descri[j].children[0].innerText = furnishers[i].price[j + 1] + "€ par bobine"
                            break;
                        default:
                            break;
                    }
                }
            }

            // personnel
            for (let i = 0; i < 4; i++) {
                let descri = document.querySelector("." + itemId[employees.categories[i]] + " .item-description");
                descri.children[0].innerText = "Salaire minimum : " + employees.salaries[employees.categories[i]].min
                descri.children[1].innerText = "Salaire maximum : " + employees.salaries[employees.categories[i]].max
            }

            // machines
            let lesPhrases = ["Prix : ", "Consommation : ", "Nombre de mainteneurs recommande : ", "Nombre d'ingenieur recommande : "]
            for (let i = 0; i < 4; i++) {
                let descri = document.querySelectorAll("." + itemId[machine[i][i + 1].constructor] + " .item-description");
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < lesPhrases.length; k++) {
                        let mach;
                        switch (k) {
                            case 0:
                                mach = machine[j][i + 1].price;
                                break;
                            case 1:
                                mach = machine[j][i + 1].consumption;
                                break;
                            case 2:
                                mach = machine[j][i + 1].maintainersRequested;
                                break;
                            case 3:
                                mach = machine[j][i + 1].engineersRequested;
                                break;
                            default:
                                break;
                        }
                        let elem = document.createElement("p")
                        elem.innerText = lesPhrases[k] + mach
                        descri[j].prepend(elem)
                    }
                }
            }

        },
        err => console.error(err)
    );
}

export default {
    initShopButton,
    initChatButton,
    deleteChatbutton,

    openChatModal,
    openShopModal,
    closeShopModal,
    closeAllModals,
    initShop,

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