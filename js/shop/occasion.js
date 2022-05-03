import ShopItem from './shopItem.js'

const rightRubric = document.querySelectorAll('#supplier div');

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');

let players = ["host", "mich", "rémi" ,"max" ]

function openRubric() {
    printOwn()
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

function printOwn() {
    leftPage[0].innerHTML = "";
    leftPage[1].innerHTML = "";
    rightPage[0].innerHTML = "";
    rightPage[1].innerHTML = "";
}

function printPlayer() {
    leftPage[0].innerHTML = "Poste à souder <br> Niveau 2";
    leftPage[1].innerHTML = "Assembleur de précision <br> Niveau 2";
    rightPage[0].innerHTML = "Assembleur mécanique <br> Niveau 2";
    rightPage[1].innerHTML = "Assembleur général <br> Niveau 2";
}


function printSelector(event) {
    switch (event.target.classList[0]) {
        case "elem1":
            printPlayer(0);
            changeRubric(0);

            break;
        case "elem2":
            printPlayer(1);
            changeRubric(1);

            break;
        case "elem3":
            printPlayer(2);
            changeRubric(2);

            break;
        case "elem4":
            printPlayer(3);
            changeRubric(3);
            
            break;
        default:
            console.warn("Error type selection");
            break;
    }
}

function initListeners() {
    console.log("Init listeners of Occasion");

    // players = //! à récup en back

    rightRubric[0].textContent = "Mes occasions"
    rightRubric[0].addEventListener('click', printSelector)

    for (let i = 1; i < players.length; i++) {
        rightRubric[i].textContent = players[i]
        rightRubric[i].addEventListener('click', printSelector)
    }
    for (let i = players.length; i < 4; i++) {
        rightRubric[i].textContent = "";
        rightRubric[i].classList.remove("clickable");
    }
}

function removeListeners() {
    for (let i = 0; i < players.length; i++) {
        rightRubric[i].removeEventListener('click', printSelector)
    }
    for (let i = players.length; i < 4; i++) {
        rightRubric[i].classList.add("clickable");
    }
}

export default {
    initListeners,
    removeListeners,
    openRubric,
}