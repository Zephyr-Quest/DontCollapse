import Modal from '../hud.js'

const modal = document.getElementById('confirm-buy');
const oui = document.getElementsByClassName('oui-button')[0];
const non = document.getElementsByClassName('non-button')[0];

let itemToBuy = "";
let itemToDelete = "";
let itemLevel = undefined;
const level = {
    "manix": 0,
    "droit": 1,
    "braz": 2,
    "tesla": 3,
};

/**
 * Open confirm modal to buy the item currently selected
 * @param {Document} divOfItem 
 */
function buyItem(divOfItem) {
    itemLevel = level[divOfItem.classList[0]];      // set the item level
    itemToBuy = divOfItem.children[0].textContent;  // set the item name
    document.getElementById('buying').textContent = "Achat de : " + itemToBuy;  // replace modal text
    modal.showModal();  // open confirm modal
    initListener();
}

/**
 * Open the confirm mdoal to delete the occasion item
 * @param {Document} divOfItem 
 */
function deleteItem(divOfItem) {
    itemLevel = level[divOfItem.classList[0]];  // same as buy
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
    itemToBuy = "";
    itemToDelete = "";

}

/**
 * not buy the item : close modal and remove oui/non listeners
 */
function notBuy() {
    modal.close();  // close confirm modal
    removeListeners();
}

/**
 * buy item : transmit the item to buy or delete to back, close confirm and shop modals and remove listeners
 */
function buy() {
    if (itemToBuy.length != 0) {
        //TODO transmettre à rémi l'achat de l'article
        // itemToBuy | itemLevel
    } else if (itemToDelete != 0) {
        //TODO transmettre à rémi la suppression de l'article
        // itemToDelete | itemLevel
    }



    modal.close();          // close confirm modal
    Modal.shop.closeFunction();  // close shop modal
    removeListeners();
}

export default {
    buyItem,
    deleteItem
}