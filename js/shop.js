import Ressources from './shop/ressources.js';
import Personnel from './shop/personnel.js';
import Neuf from './shop/neuf.js';
//import Occasion from './shop/occasion.js';



const topRubric = document.querySelectorAll('#main-title div')

const ressources = document.querySelector('#ressources');
const personnel = document.querySelector('#personnel');
const neuf = document.querySelector('#neuf');
const occasion = document.querySelector('#occasion');


let active = undefined;



ressources.addEventListener('click', () => {
    printRessources();
});
personnel.addEventListener('click', () => {
    printPersonnel();
});
neuf.addEventListener('click', () => {
    printNeuf();
});
occasion.addEventListener('click', () => {
    printOccasion();
});


function initShop() {
    printRessources();
}





function printRessources() {
    changeRubric(0);
    active = 0;
    Ressources.initListeners();
    Ressources.openRubric()

}

function printPersonnel() {
    changeRubric(1);
    active = 1;
    Personnel.initListeners();
    Personnel.openRubric();

}

function printNeuf() {
    changeRubric(2);
    active = 2;
    Neuf.initListeners();
    Neuf.openRubric()

}

function printOccasion() {
    changeRubric(3);
    active = 3;

}





function changeRubric(id) {
    if (id <= 3) {
        topRubric.forEach(e => {
            e.classList.remove('selected');
        });
        topRubric[id].classList.add('selected');

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
                Neuf.removeListeners()

                break;
            case 3:
                console.log("Remove listeners of Occasion");

                break;

            default:
                break;
        }


    }
};

export default {
    initShop,

}