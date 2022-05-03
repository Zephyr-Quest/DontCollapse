import ShopItem from './shopItem.js';

const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function openRubric() {
    printLevel(1);
    changeRubric(0);
}

function changeRubric(id) {
    if (id <= 3) {
        rightRubric.forEach(e => {
            e.classList.remove('selected');
        });
        rightRubric[id].classList.add('selected');
    }
}

function printLevel(id) {
    leftPage[0].innerHTML = `Poste à souder <br> Niveau ${id+1}`;
    leftPage[1].innerHTML = `Assembleur de précision <br> Niveau ${id+1}`;
    rightPage[0].innerHTML = `Assembleur mécanique <br> Niveau ${id+1}`;
    rightPage[1].innerHTML = `Assembleur général <br> Niveau ${id+1}`;
}


function printSelector(event) {
    const element = {
        "elem1": [0, 0],
        "elem2": [2, 1],
        "elem3": [3, 2],
        "elem4": [4, 3]
    };
    const current = element[event.target.classList[0]]
    printLevel(current[0]);
    changeRubric(current[1]);
}

function printRightRubric(){

}

function initListeners() {
    console.log("Init listeners of Neuf");

    rightRubric[0].textContent = "Manix 2";
    rightRubric[1].textContent = "Droit Ô But";
    rightRubric[2].textContent = "Braz'Air'Eau";
    rightRubric[3].textContent = "Teslassemblage";

    for (const current of rightRubric) {
        current.addEventListener('click', printSelector);
    }
}

function removeListeners() {
    for (const current of rightRubric) {
        current.removeEventListener('click', printSelector);
    }
}

export default {
    initListeners,
    removeListeners,
    openRubric,
}