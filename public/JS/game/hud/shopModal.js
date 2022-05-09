import Shop from './shop/topRubric.js'

const shopModal = document.querySelector('#shop-modal');
const openShop = document.querySelector('#shop-button');
const closeShop = document.querySelector('#close-shop');

/**
 * close the modal and remove all event listeners
 */
function closeFunction() {
    shopModal.setAttribute('closing', "");
    shopModal.addEventListener('animationend', () => {
        shopModal.removeAttribute('closing');
        shopModal.close();
    }, {
        once: true
    });
    Shop.closeShop();

    closeShop.removeEventListener('click', closeFunction); // cross
    shopModal.removeEventListener('click', outsideClose); // outside
    window.removeEventListener('keydown', escapeClose); // Escape
}

/**
 * close modal if  player click outside the modal
 * @param {EventTarget} e 
 */
function outsideClose(e) {
    if (e.target.nodeName === "DIALOG") {
        closeFunction();
    }
}

/**
 * close modal if player clik on escape button
 * @param {EventTarget} e 
 */
function escapeClose(e) {
    if ((e.key === "Escape" || e.key === "Esc") && shopModal.hasAttribute('open')) {
        closeFunction();
    }
}

function initCloseListeners() {
    // When the user click on the cross, close the modal
    closeShop.addEventListener('click', closeFunction);

    // When the user clicks anywhere outside of the modal, close it
    shopModal.addEventListener('click', outsideClose);

    // When the user clicks on Escape, close the modal
    window.addEventListener('keydown', escapeClose);
}

function openModal() {
    initCloseListeners();
    Shop.initShopListeners();
    shopModal.showModal();
}

function initListener() {
    openShop.addEventListener('click', openModal);
}

export default {
    initListener,
    closeFunction
}