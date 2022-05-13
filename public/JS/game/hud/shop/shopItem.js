import Buy from './manageItem.js'

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');

let leftBtn = document.querySelectorAll('#left-page button')
let rightBtn = document.querySelectorAll('#right-page button')

/**
 * init listeners from id[0] to id[1]
 * @param {Document} id 
 */
function initListener(id) {
    closeAllListener();

    // if the occasion is not selected
    for (let i = id[0]; i <= id[1]; i++) {
        if (!leftPage[i].hasAttribute("disable")) {
            leftPage[i].addEventListener('mouseenter', toggleDescri);
            leftPage[i].addEventListener('mouseleave', toggleDescri);
        }
        if (!rightPage[i].hasAttribute("disable")) {
            rightPage[i].addEventListener('mouseenter', toggleDescri);
            rightPage[i].addEventListener('mouseleave', toggleDescri);
        }
    }
    if (id[0] < 8) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftBtn[i].addEventListener('click', buyContract);
            rightBtn[i].addEventListener('click', buyContract);
        }
    } else if (id[0] < 16) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftBtn[i].addEventListener('click', buyPerso);
            rightBtn[i].addEventListener('click', buyPerso);
        }
    } else if (id[0] < 24) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftBtn[i].addEventListener('click', buyMachine);
            rightBtn[i].addEventListener('click', buyMachine);
        }
    } else if (id[0] < 26) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftBtn[i].addEventListener('click', buyOccaz);
            rightBtn[i].addEventListener('click', buyOccaz);
        }
    } else console.warn('ERROR');
}


/**
 * show the description when the mouse is hover the card
 * @param {EventTarget} e 
 */
function toggleDescri(e) {
    for (const child of e.target.children) {
        if (child.style.display === "none") {
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
    }
}


/**
 * open confirm modal when player click on buy
 * @param {EventTarget} e 
 */
function buyContract(e) {
    Buy.buyItem(e.target.parentElement, 0);
}

function buyPerso(e) {
    Buy.buyItem(e.target.parentElement, 1);
}

function buyMachine(e) {
    Buy.buyItem(e.target.parentElement, 2);
}

function buyOccaz(e) {
        Buy.buyItem(e.target.parentElement, 3);
}


/**
 * remove all listeners
 */
function closeAllListener() {
    for (let i = 0; i < 26; i++) {
        leftPage[i].removeEventListener('mouseenter', toggleDescri);
        leftPage[i].removeEventListener('mouseleave', toggleDescri);

        rightPage[i].removeEventListener('mouseenter', toggleDescri);
        rightPage[i].removeEventListener('mouseleave', toggleDescri);
    }
    for (let i = 0; i < 8; i++) {
        leftBtn[i].addEventListener('click', buyContract);
        rightBtn[i].addEventListener('click', buyContract);
    }
    for (let i = 8; i < 16; i++) {
        leftBtn[i].addEventListener('click', buyPerso);
        rightBtn[i].addEventListener('click', buyPerso);
    }
    for (let i = 16; i < 24; i++) {
        leftBtn[i].addEventListener('click', buyMachine);
        rightBtn[i].addEventListener('click', buyMachine);
    }
    for (let i = 24; i < 26; i++) {
        leftBtn[i].addEventListener('click', buyOccaz);
        rightBtn[i].addEventListener('click', buyOccaz);
    }
}

/**
 * display the elements selected
 * @param {Document} classOfRight 
 */
function changeItem(classOfRight) {
    leftPage.forEach(element => {
        if (element.style.display === "flex") {
            element.style.display = "none";
        }
    });
    rightPage.forEach(element => {
        if (element.style.display === "flex") {
            element.style.display = "none";
        }
    });

    const items = {
        "elec": [0, 1],
        "eau": [2, 3],
        "carton": [4, 5],
        "etain": [6, 7],

        "inge": [8, 9],
        "super": [10, 11],
        "maint": [12, 13],
        "menage": [14, 15],

        "manix": [16, 17],
        "droit": [18, 19],
        "braz": [20, 21],
        "tesla": [22, 23],

        "occaz": [24, 25],
    };

    let toDisplay = items[classOfRight];

    for (let i = toDisplay[0]; i <= toDisplay[1]; i++) {
        leftPage[i].style.display = "flex";
        rightPage[i].style.display = "flex";
    }
    initListener(toDisplay);
}

function refreshContract(infos) {
    for (let i = 0; i < infos.length; i++) {
        document.getElementsByClassName(infos[i])[i].setAttribute('disable', '');
    }
}

function refreshMachine(infos) {
    const lvl = {
        1: "manix",
        2: "droit",
        3: "braz",
        4: "tesla"
    }

    for (let i = 0; i < infos.length; i++) {
        //console.log(infos[i])
        switch (infos[i].level) {
            case 4:
                document.getElementsByClassName('tesla')[i + 1].setAttribute('disable', '');
            case 3:
                document.getElementsByClassName('braz')[i + 1].setAttribute('disable', '');
            case 2:
                document.getElementsByClassName('droit')[i + 1].setAttribute('disable', '');
            case 1:
                document.getElementsByClassName('manix')[i + 1].setAttribute('disable', '');
            default:
                break;

        }

        // if (infos[i].secondHand === false) {
        //     document.getElementsByClassName(lvl[infos[i].level])[i].setAttribute('disable', '');
        // }
    }
}

function refreshOccaz(infos, username) {
    let item = {
        0: "Poste à souder",
        1: "Assembleur de précision",
        2: "Assembleur mécanique",
        3: "Assembleur général"
    }
    console.log(infos, username)
    let occaz = document.getElementsByClassName("occaz");
    for (let i = 0; i < occaz.length - 1; i++) {
        let elem = occaz[i + 1];
        if (infos[i]) {
            if (infos[i].player === username) {
                elem.children[0].innerHTML = "Vous vendez un " + item[infos[i].machine] + "<br>de niveau " + infos[i].level+",<br>"+ infos[i].price + "€";
            } else {
                elem.removeAttribute('disable');
                elem.children[0].innerHTML = item[infos[i].machine] + " de niveau " + infos[i].level + "<br>à vendre";
                elem.children[1].innerHTML = "Vendue par <span class='sellUsername'>" + infos[i].player + "</span>, " + infos[i].price + "€";
            }
        } else {
            elem.setAttribute('disable', '');
            elem.children[0].innerHTML = "Rien n'est à vendre<br>pour le moment";
            elem.children[1].innerText = " ";
        }
    }
    // username, id, level, price

}

export default {
    changeItem,
    closeAllListener,

    refreshContract,
    refreshMachine,
    refreshOccaz
}