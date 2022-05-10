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
    if (id[0] != 24) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftPage[i].addEventListener('mouseenter', toggleDescri);
            leftPage[i].addEventListener('mouseleave', toggleDescri);
            rightPage[i].addEventListener('mouseenter', toggleDescri);
            rightPage[i].addEventListener('mouseleave', toggleDescri);
            
            leftBtn[i].addEventListener('click',buyItem);
            rightBtn[i].addEventListener('click',buyItem);
        }
    } else {
        setOccaz(id)
    }
}

/**
 * init occasion listeners from id[0] to id[1]
 * @param {Document} id 
 */
function setOccaz(id) {
    for (let i = id[0]; i <= id[1]; i++) {
        if (leftPage[i].hasAttribute("buyable")) {
            leftPage[i].addEventListener('mouseenter', toggleDescri);
            leftPage[i].addEventListener('mouseleave', toggleDescri);

            leftPage[i].children[i].addEventListener('click', occasion); // button for buy
        }
    }
    for (let i = id[0]; i <= id[1]; i++) {
        if (rightPage[i].hasAttribute("buyable")) {
            rightPage[i].addEventListener('mouseenter', toggleDescri);
            rightPage[i].addEventListener('mouseleave', toggleDescri);

            rightPage[i].children[2].addEventListener('click', occasion); // button for buy
        }
    }
}

/**
 * show the description when the mouse is hover the card
 * @param {EventTarget} e 
 */
function toggleDescri(e) {
    for (const child of e.target.children) {
        if(child.style.display === "none"){
            child.style.display = "block";
        }else{
            child.style.display = "none";
        }
    }
}


/**
 * open confirm modal when player click on buy
 * @param {EventTarget} e 
 */
function buyItem(e) {
    Buy.buyItem(e.target.parentElement)
}

/**
 * open confirm modal to delet or shop an item in occasion
 * @param {EventTarget} e 
 */
function occasion(e) {
    if (e.target.parentElement.classList[0] == "own") {
        Buy.deleteItem(e.target.parentElement)
    } else {
        Buy.buyItem(e.target.parentElement)
    }
}

/**
 * remove all listeners
 */
function closeAllListener() {
    for (let i = 0; i < leftPage.length - 2; i++) {
        leftBtn[i].removeEventListener('click', buyItem);
        rightBtn[i].removeEventListener('click', buyItem);
        leftPage[i].removeEventListener('mouseenter', toggleDescri);
        leftPage[i].removeEventListener('mouseleave', toggleDescri);
        rightPage[i].removeEventListener('mouseenter', toggleDescri);
        rightPage[i].removeEventListener('mouseleave', toggleDescri);
    }
    for (let i = leftPage.length - 2; i < leftPage.length; i++) {
        leftPage[i].removeEventListener('click', occasion);
        rightPage[i].removeEventListener('click', occasion);
        leftPage[i].removeEventListener('mouseenter', toggleDescri);
        leftPage[i].removeEventListener('mouseleave', toggleDescri);
        rightPage[i].removeEventListener('mouseenter', toggleDescri);
        rightPage[i].removeEventListener('mouseleave', toggleDescri);
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

export default {
    changeItem,
    closeAllListener
}