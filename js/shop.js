import Ressources from './shop/ressources.js';
import Personnel from './shop/personnel.js';
import Neuf from './shop/neuf.js';
import Occasion from './shop/occasion.js';
import RightListener from './shop/rightRubric.js';
import getDescri from './shop/getDescri.js';


const topRubric = document.querySelectorAll('#main-title div');

const ressources = document.querySelector('#ressources');
const personnel = document.querySelector('#personnel');
const neuf = document.querySelector('#neuf');
const occasion = document.querySelector('#occasion');



let active = undefined;


function initShopListeners() {
    console.log("Init top rubric listeners");

    for (const current of topRubric) {
        current.addEventListener('click', initRightRubric)
    }
    initRightRubric();
}

function closeShop() {
    console.log("Remove all right rubric listeners");
    changeRubric(undefined, true);
    active = undefined;
    console.log("Remove top rubric listeners");



    ressources.removeEventListener('click', printRessources);
    Ressources.removeListeners();

    personnel.removeEventListener('click', printPersonnel);
    Personnel.removeListeners();

    neuf.removeEventListener('click', printNeuf);
    Neuf.removeListeners();

    occasion.removeEventListener('click', printOccasion);
    Occasion.removeListeners();
}

function initRightRubric(e) {
    let id = 0;
    let rightTitle = {};
    if (e !== undefined) id = Number(e.target.id);

    switch (id) {
        case 0:
            rightTitle = getDescri.getRessources(0);
            break;
        case 1:
            rightTitle = getDescri.getPersonnel(0);
            break;
        case 2:
            rightTitle = getDescri.getNeuf(0);
            break;
        case 3:
            console.log("Afficher l'occaz")
            break;
        default:
            console.warn("Oupsiiii");
            break;
    }

    RightListener.initTitle(rightTitle)
    RightListener.initListener(rightTitle)
}











function printRessources() {
    changeRubric(0, false);
    active = 0;
    Ressources.initListeners();
    Ressources.openRubric()

}

function printPersonnel() {
    changeRubric(1, false);
    active = 1;
    Personnel.initListeners();
    Personnel.openRubric();

}

function printNeuf() {
    changeRubric(2, false);
    active = 2;
    Neuf.initListeners();
    Neuf.openRubric()

}

function printOccasion() {
    changeRubric(3, false);
    active = 3;
    Occasion.initListeners();
    Occasion.openRubric()
}





function changeRubric(id, closing) {
    if (id <= 3) {
        topRubric.forEach(e => {
            e.classList.remove('selected');
        });
        if (closing == false) {
            topRubric[id].classList.add('selected');
        }
    }
    switch (active) {
        case 0:
            console.log("Remove listeners of Ressources");
            Ressources.removeListeners();

            break;
        case 1:
            console.log("Remove listeners of Personnel");
            Personnel.removeListeners();

            break;
        case 2:
            console.log("Remove listeners of Neuf");
            Neuf.removeListeners();

            break;
        case 3:
            console.log("Remove listeners of Occasion");
            Occasion.removeListeners();
            break;

        default:
            break;
    }
}


export default {
    initShopListeners,
    closeShop
}