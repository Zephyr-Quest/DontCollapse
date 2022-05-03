import ShopItem from './shopItem.js'

const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function openRubric() {
    printElec()
    changeRubric(0)
}

function changeRubric(id) {
    if (id <= 3) {
        rightRubric.forEach(e => {
            e.classList.remove('selected');
        });
        rightRubric[id].classList.add('selected')
    }
};

function printElec() {
    leftPage[0].textContent = "Coup de Foudre";
    leftPage[1].textContent = "Petit Tonerre";
    rightPage[0].textContent = "Électricité d'Euler";
    rightPage[1].textContent = "Durexcel";
}

function printEau() {
    leftPage[0].textContent = "Hâche 2 Eaux";
    leftPage[1].textContent = "Alqueaul";
    rightPage[0].textContent = "Rheaum";
    rightPage[1].textContent = "Cri'Staline";
}

function printCart() {
    leftPage[0].textContent = "Jean Balle";
    leftPage[1].textContent = "Toutânkharton";
    rightPage[0].textContent = "Mine Carton";
    rightPage[1].textContent = "Scotch Willski";
}

function printEtQuinc() {
    leftPage[0].textContent = "Casto là bas";
    leftPage[1].textContent = "Le Roi Merlin";
    rightPage[0].textContent = "Quincaillepleure";
    rightPage[1].textContent = "P'étain clou";
}

function printSelector(event) {
    switch (event.target.classList[0]) {
        case "elem1":
            printElec();
            changeRubric(0)
            break;
        case "elem2":
            printEau();
            changeRubric(1)

            break;
        case "elem3":
            printCart();
            changeRubric(2)

            break;
        case "elem4":
            printEtQuinc();
            changeRubric(3)

            break;

        default:
            console.warn("Error type selection");
            break;
    }
}

function initListeners() {
    console.log("Init listeners of Ressources");

    rightRubric[0].textContent = "Électricité"
    rightRubric[1].textContent = "Eau"
    rightRubric[2].textContent = "Cartons"
    rightRubric[3].textContent = "Étain - Quincaillerie"

    for (const current of rightRubric) {
        current.addEventListener('click', printSelector);
    }
}

function removeListeners(){
    for (const current of rightRubric) {
        current.removeEventListener('click', printSelector);
    }
}

export default {
    initListeners,
    removeListeners,
    openRubric,
}