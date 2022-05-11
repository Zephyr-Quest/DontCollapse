import Modal from '../hud.js'

const modal = document.getElementById('confirm-buy');
const oui = document.getElementsByClassName('oui-button')[0];
const non = document.getElementsByClassName('non-button')[0];

let itemId = "";
let itemLevel = undefined;
let itemType = 0;

const level = {
    "manix": 1,
    "droit": 2,
    "braz": 3,
    "tesla": 4,

    "elec": 0,
    "eau": 1,
    "cartons": 2,
    "etain": 3,

    "inge":"engineers",
    "super":"supervisors",
    "maint":"maintainers",
    "menage":"cleaners"
};

/**
 * Open confirm modal to buy the item currently selected
 * @param {Document} divOfItem 
 */
function buyItem(divOfItem, type) {
    itemType = type;
    itemLevel = level[divOfItem.classList[0]]; // set the item level
    itemId = divOfItem.classList[1]; // set the item id
    let itemName = divOfItem.children[0].textContent; // set the item name

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
function removeListeners() {
    oui.removeEventListener('click', buyItem);
    non.removeEventListener('click', notBuy);

    itemId = "";
    itemLevel = undefined;
    itemType = 0;

}

/**
 * not buy the item : close modal and remove oui/non listeners
 */
function notBuy() {
    modal.close(); // close confirm modal
    removeListeners();
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
                buyPersoCB(itemLevel/* , itemLevel */);  // string métier / salaire
                break;
            case 2:
                console.log(itemId, itemLevel)
                buyMachineCB(itemId, itemLevel);    // id machine / level
                break;
            case 3:
                let username = "michel";
                console.log(username)
                buyOccazCB(username);   // nom du joueur qui vend
                break;
            case 4:
                let price = 0;
                itemId = 2;
                itemLevel = 1;
                console.log(itemId, itemLevel, price)
                sellOccazCB(itemId, itemLevel, price)   // id machine / level / prix de vente
                break;
            default:
                break;
        }
 



    modal.close(); // close confirm modal
    Modal.closeShopModal(); // close shop modal
    removeListeners();
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

export default {
    buyItem,
    deleteItem,

    setContractCB,
    setPersoCB,
    setMachineCB,
    setBuyOccazCB,
    setSellOccazCB
};