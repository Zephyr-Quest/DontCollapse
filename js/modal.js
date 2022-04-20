import Shop from './shop.js'

const modal = document.querySelector('.modal');
const openModal = document.querySelector('#shop-button');
const closeModal = document.querySelector('.close');

function closeFunction() {
    modal.setAttribute('closing', "");
    modal.addEventListener('animationend', () => {
        modal.removeAttribute('closing');
        modal.close();
    }, {
        once: true
    });


    //Shop.closeShop();
}



function initModals() {
    openModal.addEventListener('click', () => {
        modal.showModal();
        Shop.initShop();

    });

    closeModal.addEventListener('click', () => {
        closeFunction();
    });

    // When the user clicks anywhere outside of the modal, close it
    modal.addEventListener('click', e => {
        if (e.target.nodeName === "DIALOG") {
            closeFunction();
        }
    });

    // When the user clicks on escape, close the modal
    window.addEventListener('keydown', e => {
        if ((e.key === "Escape" || e.key === "Esc") && modal.hasAttribute('open')) {
            closeFunction();
        }
    });

}
export default {
    initModals
}