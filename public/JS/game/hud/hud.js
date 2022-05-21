import ProgressBar from './progressBar.js';
import Item from './shop/manageItem.js'
import Parameter from './parameter.js'
import Modal from './modalManager.js'
import HTTP from '../../http_module.js';
import ShopItem from './shop/shopItem.js'
import Chrono from './chrono.js'
import Money from './money.js'
import Shop from './shop/topRubric.js'
import Sound from '../sound.js';

import * as THREE from 'three';
import {
    sc
} from '../app.js';

/* --------------------------------- Modals --------------------------------- */

Parameter.initListener();

const shop = new Modal('shop-modal', 'shop-button', 'close-shop', true);
const chat = new Modal('chat-modal', 'chat-button', 'close-chat');
const events = new Modal('events-modal', undefined, undefined);
const results = new Modal('results-modal', undefined, 'disconnectionResults', false, true);

function openResultsModal() {
    results.openModal();
}

function closeResultModal() {
    results.closeFunction();
}

function isResultOpen() {
    return results.isOpen()
}

function isChatOpen(){
    return chat.isOpen()
}

function initChatButton() {
    chat.initListener();
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

    if (infos.moula) Money.setMoney(Math.round(infos.moula));

    if (infos.chrono) Chrono.startChronoFrom(infos.chrono.min, infos.chrono.sec);

    if (infos.event) {
        if (!events.isOpen()) events.openModal();
        let div = document.querySelector('#events-content');
        div.removeChild(div.firstChild);
        let elem = document.createElement('p');
        elem.innerHTML = infos.event.event;
        div.append(elem);
    }
}

function updateOnPurchase(data) {
    Item.confirmation(data.confirmation, data.idEngine, data.levelEngine, data.type);
    if (data.confirmation === true) {
        Sound.startMoula();
        refreshHud(data);
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
                            descri[j].children[0].innerText = "Prix au m3 : " + furnishers[i].price[j + 1] + "€"
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
            for (let i = 0; i < 4; i++) {
                let descri = document.querySelectorAll("." + itemId[machine[i][i + 1].constructor] + " .item-description");
                for (let j = 0; j < 4; j++) {
                    for (let k = 0; k < 4; k++) {
                        let elem = document.createElement("p")
                        switch (k) {
                            case 0:
                                elem.innerText = "Prix : " + machine[j][i + 1].price + " €"
                                descri[j].prepend(elem)
                                break;
                            case 1:
                                elem.innerHTML = "Consommation : " + machine[j][i + 1].consumption.electricity + " kWh | " + machine[j][i + 1].consumption.water + " m3 | " + machine[j][i + 1].consumption.etain + " bobines"
                                descri[j].prepend(elem)
                                break;
                            case 2:
                                elem.innerHTML = "Vitesse de production : " + machine[j][i + 1].productionRate
                                descri[j].prepend(elem)

                                break;
                            case 3:
                                elem.innerText = "Personnels reccomandes : " + machine[j][i + 1].employeesNeeded
                                descri[j].prepend(elem)
                                break;
                            default:
                                break;
                        }
                    }
                }
            }

        },
        err => console.error(err)
    );
}

function actuTabBord(infos) {
    refreshHud(infos)
    document.getElementById('prev-expe').innerText = infos.expenses;
    document.getElementById('prev-income').innerText = infos.income;
    document.getElementById('actual-elec').innerText = infos.consumption.electricity;
    document.getElementById('actual-water').innerText = infos.consumption.water;
    document.getElementById('actual-etain').innerText = infos.consumption.etain;
    document.getElementById('actual-card').innerText = infos.productionRate;

    document.getElementById('nb-employee').innerText = infos.employees.number + " / " + infos.employeesNeeded;
    document.getElementById('actual-maint').innerText = infos.employees.maintainers.length;
    document.getElementById('actual-clean').innerText = infos.employees.cleaners.length;
    document.getElementById('actual-inge').innerText = infos.employees.engineers.length;
    document.getElementById('actual-super').innerText = infos.employees.supervisors.length;

   // console.log(infos)
}



export default {
    initChatButton,

    openChatModal,
    isChatOpen,
    openShopModal,
    closeShopModal,
    initShop,
    openResultsModal,
    closeResultModal,
    isResultOpen,

    refreshShop,
    refreshHud,
    updateOnPurchase,
    openSpecificMachine,
    actuTabBord,

    updateEcologicBar,
    updateEconomicBar,
    updateSocialBar,

    setContractCallback,
    setPersoCallback,
    setMachineCallback,
    setBuyOccazCallback,
    setSellOccazCallback
}