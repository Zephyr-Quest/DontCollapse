const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function openRubric() {
    printManix()
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

function printManix() {
    leftPage[0].innerHTML = "Poste à souder <br> Niveau 1";
    leftPage[1].innerHTML = "Assembleur de précision <br> Niveau 1";
    rightPage[0].innerHTML = "Assembleur mécanique <br> Niveau 1";
    rightPage[1].innerHTML = "Assembleur général <br> Niveau 1";
}

function printDroit() {
    leftPage[0].innerHTML = "Poste à souder <br> Niveau 2";
    leftPage[1].innerHTML = "Assembleur de précision <br> Niveau 2";
    rightPage[0].innerHTML = "Assembleur mécanique <br> Niveau 2";
    rightPage[1].innerHTML = "Assembleur général <br> Niveau 2";
}

function printBraz() {
    leftPage[0].innerHTML = "Poste à souder <br> Niveau 3";
    leftPage[1].innerHTML = "Assembleur de précision <br> Niveau 3";
    rightPage[0].innerHTML = "Assembleur mécanique <br> Niveau 3";
    rightPage[1].innerHTML = "Assembleur général <br> Niveau 3";
}

function printTesla() {
    leftPage[0].innerHTML = "Poste à souder <br> Niveau 4";
    leftPage[1].innerHTML = "Assembleur de précision <br> Niveau 4";
    rightPage[0].innerHTML = "Assembleur mécanique <br> Niveau 4";
    rightPage[1].innerHTML = "Assembleur général <br> Niveau 4";
}

function printSelector(event) {
    switch (event.target.textContent) {
        case "Manix 2":
            printManix();
            changeRubric(0)
            break;
        case "Droit Ô But":
            printDroit();
            changeRubric(1)

            break;
        case "Braz'Air'Eau":
            printBraz();
            changeRubric(2)

            break;
        case "Teslassemblage":
            printTesla();
            changeRubric(3)
            break;

        default:
            console.warn("Error type selection");
            break;
    }
}

function initListeners() {
    console.log("Init listeners of Neuf");

    rightRubric[0].textContent = "Manix 2"
    rightRubric[1].textContent = "Droit Ô But"
    rightRubric[2].textContent = "Braz'Air'Eau"
    rightRubric[3].textContent = "Teslassemblage"

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