import CloseModal from '../modal.js'
const modal = document.getElementById('confirm-modal');
const oui = document.getElementById('oui-button');
const non = document.getElementById('non-button');

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