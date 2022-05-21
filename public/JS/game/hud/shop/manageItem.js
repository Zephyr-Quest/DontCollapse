import Modal from '../hud.js'
import {
    sc
} from '../../app.js';
import ModalManager from '../modalManager.js';

const confirmModal = new ModalManager('confirm-buy', '', 'non-buy')
const oui = document.getElementById('oui-buy');
const non = document.getElementById('non-buy');

let itemId;
let itemLevel = undefined;
let itemType = 0;
let itemDiv;

const level = {
    "manix": 1,
    "droit": 2,
    "braz": 3,
    "tesla": 4,

    "elec": 0,
    "eau": 1,
    "cartons": 2,
    "etain": 3,

    "inge": "engineers",
    "super": "supervisors",
    "maint": "maintainers",
    "menage": "cleaners"
};

/**
 * Open confirm modal to buy the item currently selected
 * @param {Document} divOfItem 
 */
function buyItem(divOfItem, type) {
    itemDiv = divOfItem;
    itemType = type;
    itemLevel = level[divOfItem.classList[0]]; // set the item level
    itemId = Number(divOfItem.classList[1]); // set the item id
    let itemName = divOfItem.children[0].children[0].innerText; // set the item name
    console.log(itemName);

    document.getElementById('confirm-div').style.display = 'block';
    document.getElementById('input-div').style.display = 'none';


    document.getElementById('buying').innerText = "Achat de : " + itemName;
    if (divOfItem.children[0].children[1]) document.getElementById('buying').innerText += ", " + divOfItem.children[0].children[1].innerText;
    confirmModal.openModal(); // open confirm modal
    initListener();
}

/**
 * init "oui" and "non" listeners to buy or not buy the item (or delete it)
 */
function initListener() {
    oui.addEventListener('click', buy);
    non.addEventListener('click', notBuy);
}
/**
 * remove listeners and reset the items
 */
function removeListeners(everything) {
    oui.removeEventListener('click', buy);
    non.removeEventListener('click', notBuy);
    oui.removeEventListener('click', sell);
    non.removeEventListener('click', notSell);
    if (everything) {
        itemLevel = undefined;
        itemType = 0;
        toSell = undefined;
    }

}

/**
 * not buy the item : close modal and remove oui/non listeners
 */
function notBuy() {
    confirmModal.closeFunction(); // close confirm modal
    removeListeners(true);
}

let buyContractCB;
let buyPersoCB;
let buyMachineCB;
let buyOccazCB;
let sellOccazCB;


/**
 * buy item : transmit the item to buy or delete to back, close confirm and shop modals and remove listeners
 */
function buy() {
    switch (itemType) {
        case 0:
            buyContractCB(itemLevel, itemId); // id fournisseur / num contrat
            break;
        case 1:
            buyPersoCB(itemLevel); // string métier / salaire
            break;
        case 2:
            buyMachineCB(itemId, itemLevel); // id machine / level
            break;
        case 3:
            let username = itemDiv.getElementsByClassName("sellUsername")[0].innerText;
            buyOccazCB(username, itemId); // nom du joueur qui vend
            break;
        default:
            console.warn('ERROR');
            break;
    }
}

function setContractCB(cb) {
    buyContractCB = cb;
}

function setPersoCB(cb) {
    buyPersoCB = cb;
}

function setMachineCB(cb) {
    buyMachineCB = cb;
}

function setBuyOccazCB(cb) {
    buyOccazCB = cb;
}

function setSellOccazCB(cb) {
    sellOccazCB = cb;
}

function confirmation(bought, id, level, type) {
    if (bought === true) {
        let tempBought = {
            obj: id,
            level: level
        }
        // console.log(sc)
        sc.updateModel(tempBought)
        // Scene.updateModel(tempBought)

        // Objets : Niveau 1, 2, 3 ou 4 selon l'évolution
        // Type : 0 pour Poste à souder
        // 1 : Assembleur de précision
        // 2 : Assembleur mécanique
        // 3 : Assembleur général
        console.log("Item  acheté")
        if (type !== "employee") {
            if (itemType === 2) {
                sellOwnMachine(id, level);
                return
            }
        }
        confirmModal.closeFunction();
        Modal.closeShopModal(); // close shop modal
        removeListeners(true);
    } else {
        console.log("Item non acheté")
        oui.style.display = "none";
        non.style.display = "none";
        document.getElementById("buying").innerText = "L'achat n'a pas pu être réalisé"
        setTimeout(() => {
            confirmModal.closeFunction()
            setTimeout(() => {
                oui.style.display = "inline-block";
                non.style.display = "inline-block";
            }, 250);
        }, 1000);
    }
}

let toSell;

function sellOwnMachine(id, level) {
    let itemId = id
    removeListeners(false);
    let sameID = Array.from(document.getElementsByClassName(itemId));
    for (let i = sameID.length - 4; i < sameID.length; i++) {
        if (sameID[i].hasAttribute('disable')) toSell = sameID[i]
    }
    document.getElementById('buying').innerText = "Voulez vous vendre votre " + toSell.children[0].children[0].innerText + " de " + toSell.children[0].children[1].innerText;
    oui.addEventListener('click', sell);
    non.addEventListener('click', notSell);
}

const priceForm = document.getElementById('price-form')
const inputPrice = document.getElementById('input-price');

function sell() {
    removeListeners(false)

    document.getElementById('confirm-div').style.display = 'none';
    document.getElementById('input-div').style.display = 'block';


    priceForm.addEventListener('submit', event => {
        event.preventDefault(); //remember
        if (inputPrice.value.trim()) {
            sellOccazCB(toSell.classList[1], level[toSell.classList[0]], Number(inputPrice.value)) // id machine / level / prix de vente
            inputPrice.value = '';

            document.getElementById('confirm-div').style.display = 'block';
            document.getElementById('input-div').style.display = 'none';

            Modal.closeShopModal(); // close shop modal
            removeListeners(true);
            confirmModal.closeFunction()
        }
    }, {
        once: true
    });


}

function notSell() {
    itemDiv.setAttribute('disable', '')
    Modal.closeShopModal(); // close shop modal
    removeListeners(true);
    confirmModal.closeFunction();
}




export default {
    buyItem,

    setContractCB,
    setPersoCB,
    setMachineCB,
    setBuyOccazCB,
    setSellOccazCB,

    confirmation
};