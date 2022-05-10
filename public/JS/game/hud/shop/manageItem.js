import Modal from '../hud.js'

const modal = document.getElementById('confirm-buy');
const oui = document.getElementsByClassName('oui-button')[0];
const non = document.getElementsByClassName('non-button')[0];

let itemId = "";
let itemToDelete = "";
let itemLevel = undefined;
const level = {
    "manix": 1,
    "droit": 2,
    "braz": 3,
    "tesla": 4,

    "elec":0,
    "eau":1,
    "cartons":2,
    "etain":3
};

/**
 * Open confirm modal to buy the item currently selected
 * @param {Document} divOfItem 
 */
function buyItem(divOfItem) {
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
    itemToDelete = "";

}

/**
 * not buy the item : close modal and remove oui/non listeners
 */
function notBuy() {
    modal.close(); // close confirm modal
    removeListeners();
}

let buyCB;
let deleteCB;


/**
 * buy item : transmit the item to buy or delete to back, close confirm and shop modals and remove listeners
 */
function buy() {
    if (itemId.length != 0) {
    
        console.log("itemID : ",itemId, "itel lvl : ", itemLevel);
        buyCB(itemId,itemLevel);
    } else if (itemToDelete != 0) {
        let obj = {
            name: itemToDelete,
            level: itemLevel
        };
        deleteCB(obj);
    }



    modal.close(); // close confirm modal
    Modal.closeShopModal(); // close shop modal
    removeListeners();
}

function setBuyCB(cb) {
    buyCB = cb;
} function setDelCB(cb) {
    deleteCB = cb;
}

export default {
    buyItem,
    deleteItem,
    setBuyCB,
    setDelCB
};