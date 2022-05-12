import Modal from '../hud.js'
import WebSocket from '../../../WebSocket.js';

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');

const modal = document.getElementById('confirm-buy');
const oui = document.getElementsByClassName('oui-button')[0];
const non = document.getElementsByClassName('non-button')[0];

let itemId = "";
let itemLevel = undefined;
let itemType = 0;
let itemDiv = "";

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
    itemId = divOfItem.classList[1]; // set the item id
    let itemName = divOfItem.children[0].textContent; // set the item name


    console.log(itemDiv, "// type : ", itemType, "//level : ", itemLevel, "// id : ", itemId)

    document.getElementById('buying').textContent = "Achat de : " + itemName; // replace modal text
    modal.showModal(); // open confirm modal
    initListener();
}

/**
 * Open the confirm mdoal to delete the occasion item
 * @param {Document} divOfItem 
 */
function deleteItem(divOfItem) {
    itemLevel = level[divOfItem.classList[0]]; // same as buy
    itemToDelete = divOfItem.children[0].textContent;
    document.getElementById('buying').textContent = "Voulez vous vraiment vous débarasser de votre " + itemToDelete + " ?";
    modal.showModal();
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
        itemId = "";
        itemLevel = undefined;
        itemType = 0;

        toSell = undefined;


    }

}

/**
 * not buy the item : close modal and remove oui/non listeners
 */
function notBuy() {
    modal.close(); // close confirm modal
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
            console.log(itemId, itemLevel)
            buyPersoCB(itemLevel /* , itemLevel */ ); // string métier / salaire
            break;
        case 2:
            console.log(itemId, itemLevel)
            buyMachineCB(itemId, itemLevel); // id machine / level
            break;
        case 3:
            let username = "michel";
            console.log(username)
            buyOccazCB(username); // nom du joueur qui vend
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

//* Possiblement à retirer/modifier avec l'actualistation du back
function confirmation(obj) {
    if (obj.bought === true) {
        let nb;
        console.log("Item  acheté")
        if (obj.type !== "employee") {
            let allElem = [];
            switch (itemType) {
                case 0:
                    nb = {
                        0: 0,
                        1: 1,
                        2: 2,
                        3: 3,
                    }

                    let contract = Array.from(document.getElementsByClassName(itemDiv.classList[0]));
                    contract.shift();
                    for (const item of contract) {
                        if (item.hasAttribute('disable')) item.removeAttribute('disable')
                    }
                    break;
                case 2:
                    sellOwnMachine()
                    for (let i = 0; i < leftPage.length; i += 2) {
                        allElem.push(leftPage[i])
                        allElem.push(leftPage[i + 1])
                        allElem.push(rightPage[i])
                        allElem.push(rightPage[i + 1])
                    }
                    nb = {
                        0: 16,
                        1: 17,
                        2: 18,
                        3: 19,
                    }
                    for (let i = nb[itemDiv.classList[1]]; i < allElem.length; i += 4) {
                        if (allElem[i].hasAttribute('disable')) {
                            allElem[i].removeAttribute('disable')
                        }
                    }
                    return
                    break;
                case 3: //own occaz to delete

                    break;
                case 4: // others occaz
                    break
                default:
                    console.warn('ERROR');
                    break;
            }


            itemDiv.setAttribute('disable', '')
            Modal.closeShopModal(); // close shop modal
            removeListeners(true);
        }
    } else {
        console.log("Item non acheté")
    }
    modal.close(); // close confirm modal

}

let toSell;

function sellOwnMachine() {
    removeListeners(false);
    let sameID = Array.from(document.getElementsByClassName(itemId));
    console.log(sameID)

    for (let i = 8; i < sameID.length; i++) {
        if(sameID[i].hasAttribute('disable')) toSell = sameID[i]
    }
    console.log(toSell)
    document.getElementById('buying').innerText = "Voulez vous vendre votre " + toSell.children[0].innerText + " de " + toSell.children[1].innerText;
    oui.addEventListener('click', sell);
    non.addEventListener('click', notSell);
}

let price;

const priceForm = document.getElementById('price-form')
const inputPrice = document.getElementById('input-price');

function sell() {
    removeListeners(false)

    document.getElementById('confirm-div').style.display = 'none';
    document.getElementById('input-div').style.display = 'block';


    priceForm.addEventListener('submit', event => {
        event.preventDefault(); //remember
        if (inputPrice.value.trim()) {
            sellOccazCB(toSell.classList[1], level[toSell.classList[0]], inputPrice.value) // id machine / level / prix de vente
            console.log(toSell.classList[1], level[toSell.classList[0]], inputPrice.value)
            inputPrice.value = '';

            document.getElementById('confirm-div').style.display = 'block';
            document.getElementById('input-div').style.display = 'none';

            Modal.closeShopModal(); // close shop modal
            removeListeners(true);
            modal.close(); // close confirm modal
        }
    }, {
        once: true
    });


}

function notSell() {
    itemDiv.setAttribute('disable', '')
    Modal.closeShopModal(); // close shop modal
    removeListeners(true);
    modal.close(); // close confirm modal
}




export default {
    buyItem,
    deleteItem,

    setContractCB,
    setPersoCB,
    setMachineCB,
    setBuyOccazCB,
    setSellOccazCB,

    confirmation
};