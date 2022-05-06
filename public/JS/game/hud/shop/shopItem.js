import Buy from './manageItem.js'

const leftPage = document.querySelectorAll('#left-page div');
const rightPage = document.querySelectorAll('#right-page div');

function initListener(id) {
    closeAllListener();

    if (id[0] != 24) {
        for (let i = id[0]; i <= id[1]; i++) {
            leftPage[i].addEventListener('mouseenter', showDescri);
            leftPage[i].addEventListener('mouseleave', hideDescri);
            rightPage[i].addEventListener('mouseenter', showDescri);
            rightPage[i].addEventListener('mouseleave', hideDescri);

            leftPage[i].children[2].addEventListener('click', buyItem); // listener button for buy
            rightPage[i].children[2].addEventListener('click', buyItem);
        }
    } else {
        setOccaz(id)
    }
}

function setOccaz(id) {
    for (let i = id[0]; i <= id[1]; i++) {
        if (leftPage[i].hasAttribute("buyable")) {
            leftPage[i].addEventListener('mouseenter', showDescri);
            leftPage[i].addEventListener('mouseleave', hideDescri);

            leftPage[i].children[2].addEventListener('click', occasion); // button for buy
        }
    }
    for (let i = id[0]; i <= id[1]; i++) {
        if (rightPage[i].hasAttribute("buyable")) {
            rightPage[i].addEventListener('mouseenter', showDescri);
            rightPage[i].addEventListener('mouseleave', hideDescri);

            rightPage[i].children[2].addEventListener('click', occasion); // button for buy
        }
    }
}

function showDescri(e) {
    e.target.children[0].style.display = "none";
    e.target.children[1].style.display = "block";
    e.target.children[2].style.display = "block";

}

function hideDescri(e) {
    e.target.children[0].style.display = "block";
    e.target.children[1].style.display = "none"
    e.target.children[2].style.display = "none";
}

function buyItem(e) {
    Buy.buyItem(e.target.parentElement)
}

function occasion(e) {
    if (e.target.parentElement.classList[0] == "own") {
        Buy.deleteItem(e.target.parentElement)
    }
    else{
        Buy.buyItem(e.target.parentElement)
    }
}

function closeAllListener() {
    for (let i = 0; i < leftPage.length - 2; i++) {
        leftPage[i].removeEventListener('click', buyItem);
        rightPage[i].removeEventListener('click', buyItem);
        leftPage[i].removeEventListener('mouseenter', showDescri);
        leftPage[i].removeEventListener('mouseleave', hideDescri);
        rightPage[i].removeEventListener('mouseenter', showDescri);
        rightPage[i].removeEventListener('mouseleave', hideDescri);
    }
    for (let i = leftPage.length - 2; i < leftPage.length; i++) {
        leftPage[i].removeEventListener('click', occasion);
        rightPage[i].removeEventListener('click', occasion);
        leftPage[i].removeEventListener('mouseenter', showDescri);
        leftPage[i].removeEventListener('mouseleave', hideDescri);
        rightPage[i].removeEventListener('mouseenter', showDescri);
        rightPage[i].removeEventListener('mouseleave', hideDescri);
    }
}



function changeItem(classOfRight) {
    leftPage.forEach(element => {
        if (element.style.display === "block") {
            element.style.display = "none";
        }
    });
    rightPage.forEach(element => {
        if (element.style.display === "block") {
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
        leftPage[i].style.display = "block";
        rightPage[i].style.display = "block";
    }
    initListener(toDisplay);
}

export default {
    changeItem,
    closeAllListener
}