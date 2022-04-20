const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');


function openRubric() {
    printInge()
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

function printInge() {
    leftPage[0].textContent = "Ingé 1";
    leftPage[1].textContent = "Ingé 2";
    rightPage[0].textContent = "Ingé 3";
    rightPage[1].textContent = "Ingé 4";
}

function printSuper() {
    leftPage[0].textContent = "Superviseur 1";
    leftPage[1].textContent = "Superviseur 2";
    rightPage[0].textContent = "Superviseur 3";
    rightPage[1].textContent = "Superviseur 4";
}

function printMaint() {
    leftPage[0].textContent = "Maintenance 1";
    leftPage[1].textContent = "Maintenance 2";
    rightPage[0].textContent = "Maintenance 3";
    rightPage[1].textContent = "Maintenance 4";
}

function printMena() {
    leftPage[0].textContent = "Ménage 1";
    leftPage[1].textContent = "Ménage 2";
    rightPage[0].textContent = "Ménage 3";
    rightPage[1].textContent = "Ménage 4";
}

function printSelector(event) {
    switch (event.target.textContent) {
        case "Ingénieur":
            printInge();
            changeRubric(0)
            break;
        case "Superviseur":
            printSuper();
            changeRubric(1)

            break;
        case "Maintenance":
            printMaint();
            changeRubric(2)

            break;
        case "Ménage":
            printMena();
            changeRubric(3)
            break;

        default:
            console.warn("Error type selection");
            break;
    }
}

function initListeners() {
    console.log("Init listeners of Personnel");

    rightRubric[0].textContent = "Ingénieur"
    rightRubric[1].textContent = "Superviseur"
    rightRubric[2].textContent = "Maintenance"
    rightRubric[3].textContent = "Ménage"

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