import Modal from '../shopModal.js'

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

function buyItem(divOfItem) {
    itemLevel = level[divOfItem.classList[0]];
    itemToBuy = divOfItem.children[0].textContent;
    document.getElementById('buying').textContent = "Achat de : " + itemToBuy;
    modal.showModal();
    initListener();
}

function deleteItem(divOfItem) {
    itemLevel = level[divOfItem.classList[0]];
    itemToDelete = divOfItem.children[0].textContent;
    document.getElementById('buying').textContent = "Voulez vous vraiment vous débarasser de votre " + itemToDelete + " ?";
    modal.showModal();
    initListener();
}

function initListener() {
    oui.addEventListener('click', buy);
    non.addEventListener('click', notBuy);
}

function removeListeners() {
    oui.removeEventListener('click', buyItem)
    non.removeEventListener('click', notBuy)
    itemToBuy = "";
    itemToDelete = "";

}

function notBuy() {
    modal.close();
    removeListeners();
}

function buy() {
    console.log(itemToBuy);
    console.log(itemToBuy.length);
    if (itemToBuy.length != 0) {
        //TODO transmettre à rémi l'achat de l'article
        // itemToBuy | itemLevel
    } else if (itemToDelete != 0) {
        //TODO transmettre à rémi la suppression de l'article
        // itemToDelete | itemLevel
    }



    modal.close();
    Modal.closeFunction();
    removeListeners();
}

export default {
    buyItem,
    deleteItem
}