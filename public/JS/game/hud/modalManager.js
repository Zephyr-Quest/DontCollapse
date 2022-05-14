import Shop from './shop/topRubric.js';

import WebSocket from '../../WebSocket.js';

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
        if (open !== undefined) this.open = document.getElementById(open);
        if (close !== undefined) this.close = document.getElementById(close);
        this.isShop = isShop;
        this.shopCB;

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
        if (this.isShop) Shop.closeShop();


        this.close.removeEventListener('click', () => {
            this.closeFunction()
        }); // cross
        this.modal.removeEventListener('click', (e) => {
            if (e.target.nodeName === "DIALOG") {
                this.closeFunction();
            }
        }); // outside
        window.removeEventListener('keydown', (e) => {
            if ((e.key === "Escape" || e.key === "Esc") && this.modal.hasAttribute('open')) {
                this.closeFunction();
            }
        }); // Escape
    }

    
    /**
     * init the listeners to close the modals
     */
    initCloseListeners() {
        // When the user click on the cross, close the modal
        this.close.addEventListener('click', () => {
            this.closeFunction()
        });

        // When the user clicks anywhere outside of the modal, close it
        this.modal.addEventListener('click', (e) => {
            if (e.target.nodeName === "DIALOG") {
                this.closeFunction();
            }
        });

        // When the user clicks on Escape, close the modal
        window.addEventListener('keydown', (e) => {
            if ((e.key === "Escape" || e.key === "Esc") && this.modal.hasAttribute('open')) {
                this.closeFunction();
            }
        });
    }

    /**
     * open the modal
     */
    openModal() {
        console.log(this.modal)
        this.initCloseListeners();
        if (this.isShop) {
            WebSocket.emit('openShop', "");
        }
        this.modal.showModal();
    }

    isOpen() {
        if (this.modal.hasAttribute("open")) return true;
        else return false;
    }
    /**
     * init the listener to open the modal
     */
    initListener() {
        this.open.addEventListener('click', ()=>{
            this.openModal();
        });
    }

    destroyListener() {
        this.open.removeEventListener('click', ()=>{
            this.openModal();
        });
    }
}