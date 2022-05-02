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
    Shop.closeShop();

    closeModal.removeEventListener('click', closeFunction); // cross
    modal.removeEventListener('click', outsideClose);       // outside
    window.removeEventListener('keydown', escapeClose);     // Escape
}

function outsideClose(e){
    if (e.target.nodeName === "DIALOG") {
        closeFunction();
    }
}

function escapeClose(e){
    if ((e.key === "Escape" || e.key === "Esc") && modal.hasAttribute('open')) {
        closeFunction();
    }
}

function initModalListeners(){
    // When the user click on the cross, close the modal
    closeModal.addEventListener('click', closeFunction);
    
    // When the user clicks anywhere outside of the modal, close it
    modal.addEventListener('click', outsideClose);
    
    // When the user clicks on Escape, close the modal
    window.addEventListener('keydown', escapeClose);
}



function openShop() {
    openModal.addEventListener('click', () => {
        initModalListeners();
        Shop.initShop();
        modal.showModal();
    });
}
export default {
    openShop
}