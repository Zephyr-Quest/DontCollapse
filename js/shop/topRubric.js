import RightRubric from './rightRubric.js';

const topRubric = document.querySelectorAll('#main-title div');

function initShopListeners() {
    RightRubric.changeRubric(topRubric[0].classList[0]);
    for (const current of topRubric) {
        current.addEventListener('click', changeTopRubric);
    }
}


function changeTopRubric(e) {
    topRubric.forEach(element => {
        if (element.classList.contains("selected")) element.classList.remove("selected");
    });
    e.target.classList.add("selected");
    RightRubric.changeRubric(e.target.classList[0]);
}


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