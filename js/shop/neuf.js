const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function openRubric() {
    printLevel(1)
    changeRubric(0)
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
    leftPage[0].innerHTML = `Poste à souder <br> Niveau ${id}`;
    leftPage[1].innerHTML = `Assembleur de précision <br> Niveau ${id}`;
    rightPage[0].innerHTML = `Assembleur mécanique <br> Niveau ${id}`;
    rightPage[1].innerHTML = `Assembleur général <br> Niveau ${id}`;
}


function printSelector(event) {
    switch (event.target.classList[0]) {
        case "elem1":
            printLevel(1);
            changeRubric(0)
            break;
        case "elem2":
            printLevel(2);
            changeRubric(1)

            break;
        case "elem3":
            printLevel(3);
            changeRubric(2)

            break;
        case "elem4":
            printLevel(4);
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