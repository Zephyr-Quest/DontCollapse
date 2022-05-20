import Buy from './manageItem.js'

const leftPage = document.querySelectorAll('#left-page > div');
const rightPage = document.querySelectorAll('#right-page > div');

let leftBtn = document.querySelectorAll('#left-page button');
let rightBtn = document.querySelectorAll('#right-page button');

let opening = true;
/**
 * init listeners from id[0] to id[1]
 * @param {Document} id 
 */
function initListener(id) {
    closeAllListener();
    opening = true;
    if (id[0] < 18) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftPage[i].addEventListener('mouseenter', toggleDescri);
            leftPage[i].addEventListener('mouseleave', toggleDescri);
            rightPage[i].addEventListener('mouseenter', toggleDescri);
            rightPage[i].addEventListener('mouseleave', toggleDescri);
        }
    } else {
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
    }

    if (id[0] < 8) {
        for (let i = id[0]; i <= id[1]; i++) {
            if (!leftPage[i].hasAttribute("disable"))
                leftBtn[i].addEventListener('click', buyContract);
            if (!rightPage[i].hasAttribute("disable"))
                rightBtn[i].addEventListener('click', buyContract);
        }
    } else if (id[0] < 10) {
        for (let i = id[0]; i <= id[1]; i++) {
            if (!leftPage[i].hasAttribute("disable"))
                leftBtn[i].addEventListener('click', buyPerso);
            if (!rightPage[i].hasAttribute("disable"))
                rightBtn[i].addEventListener('click', buyPerso);
        }
    } else if (id[0] < 18) {
        for (let i = id[0]; i <= id[1]; i++) {
            if (!leftPage[i].hasAttribute("disable"))
                leftBtn[i].addEventListener('click', buyMachine);
            if (!rightPage[i].hasAttribute("disable"))
                rightBtn[i].addEventListener('click', buyMachine);
        }
    } else if (id[0] < 20) {
        for (let i = id[0]; i <= id[1]; i++) {
            if (!leftPage[i].hasAttribute("disable"))
                leftBtn[i].addEventListener('click', buyOccaz);
            if (!rightPage[i].hasAttribute("disable"))
                rightBtn[i].addEventListener('click', buyOccaz);
        }
    } else console.warn('ERROR');
}


/**
 * show the description when the mouse is hover the card
 * @param {EventTarget} e 
 */
function toggleDescri(e) {
    if (opening) {
        opening = false;
        let elem = e.target.children
        elem[0].style.display = "block";
        elem[1].style.display = "none";
        if (elem[2]) elem[2].style.display = "none";
    }

    for (const child of e.target.children) {
        if (child.style.display === "none") {
            if (!child.hasAttribute('disable')) child.style.display = "block";
        } else {
            if (!child.hasAttribute('disable')) child.style.display = "none";
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
    console.log(e.target.parentElement.parentElement);
    Buy.buyItem(e.target.parentElement.parentElement, 1);
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
    for (let i = 0; i < leftPage.length; i++) {
        leftPage[i].removeEventListener('mouseenter', toggleDescri);
        leftPage[i].removeEventListener('mouseleave', toggleDescri);

        rightPage[i].removeEventListener('mouseenter', toggleDescri);
        rightPage[i].removeEventListener('mouseleave', toggleDescri);
    }
    for (let i = 0; i < 8; i++) {
        leftBtn[i].addEventListener('click', buyContract);
        rightBtn[i].addEventListener('click', buyContract);
    }
    for (let i = 8; i < 9; i++) {
        leftBtn[i].addEventListener('click', buyPerso);
        rightBtn[i].addEventListener('click', buyPerso);
    }
    for (let i = 10; i < 18; i++) {
        leftBtn[i].addEventListener('click', buyMachine);
        rightBtn[i].addEventListener('click', buyMachine);
    }
    for (let i = 18; i < 20; i++) {
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
        "cartons": [4, 5],
        "etain": [6, 7],

        "perso": [8, 9],

        "manix": [10, 11],
        "droit": [12, 13],
        "braz": [14, 15],
        "tesla": [16, 17],

        "occaz": [18, 19],
    };

    let toDisplay = items[classOfRight];

    for (let i = toDisplay[0]; i <= toDisplay[1]; i++) {
        leftPage[i].style.display = "flex";
        rightPage[i].style.display = "flex";
    }
    initListener(toDisplay);
}

function refreshContract(infos) {
    let supp = {
        0: "elec",
        1: "eau",
        2: "cartons",
        3: "etain"
    }
    for (let i = 0; i < infos.length; i++) {
        let supplier = document.getElementsByClassName(supp[i])
        for (let i = 0; i < supplier.length - 1; i++) {
            if (supplier[i + 1].hasAttribute('disable')) supplier[i + 1].removeAttribute('disable');
        }
        let elem = document.getElementsByClassName(infos[i])[i]
        elem.setAttribute('disable', '');
        elem.querySelector('.buy-button').setAttribute('disable', '')
    }

}

function refreshMachine(infos) {
    let elem;
    for (let i = 0; i < infos.length; i++) {
        switch (infos[i].level) {
            case 4:
                elem = document.getElementsByClassName('tesla')[i + 1]
                elem.setAttribute('disable', '');
                elem.querySelector('.buy-button').setAttribute('disable', '')
            case 3:
                elem = document.getElementsByClassName('braz')[i + 1]
                elem.setAttribute('disable', '');
                elem.querySelector('.buy-button').setAttribute('disable', '')
            case 2:
                elem = document.getElementsByClassName('droit')[i + 1]
                elem.setAttribute('disable', '');
                elem.querySelector('.buy-button').setAttribute('disable', '')
            case 1:
                elem = document.getElementsByClassName('manix')[i + 1]
                elem.setAttribute('disable', '');
                elem.querySelector('.buy-button').setAttribute('disable', '')
            default:
                break;

        }
    }
}

function refreshOccaz(infos, username) {
    let item = {
        0: "Poste a souder",
        1: "Assembleur de precision",
        2: "Assembleur mecanique",
        3: "Assembleur general"
    }
    let occaz = document.getElementsByClassName("occaz");
    for (let i = 0; i < occaz.length - 1; i++) {
        let elem = occaz[i + 1];
        if (infos[i]) {
            if (infos[i].player === username) {
                elem.children[0].children[0].innerHTML = "Vous vendez un " + item[infos[i].machine];
                elem.children[0].children[1].innerHTML = "de niveau " + infos[i].level + ",<br>" + infos[i].price + "€";
            } else {
                elem.removeAttribute('disable');
                elem.children[0].children[0].innerHTML = item[infos[i].machine];
                elem.children[0].children[1].innerHTML = "de niveau " + infos[i].level;
                elem.children[0].children[2].innerHTML = "a vendre";
                elem.children[1].innerHTML = "Vendu par <span class='sellUsername'>" + infos[i].player + "</span>, " + infos[i].price + "€";
            }
        } else {
            elem.setAttribute('disable', '');
            elem.children[0].children[0].innerHTML = "Rien n'est a vendre";
            elem.children[0].children[1].innerText = "pour le moment";
        }
    }

}

export default {
    changeItem,
    closeAllListener,

    refreshContract,
    refreshMachine,
    refreshOccaz
}