import Shop from './shop/topRubric.js';

/**
 * la jolie classe des modales
 */
export default class modal {
    /**
     * initialization of modal
     * @param {String} modal 
     * @param {String} open 
     * @param {String} close 
     * @param {Boolean} isShop 
     */
    constructor(modal, open, close, isShop = false) {
        this.modal = document.getElementById(modal);
        this.open = document.getElementById(open);
        this.close = document.getElementById(close);
        this.isShop = isShop;
        console.log(this.modal)
    }
    /**
     * close the modal and remove all event listeners
     */
    closeFunction() {
        this.modal.setAttribute('closing', "");
        this.modal.addEventListener('animationend', () => {
            this.modal.removeAttribute('closing');
            this.modal.close();
        }, {
            once: true
        });
        if (this.isShop) Shop.closeShop()

        this.close.removeEventListener('click', this.closeFunction.bind(this)); // cross
        this.modal.removeEventListener('click', this.outsideClose.bind(this)); // outside
        window.removeEventListener('keydown', this.escapeClose.bind(this)); // Escape
    }

    /**
     * close modal if  player click outside the modal
     * @param {EventTarget} e 
     */
    outsideClose(e) {
        if (e.target.nodeName === "DIALOG") {
            this.closeFunction();
        }
    }

    /**
     * close modal if player clik on escape button
     * @param {EventTarget} e 
     */
    escapeClose(e) {
        if ((e.key === "Escape" || e.key === "Esc") && this.modal.hasAttribute('open')) {
            this.closeFunction();
        }
    }

    /**
     * init the listeners to close the modals
     */
    initCloseListeners() {
        // When the user click on the cross, close the modal
        this.close.addEventListener('click', this.closeFunction.bind(this));

        // When the user clicks anywhere outside of the modal, close it
        this.modal.addEventListener('click', this.outsideClose.bind(this));

        // When the user clicks on Escape, close the modal
        window.addEventListener('keydown', this.escapeClose.bind(this));
    }

    /**
     * open the chat modal
     */
    openModal() {
        this.initCloseListeners();
        if (this.isShop) Shop.initShopListeners()
        this.modal.showModal();
    }

    /**
     * init the listener to open the modal
     */
    initListener() {
        this.open.addEventListener('click', this.openModal.bind(this));
    }
}