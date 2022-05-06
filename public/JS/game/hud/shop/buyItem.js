import CloseModal from '../shopModal.js'
const modal = document.getElementById('confirm-buy');
const oui = document.getElementsByClassName('oui-button')[0];
const non = document.getElementsByClassName('non-button')[0];

let item = ""

function openBuy(itemToBuy) {
    item = itemToBuy.textContent
    document.getElementById('buying').textContent = itemToBuy.textContent
    modal.showModal();

    oui.addEventListener('click', () => {
        buyItem();
        modal.close();
        CloseModal.closeFunction();
    }, {
        once: true
    });

    non.addEventListener('click', () => {
        modal.close();
    }, {
        once: true
    });
}

function buyItem(e) {
    console.log("Max, le joueur veut acheter ca : ", item)
}
export default {
    openBuy
}