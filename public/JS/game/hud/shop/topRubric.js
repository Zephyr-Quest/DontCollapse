import RightRubric from './rightRubric.js';

const topRubric = document.querySelectorAll('#main-title div');

/**
 * init all top rubric listeners
 */
function initShopListeners() {
    changeTopRubric("", true); // display "ressources" on opening
    for (const current of topRubric) {
        current.addEventListener('click', changeTopRubric);
    }
}

/**
 * change background of item clicked + display his element
 * @param {EventTarget} e 
 * @param {Bool} onOpen 
 */
function changeTopRubric(e, onOpen = false) {
    topRubric.forEach(element => {
        if (element.classList.contains("selected")) element.classList.remove("selected");
    });
    // if on opening, display ressources
    if (onOpen) {
        topRubric[0].classList.add("selected");
        RightRubric.changeRubric(topRubric[0].classList[0]);
    } else {
        e.target.classList.add("selected");
        RightRubric.changeRubric(e.target.classList[0]);
    }
}

/**
 * remove all event listeners
 */
function closeShop() {
    for (const current of topRubric) {
        current.removeEventListener('click', changeTopRubric);
    }
    RightRubric.closeAllListener();
}

export default {
    initShopListeners,
    closeShop
}